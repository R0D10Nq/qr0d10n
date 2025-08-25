/**
 * Секция избранных проектов с детальной информацией.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../../data/portfolioData';

const ProjectsSection: React.FC = () => {
  // Показываем только избранные проекты
  const featuredProjects = projects.filter(project => project.is_featured);

  return (
    <section id="projects" className="section relative overflow-hidden bg-[var(--cyber-dark)]">
      {/* Cyberpunk IT Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Circuit Board Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none">
            {/* Horizontal Lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.line
                key={`h-${i}`}
                x1="0"
                y1={i * 50}
                x2="1000"
                y2={i * 50}
                stroke="var(--neon-cyan)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
              />
            ))}
            {/* Vertical Lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.line
                key={`v-${i}`}
                x1={i * 50}
                y1="0"
                x2={i * 50}
                y2="1000"
                stroke="var(--neon-orange)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.15, repeat: Infinity, repeatType: "reverse" }}
              />
            ))}
            {/* Circuit Nodes */}
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.circle
                key={`node-${i}`}
                cx={Math.random() * 1000}
                cy={Math.random() * 1000}
                r="3"
                fill="var(--neon-magenta)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 3, delay: Math.random() * 2, repeat: Infinity }}
              />
            ))}
          </svg>
        </div>

        {/* Floating Code Snippets */}
        <div className="absolute inset-0">
          {[
            'const projects = [];',
            'function deploy() {}',
            'git push origin main',
            'npm run build',
            'docker compose up',
            'SELECT * FROM users',
            'async/await',
            'React.useState()',
            'FastAPI',
            'PostgreSQL'
          ].map((code, i) => (
            <motion.div
              key={`code-${i}`}
              className="absolute text-[var(--neon-green)] terminal-font text-xs opacity-20"
              style={{
                left: `${Math.random() * 80}%`,
                top: `${Math.random() * 80}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {code}
            </motion.div>
          ))}
        </div>

        {/* Data Flow Animation */}
        <div className="absolute inset-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`flow-${i}`}
              className="absolute w-2 h-2 bg-[var(--neon-cyan)] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 100, -100, 0],
                y: [0, -50, 50, 0],
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Holographic Grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)]/5 via-transparent to-[var(--neon-magenta)]/5" />

        {/* Scan Lines */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--neon-cyan)]/10 to-transparent h-4"
          animate={{ y: [-20, window.innerHeight + 20] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--neon-cyan)] terminal-font animate-neon-glow mb-4">
            ПРОЕКТЫ & ДОСТИЖЕНИЯ
          </h2>
          <p className="text-lg text-[var(--neon-orange)] terminal-font max-w-3xl mx-auto">
            {'>'} Завершенные проекты. <br /> {'>'} Демонстрация опыта. <br /> {'>'} Современные технологии.
          </p>
        </motion.div>

        {/* Сетка проектов */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="cyber-border bg-black/60 backdrop-blur-sm p-6 rounded-lg hover:cyber-glow transition-all duration-300 group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Project Card Background Effects */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-[var(--neon-magenta)]/10 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-16 h-16 bg-[var(--neon-cyan)]/10 rounded-full blur-xl"
                  animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-[var(--neon-cyan)] terminal-font mb-3 group-hover:animate-neon-glow">
                  {project.title.toUpperCase()}
                </h3>

                <p className="text-gray-300 mb-4 leading-relaxed terminal-font text-sm">
                  {'>'} {project.description}
                </p>

                {/* Технологии */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <motion.span
                      key={tech.id}
                      className="px-3 py-1 bg-[var(--neon-orange)]/20 border border-[var(--neon-orange)]/50 text-[var(--neon-orange)] rounded terminal-font text-xs font-bold hover:bg-[var(--neon-orange)]/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tech.name.toUpperCase()}
                    </motion.span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-3 py-1 bg-[var(--cyber-gray)] border border-[var(--cyber-border)] text-gray-400 rounded terminal-font text-xs">
                      +{project.technologies.length - 4}_MORE
                    </span>
                  )}
                </div>

                {/* Ссылки */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    {project.github_url && (
                      <motion.a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-[var(--neon-cyan)] hover:text-[var(--neon-cyan)] transition-colors terminal-font text-sm font-bold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-4 h-4" />
                        <span>REP</span>
                      </motion.a>
                    )}
                    {project.demo_url && project.demo_url !== '#' && (
                      <motion.a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-[var(--neon-magenta)] hover:text-[var(--neon-magenta)] transition-colors terminal-font text-sm font-bold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>LIVE_DEMO</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;