import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rate limiting map (simple in-memory store)
const rateLimitMap = new Map();

// Rate limit middleware
const rateLimit = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const key = `${ip}-contact`;
  const now = Date.now();
  const limit = 5; // max 5 requests
  const window = 60 * 60 * 1000; // per hour

  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, []);
  }

  const requests = rateLimitMap.get(key);
  const recentRequests = requests.filter((timestamp) => now - timestamp < window);

  if (recentRequests.length >= limit) {
    return res.status(429).json({ 
      success: false, 
      message: "Too many requests. Please try again later." 
    });
  }

  recentRequests.push(now);
  rateLimitMap.set(key, recentRequests);
  next();
};

// Input validation
const validateContactInput = (data) => {
  const errors = {};

  if (!data.name || typeof data.name !== 'string') {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be less than 100 characters';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (!data.subject || typeof data.subject !== 'string') {
    errors.subject = 'Subject is required';
  } else if (data.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters';
  } else if (data.subject.trim().length > 200) {
    errors.subject = 'Subject must be less than 200 characters';
  }

  if (!data.message || typeof data.message !== 'string') {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (data.message.trim().length > 5000) {
    errors.message = 'Message must be less than 5000 characters';
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

app.post("/contact", rateLimit, async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate input
  const validationErrors = validateContactInput({ name, email, subject, message });
  if (validationErrors) {
    return res.status(400).json({ 
      success: false, 
      message: "Validation failed",
      errors: validationErrors
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email to admin
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `${subject} - from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"Adrian's Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for reaching out!",
      html: `
        <h2>Thank you for contacting me, ${name}!</h2>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>Best regards,<br>Adrian</p>
      `,
    });

    res.status(200).json({ 
      success: true,
      message: "Message sent successfully!"
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to send message. Please try again later."
    });
  }
});

// Portfolio context for the chatbot
const portfolioContext = `
You are Adrian, a highly skilled Full Stack Developer and the owner of this portfolio. Represent this professional authentically and helpfully.

CORE IDENTITY:
- Name: Adrian
- Role: Full Stack Developer
- Experience: 15+ years in web development
- Client Satisfaction: 200+ clients, 90% retention rate, 108+ completed projects
- Personality: Professional, friendly, passionate about technology, solution-oriented

EXPERTISE & SKILLS:
Frontend: React, React 19, TypeScript, Responsive Design, UI/UX Implementation, Tailwind CSS, Framer Motion, Interactive Development
Backend: Node.js, Express, Python, Django, API Development, Database Design
Databases: MongoDB, PostgreSQL, SQLite
Additional: Next.js, React Native, NextAuth, Project Management, Full Stack Architecture

PROFESSIONAL EXPERIENCE:
1. Frontend Developer at Hostinger (January 2023 - Present)
2. Full Stack Developer at Docker (June 2020 - December 2023)
3. React Native Developer at Appwrite (March 2019 - May 2020)

FEATURED PROJECTS: EDOT Platform, FollowFlow, Performance Evaluator, ClientFlow

GUIDELINES: Be helpful, professional, and redirect visitors appropriately to the contact form or social links when needed.
`;

// Rate limit for chat (higher limit for chat)
const chatRateLimit = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const key = `${ip}-chat`;
  const now = Date.now();
  const limit = 50; // max 50 messages
  const window = 60 * 60 * 1000; // per hour

  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, []);
  }

  const requests = rateLimitMap.get(key);
  const recentRequests = requests.filter((timestamp) => now - timestamp < window);

  if (recentRequests.length >= limit) {
    return res.status(429).json({ 
      error: 'Rate limit exceeded. Please try again later.' 
    });
  }

  recentRequests.push(now);
  rateLimitMap.set(key, recentRequests);
  next();
};

app.post('/chat', chatRateLimit, async (req, res) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Sanitize and validate input
  const sanitizedMessage = message.trim().substring(0, 1000);
  if (sanitizedMessage.length === 0) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Limit conversation history to last 10 messages for context
    const limitedHistory = Array.isArray(conversationHistory) 
      ? conversationHistory.slice(-20) 
      : [];

    // Build messages array with conversation history
    const messages = [
      {
        role: 'system',
        content: portfolioContext,
      },
      ...limitedHistory,
      {
        role: 'user',
        content: sanitizedMessage,
      },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 350,
      temperature: 0.7,
      top_p: 0.9,
    });

    const reply = response.choices?.[0]?.message?.content?.trim() || 'I could not generate an answer right now. Feel free to contact Adrian directly!';
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(503).json({ error: 'Chat service is temporarily unavailable. Please contact Adrian directly.' });
    }
    
    res.status(500).json({ error: 'Chat service temporarily unavailable. Please try again or contact Adrian directly.' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));