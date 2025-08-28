import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layout, GitBranch, Wrench, Bot } from 'lucide-react';

const CyberTechStack: React.FC = () => {
  const techCategories = [
    {
      title: 'BACKEND & API',
      icon: <Code2 className="w-6 h-6" />,
      techs: ['Django', 'DRF', 'Django Channels', 'Celery', 'FastAPI', 'SQLAlchemy'],
      color: 'neon-cyan'
    },
    {
      title: 'DATABASES & CACHE',
      icon: <Database className="w-6 h-6" />,
      techs: ['PostgreSQL', 'PostGIS', 'Redis', 'MySQL', 'SQLite', 'MongoDB'],
      color: 'neon-orange'
    },
    {
      title: 'FRONTEND & UI',
      icon: <Layout className="w-6 h-6" />,
      techs: ['React', 'TypeScript', 'Vue.js', 'Vite', 'Webpack', 'Framer Motion'],
      color: 'neon-magenta'
    },
    {
      title: 'DEVOPS & CI/CD',
      icon: <GitBranch className="w-6 h-6" />, 
      techs: ['Docker', 'Docker Compose', 'Nginx', 'Gunicorn', 'GitLab CI/CD', 'Linux'],
      color: 'terminal-green'
    },
    {
      title: 'TESTING & QA',
      icon: <Wrench className="w-6 h-6" />,
      techs: ['pytest', 'pytest-django', 'coverage', 'mypy', 'flake8', 'ruff'],
      color: 'terminal-green'
    },
    {
      title: 'AI & BOTS',
      icon: <Bot className="w-6 h-6" />, 
      techs: ['aiogram', 'python-telegram-bot', 'LM Studio', 'sentence-transformers', 'ChatGPT', 'embeddings'],
      color: 'neon-cyan'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[var(--cyber-darker)] via-[var(--cyber-dark)] to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[var(--neon-cyan)] rounded-full"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold terminal-font text-[var(--neon-cyan)] animate-neon-glow mb-4">
            TECH STACK
          </h2>
          <div className="text-[var(--neon-orange)] terminal-font text-lg">
            {'>'} Loading Stack...
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.05,
                rotateX: 5,
                boxShadow: `0 20px 40px rgba(0, 212, 255, 0.3)`
              }}
              className="cyber-border bg-black/70 backdrop-blur-sm p-6 rounded-lg group cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className={`text-[var(--${category.color})]`}
                >
                  {category.icon}
                </motion.div>
                <h3 className={`terminal-font font-bold text-lg text-[var(--${category.color})] group-hover:animate-glitch`}>
                  {category.title}
                </h3>
              </div>

              {/* Tech List */}
              <div className="space-y-3">
                {category.techs.map((tech, techIndex) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index * 0.2) + (techIndex * 0.1) }}
                    whileHover={{ x: 10, scale: 1.05 }}
                    className="flex items-center gap-3 group/tech"
                  >
                    <motion.div
                      animate={{ rotate: [0, 90, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: techIndex * 0.2 }}
                      className={`w-2 h-2 bg-[var(--${category.color})] rounded-full`}
                    />
                    <span className="terminal-font text-white group-hover/tech:text-[var(--neon-cyan)] transition-colors">
                      {tech}
                    </span>
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      className={`h-0.5 bg-gradient-to-r from-[var(--${category.color})] to-transparent`}
                    />
                  </motion.div>
                ))}
              </div>

              {/* skill progress */}
              <div className="mt-6 pt-4 border-t border-[var(--cyber-border)]">
                <div className="flex justify-between items-center mb-2">
                  <span className="terminal-font text-xs text-gray-400">SKILL</span>
                  <span className={`terminal-font text-xs text-[var(--${category.color})]`}>
                    {85 + Math.floor(Math.random() * 15)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-900 border border-gray-600 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${85 + Math.floor(Math.random() * 15)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    className={`h-full bg-gradient-to-r from-[var(--${category.color})] to-[var(--neon-cyan)] animate-circuit-flow relative rounded-full`}
                  >
                    {/* Inner highlight */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-full" />
                  </motion.div>
                </div>
              </div>

              {/* hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-[var(--${category.color})]/5 to-transparent rounded-lg pointer-events-none"
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'LANGUAGES', value: '6+' },
              { label: 'FRAMEWORKS', value: '10+' },
              { label: 'DATABASES', value: '6+' },
              { label: 'EXPERIENCE', value: '3+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-[var(--neon-orange)] terminal-font animate-neon-glow">
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

export default CyberTechStack;
