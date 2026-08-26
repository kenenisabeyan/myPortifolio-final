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
    'events-gallery': true,
    'gallery-section': true,
    contact: true,
  },
  section_content: {
    hero: {
      badge: 'FULL-STACK SOFTWARE ENGINEER',
      titleLine1: 'Engineering Scalable',
      titleLine2: 'Digital Products',
      subtitle: 'CSE Student at ASTU & Full-Stack Engineer building high-performance web platforms, role-based dashboards, and RESTful API systems.',
      ctaPrimaryText: 'Explore Deployments',
      ctaSecondaryText: 'Get In Touch',
    },
    overview: {
      heading: 'Engineering Systems with Purpose & Precision.',
      subheading: 'I bridge user experience with resilient backend architecture, delivering software that scales cleanly.',
      paragraph1: 'I am a Full-Stack Software Engineer and Computer Science & Engineering student at ASTU. My development philosophy revolves around clean architecture, end-to-end data integrity, and high-performance user interfaces.',
      paragraph2: 'From designing relational database schemas in PostgreSQL and MongoDB to crafting responsive frontends in React and Next.js, I take full ownership of the digital product lifecycle.',
    },
    snapshot: {
      role: 'Full-Stack Software Engineer',
      education: 'CSE Student at ASTU & Management Student at Arsi University',
      leadership: 'Founder of EDOT Platform & MinT Startup Innovation Fellow',
      coreStacks: 'PERN, MERN & Django (Python)',
      architecture: 'Multi-Role Systems, RBAC, REST APIs & Schema Design',
      focus: 'Data-Driven Dashboards & Production-Grade Web Applications',
    },
    approach: {
      heading: 'Engineering Approach',
      steps: [
        { step: '01', title: 'Understand the Problem', desc: 'I start by understanding the users, business requirements, workflows, constraints, and expected outcomes before writing code.' },
        { step: '02', title: 'Design the System', desc: 'I translate requirements into scalable application architecture, database structures, APIs, authentication flows, and maintainable frontend systems.' },
        { step: '03', title: 'Build for Production', desc: 'I focus on clean architecture, reusable components, security, performance, accessibility, error handling, and reliable data flows.' },
        { step: '04', title: 'Test & Refine', desc: 'I validate functionality, identify edge cases, improve performance, and continuously refine the product based on real requirements.' },
        { step: '05', title: 'Deploy & Maintain', desc: 'I take applications beyond development by handling deployment, environment configuration, version control, and ongoing improvements.' },
      ]
    },
    'what-i-bring': {
      heading: 'What I Bring to Your Team',
      items: [
        { title: 'Product Thinking', desc: "I don't treat development as simply writing code. I think about users, workflows, business requirements, scalability, and long-term maintainability." },
        { title: 'Full-Stack Ownership', desc: 'I can work across the frontend, backend, database, authentication, APIs, and deployment layers of a product.' },
        { title: 'Real Project Experience', desc: 'I have worked on real platforms involving multi-role systems, dashboards, authentication, structured workflows, APIs, databases, and production-oriented development.' },
        { title: 'Fast Learning & Adaptability', desc: 'I continuously learn new technologies and adapt to existing codebases, development standards, and team workflows.' },
        { title: 'Team Collaboration', desc: 'I value code reviews, clear communication, documentation, Git workflows, and learning from experienced engineers.' },
        { title: 'Ownership', desc: 'When I take responsibility for a feature or system, I focus on understanding the requirement, implementing it properly, testing it, and delivering a reliable result.' }
      ]
    },
    'problems-i-solve': {
      heading: 'Problems I Solve',
      items: [
        { title: 'Fragmented & Manual Workflows', desc: 'Transforming paper-based or scattered processes into unified digital platforms with role-based permissions and real-time dashboards.' },
        { title: 'Complex Data & Access Controls', desc: 'Architecting secure multi-role access control (RBAC), authentication flows, and protected API endpoints.' },
        { title: 'Legacy & Outdated Websites', desc: 'Modernizing outdated interfaces while improving usability, responsiveness, performance, and maintainability.' },
        { title: 'Education Technology', desc: 'Building digital learning systems that improve how educational content, learners, instructors, and progress are managed.' }
      ]
    },
    'how-i-work': {
      heading: 'How I Work Workflow',
      phases: [
        { phase: '01', title: 'Understand Requirements', desc: 'I clarify requirements and understand the actual problem before implementation.' },
        { phase: '02', title: 'Break Down Complexity', desc: 'I divide large requirements into manageable features and technical tasks.' },
        { phase: '03', title: 'Communicate Clearly', desc: 'I communicate progress, blockers, assumptions, and technical decisions early.' },
        { phase: '04', title: 'Build Collaboratively', desc: 'I use Git workflows, code reviews, reusable architecture, and team conventions.' },
        { phase: '05', title: 'Review & Improve', desc: 'I use feedback, testing, and iteration to continuously improve the quality of the product.' }
      ]
    },
    'currently-building': {
      heading: 'Currently Building & Learning',
      building: [
        { title: 'EDOT', desc: 'Modular education technology platform for digital learning workflows.' },
        { title: 'Production Applications', desc: 'Full-stack web applications with authentication, RBAC, and analytics.' },
        { title: 'Business Platforms', desc: 'Real-world evaluation dashboards & CRM task tracking systems.' }
      ],
      learning: [
        'Advanced Cloud Infrastructure (AWS / Docker)',
        'System Architecture & Microservices Patterns',
        'AI & LLM Integration for Automation',
        'Performance Optimization & Caching (Redis)'
      ]
    },
    'career-direction': {
      heading: 'Where I\'m Going',
      quote: 'I\'m building toward becoming a highly capable Software Engineer who can contribute across product development — from understanding business requirements and designing systems to implementing, deploying, and continuously improving production software.',
      openToRoles: [
        'Full-Stack Engineering',
        'Software Engineering',
        'Backend Engineering',
        'Product Development',
        'Startup Collaboration'
      ]
    },
    services: {
      heading: 'Technical Skills & Services',
      items: [
        { title: 'Frontend Architecture', desc: 'React, Next.js, Tailwind CSS' },
        { title: 'Backend Systems', desc: 'Node.js, Express, Django' },
        { title: 'Data Engine', desc: 'PostgreSQL, MongoDB, Prisma' },
        { title: 'AI Integration', desc: 'LLM APIs, Automation' },
        { title: 'Interactive UX', desc: 'Motion, State-Driven UI' },
        { title: 'Version & CI/CD', desc: 'Git, Vercel, Deployment' }
      ]
    },
    capabilities: {
      heading: 'Engineering Capabilities',
      categories: [
        { category: 'Frontend Engineering', items: ['React', 'Next.js', 'TypeScript', 'Responsive Architecture', 'Component Architecture', 'State Management'] },
        { category: 'Backend Engineering', items: ['Node.js', 'Express', 'Django', 'REST APIs', 'Business Logic', 'API Integration'] },
        { category: 'Database Engineering', items: ['PostgreSQL', 'MongoDB', 'Prisma', 'Database Schema Design', 'Relationships', 'Data Modeling'] },
        { category: 'Authentication & Authorization', items: ['Authentication', 'Authorization', 'Role-Based Access Control', 'NextAuth', 'Secure Application Workflows'] },
        { category: 'System Architecture', items: ['Modular Architecture', 'API Design', 'Multi-Role Systems', 'Scalable Application Structure', 'Separation of Concerns'] },
        { category: 'DevOps & Deployment', items: ['Git', 'GitHub', 'Docker', 'CI/CD', 'Deployment', 'Environment Configuration'] }
      ]
    },
    'engineering-challenges': {
      heading: 'Engineering Challenges I\'ve Solved',
      challenges: [
        { title: 'Multi-Role Access & Permissions', desc: 'Architected granular role-based permissions (RBAC) ensuring data isolation between students, instructors, and admins.' },
        { title: 'Real-time Analytics & Tracking', desc: 'Implemented event-driven analytics pipelines for real-time traffic monitoring and activity logging.' },
        { title: 'Responsive Product Interfaces', desc: 'Built interfaces that remain usable across desktop, tablet, and mobile environments.' },
        { title: 'Production-Oriented Architecture', desc: 'Focused on modular, maintainable systems rather than one-off pages or template-based products.' }
      ]
    },
    'github-activity': {
      heading: 'Engineering Activity',
      subheading: 'Explore my repositories, code structure, and development commits on GitHub.',
      repos: [
        { name: 'edot', desc: 'Modular full-stack education ecosystem engineered for scalable digital learning experiences.', tech: 'React, Node.js, Express, PostgreSQL', link: 'https://github.com/kenenisabeyan/edot' },
        { name: 'followflow', desc: 'Premium CRM and task tracking dashboard with Django REST backend and React 19 UI.', tech: 'React 19, TypeScript, Django, SQLite', link: 'https://github.com/kenenisabeyan/followflow' },
        { name: 'Performance-Evaluator', desc: 'Full-stack employee evaluation dashboard built with Next.js 15+ App Router, MongoDB and NextAuth.', tech: 'Next.js, MongoDB, NextAuth, Tailwind', link: 'https://github.com/kenenisabeyan/Performance-Evaluator' }
      ]
    },
    contact: {
      heading: 'Let\'s Connect & Build.',
      subtitle: 'Open for engineering roles, technical consultations, and startup development opportunities.',
      locationText: 'Adama / Addis Ababa, Ethiopia',
      emailText: 'kenenisab05@gmail.com',
      availabilityText: 'Available for Remote & On-site Engineering Roles'
    },
    '3d-planets': {
      ring1: [
        { name: 'Next.js', color: '#ffffff' },
        { name: 'React', color: '#61DAFB' },
        { name: 'Node.js', color: '#339933' },
        { name: 'Express', color: '#ffffff' },
        { name: 'JavaScript', color: '#F7DF1E' },
        { name: 'TypeScript', color: '#3178C6' }
      ],
      ring2: [
        { name: 'Python', color: '#3776AB' },
        { name: 'Django', color: '#44B78B' },
        { name: 'HTML', color: '#E34F26' },
        { name: 'CSS', color: '#1572B6' },
        { name: 'Tailwind CSS', color: '#38B2AC' },
        { name: 'Bootstrap', color: '#7952B3' },
        { name: 'Three.js', color: '#ffffff' },
        { name: 'C++', color: '#00599C' }
      ],
      ring3: [
        { name: 'MongoDB', color: '#47A248' },
        { name: 'PostgreSQL', color: '#4169E1' },
        { name: 'MySQL', color: '#4479A1' },
        { name: 'Git', color: '#F05032' },
        { name: 'GitHub', color: '#ffffff' },
        { name: 'Java', color: '#f89820' },
        { name: 'Algorithms', color: '#44B78B' },
        { name: 'Data Structures', color: '#F05032' }
      ]
    }
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
  events_gallery: [
    {
      id: 'event-1',
      title: 'MinT & KOICA Early-Stage Startup Innovation Recognition',
      campaignName: 'Ministry of Innovation & Technology (MinT) & KOICA Campaign',
      eventDate: 'February 2025',
      description: 'Invited and officially recognized as a Fellow for the EDOT Platform during the National Startup Incubation Program.',
      photoUrl: '/src/assets/home-page.png',
      recognitionBadge: 'Startup Innovation Fellow',
      visibility: true,
      order: 1
    },
    {
      id: 'event-2',
      title: 'ASTU Annual Software & Engineering Technology Showcase',
      campaignName: 'ASTU Computer Science & Engineering Department',
      eventDate: 'December 2024',
      description: 'Invited to demonstrate full-stack software architectures, multi-role RBAC systems, and custom database optimization techniques.',
      photoUrl: '/src/assets/edotpage.png',
      recognitionBadge: 'Top Project Exhibitor',
      visibility: true,
      order: 2
    }
  ],
  gallery_photos: [
    {
      id: 'photo-1',
      title: 'MinT Startup Incubation Program',
      category: 'Events',
      photoUrl: '/src/assets/home-page.png',
      caption: 'Recognized at the Ministry of Innovation & Technology startup initiative.',
      date: 'February 2025',
      visibility: true,
      order: 1
    },
    {
      id: 'photo-2',
      title: 'EDOT Educational Platform Demo',
      category: 'Projects',
      photoUrl: '/src/assets/edotpage.png',
      caption: 'Demonstrating modular digital learning platform architecture.',
      date: 'January 2025',
      visibility: true,
      order: 2
    },
    {
      id: 'photo-3',
      title: 'ASTU Computer Science Technical Showcase',
      category: 'Events',
      photoUrl: '/src/assets/edodphoto.png',
      caption: 'Presenting full-stack web architectures and database indexing.',
      date: 'December 2024',
      visibility: true,
      order: 3
    },
    {
      id: 'photo-4',
      title: 'FollowFlow CRM System Interface',
      category: 'Projects',
      photoUrl: '/src/assets/followflow.png',
      caption: 'Django REST & React 19 task tracking dashboard.',
      date: 'November 2024',
      visibility: true,
      order: 4
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
