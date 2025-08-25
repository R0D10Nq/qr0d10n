import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Bug, Zap, Rocket, GitCompare, Users } from 'lucide-react';

const CyberAchievements: React.FC = () => {
  const achievements = [
    {
      icon: Trophy,
      title: 'FONT_SYSTEM',
      value: '100%',
      subtitle: 'Юридические риски',
      description: 'Внедрил систему динамической замены шрифтов в Django - устранил досудебные претензии',
      color: 'neon-cyan',
      progress: 100
    },
    {
      icon: Bug,
      title: 'SLIDER_MIGRATION',
      value: '90%',
      subtitle: 'Снижение багов',
      description: 'Перенёс legacy-слайдеры на Swiper - снизил количество багов и упростил поддержку',
      color: 'neon-orange',
      progress: 90
    },
    {
      icon: Zap,
      title: 'DIAGNOSTIC_API',
      value: '5x',
      subtitle: 'Ускорение диагностики',
      description: 'Разработал bookmarklet + API для диагностики лендингов - ускорил процесс в 5 раз',
      color: 'neon-magenta',
      progress: 95
    },
    {
      icon: Rocket,
      title: 'PERFORMANCE_OPT',
      value: '40%',
      subtitle: 'Улучшение UX',
      description: 'Оптимизировал сборку ассетов и внедрил кеширование - снизил время загрузки',
      color: 'terminal-green',
      progress: 85
    },
    {
      icon: GitCompare,
      title: 'CRM_INTEGRATION',
      value: '0%',
      subtitle: 'Потерянных лидов',
      description: 'Реализовал интеграции с AmoCRM и CallTouch - автоматизировал передачу лидов',
      color: 'neon-cyan',
      progress: 88
    },
    {
      icon: Users,
      title: 'TEAM_EFFICIENCY',
      value: '25%',
      subtitle: 'Рост продуктивности',
      description: 'Повысил эффективность контент-команды на 25% через админ-инструменты',
      color: 'neon-orange',
      progress: 92
    }
  ];

  const stats = [
    { label: 'COMMERCIAL', value: '3+', icon: '💼' },
    { label: 'PROD_SITES', value: '400+', icon: '🌐' },
    { label: 'TECH', value: '15+', icon: '⚡' },
    { label: 'STATUS', value: 'OPEN', icon: '🚀' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black via-[var(--cyber-dark)] to-black relative overflow-hidden">
      {/* Enhanced Cyberpunk IT Background */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Digital Rain Effect - Enhanced */}
        <div className="absolute inset-0 opacity-8">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={`rain-${i}`}
              className="absolute w-px bg-gradient-to-b from-[var(--neon-cyan)] via-[var(--neon-green)] to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${Math.random() * 300 + 150}px`
              }}
              animate={{
                y: ['-100vh', '100vh'],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>

        {/* Network Topology */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            {/* Network Nodes */}
            {Array.from({ length: 25 }).map((_, i) => {
              const x = (i % 5) * 240 + 120;
              const y = Math.floor(i / 5) * 160 + 80;
              return (
                <g key={`network-${i}`}>
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="var(--neon-magenta)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0.5, 1.5, 0.5],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity
                    }}
                  />
                  {/* Connection Lines */}
                  {i < 20 && (
                    <motion.line
                      x1={x}
                      y1={y}
                      x2={x + 240}
                      y2={y}
                      stroke="var(--neon-cyan)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: [0, 1, 0] }}
                      transition={{
                        duration: 4,
                        delay: i * 0.3,
                        repeat: Infinity
                      }}
                    />
                  )}
                  {i < 15 && (
                    <motion.line
                      x1={x}
                      y1={y}
                      x2={x}
                      y2={y + 160}
                      stroke="var(--neon-orange)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: [0, 1, 0] }}
                      transition={{
                        duration: 3.5,
                        delay: i * 0.25,
                        repeat: Infinity
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Floating Code Achievements */}
        <div className="absolute inset-0 opacity-12">
          {[
            'git commit -m "feat: achievement unlocked"',
            'docker build -t success .',
            'npm test -- --coverage=100%',
            'python manage.py migrate --zero-downtime',
            'redis-cli FLUSHALL # performance boost',
            'SELECT COUNT(*) FROM achievements;',
            'async def optimize_performance():',
            'class Achievement(models.Model):',
            'const skills = new Map();',
            'FastAPI.middleware.cors.enabled = True'
          ].map((code, i) => (
            <motion.div
              key={`code-achievement-${i}`}
              className="absolute text-[var(--terminal-green)] terminal-font text-xs opacity-20"
              style={{
                left: `${Math.random() * 70}%`,
                top: `${Math.random() * 70}%`,
                transform: `rotate(${Math.random() * 10 - 5}deg)`
              }}
              animate={{
                y: [-30, 30, -30],
                x: [-10, 10, -10],
                opacity: [0.1, 0.4, 0.1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              {code}
            </motion.div>
          ))}
        </div>

        {/* Data Packets Flow */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`packet-${i}`}
              className="absolute w-3 h-3 bg-[var(--neon-cyan)] rounded-sm opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 200, -150, 100, 0],
                y: [0, -100, 150, -50, 0],
                scale: [0.5, 1, 0.8, 1.2, 0.5],
                rotate: [0, 90, 180, 270, 360],
                opacity: [0.3, 0.8, 0.5, 1, 0.3],
              }}
              transition={{
                duration: 12 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Achievement Progress Bars in Background */}
        <div className="absolute inset-0 opacity-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`bg-progress-${i}`}
              className="absolute h-1 bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-magenta)] to-[var(--neon-orange)]"
              style={{
                left: `${Math.random() * 60}%`,
                top: `${Math.random() * 80 + 10}%`,
                width: `${Math.random() * 200 + 100}px`,
              }}
              animate={{
                scaleX: [0, 1, 0.8, 1],
                opacity: [0.2, 0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Holographic Grid Enhancement */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)]/3 via-transparent via-[var(--neon-magenta)]/3 to-[var(--neon-orange)]/3" />

        {/* Multiple Scan Lines */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`scan-${i}`}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--neon-cyan)]/15 to-transparent h-6"
            animate={{ y: [-30, window.innerHeight + 30] }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5
            }}
          />
        ))}

        {/* Achievement Unlock Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-[var(--terminal-green)] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -50, -100],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
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
            Журнал успехов
          </h2>
          <div className="text-[var(--neon-orange)] terminal-font text-lg">
            {'>'} SCANNING THE ACHIEVEMENT DATABASE...
          </div>
        </motion.div>

        {/* Main Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 10
              }}
              style={{
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
              }}
              className="cyber-border bg-black/80 backdrop-blur-sm p-6 rounded-lg group cursor-pointer relative overflow-hidden"
            >
              {/* Background Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                className={`absolute inset-0 bg-[var(--${achievement.color})] rounded-lg`}
              />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 mb-4"
              >
                <achievement.icon className={`w-12 h-12 text-[var(--${achievement.color})] mx-auto group-hover:animate-glitch`} />
              </motion.div>

              {/* Main Value */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                className="text-center mb-4 relative z-10"
              >
                <div className={`text-4xl md:text-5xl font-bold terminal-font text-[var(--${achievement.color})] animate-neon-glow`}>
                  {achievement.value}
                </div>
                <div className="text-sm text-gray-400 terminal-font mt-1">
                  {achievement.subtitle}
                </div>
              </motion.div>

              {/* Title */}
              <h3 className={`text-lg font-bold terminal-font text-[var(--${achievement.color})] text-center mb-3 relative z-10 group-hover:animate-glitch`}>
                {achievement.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm text-center mb-4 leading-relaxed relative z-10">
                {achievement.description}
              </p>

              {/* Progress Bar */}
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="terminal-font text-xs text-gray-400">SKILL</span>
                  <span className={`terminal-font text-xs text-[var(--${achievement.color})]`}>
                    {achievement.progress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-[var(--cyber-gray)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${achievement.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.15 + 0.5 }}
                    className={`h-full bg-gradient-to-r from-[var(--neon-magenta)] to-[var(--neon-cyan)] relative`}
                  >
                    <motion.div
                      animate={{ x: [-20, 100, -20] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Scan Line Effect */}
              <motion.div
                animate={{ y: [-100, 200] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent opacity-30"
              />
            </motion.div>
          ))}
        </div>

        {/* Fun Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="cyber-border bg-black/60 backdrop-blur-sm p-8 rounded-lg"
        >
          <h3 className="text-2xl font-bold terminal-font text-[var(--neon-orange)] text-center mb-8 animate-neon-glow">
            Stats
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl mb-2"
                >
                  {stat.icon}
                </motion.div>
                <div className="text-2xl font-bold text-[var(--neon-cyan)] terminal-font group-hover:animate-glitch">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 terminal-font mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold terminal-font text-[var(--neon-orange)] mb-8 animate-neon-glow">
           Достижения
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              'Динамическая замена шрифтов',
              'Миграция на Swiper',
              'API диагностики лендингов',
              'Оптимизация производительности',
              'Интеграции CRM и телефонии'
            ].map((milestone, index) => (
              <motion.div
                key={milestone}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 bg-[var(--cyber-gray)] text-[var(--neon-cyan)] text-sm terminal-font rounded border border-[var(--neon-cyan)]/30 hover:border-[var(--neon-cyan)] transition-colors"
              >
                {milestone}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CyberAchievements;
