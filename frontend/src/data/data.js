import edotImage from '../assets/edotpage.png';
import clientImage from '../assets/client.png';
import employeeImage from '../assets/employee.png';
import followflowImage from '../assets/followflow.png';

export const stats = [
  { label: "Years of Experience", value: "15+" },
  { label: "Satisfied Clients", value: "200+" },
  { label: "Completed Projects", value: "108+" },
  { label: "Client Retention Rate", value: "90%" },
];

export const experiences = [
  {
    title: 'Full Stack Software Engineer',
    company: 'at Edotplatform.',
    period: 'October 2025 - Present',
    responsibilities: [
      'Architecting and developing scalable, production-ready web applications using MERN, PERN, and Django (Python) stacks.',
      'Designing modern, responsive user interfaces and robust backend systems, improving performance and system efficiency.',
      'Building and managing fullstack platforms, including EDOT, with multi-role dashboards and structured workflows.',
      'Delivering reliable solutions through clean code, clear communication, and consistent project execution.',
    ],
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'at Astu IT directorate',
    period: 'August 2025 - September 2025',
    responsibilities: [
      'Designed and implemented a full-stack Employee Performance Evaluation Dashboard using Next.js 15+ (App Router) and MongoDB, enabling structured evaluation workflows for organizations.',
      'Built secure authentication and role-based access control using NextAuth.js, supporting Admin and Employee dashboards with different permissions.',
      'Developed core evaluation features including self-assessments, peer reviews, and admin evaluations with real-time performance tracking.',
      'Implemented data visualization and performance analytics using chart-based UI components to improve transparency and decision-making.',
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'CSE student at ASTU',
    period: 'November 2024 - April 2025',
    responsibilities: [
      'Developed responsive and user-focused web interfaces using modern JavaScript and UI technologies, improving usability and engagement.',
      'Integrated frontend systems with backend APIs, ensuring smooth data flow and real-time interaction across applications.',
      'Collaborated on UI/UX implementation to deliver clean, consistent, and highly responsive user experiences.',
    ],
  },
];

export const skills = [
  "Frontend Architecture (React, Next.js, Tailwind)",
  "Backend Systems (Node.js, Express, Django)",
  "Data Engine (PostgreSQL, MongoDB, Prisma)",
  "AI Integration (LLM APIs, Automation)",
  "Interactive UX (Motion, State-Driven)",
  "Version & CI/CD (Git, Vercel, Deployment)",
];

export const testimonials = [
  {
    name: 'Ermias Alemayehu',
    handle: '@ermiasalemayehu',
    text: "I can't say enough good things about Kenenisa. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    rating: 5,
  },
  {
    name: 'Yohannes Mandafro',
    handle: '@yohannesmandafro',
    text: "Collaborating with Kenenisa was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Kenenisa's enthusiasm for every facet of development truly stands out.",
    rating: 5,
  },
  {
    name: 'Medhin Banti',
    handle: '@medhinbanti',
    text: "Kenenisa's expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He's a true professional!",
    rating: 5,
  },
  {
    name: 'Firomsa Guteta',
    handle: '@firomsaguteta',
    text: 'Working with Kenenisa was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched.',
    rating: 5,
  },
  {
    name: 'Yohannes Belete',
    handle: '@yohannesbelete',
    text: "Kenenisa was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that's both modern and easy to navigate. Fantastic work overall.",
    rating: 5,
  },
  {
    name: 'Kidus Tilahun',
    handle: '@kidustilahun',
    text: 'Kenenisa was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations.',
    rating: 5,
  },
];

export const projects = [
  {
    title: "EDOT Platform",
    description: "A modular, full-stack education ecosystem engineered to deliver scalable, structured learning experiences. Features robust RESTful APIs, role-based workflows, and end-to-end data management.",
    tech: ["React", "Tailwind CSS", "Node.js", "Express", "PostgreSQL"],
    image: edotImage,
    link: "https://github.com/kenenisabeyan/edot",
    caseStudy: {
      problem: "Traditional learning environments can lack structured digital content, learner progress tracking, role-based management, and centralized course administration.",
      role: "Founder & Full-Stack Engineer",
      engineeringWork: [
        "Multi-role authentication & authorization",
        "Student & Instructor workflows",
        "Course & content management",
        "Backend RESTful APIs",
        "PostgreSQL relational data architecture",
        "Progress tracking & certification workflow"
      ],
      challenge: "Designing a scalable architecture capable of supporting multiple user roles while keeping course, enrollment, progress, and assessment data consistent.",
      engineeringFocus: ["Architecture", "API Design", "Database", "Authentication", "UX", "Performance"],
      result: "A structured full-stack platform designed to support scalable digital learning workflows.",
      tech: ["React", "Tailwind CSS", "Node.js", "Express", "PostgreSQL"]
    }
  },
  {
    title: "FollowFlow",
    description: "A premium CRM and Task Tracking Dashboard designed to help professionals visualize, manage, and follow up with their client network. Features a fully responsive, theme-aware interface with elegant micro-animations for seamless workflow orchestration.",
    tech: ["React 19", "TypeScript", "Python", "Django", "SQLite", "Tailwind CSS", "Framer Motion"],
    image: followflowImage,
    link: "https://github.com/kenenisabeyan/followflow",
    caseStudy: {
      problem: "Professionals and small teams often struggle with fragmented client tracking, manual follow-ups, and overwhelming task lists.",
      role: "Full-Stack Engineer",
      engineeringWork: [
        "Django REST Framework backend services",
        "Theme-aware responsive React 19 UI",
        "Interactive Kanban & task stage pipeline",
        "Client interaction logging & timeline",
        "Framer Motion micro-animations"
      ],
      challenge: "Orchestrating state management across client stages, task statuses, and theme states while ensuring smooth UI performance.",
      engineeringFocus: ["UI Architecture", "Django Backend", "API Integration", "State Management", "Performance"],
      result: "A responsive CRM workflow engine for client management.",
      tech: ["React 19", "TypeScript", "Python", "Django", "SQLite", "Tailwind CSS", "Framer Motion"]
    }
  },
  {
    title: "Performance Evaluator",
    description: "A Full-Stack Employee Evaluation Dashboard streamlining organizational assessments. Features role-based access control, real-time performance summaries with chart visualizations, dynamic PDF reporting, and highly secure role-based portals.",
    tech: ["Next.js", "React", "MongoDB", "Tailwind CSS", "NextAuth"],
    image: employeeImage,
    link: "https://github.com/kenenisabeyan/Performance-Evaluator",
    caseStudy: {
      problem: "Organizations need transparent, secure, and structured employee performance evaluation workflows with admin analytics and peer feedback.",
      role: "Full-Stack Developer Intern",
      engineeringWork: [
        "Next.js App Router full-stack architecture",
        "NextAuth.js role-based access control (Admin & Employee)",
        "Self-assessments, peer reviews & admin evaluations",
        "Real-time evaluation data visualization with chart components",
        "Dynamic PDF evaluation report generation"
      ],
      challenge: "Enforcing strict permission boundaries between admin operations, employee peer reviews, and self-evaluations.",
      engineeringFocus: ["Next.js", "MongoDB Schema", "Role Security", "Data Visualization", "PDF Generation"],
      result: "An organizational evaluation system streamlining multi-tier performance reviews.",
      tech: ["Next.js", "React", "MongoDB", "Tailwind CSS", "NextAuth"]
    }
  },
  {
    title: "ClientFlow",
    description: "A comprehensive CRM platform for managing interactions with current and potential clients. Features an intuitive dashboard and robust analytics.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: clientImage,
    link: "https://github.com/kenenisabeyan/clientflow",
    caseStudy: {
      problem: "Businesses require a centralized workspace to manage client pipelines, communication logs, and sales metrics.",
      role: "Full-Stack Developer",
      engineeringWork: [
        "Node.js & Express RESTful API setup",
        "MongoDB client & analytics schema design",
        "Dashboard metrics visualization",
        "Responsive client data management table"
      ],
      challenge: "Building fast backend querying and clear UI layout for filtering large client records.",
      engineeringFocus: ["REST APIs", "MongoDB", "Express Logic", "UI Usability", "Data Modeling"],
      result: "A reliable client interaction & analytical dashboard.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"]
    }
  },

];

export const clientLogos = [
  { name: "Adobe", logo: "https://via.placeholder.com/120x60?text=Adobe" },
  { name: "Appwrite", logo: "https://via.placeholder.com/120x60?text=Appwrite" },
  { name: "NVIDIA", logo: "https://via.placeholder.com/120x60?text=NVIDIA" },
  { name: "Vercel", logo: "https://via.placeholder.com/120x60?text=Vercel" },
  { name: "Linear", logo: "https://via.placeholder.com/120x60?text=Linear" },
  { name: "Loom", logo: "https://via.placeholder.com/120x60?text=Loom" },
  { name: "Shopify", logo: "https://via.placeholder.com/120x60?text=Shopify" },
];