import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

const CyberJourney: React.FC = () => {
  const journeySteps = [
    {
      year: '2019',
      title: 'STUDENT',
      company: 'ТТИТ - Томский техникум ИТ',
      location: 'Томск',
      description: 'Начал путь в программировании с 4-го класса. Поступил в техникум на специальность "Разработка веб и мультимедийных приложений". Освоил основы Python, PHP, HTML, CSS, JS.',
      tech: ['Python', 'PHP', 'HTML/CSS', 'JavaScript', 'WordPress'],
      status: 'completed'
    },
    {
      year: '2022',
      title: 'FULLSTACK_DEVELOPER',
      company: 'ОГКУ «Центр занятости населения»',
      location: 'Томск',
      description: 'Создал корпоративный портал для сотрудников. Работал с чатами, дашбордами статистики, внутренними плагинами. Занимался DevOps и настройкой CI/CD.',
      tech: ['WordPress', 'Vue.js', 'React', 'MySQL', 'Linux', 'CI/CD'],
      status: 'completed'
    },
    {
      year: '2023',
      title: 'ПОИСК full-time, ФРИЛАНС, ПЕТ-ПРОЕКТЫ, development',
      company: 'Home',
      location: 'Удалённо',
      description: 'Разрабатывал Telegram-ботов, API-интеграции, автоматизацию парсинга. Изучил FastAPI, Docker, asyncio, React+TypeScript. Работал с LLM и embeddings.',
      tech: ['FastAPI', 'Docker', 'asyncio', 'React', 'TypeScript', 'LLM'],
      status: 'completed'
    },
    {
      year: '2024',
      title: 'PYTHON_FULLSTACK',
      company: 'Sinergium',
      location: 'Удалённо',
      description: 'Fullstack-разработчик в мультитенантной платформе Django Landings (~400 сайтов). Backend на Django/DRF/Celery, frontend-оптимизация, DevOps с GitLab CI.',
      tech: ['Django/DRF', 'Celery', 'PostgreSQL', 'GitLab CI', 'WebP'],
      status: 'completed'
    },
    {
      year: '2025',
      title: 'Python / Backend Fullstack Developer',
      company: 'Поиск новых вызовов',
      location: 'Удалённо / Гибрид',
      description: 'Ищу позицию Middle Python Developer. Готов применить накопленный опыт в backend/fullstack разработке, DevOps и современных технологиях.',
      tech: ['Python', 'Django/DRF', 'FastAPI', 'React', 'TypeScript', 'Docker', 'CI/CD', 'AI/ML/LLM', '& ETC'],
      status: 'active'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black via-[var(--cyber-dark)] to-black relative overflow-hidden">
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
            'const career = [];',
            'function evolve() {}',
            'git commit -m "growth"',
            'npm run develop',
            'docker build skills',
            'SELECT * FROM experience',
            'async/await journey',
            'React.useEffect()',
            'Python Django',
            'FastAPI backend'
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
          animate={{ y: [-20, typeof window !== 'undefined' ? window.innerHeight + 20 : 800] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
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
            CAREER_ROADMAP
          </h2>
          <div className="text-[var(--neon-orange)] terminal-font text-lg">
            {'>'} PATH...
          </div>
        </motion.div>

        <div className="relative">
          {/* Main Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[var(--neon-cyan)] via-[var(--neon-orange)] to-[var(--neon-magenta)]" />

          <div className="space-y-16">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className={`cyber-border bg-black/80 backdrop-blur-sm p-6 rounded-lg relative group ${step.status === 'active' ? 'cyber-glow' : ''
                      }`}
                  >
                    {/* Status Indicator */}
                    <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${step.status === 'completed' ? 'bg-[var(--terminal-green)]' :
                        step.status === 'active' ? 'bg-[var(--neon-orange)] animate-pulse' :
                          'bg-[var(--cyber-gray)]'
                      }`} />

                    {/* Year Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-4 h-4 text-[var(--neon-cyan)]" />
                      <span className="terminal-font text-[var(--neon-cyan)] font-bold">
                        {step.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold terminal-font text-[var(--neon-orange)] mb-2 group-hover:animate-glitch">
                      {step.title}
                    </h3>

                    {/* Company & Location */}
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {step.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {step.location}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {step.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: (index * 0.2) + (techIndex * 0.1) }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-2 py-1 bg-[var(--cyber-gray)] text-[var(--neon-cyan)] text-xs terminal-font rounded border border-[var(--neon-cyan)]/30 hover:border-[var(--neon-cyan)] transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)]/5 to-transparent rounded-lg pointer-events-none"
                    />
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <div className="w-2/12 flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    whileHover={{ scale: 1.5, rotate: 180 }}
                    className={`w-6 h-6 rounded-full border-4 relative z-10 ${step.status === 'completed' ? 'bg-[var(--terminal-green)] border-[var(--terminal-green)]' :
                        step.status === 'active' ? 'bg-[var(--neon-orange)] border-[var(--neon-orange)] animate-pulse' :
                          'bg-[var(--cyber-gray)] border-[var(--cyber-gray)]'
                      }`}
                  >
                    {step.status === 'active' && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-[var(--neon-orange)]"
                      />
                    )}
                  </motion.div>
                </div>

                {/* Empty Space */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'ЛЕТ В IT', value: '6+' },
              { label: 'ПРОЕКТОВ', value: '400+' },
              { label: 'ТЕХНОЛОГИЙ', value: '25+' },
              { label: 'КОМПАНИИ', value: '3' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.7 + index * 0.1 }}
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

export default CyberJourney;
