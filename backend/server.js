import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { db } from "./database.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'kenenisa_portfolio_super_secret_jwt_key_2025!';
const PORT = process.env.PORT || 5001;

// CORS setup
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Static uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Multer Media Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB limit
  fileFilter: (req, file, cb) => {
    const allowedMime = [
      'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
      'video/mp4', 'video/webm', 'application/pdf'
    ];
    if (allowedMime.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  }
});

// Authentication Middleware
const authenticateAdmin = (req, res, next) => {
  const token = req.cookies.admin_token || req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid or expired token' });
  }
};

// Log Audit Action Helper
const logAudit = (action, detail, adminEmail = 'admin') => {
  db.insert('audit_logs', {
    action,
    detail,
    adminEmail,
    timestamp: new Date().toISOString()
  });
};

// Real-time active visitors map (session tracking)
const activeVisitors = new Map();

// ═══════════════════════════════════════════════════════════════
// PUBLIC API & SEO ENDPOINTS (Sitemap, Robots.txt)
// ═══════════════════════════════════════════════════════════════

// Dynamic XML Sitemap for Google, Bing & Search Engines
app.get('/sitemap.xml', (req, res) => {
  try {
    const baseUrl = process.env.SITE_URL || 'https://kenenisa-one.vercel.app';
    const blogs = (db.get('blogs') || []).filter(b => b.visibility !== false && b.status === 'published');
    const projects = (db.get('projects') || []).filter(p => p.visibility !== false && p.status !== 'draft');

    const escapeXml = (str = '') =>
      str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    // Homepage
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(baseUrl)}/</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;

    // Portfolio Sections anchors for indexed search navigation
    const sections = ['work', 'experience', 'education', 'skills', 'achievements', 'blog', 'contact'];
    sections.forEach(sec => {
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(baseUrl)}/#${sec}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    // Published Blog Articles
    blogs.forEach(blog => {
      const blogDate = blog.publishedAt || blog.createdAt || new Date().toISOString();
      const lastMod = new Date(blogDate).toISOString().split('T')[0];
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(baseUrl)}/blog/${escapeXml(blog.slug || blog.id)}</loc>\n`;
      xml += `    <lastmod>${lastMod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      if (blog.coverImage) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(blog.coverImage.startsWith('http') ? blog.coverImage : `${baseUrl}${blog.coverImage}`)}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(blog.title)}</image:title>\n`;
        xml += `    </image:image>\n`;
      }
      xml += `  </url>\n`;
    });

    // Showcase Projects
    projects.forEach(project => {
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(baseUrl)}/#project-${escapeXml(project.id)}</loc>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      if (project.image) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(project.image.startsWith('http') ? project.image : `${baseUrl}${project.image}`)}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(project.title)}</image:title>\n`;
        xml += `    </image:image>\n`;
      }
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.send(xml);
  } catch (err) {
    res.status(500).send('Error generating sitemap');
  }
});

// Dynamic Robots.txt Endpoint
app.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.SITE_URL || 'https://kenenisa-one.vercel.app';
  const robots = `User-agent: *
Allow: /
Allow: /#*
Allow: /blog/*
Allow: /uploads/*
Disallow: /admin
Disallow: /api/admin/*

Sitemap: ${baseUrl}/sitemap.xml
`;
  res.setHeader('Content-Type', 'text/plain');
  res.send(robots);
});

// Dynamic OpenGraph Image Card SVG Generator (for Social Media Previews)
app.get('/api/public/og-image', (req, res) => {
  const siteSettings = db.get('site_settings') || {};
  const title = req.query.title || siteSettings.siteTitle || 'Kenenisa Beyan';
  const role = req.query.role || 'Full-Stack Software Engineer';
  const sub = req.query.sub || 'React • Node.js • TypeScript • Python • EdTech';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
    <rect width="1200" height="630" fill="#030610"/>
    <rect x="20" y="20" width="1160" height="590" rx="30" fill="#091326" stroke="#06b6d4" stroke-opacity="0.3" stroke-width="4"/>
    <path d="M 0 0 L 1200 630" stroke="#06b6d4" stroke-opacity="0.05" stroke-width="2"/>
    <circle cx="1000" cy="150" r="300" fill="#06b6d4" fill-opacity="0.08" filter="blur(80px)"/>
    <circle cx="200" cy="450" r="250" fill="#3b82f6" fill-opacity="0.08" filter="blur(80px)"/>
    
    <rect x="80" y="80" width="300" height="36" rx="18" fill="#06b6d4" fill-opacity="0.15" stroke="#06b6d4" stroke-opacity="0.4"/>
    <text x="100" y="103" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#22d3ee" letter-spacing="2">OFFICIAL PORTFOLIO ENTITY</text>
    
    <text x="80" y="220" font-family="system-ui, sans-serif" font-size="52" font-weight="900" fill="#ffffff" letter-spacing="-1">${title.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
    <text x="80" y="290" font-family="system-ui, sans-serif" font-size="32" font-weight="700" fill="#06b6d4">${role.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
    <text x="80" y="360" font-family="system-ui, sans-serif" font-size="20" font-weight="500" fill="#94a3b8">${sub.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
    
    <line x1="80" y1="420" x2="1120" y2="420" stroke="#06b6d4" stroke-opacity="0.2" stroke-width="2"/>
    
    <text x="80" y="500" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="#64748b">https://kenenisabeyan.com</text>
    <text x="1120" y="500" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="#06b6d4" text-anchor="end">Rank #1 Google Entity</text>
  </svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.send(svg);
});

// GET Public Portfolio Content (Visible & Published items only)
app.get('/api/public/portfolio', (req, res) => {
  try {
    const visibility = db.get('section_visibility') || {};
    const sectionContent = db.get('section_content') || {};
    const projects = db.get('projects')
      .filter(p => p.visibility !== false && p.status !== 'draft')
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const experiences = db.get('experiences')
      .filter(e => e.visibility !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const education = db.get('education')
      .filter(ed => ed.visibility !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const skills = db.get('skills')
      .filter(s => s.visibility !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const achievements = db.get('achievements')
      .filter(a => a.visibility !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const testimonials = db.get('testimonials')
      .filter(t => t.visibility !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const blogs = db.get('blogs')
      .filter(b => b.visibility !== false && b.status === 'published')
      .sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt));

    const news = db.get('news')
      .filter(n => n.visibility !== false)
      .sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt));

    const siteSettings = db.get('site_settings');
    const eventsGallery = db.get('events_gallery') || [];
    const galleryPhotos = db.get('gallery_photos') || [];

    res.json({
      success: true,
      data: {
        visibility,
        sectionContent,
        projects,
        experiences,
        education,
        skills,
        achievements,
        testimonials,
        blogs,
        news,
        eventsGallery,
        galleryPhotos,
        siteSettings
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error retrieving portfolio content' });
  }
});

// POST Public Analytics Event
app.post('/api/public/analytics/event', (req, res) => {
  try {
    const { type, section, projectId, device, referrer, sessionId } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'anonymous';
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Anonymize IP
    const anonymizedIp = typeof ip === 'string' ? ip.replace(/\.\d+$/, '.xxx') : 'xxx';

    const event = {
      type: type || 'page_view',
      section: section || 'home',
      projectId: projectId || null,
      device: device || 'desktop',
      referrer: referrer || 'direct',
      anonymizedIp,
      userAgent: userAgent.slice(0, 100),
      sessionId: sessionId || `sess-${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    db.insert('analytics_events', event);

    // Update active visitor tracking
    if (sessionId) {
      activeVisitors.set(sessionId, {
        section: section || 'home',
        device: device || 'desktop',
        lastSeen: Date.now()
      });
    }

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
});

// Public Blogs API
app.get('/api/public/blog', (req, res) => {
  const blogs = db.get('blogs').filter(b => b.visibility !== false && b.status === 'published');
  res.json({ success: true, data: blogs });
});

app.get('/api/public/blog/:slug', (req, res) => {
  const blog = db.find('blogs', b => b.slug === req.params.slug && b.visibility !== false);
  if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });
  
  // Increment view count
  db.update('blogs', blog.id, { views: (blog.views || 0) + 1 });
  res.json({ success: true, data: blog });
});

// Rate limiting & contact form submission
const rateLimitMap = new Map();
const rateLimit = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const key = `${ip}-contact`;
  const now = Date.now();
  const limit = 5;
  const windowMs = 60 * 60 * 1000;

  if (!rateLimitMap.has(key)) rateLimitMap.set(key, []);
  const requests = rateLimitMap.get(key).filter(timestamp => now - timestamp < windowMs);

  if (requests.length >= limit) {
    return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
  }

  requests.push(now);
  rateLimitMap.set(key, requests);
  next();
};

app.post("/contact", rateLimit, async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  // Save to DB
  const contactRecord = db.insert('contact_messages', {
    name,
    email,
    subject,
    message,
    status: 'unread',
    createdAt: new Date().toISOString()
  });

  // Track analytics event
  db.insert('analytics_events', {
    type: 'contact_submit',
    section: 'contact',
    timestamp: new Date().toISOString()
  });

  try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `[Portfolio Contact] ${subject}`,
        text: `From: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `<h3>New Portfolio Message</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><p>${message}</p>`
      });
    }

    res.json({ success: true, message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    // Still return success since message is saved in CMS database
    res.json({ success: true, message: "Your message was received and saved!" });
  }
});


// ═══════════════════════════════════════════════════════════════
// ADMIN AUTHENTICATION ENDPOINTS
// ═══════════════════════════════════════════════════════════════

app.post('/api/admin/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const adminUsers = db.get('admin');
  const admin = adminUsers.find(u => u.email.toLowerCase() === email.toLowerCase().trim());

  if (!admin) {
    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  }

  const isValidPassword = bcrypt.compareSync(password, admin.passwordHash);
  if (!isValidPassword) {
    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  }

  // Create JWT Token
  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: 'superadmin' },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Set HTTP-only cookie
  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  logAudit('ADMIN_LOGIN', `Admin logged in successfully (${admin.email})`, admin.email);

  res.json({
    success: true,
    token,
    user: { email: admin.email, role: 'superadmin' }
  });
});

app.post('/api/admin/auth/logout', authenticateAdmin, (req, res) => {
  res.clearCookie('admin_token');
  logAudit('ADMIN_LOGOUT', `Admin logged out (${req.admin.email})`, req.admin.email);
  res.json({ success: true, message: 'Logged out successfully' });
});

app.get('/api/admin/auth/me', authenticateAdmin, (req, res) => {
  res.json({ success: true, user: { email: req.admin.email, role: req.admin.role } });
});

app.post('/api/admin/auth/change-password', authenticateAdmin, (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({ success: false, message: 'New password must be at least 8 characters long' });
  }

  const adminUsers = db.get('admin');
  const admin = adminUsers.find(u => u.email === req.admin.email);

  if (!admin || !bcrypt.compareSync(currentPassword, admin.passwordHash)) {
    return res.status(400).json({ success: false, message: 'Current password is incorrect' });
  }

  const newHash = bcrypt.hashSync(newPassword, 10);
  db.update('admin', admin.id, { passwordHash: newHash });

  logAudit('PASSWORD_CHANGE', `Admin password changed (${req.admin.email})`, req.admin.email);
  res.json({ success: true, message: 'Password updated successfully' });
});


// ═══════════════════════════════════════════════════════════════
// ADMIN DASHBOARD OVERVIEW & ANALYTICS
// ═══════════════════════════════════════════════════════════════

app.get('/api/admin/dashboard', authenticateAdmin, (req, res) => {
  try {
    const events = db.get('analytics_events');
    const projects = db.get('projects');
    const messages = db.get('contact_messages');
    const blogs = db.get('blogs');
    const news = db.get('news');
    const auditLogs = db.get('audit_logs');
    const visibility = db.get('section_visibility');

    // Clean active visitors older than 5 minutes
    const now = Date.now();
    for (const [id, data] of activeVisitors.entries()) {
      if (now - data.lastSeen > 5 * 60 * 1000) {
        activeVisitors.delete(id);
      }
    }

    // Analytics metrics
    const totalPageViews = events.length;
    const uniqueVisitors = new Set(events.map(e => e.sessionId || e.anonymizedIp)).size;
    const unreadMessages = messages.filter(m => m.status === 'unread').length;

    // Section views breakdown
    const sectionViews = {};
    events.forEach(e => {
      if (e.section) {
        sectionViews[e.section] = (sectionViews[e.section] || 0) + 1;
      }
    });

    // Recent Audit Logs
    const recentActivity = auditLogs.slice(0, 10);

    res.json({
      success: true,
      data: {
        metrics: {
          totalPageViews,
          uniqueVisitors,
          onlineVisitors: activeVisitors.size,
          unreadMessages,
          totalProjects: projects.length,
          totalBlogs: blogs.length,
          totalNews: news.length
        },
        sectionViews,
        visibility,
        recentActivity,
        recentMessages: messages.slice(0, 5)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error generating dashboard data' });
  }
});


// ═══════════════════════════════════════════════════════════════
// SECTION VISIBILITY CONTROL
// ═══════════════════════════════════════════════════════════════

app.get('/api/admin/visibility', authenticateAdmin, (req, res) => {
  res.json({ success: true, data: db.get('section_visibility') });
});

app.post('/api/admin/visibility', authenticateAdmin, (req, res) => {
  const { section, visible } = req.body;
  const current = db.get('section_visibility') || {};
  current[section] = Boolean(visible);
  db.set('section_visibility', current);

  logAudit('TOGGLE_VISIBILITY', `Toggled section '${section}' to ${visible ? 'Visible' : 'Hidden'}`, req.admin.email);
  res.json({ success: true, data: current });
});

// GET Section Text Content (Admin)
app.get('/api/admin/section-content', authenticateAdmin, (req, res) => {
  res.json({ success: true, data: db.get('section_content') || {} });
});

// UPDATE Section Text Content (Admin)
app.put('/api/admin/section-content', authenticateAdmin, (req, res) => {
  const current = db.get('section_content') || {};
  const updated = { ...current, ...req.body };
  db.set('section_content', updated);
  logAudit('UPDATE_SECTION_CONTENT', `Updated text content for portfolio sections`, req.admin.email);
  res.json({ success: true, data: updated });
});

app.put('/api/admin/section-content/:sectionKey', authenticateAdmin, (req, res) => {
  const { sectionKey } = req.params;
  const current = db.get('section_content') || {};
  current[sectionKey] = req.body;
  db.set('section_content', current);
  logAudit('UPDATE_SECTION_CONTENT', `Updated text content for section '${sectionKey}'`, req.admin.email);
  res.json({ success: true, data: current });
});


// ═══════════════════════════════════════════════════════════════
// GENERIC MODULE CRUD ENDPOINTS (Projects, Experience, Education, etc.)
// ═══════════════════════════════════════════════════════════════

const createCrudEndpoints = (resourceName, collectionKey) => {
  // GET ALL (Admin)
  app.get(`/api/admin/${resourceName}`, authenticateAdmin, (req, res) => {
    res.json({ success: true, data: db.get(collectionKey) });
  });

  // CREATE
  app.post(`/api/admin/${resourceName}`, authenticateAdmin, (req, res) => {
    const item = db.insert(collectionKey, req.body);
    logAudit(`CREATE_${resourceName.toUpperCase()}`, `Created item in ${resourceName}: ${item.title || item.name || item.id}`, req.admin.email);
    res.json({ success: true, data: item });
  });

  // UPDATE
  app.put(`/api/admin/${resourceName}/:id`, authenticateAdmin, (req, res) => {
    const updated = db.update(collectionKey, req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Item not found' });
    logAudit(`UPDATE_${resourceName.toUpperCase()}`, `Updated item in ${resourceName}: ${req.params.id}`, req.admin.email);
    res.json({ success: true, data: updated });
  });

  // DELETE
  app.delete(`/api/admin/${resourceName}/:id`, authenticateAdmin, (req, res) => {
    const deleted = db.delete(collectionKey, req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Item not found' });
    logAudit(`DELETE_${resourceName.toUpperCase()}`, `Deleted item in ${resourceName}: ${req.params.id}`, req.admin.email);
    res.json({ success: true, message: 'Deleted successfully' });
  });
};

createCrudEndpoints('projects', 'projects');
createCrudEndpoints('experiences', 'experiences');
createCrudEndpoints('education', 'education');
createCrudEndpoints('skills', 'skills');
createCrudEndpoints('achievements', 'achievements');
createCrudEndpoints('testimonials', 'testimonials');
createCrudEndpoints('blogs', 'blogs');
createCrudEndpoints('news', 'news');
createCrudEndpoints('events-gallery', 'events_gallery');
createCrudEndpoints('gallery-photos', 'gallery_photos');


// ═══════════════════════════════════════════════════════════════
// MEDIA MANAGEMENT API
// ═══════════════════════════════════════════════════════════════

app.get('/api/admin/media', authenticateAdmin, (req, res) => {
  res.json({ success: true, data: db.get('media') });
});

app.post('/api/admin/media/upload', authenticateAdmin, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  const mediaItem = {
    id: `media-${Date.now()}`,
    filename: req.file.filename,
    originalname: req.file.originalname,
    url: `/uploads/${req.file.filename}`,
    mimetype: req.file.mimetype,
    size: req.file.size,
    altText: req.body.altText || req.file.originalname,
    uploadedAt: new Date().toISOString()
  };

  db.insert('media', mediaItem);
  logAudit('MEDIA_UPLOAD', `Uploaded media file: ${req.file.originalname}`, req.admin.email);

  res.json({ success: true, data: mediaItem });
});

app.delete('/api/admin/media/:id', authenticateAdmin, (req, res) => {
  const item = db.find('media', m => m.id === req.params.id);
  if (item && item.filename) {
    const filePath = path.join(uploadsDir, item.filename);
    if (fs.existsSync(filePath)) {
      try { fs.unlinkSync(filePath); } catch (e) {}
    }
  }
  db.delete('media', req.params.id);
  logAudit('MEDIA_DELETE', `Deleted media asset: ${req.params.id}`, req.admin.email);
  res.json({ success: true, message: 'Media asset deleted' });
});


// ═══════════════════════════════════════════════════════════════
// CONTACT MESSAGES MANAGEMENT
// ═══════════════════════════════════════════════════════════════

app.get('/api/admin/messages', authenticateAdmin, (req, res) => {
  res.json({ success: true, data: db.get('contact_messages') });
});

app.put('/api/admin/messages/:id/status', authenticateAdmin, (req, res) => {
  const { status } = req.body;
  const updated = db.update('contact_messages', req.params.id, { status });
  logAudit('MESSAGE_STATUS', `Updated contact message status to ${status}`, req.admin.email);
  res.json({ success: true, data: updated });
});

app.delete('/api/admin/messages/:id', authenticateAdmin, (req, res) => {
  db.delete('contact_messages', req.params.id);
  logAudit('MESSAGE_DELETE', `Deleted contact message: ${req.params.id}`, req.admin.email);
  res.json({ success: true, message: 'Message deleted' });
});


// ═══════════════════════════════════════════════════════════════
// SITE SETTINGS & AUDIT LOGS
// ═══════════════════════════════════════════════════════════════

app.get('/api/admin/settings', authenticateAdmin, (req, res) => {
  res.json({ success: true, data: db.get('site_settings') });
});

app.put('/api/admin/settings', authenticateAdmin, (req, res) => {
  const updated = db.set('site_settings', req.body);
  logAudit('UPDATE_SETTINGS', 'Updated global portfolio site settings', req.admin.email);
  res.json({ success: true, data: updated });
});

app.get('/api/admin/audit-logs', authenticateAdmin, (req, res) => {
  res.json({ success: true, data: db.get('audit_logs') });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Portfolio CMS Server running on http://localhost:${PORT}`);
});