import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Initial Default State with Full Portfolio Seed Data
const defaultSeedData = {
  admin: [
    {
      id: 'admin-1',
      email: process.env.ADMIN_EMAIL || 'kenenisab05@gmail.com',
      // Default password hash for initial login if ADMIN_PASSWORD is set or default 'Admin@Kenenisa2025!'
      passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'Admin@Kenenisa2025!', 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ],
  sessions: [],
  site_settings: {
    siteTitle: 'Kenenisa Beyan — Full-Stack Software Engineer',
    metaDescription: 'Kenenisa Beyan is a Full-Stack Software Engineer building scalable, production-grade digital products and modern web platforms.',
    contactEmail: 'kenenisab05@gmail.com',
    githubUrl: 'https://github.com/kenenisabeyan',
    linkedinUrl: 'https://www.linkedin.com/in/kenenisa/',
    twitterUrl: 'https://twitter.com/kenenisa94931',
    googleSiteVerification: '',
    bingSiteVerification: '',
    analyticsEnabled: true,
  },
  section_visibility: {
    hero: true,
    overview: true,
    snapshot: true,
    approach: true,
    'what-i-bring': true,
    services: true,
    capabilities: true,
    'problems-i-solve': true,
    work: true,
    'engineering-challenges': true,
    experience: true,
    education: true,
    'how-i-work': true,
    'currently-building': true,
    achievements: true,
    'github-activity': true,
    testimonials: true,
    'career-direction': true,
    contact: true,
  },
  projects: [
    {
      id: 'proj-1',
      slug: 'edot',
      title: 'EDOT Platform',
      description: 'A modular, full-stack education ecosystem engineered to deliver scalable, structured learning experiences. Features robust RESTful APIs, role-based workflows, and end-to-end data management.',
      image: '/src/assets/edotpage.png',
      link: 'https://github.com/kenenisabeyan/edot',
      githubUrl: 'https://github.com/kenenisabeyan/edot',
      liveUrl: '',
      tech: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL'],
      featured: true,
      status: 'published',
      visibility: true,
      order: 1,
      caseStudy: {
        problem: 'Traditional learning environments can lack structured digital content, learner progress tracking, role-based management, and centralized course administration.',
        role: 'Founder & Full-Stack Engineer',
        engineeringWork: [
          'Multi-role authentication & authorization',
          'Student & Instructor workflows',
          'Course & content management',
          'Backend RESTful APIs',
          'PostgreSQL relational data architecture',
          'Progress tracking & certification workflow'
        ],
        challenge: 'Designing a scalable architecture capable of supporting multiple user roles while keeping course, enrollment, progress, and assessment data consistent.',
        engineeringFocus: ['Architecture', 'API Design', 'Database', 'Authentication', 'UX', 'Performance'],
        result: 'A structured full-stack platform designed to support scalable digital learning workflows.',
        tech: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL']
      },
      createdAt: new Date().toISOString()
    },
    {
      id: 'proj-2',
      slug: 'followflow',
      title: 'FollowFlow',
      description: 'A premium CRM and Task Tracking Dashboard designed to help professionals visualize, manage, and follow up with their client network. Features a fully responsive, theme-aware interface with elegant micro-animations for seamless workflow orchestration.',
      image: '/src/assets/followflow.png',
      link: 'https://github.com/kenenisabeyan/followflow',
      githubUrl: 'https://github.com/kenenisabeyan/followflow',
      liveUrl: '',
      tech: ['React 19', 'TypeScript', 'Python', 'Django', 'SQLite', 'Tailwind CSS', 'Framer Motion'],
      featured: true,
      status: 'published',
      visibility: true,
      order: 2,
      caseStudy: {
        problem: 'Professionals and small teams often struggle with fragmented client tracking, manual follow-ups, and overwhelming task lists.',
        role: 'Full-Stack Engineer',
        engineeringWork: [
          'Django REST Framework backend services',
          'Theme-aware responsive React 19 UI',
          'Interactive Kanban & task stage pipeline',
          'Client interaction logging & timeline',
          'Framer Motion micro-animations'
        ],
        challenge: 'Orchestrating state management across client stages, task statuses, and theme states while ensuring smooth UI performance.',
        engineeringFocus: ['UI Architecture', 'Django Backend', 'API Integration', 'State Management', 'Performance'],
        result: 'A responsive CRM workflow engine for client management.',
        tech: ['React 19', 'TypeScript', 'Python', 'Django', 'SQLite', 'Tailwind CSS', 'Framer Motion']
      },
      createdAt: new Date().toISOString()
    },
    {
      id: 'proj-3',
      slug: 'performance-evaluator',
      title: 'Performance Evaluator',
      description: 'A Full-Stack Employee Evaluation Dashboard streamlining organizational assessments. Features role-based access control, real-time performance summaries with chart visualizations, dynamic PDF reporting, and highly secure role-based portals.',
      image: '/src/assets/employee.png',
      link: 'https://github.com/kenenisabeyan/Performance-Evaluator',
      githubUrl: 'https://github.com/kenenisabeyan/Performance-Evaluator',
      liveUrl: '',
      tech: ['Next.js', 'React', 'MongoDB', 'Tailwind CSS', 'NextAuth'],
      featured: true,
      status: 'published',
      visibility: true,
      order: 3,
      caseStudy: {
        problem: 'Organizations need transparent, secure, and structured employee performance evaluation workflows with admin analytics and peer feedback.',
        role: 'Full-Stack Developer Intern',
        engineeringWork: [
          'Next.js App Router full-stack architecture',
          'NextAuth.js role-based access control (Admin & Employee)',
          'Self-assessments, peer reviews & admin evaluations',
          'Real-time evaluation data visualization with chart components',
          'Dynamic PDF evaluation report generation'
        ],
        challenge: 'Enforcing strict permission boundaries between admin operations, employee peer reviews, and self-evaluations.',
        engineeringFocus: ['Next.js', 'MongoDB Schema', 'Role Security', 'Data Visualization', 'PDF Generation'],
        result: 'An organizational evaluation system streamlining multi-tier performance reviews.',
        tech: ['Next.js', 'React', 'MongoDB', 'Tailwind CSS', 'NextAuth']
      },
      createdAt: new Date().toISOString()
    },
    {
      id: 'proj-4',
      slug: 'clientflow',
      title: 'ClientFlow',
      description: 'A comprehensive CRM platform for managing interactions with current and potential clients. Features an intuitive dashboard and robust analytics.',
      image: '/src/assets/client.png',
      link: 'https://github.com/kenenisabeyan/clientflow',
      githubUrl: 'https://github.com/kenenisabeyan/clientflow',
      liveUrl: '',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      featured: true,
      status: 'published',
      visibility: true,
      order: 4,
      caseStudy: {
        problem: 'Businesses require a centralized workspace to manage client pipelines, communication logs, and sales metrics.',
        role: 'Full-Stack Developer',
        engineeringWork: [
          'Node.js & Express RESTful API setup',
          'MongoDB client & analytics schema design',
          'Dashboard metrics visualization',
          'Responsive client data management table'
        ],
        challenge: 'Building fast backend querying and clear UI layout for filtering large client records.',
        engineeringFocus: ['REST APIs', 'MongoDB', 'Express Logic', 'UI Usability', 'Data Modeling'],
        result: 'A reliable client interaction & analytical dashboard.',
        tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS']
      },
      createdAt: new Date().toISOString()
    }
  ],
  experiences: [
    {
      id: 'exp-1',
      title: 'Full Stack Software Engineer',
      company: 'at Edotplatform.',
      period: 'October 2025 - Present',
      responsibilities: [
        'Architecting and developing scalable, production-ready web applications using MERN, PERN, and Django (Python) stacks.',
        'Designing modern, responsive user interfaces and robust backend systems, improving performance and system efficiency.',
        'Building and managing fullstack platforms, including EDOT, with multi-role dashboards and structured workflows.',
        'Delivering reliable solutions through clean code, clear communication, and consistent project execution.'
      ],
      visibility: true,
      order: 1
    },
    {
      id: 'exp-2',
      title: 'Full Stack Developer Intern',
      company: 'at Astu IT directorate',
      period: 'August 2025 - September 2025',
      responsibilities: [
        'Designed and implemented a full-stack Employee Performance Evaluation Dashboard using Next.js 15+ (App Router) and MongoDB, enabling structured evaluation workflows for organizations.',
        'Built secure authentication and role-based access control using NextAuth.js, supporting Admin and Employee dashboards with different permissions.',
        'Developed core evaluation features including self-assessments, peer reviews, and admin evaluations with real-time performance tracking.',
        'Implemented data visualization and performance analytics using chart-based UI components to improve transparency and decision-making.'
      ],
      visibility: true,
      order: 2
    },
    {
      id: 'exp-3',
      title: 'Frontend Developer',
      company: 'CSE student at ASTU',
      period: 'November 2024 - April 2025',
      responsibilities: [
        'Developed responsive and user-focused web interfaces using modern JavaScript and UI technologies, improving usability and engagement.',
        'Integrated frontend systems with backend APIs, ensuring smooth data flow and real-time interaction across applications.',
        'Collaborated on UI/UX implementation to deliver clean, consistent, and highly responsive user experiences.'
      ],
      visibility: true,
      order: 3
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Adama Science and Technology University (ASTU)',
      program: 'B.Sc. in Computer Science & Engineering',
      period: '2021 - Present',
      description: 'Solid academic foundation in algorithms, software engineering, databases, computer networking, and system architecture.',
      achievement: 'Active tech lead & project developer.',
      visibility: true,
      order: 1
    },
    {
      id: 'edu-2',
      institution: 'Adama Science and Technology University (ASTU)',
      program: 'B.A. in Management (Weekend Program)',
      period: '2022 - Present',
      description: 'Developing key business insights, strategic planning, project management, and organizational leadership skills to complement technical expertise.',
      achievement: 'Dual discipline qualification.',
      visibility: true,
      order: 2
    }
  ],
  skills: [
    { id: 'sk-1', category: 'Frontend', name: 'React', level: 'Advanced', visibility: true, order: 1 },
    { id: 'sk-2', category: 'Frontend', name: 'Next.js', level: 'Advanced', visibility: true, order: 2 },
    { id: 'sk-3', category: 'Frontend', name: 'TypeScript', level: 'Advanced', visibility: true, order: 3 },
    { id: 'sk-4', category: 'Frontend', name: 'Tailwind CSS', level: 'Advanced', visibility: true, order: 4 },
    { id: 'sk-5', category: 'Backend', name: 'Node.js', level: 'Advanced', visibility: true, order: 5 },
    { id: 'sk-6', category: 'Backend', name: 'Express', level: 'Advanced', visibility: true, order: 6 },
    { id: 'sk-7', category: 'Backend', name: 'Python & Django', level: 'Advanced', visibility: true, order: 7 },
    { id: 'sk-8', category: 'Database', name: 'PostgreSQL', level: 'Advanced', visibility: true, order: 8 },
    { id: 'sk-9', category: 'Database', name: 'MongoDB', level: 'Advanced', visibility: true, order: 9 }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Entrepreneurship & Startup Innovation Fellow',
      organization: 'Ministry of Innovation & Technology (MinT)',
      period: 'February 2025',
      description: 'Successfully completed the Early-Stage Startup Training Program in partnership with MinT, KOICA, and OSTA. Developed the EDOT Platform with a focus on transforming local creative ideas into scalable, product-ready services. Recognized for excellence in a competitive cohort of innovators aimed at driving national economic development and reducing technological reliance through local innovation.',
      visibility: true,
      order: 1
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      name: 'Ermias Alemayehu',
      handle: '@ermiasalemayehu',
      text: "I can't say enough good things about Kenenisa. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
      rating: 5,
      visibility: true,
      order: 1
    },
    {
      id: 'test-2',
      name: 'Yohannes Mandafro',
      handle: '@yohannesmandafro',
      text: "Collaborating with Kenenisa was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Kenenisa's enthusiasm for every facet of development truly stands out.",
      rating: 5,
      visibility: true,
      order: 2
    },
    {
      id: 'test-3',
      name: 'Medhin Banti',
      handle: '@medhinbanti',
      text: "Kenenisa's expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He's a true professional!",
      rating: 5,
      visibility: true,
      order: 3
    },
    {
      id: 'test-4',
      name: 'Firomsa Guteta',
      handle: '@firomsaguteta',
      text: 'Working with Kenenisa was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched.',
      rating: 5,
      visibility: true,
      order: 4
    },
    {
      id: 'test-5',
      name: 'Yohannes Belete',
      handle: '@yohannesbelete',
      text: "Kenenisa was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that's both modern and easy to navigate. Fantastic work overall.",
      rating: 5,
      visibility: true,
      order: 5
    },
    {
      id: 'test-6',
      name: 'Kidus Tilahun',
      handle: '@kidustilahun',
      text: 'Kenenisa was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations.',
      rating: 5,
      visibility: true,
      order: 6
    }
  ],
  blogs: [
    {
      id: 'blog-1',
      title: 'Architecting Scalable Full-Stack Systems with React, Node.js, and PostgreSQL',
      slug: 'architecting-scalable-full-stack-systems',
      excerpt: 'Key strategies for building reliable, production-grade web applications with clean architecture, robust APIs, and optimized database queries.',
      content: `# Architecting Scalable Full-Stack Systems\n\nBuilding scalable web applications requires thoughtful design at every tier—from responsive frontend components to efficient database schema design.\n\n## 1. Clean API Contracts\nClear RESTful and GraphQL endpoints ensure smooth communication between React UI and server microservices.\n\n## 2. Database Performance\nIndex key fields in PostgreSQL and MongoDB to keep query execution times under 50ms even under heavy load.`,
      coverImage: '/src/assets/edotpage.png',
      author: 'Kenenisa Beyan',
      status: 'published',
      visibility: true,
      publishedAt: new Date().toISOString(),
      views: 142
    }
  ],
  news: [
    {
      id: 'news-1',
      title: 'EDOT Platform Fellowship Award by MinT & KOICA',
      slug: 'edot-fellowship-award',
      summary: 'EDOT Platform recognized at the Ministry of Innovation & Technology startup initiative.',
      content: 'The EDOT platform was selected as an outstanding startup project in the Early-Stage Startup Training Program.',
      category: 'Recognition',
      date: 'February 2025',
      visibility: true,
      publishedAt: new Date().toISOString()
    }
  ],
  media: [],
  contact_messages: [],
  analytics_events: [],
  audit_logs: [
    {
      id: 'log-1',
      action: 'SYSTEM_BOOTSTRAP',
      detail: 'Initial CMS database structure initialized and seeded successfully.',
      adminEmail: 'system',
      timestamp: new Date().toISOString()
    }
  ]
};

// JSON Database Operations Helper
export class Database {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(DB_FILE)) {
      this.write(defaultSeedData);
    } else {
      // Merge missing fields if new keys added
      const current = this.read();
      let updated = false;
      for (const key of Object.keys(defaultSeedData)) {
        if (!(key in current)) {
          current[key] = defaultSeedData[key];
          updated = true;
        }
      }
      if (updated) this.write(current);
    }
  }

  read() {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(content);
    } catch (err) {
      console.error('Error reading DB_FILE:', err);
      return defaultSeedData;
    }
  }

  write(data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
      console.error('Error writing DB_FILE:', err);
    }
  }

  get(collectionName) {
    const data = this.read();
    return data[collectionName] || [];
  }

  set(collectionName, value) {
    const data = this.read();
    data[collectionName] = value;
    this.write(data);
    return value;
  }

  find(collectionName, predicate) {
    const list = this.get(collectionName);
    return list.find(predicate);
  }

  filter(collectionName, predicate) {
    const list = this.get(collectionName);
    return list.filter(predicate);
  }

  insert(collectionName, item) {
    const data = this.read();
    if (!data[collectionName]) data[collectionName] = [];
    
    if (!item.id) {
      item.id = `${collectionName.slice(0, 4)}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    }
    if (!item.createdAt) {
      item.createdAt = new Date().toISOString();
    }
    item.updatedAt = new Date().toISOString();

    data[collectionName].unshift(item);
    this.write(data);
    return item;
  }

  update(collectionName, id, updates) {
    const data = this.read();
    const list = data[collectionName] || [];
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    data[collectionName] = list;
    this.write(data);
    return list[index];
  }

  delete(collectionName, id) {
    const data = this.read();
    const list = data[collectionName] || [];
    const filtered = list.filter(item => item.id !== id);
    if (filtered.length === list.length) return false;
    data[collectionName] = filtered;
    this.write(data);
    return true;
  }
}

export const db = new Database();
