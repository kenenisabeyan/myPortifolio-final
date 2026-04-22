import { projects } from '../data/data';

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative bg-gray-50 dark:bg-transparent transition-colors duration-500">
      {/* Background gradient accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-200/50 via-transparent to-transparent dark:from-blue-900/10 dark:via-transparent dark:to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-6 transform transition-transform hover:scale-105">
            <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase shadow-cyan-500/50">
              My Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-500 text-center tracking-tight mb-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            Featured Projects
          </h2>
          <p className="text-gray-400 max-w-2xl text-center text-lg leading-relaxed mix-blend-lighten">
            A selection of my best work, showcasing full-stack capabilities, intuitive user interfaces, and scalable architectures.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group relative bg-white/80 dark:bg-[#0a0f1e]/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 hover:border-cyan-500/40 transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transform hover:-translate-y-2 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-100 dark:from-[#0a0f1e] to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                
                {/* Decorative overlay corner */}
                <div className="absolute top-0 right-0 p-4 z-20 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-12 bg-cyan-500/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="w-5 h-5 text-cyan-300 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex-1 flex flex-col relative z-20 -mt-6 bg-gradient-to-b from-transparent to-white dark:to-[#0a0f1e]">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
                
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-blue-900/30 border border-blue-500/20 text-cyan-300 text-xs font-medium rounded-full shadow-[inset_0_0_10px_rgba(59,130,246,0.1)] group-hover:border-cyan-500/40 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="mt-auto pt-4 border-t border-white/5 group-hover:border-cyan-500/20 transition-colors duration-300">
                  <a
                    href={project.link}
                    className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm uppercase tracking-wider transition-all duration-300"
                  >
                    <span>View Project</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;