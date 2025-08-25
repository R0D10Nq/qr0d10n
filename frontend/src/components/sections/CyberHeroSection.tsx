import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SquareTerminal, FolderCode, Layers } from 'lucide-react';

const CyberHeroSection: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const texts = [
    'RODION_SHEVTSOV',
    'PYTHON_DEVELOPER',
    'BACKEND_ORIENTED',
    'FULLSTACK_FEATURES'
  ];

  useEffect(() => {
    const currentText = texts[currentIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= currentText.length) {
        setDisplayText(currentText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[var(--cyber-darker)] via-[var(--cyber-dark)] to-black">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Particles */}
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

      <div className="container-custom text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          {/* Status Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-[var(--terminal-green)] terminal-font text-sm"
          >
            <div className="w-2 h-2 bg-[var(--terminal-green)] rounded-full animate-pulse" />
            Status: Available for hire
          </motion.div>

          {/* Personal Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto"
          >
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative group"
            >
              <div className="w-32 h-32 md:w-80 md:h-80 rounded-full cyber-border bg-gradient-to-br from-[var(--neon-cyan)]/20 to-[var(--neon-magenta)]/20 backdrop-blur-sm p-1 group-hover:cyber-glow transition-all duration-300">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[var(--cyber-dark)] to-black flex items-center justify-center overflow-hidden">
                  <img
                    src="/photo.jpg"
                    alt="Родион Шевцов"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              {/* Animated ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-[var(--neon-cyan)]/30 border-dashed"
              />
            </motion.div>

            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center md:text-left space-y-3"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-3xl md:text-4xl font-bold terminal-font text-[var(--neon-orange)] animate-neon-glow"
              >
                ШЕВЦОВ РОДИОН
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="text-lg md:text-xl text-[var(--neon-cyan)] terminal-font"
              >
                {'>'} Python / Backend-oriented Fullstack Developer
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex items-center justify-center md:justify-start gap-2 text-gray-400 terminal-font text-sm"
              >
                <div className="w-1 h-1 bg-[var(--neon-magenta)] rounded-full animate-pulse" />
                <span>Томск, Россия (UTC+7)</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Main Title */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold terminal-font"
            >
              <span
                className="glitch-text animate-neon-glow text-[var(--neon-cyan)]"
                data-text={displayText}
              >
                {displayText}
              </span>
              <span className="animate-terminal-cursor text-[var(--neon-orange)]">_</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
              className="text-xl md:text-2xl text-[var(--neon-orange)] terminal-font"
            >
              {'>'} INITIALIZATION...
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
          >
            {[
              { icon: SquareTerminal, label: 'EXPERIENCE', value: '3+ ГОДА', color: 'neon-cyan' },
              { icon: FolderCode, label: 'PROJECTS', value: 'PRODUCTION', color: 'neon-orange' },
              { icon: Layers, label: 'STACK', value: 'PYTHON_STACK', color: 'neon-magenta' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 + index * 0.2 }}
                className="cyber-border bg-black/50 backdrop-blur-sm p-6 rounded-lg hover:cyber-glow transition-all duration-300 group w-full min-w-[200px] max-w-[250px] mx-auto"
              >
                <stat.icon className={`w-8 h-8 text-[var(--${stat.color})] mx-auto mb-3 group-hover:animate-glitch`} />
                <div className="terminal-font">
                  <div className={`text-2xl font-bold text-[var(--${stat.color})] animate-neon-glow`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="cyber-border bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] px-8 py-4 rounded-lg terminal-font font-bold hover:bg-[var(--neon-cyan)]/20 transition-all duration-300"
            >
              ИЗУЧИТЬ_ПРОЕКТЫ
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 107, 53, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="border border-[var(--neon-orange)] text-[var(--neon-orange)] px-8 py-4 rounded-lg terminal-font font-bold hover:bg-[var(--neon-orange)]/10 transition-all duration-300"
            >
              СКАЧАТЬ_РЕЗЮМЕ
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="absolute inset-x-0 top-[110%]"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-[var(--neon-cyan)] terminal-font text-xs"
            >
              <div>SCROLL_TO_EXPLORE</div>
              <div className="w-0.5 h-8 bg-gradient-to-b from-[var(--neon-cyan)] to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Holographic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[var(--neon-cyan)]/5 to-transparent animate-hologram pointer-events-none" />
    </section>
  );
};

export default CyberHeroSection;
