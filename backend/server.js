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
      from: `"Kenenisa's Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for reaching out!",
      html: `
        <h2>Thank you for contacting me, ${name}!</h2>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>Best regards,<br>Kenenisa Beyan</p>
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
You are Kenenisa Beyan, a highly skilled Full Stack Developer / Software Engineer and the owner of this portfolio. Represent this professional authentically and helpfully.

CORE IDENTITY:
- Name: Kenenisa Beyan
- Role: Full Stack Developer / Software Engineer
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
  const limit = 100; // max 100 messages
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

// Smart fallback local responder when OpenAI API key is missing or fails
const getLocalResponse = (message) => {
  const query = message.toLowerCase().trim();

  // Greetings
  if (/^(hello|hi|hey|greetings|yo|sup|good morning|good afternoon|good evening)/i.test(query) || query.includes('who are you') || query.includes('your name') || query.includes('tell me about yourself')) {
    return `Hi there! 👋 I'm Kenenisa's AI assistant. 

I can help you explore Kenenisa's skills, professional experience, featured projects, and client feedback. 

What would you like to know? You can try asking:
- 🎯 *What are your main skills?*
- 💼 *Tell me about your work experience*
- 🚀 *What projects have you built?*
- ⚡ *What's your tech stack?*`;
  }

  // Skills & Tech Stack
  if (query.includes('skill') || query.includes('tech') || query.includes('stack') || query.includes('language') || query.includes('frontend') || query.includes('backend') || query.includes('develop') || query.includes('react') || query.includes('python') || query.includes('node') || query.includes('typescript') || query.includes('django') || query.includes('postgres') || query.includes('mongodb') || query.includes('database')) {
    return `🎯 **Kenenisa's Tech Stack & Skills**

Kenenisa is a highly accomplished Full-Stack Software Engineer with strong experience in the following technologies:
- **Frontend Development:** React 19, TypeScript, responsive UI/UX designs, Tailwind CSS, Framer Motion, and high-performance interactive development.
- **Backend Development:** Node.js, Express, Python, Django, and secure, high-throughput RESTful API design.
- **Databases & Architecture:** MongoDB, PostgreSQL, SQLite, and Full Stack Architecture.
- **Other Competencies:** Project Management, React Native for cross-platform mobile apps, and NextAuth for secure authentication flow.

Would you like to hear about the **projects** where he put these skills to work? 🚀`;
  }

  // Work Experience
  if (query.includes('experience') || query.includes('work') || query.includes('job') || query.includes('history') || query.includes('career') || query.includes('company') || query.includes('hostinger') || query.includes('docker') || query.includes('appwrite')) {
    return `💼 **Professional Experience**

Kenenisa has built a stellar track record over **15+ years in web development**, working with premier industry platforms:

1. **Frontend Developer at Hostinger** *(January 2023 - Present)*
   - Developed and maintained user-facing features.
   - Collaborated closely with UI/UX designers to guarantee premium client-side experiences.
   - Optimized web applications for lightning-fast speeds and responsive scalability.

2. **Full Stack Developer at Docker** *(June 2020 - December 2023)*
   - Led development of scalable web applications within the Docker ecosystem.
   - Built seamless, robust API integrations connecting frontend with backend layers.
   - Active contributor to open-source initiatives.

3. **React Native Developer at Appwrite** *(March 2019 - May 2020)*
   - Engineered cross-platform mobile applications integrated with Appwrite's server solutions.
   - Optimized mobile performance and implemented customer-centric designs.

Feel free to ask about his **projects** or **testimonials** to see his results! 📈`;
  }

  // Featured Projects
  if (query.includes('project') || query.includes('build') || query.includes('portfolio') || query.includes('create') || query.includes('make') || query.includes('edot') || query.includes('followflow') || query.includes('evaluator') || query.includes('clientflow')) {
    return `🚀 **Featured Projects**

Here are some outstanding full-stack systems Kenenisa has engineered:

1. **EDOT Platform** 📚
   - *Description:* A modular, full-stack education ecosystem designed for structured learning.
   - *Tech:* React, Tailwind CSS, Node.js, Express, PostgreSQL
   - *GitHub:* [edot](https://github.com/kenenisabeyan/edot)

2. **FollowFlow** 📈
   - *Description:* A premium theme-aware CRM and Task Tracking Dashboard with micro-animations.
   - *Tech:* React 19, TypeScript, Python, Django, SQLite, Tailwind, Framer Motion
   - *GitHub:* [followflow](https://github.com/kenenisabeyan/followflow)

3. **Performance Evaluator** 👥
   - *Description:* An employee evaluation dashboard with role-based access, real-time charts, and PDF reports.
   - *Tech:* Next.js, React, MongoDB, Tailwind, NextAuth
   - *GitHub:* [Performance-Evaluator](https://github.com/kenenisabeyan/Performance-Evaluator)

4. **ClientFlow** 💼
   - *Description:* A client relationship management tool with beautiful data analytics.
   - *Tech:* React, Node.js, Express, MongoDB, Tailwind
   - *GitHub:* [clientflow](https://github.com/kenenisabeyan/clientflow)

Would you like to collaborate with Kenenisa on a similar project? Let me know! 😊`;
  }

  // Client Testimonials / Stats
  if (query.includes('testimonial') || query.includes('review') || query.includes('client') || query.includes('feedback') || query.includes('what do people say') || query.includes('stat') || query.includes('retention')) {
    return `⭐️ **Client Retention & Testimonials**

Kenenisa takes immense pride in delivering top-tier experiences for clients:
- **Client Retention Rate:** 90% 📈
- **Completed Projects:** 108+ 🚀
- **Satisfied Clients:** 200+ 🤝

**What clients are saying:**
- **Esther Howard:** *"I can't say enough good things about Kenenisa. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding."*
- **Guy Hawkins:** *"Collaborating with Kenenisa was an absolute pleasure... His enthusiasm for every facet of development truly stands out."*
- **Floyd Miles:** *"Delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased!"*`;
  }

  // Contact / Hire
  if (query.includes('contact') || query.includes('hire') || query.includes('email') || query.includes('phone') || query.includes('reach') || query.includes('social') || query.includes('linkedin') || query.includes('github') || query.includes('twitter')) {
    return `📧 **Get in Touch**

You can connect with Kenenisa Beyan directly through the following channels:
- **Email:** [kenenisab05@gmail.com](mailto:kenenisab05@gmail.com)
- **LinkedIn:** [Kenenisa Beyan](https://www.linkedin.com/in/kenenisa/)
- **GitHub:** [@kenenisabeyan](https://github.com/kenenisabeyan)
- **Twitter/X:** [@kenenisa94931](https://twitter.com/kenenisa94931)

You can also send a direct message using the **contact form** right below on this page! ✉️`;
  }

  // Default Response
  return `I'm Kenenisa's AI assistant. I'm always happy to answer your questions! 

Feel free to ask me about:
- 🎯 **Skills & Tech Stack** (React, Python, Django, Node.js...)
- 💼 **Work Experience** (Hostinger, Docker, Appwrite...)
- 🚀 **Featured Projects** (EDOT, FollowFlow, Performance Evaluator...)
- 📧 **Contact & Social links** (Email, LinkedIn, GitHub...)

Alternatively, you can use the **contact form** below to reach out to Kenenisa directly! ✉️`;
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

  // If no OpenAI API Key is configured in the environment, fall back to smart local responder immediately
  if (!process.env.OPENAI_API_KEY) {
    console.log('No OpenAI API Key found, using local chatbot responder fallback.');
    const reply = getLocalResponse(sanitizedMessage);
    return res.status(200).json({ reply });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Limit conversation history to last 20 messages for context
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

    const reply = response.choices?.[0]?.message?.content?.trim() || 'I could not generate an answer right now. Feel free to contact Kenenisa directly!';
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat error, falling back to local responder:', error);
    
    // Fall back to local responder if OpenAI fails for any reason
    try {
      const reply = getLocalResponse(sanitizedMessage);
      res.status(200).json({ reply });
    } catch (fallbackError) {
      console.error('Fallback chat error:', fallbackError);
      res.status(500).json({ error: 'Chat service temporarily unavailable. Please try again or contact Kenenisa directly.' });
    }
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));