import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import * as portfolioData from '../../data/portfolioData';

const CyberProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const categories = ['все', 'веб', 'api', 'автоматизация', 'ии'];
  const projects = portfolioData.projects;

  const filteredProjects = projects; // TODO: add filtering logic

  return (
    <section className="py-20 bg-gradient-to-b from-black via-[var(--cyber-dark)] to-black relative overflow-hidden">
      {/* grid bg */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, var(--neon-cyan) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, var(--neon-magenta) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold terminal-font text-[var(--neon-cyan)] animate-neon-glow mb-4">
            ПРОЕКТЫ_И_ДОСТИЖЕНИЯ
          </h2>
          <div className="text-[var(--neon-orange)] terminal-font text-lg">
            {'>'} загружаю проекты...
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg terminal-font font-bold transition-all duration-300 ${
                selectedCategory === category
                  ? 'cyber-border bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] cyber-glow'
                  : 'border border-[var(--cyber-border)] text-gray-400 hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)]/50'
              }`}
            >
              {category.toUpperCase()}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 50
                }}
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
                className="cyber-border bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden group cursor-pointer relative"
              >
                {/* Holographic Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredProject === index ? 0.3 : 0,
                    background: `linear-gradient(45deg, 
                      var(--neon-cyan), 
                      var(--neon-magenta), 
                      var(--neon-orange)
                    )`
                  }}
                  className="absolute inset-0 animate-hologram pointer-events-none"
                />

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  {project.image_url ? (
                    <motion.img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      whileHover={{ filter: 'hue-rotate(90deg)' }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--cyber-gray)] to-[var(--cyber-dark)] flex items-center justify-center">
                      <div className="text-6xl opacity-30">🚀</div>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs terminal-font font-bold ${
                    project.is_active ? 'bg-[var(--terminal-green)]/20 text-[var(--terminal-green)] border border-[var(--terminal-green)]' :
                    'bg-[var(--cyber-gray)]/20 text-gray-400 border border-gray-400'
                  }`}>
                    {project.is_active ? 'АКТИВЕН' : 'НЕАКТИВЕН'}
                  </div>

                  {/* Scan Line Effect */}
                  <motion.div
                    animate={{ x: [-100, 400] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="absolute top-0 w-1 h-full bg-gradient-to-b from-transparent via-[var(--neon-cyan)] to-transparent opacity-50"
                  />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold terminal-font text-[var(--neon-cyan)] group-hover:animate-glitch">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="text-[var(--neon-orange)] text-sm terminal-font">
                        PRODUCTION_READY
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, i) => {
                      return (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: (index * 0.1) + (i * 0.05) }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-2 py-1 bg-[var(--cyber-gray)] text-[var(--neon-cyan)] text-xs terminal-font rounded border border-[var(--neon-cyan)]/30 hover:border-[var(--neon-cyan)] transition-colors"
                        >
                          {tech.name}
                        </motion.span>
                      );
                    })}
                  </div>


                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.github_url && (
                      <motion.a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--cyber-gray)] text-[var(--neon-cyan)] rounded border border-[var(--neon-cyan)]/30 hover:border-[var(--neon-cyan)] transition-colors text-sm terminal-font"
                      >
                        <Github className="w-4 h-4" />
                        КОД
                      </motion.a>
                    )}
                    {project.demo_url && (
                      <motion.a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--neon-orange)]/20 text-[var(--neon-orange)] rounded border border-[var(--neon-orange)] hover:bg-[var(--neon-orange)]/30 transition-colors text-sm terminal-font"
                      >
                        <ExternalLink className="w-4 h-4" />
                        ДЕМО
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)]/5 to-[var(--neon-magenta)]/5 rounded-lg pointer-events-none"
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'ВСЕГО_ПРОЕКТОВ', value: projects.length.toString() },
              { label: 'ЗВЁЗД_GITHUB', value: '70+' },
              { label: 'ЖИВЫХ_ДЕМО', value: '10+' },
              { label: 'ТЕХНОЛОГИЙ', value: '25+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-[var(--neon-magenta)] terminal-font animate-neon-glow">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 terminal-font mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CyberProjectsSection;
