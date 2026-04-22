import React, { useEffect, useRef } from 'react'

const experiences = [
  {
    title: 'Full Stack Software Engineer',
    company: '',
    period: 'October 2025 - Present',
    responsibilities: [
      'Architecting and developing scalable, production-ready web applications using MERN, PERN, and Django (Python) stacks.',
      'Designing modern, responsive user interfaces and robust backend systems, improving performance and system efficiency.',
      'Building and managing fullstack platforms, including EDOT, with multi-role dashboards and structured workflows.',
      'Delivering reliable solutions through clean code, clear communication, and consistent project execution.',
    ],
    iconColor: 'bg-cyan-500',
    icon: (
      <span className="text-white font-bold text-lg">e</span>
    ),
    testimonial: {
      text: 'Through my journey, I designed modern, responsive user interfaces and developed strong backend logic, improving performance and overall system usability. One of my key projects is the EDOT Platform, where I built a complete system with multi-role dashboards for students, instructors, and administrators, along with structured workflows and interactive features. This experience has strengthened my ability to design real-world applications, solve practical problems, and continuously improve through hands-on development.',
      companyName: "at Edotplatform.",
    }
  },
  {
    title: 'Full Stack Developer Intern',
    company: '',
    period: 'August 2025 - September 2025',
    responsibilities: [
      'Designed and implemented a full-stack Employee Performance Evaluation Dashboard using Next.js 15+ (App Router) and MongoDB, enabling structured evaluation workflows for organizations.',
      'Built secure authentication and role-based access control using NextAuth.js, supporting Admin and Employee dashboards with different permissions.',
      'Developed core evaluation features including self-assessments, peer reviews, and admin evaluations with real-time performance tracking.',
      'Implemented data visualization and performance analytics using chart-based UI components to improve transparency and decision-making.',
    ],
    iconColor: 'bg-indigo-500',
    icon: (
      <span className="text-white font-bold text-lg">a</span>
    ),
    testimonial: {
      text: 'Through this project, I designed and built a full-stack Employee Performance Evaluation Dashboard using Next.js (App Router) and MongoDB, enabling structured workflows for organizational evaluations. I implemented secure authentication and role-based access using NextAuth.js, creating separate Admin and Employee dashboards with different permissions. I also developed key features such as self-assessments, peer reviews, and admin evaluations with real-time performance tracking, along with chart-based analytics to improve data visualization and decision-making. This experience strengthened my ability to build secure, data-driven applications and handle real-world system requirements.',
      companyName: " at Astu IT directorate",
    }
  },
  {
    title: 'Frontend Developer',
    company: '',
    period: 'November 2024 - April 2025',
    responsibilities: [
      'Developed responsive and user-focused web interfaces using modern JavaScript and UI technologies, improving usability and engagement.',
      'Integrated frontend systems with backend APIs, ensuring smooth data flow and real-time interaction across applications.',
      'Collaborated on UI/UX implementation to deliver clean, consistent, and highly responsive user experiences.',
    ],
    iconColor: 'bg-blue-500',
    icon: (
      <span className="text-white font-bold text-lg"></span>
    ),
    testimonial: {
      text: 'Started my full-stack journey by focusing on frontend development as a CSE student at ASTU. Built responsive UI interfaces, integrated backend APIs, and learned real-world web application structure. This phase shaped my decision to pursue full-stack development.',
      companyName: "CSE student at ASTU",
    }
  },
]

const StarRating = () => (
  <div className="flex gap-1 mb-6">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

const RevealOnScroll = ({ children }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="transition-all duration-1000 transform opacity-0 translate-y-12 ease-out w-full">
      {children}
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-16 md:py-24 px-6 relative z-10 bg-gray-50 dark:bg-transparent">
      
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          {/* <div className="flex items-center gap-3 bg-white dark:bg-blue-900/20 border border-gray-200 dark:border-blue-500/30 py-2.5 px-6 rounded-full mb-6 max-w-max shadow-sm dark:shadow-[0_0_20px_rgba(59,130,246,0.15)] dark:backdrop-blur-md">
            <span className="text-gray-500 dark:text-cyan-400 animate-pulse"></span>
            <span className="text-sm text-gray-500 font-semibold tracking-widest uppercase dark:text-cyan-50"></span>
          </div> */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-6">
            My Journey as a <span className="text-cyan-400">Full-Stack Software Engineer</span>
          </h2>
        </div>

        <div className="relative w-full max-w-6xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-[4px] rounded-full z-[0] bg-gray-200 dark:bg-[#030610]/80 dark:border dark:border-white/[0.05] shadow-sm"></div>

          <div className="flex flex-col gap-16 md:gap-32">
            {experiences.map((exp, idx) => (
              <RevealOnScroll key={idx}>
                <div className="relative flex flex-col md:flex-row items-center md:items-start w-full z-10">
                  
                  {/* Left Side: Detail & Testimonial Container */}
                  <div className="hidden md:flex w-1/2 justify-end pr-16 mt-4">
                    <div className="bg-[#050A14]/80 p-8 rounded-3xl border border-white/[0.05] w-full max-w-[420px] shadow-2xl transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300 relative group overflow-hidden backdrop-blur-xl">
                      
                      {/* Dark mode internal glow behind text */}
                      <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10 w-full flex flex-col">
                        <p className="text-gray-300 text-[15px] leading-relaxed mb-6 font-normal">
                          {exp.testimonial.text}
                        </p>
                        <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                          <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                            {exp.testimonial.companyName.trim().charAt(0).toUpperCase()}
                          </div>
                          <span className="text-white font-semibold text-sm tracking-wide">{exp.testimonial.companyName}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Node Icon */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-[20] top-8 md:top-1/2 md:-translate-y-1/2">
                    <div className={`w-6 h-6 rounded-full ${exp.iconColor} border-4 border-white dark:border-[#050A14]`} style={{ boxShadow: '0 0 15px rgba(34,211,238,0.3)' }}></div>
                  </div>

                  {/* Right Side: Role Overview */}
                  <div className="w-full md:w-1/2 flex justify-start pl-20 md:pl-16 mt-6 md:mt-8">
                    <div className="w-full max-w-[420px] relative z-10">
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-2 [text-shadow:0_2px_10px_rgba(0,0,0,1)]">{exp.title}</h3>
                      
                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-sm font-medium text-gray-400 [text-shadow:0_2px_5px_rgba(0,0,0,0.8)]">{exp.company} {exp.company && '•'} {exp.period}</span>
                      </div>
                      
                      <p className="text-xs font-semibold tracking-widest uppercase text-cyan-500 mb-4 pb-2 border-b border-white/10 [text-shadow:0_2px_5px_rgba(0,0,0,0.8)]">Technical Execution</p>
                      <ul className="space-y-4">
                        {exp.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start text-sm md:text-base text-gray-300 font-normal leading-relaxed group">
                            <span className="mr-3 mt-2 w-1.5 h-1.5 bg-cyan-500/50 rounded-full flex-shrink-0 group-hover:bg-cyan-400 transition-colors duration-300 shadow-[0_0_5px_rgba(0,0,0,0.8)]"></span>
                            <span className="[text-shadow:0_2px_8px_rgba(0,0,0,1)]">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Mobile Testimonial Add-on */}
                      <div className="md:hidden mt-8 bg-[#050A14]/80 p-6 rounded-2xl border border-white/[0.05] w-full shadow-lg relative backdrop-blur-xl transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                        <p className="text-gray-300 text-sm leading-relaxed mb-6 font-normal">
                          {exp.testimonial.text}
                        </p>
                        <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                          <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs shadow-[0_0_5px_rgba(0,0,0,0.8)]">
                            {exp.testimonial.companyName.trim().charAt(0).toUpperCase()}
                          </div>
                          <span className="text-white font-semibold text-xs tracking-wide">{exp.testimonial.companyName}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </RevealOnScroll>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Experience