import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, MessageCircle, Phone, MapPin, Terminal, Code, Heart } from 'lucide-react';

const CyberFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GITHUB',
      href: 'https://github.com/R0D10Nq',
      icon: Github,
      color: 'neon-cyan',
      command: 'git clone github.com/R0D10Nq'
    },
    {
      name: 'TELEGRAM',
      href: 'https://t.me/qr0d10n',
      icon: MessageCircle,
      color: 'neon-orange',
      command: 'telegram @qr0d10n'
    },
    {
      name: 'EMAIL',
      href: 'mailto:q@r0d10n.ru',
      icon: Mail,
      color: 'neon-magenta',
      command: 'mail q@r0d10n.ru'
    },
    {
      name: 'PHONE',
      href: 'tel:+79539183149',
      icon: Phone,
      color: 'terminal-green',
      command: 'call +7-953-918-31-49'
    },
  ];

  const quickLinks = [
    { name: 'HOME', href: '/', command: 'cd ~/' },
    { name: 'PROJECTS', href: '/projects', command: 'ls projects/' },
    { name: 'CONTACTS', href: '/contact', command: 'ping contact' },
    { name: 'REPO', href: 'https://github.com/R0D10Nq/porfolio_GitHubPages', command: 'git clone repo' },
  ];

  const techStack = [
    'React 18', 'TypeScript', 'Framer Motion', 'Tailwind CSS',
    'FastAPI', 'PostgreSQL', 'Docker', 'GitHub Actions'
  ];

  return (
    <footer className="bg-gradient-to-t from-black via-[var(--cyber-dark)] to-black border-t border-[var(--cyber-border)] relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="matrix-rain" />
      </div>

      {/* Circuit Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="footerCircuit" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--neon-cyan)" />
              <stop offset="50%" stopColor="var(--neon-orange)" />
              <stop offset="100%" stopColor="var(--neon-magenta)" />
            </linearGradient>
          </defs>
          <path
            d="M0,200 Q250,100 500,200 T1000,200"
            stroke="url(#footerCircuit)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5,5"
          />
        </svg>
      </div>

      <div className="container-custom py-12 relative z-10">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-8 pb-4 border-b border-[var(--cyber-border)]"
        >
          <Terminal className="w-5 h-5 text-[var(--neon-cyan)]" />
          <span className="terminal-font text-[var(--neon-cyan)]">
            FOOTER_SYSTEM.exe - INITIALIZATION COMPLETED
          </span>
          <div className="flex gap-1 ml-auto">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-[var(--terminal-green)]"
            />
            <span className="text-xs terminal-font text-[var(--terminal-green)]">ONLINE</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Developer Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold terminal-font text-[var(--neon-cyan)] animate-neon-glow">
              DEVELOPER_INFO
            </h3>
            <div className="space-y-2">
              <p className="text-[var(--neon-orange)] terminal-font font-bold">
                RODION SHEVTSOV
              </p>
              <p className="text-gray-300 text-sm">
                Python / Backend Fullstack Developer
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-[var(--neon-magenta)]" />
                TOMSK, RUSSIA (UTC+7)
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-3 py-1 cyber-border rounded bg-[var(--terminal-green)]/10 text-[var(--terminal-green)] text-xs terminal-font"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--terminal-green)]" />
                AVAILABLE_FOR_HIRE
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold terminal-font text-[var(--neon-orange)] animate-neon-glow">
              QUICK_LINKS
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center justify-start text-sm text-gray-300 hover:text-[var(--neon-cyan)] transition-colors"
                  >
                    <span className="terminal-font">{link.name}</span>
                    <span className="text-xs text-[var(--neon-orange)] opacity-0 group-hover:opacity-100 transition-opacity">
                      $ {link.command}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold terminal-font text-[var(--neon-magenta)] animate-neon-glow">
              SOCIAL_LINKS
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group p-3 cyber-border rounded bg-[var(--${link.color})]/10 hover:bg-[var(--${link.color})]/20 transition-all duration-300`}
                    title={link.command}
                  >
                    <Icon className={`w-5 h-5 text-[var(--${link.color})] mb-2 group-hover:animate-pulse`} />
                    <div className="text-xs terminal-font text-gray-400 group-hover:text-white">
                      {link.name.split('_')[0]}
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold terminal-font text-[var(--terminal-green)] animate-neon-glow">
              TECH_STACK
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-2 py-1 bg-[var(--cyber-gray)] text-[var(--neon-cyan)] text-xs terminal-font rounded border border-[var(--neon-cyan)]/30 hover:border-[var(--neon-cyan)] transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="border-t border-[var(--cyber-border)] mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400 terminal-font">
              © {currentYear} Родион Шевцов. Все права защищены.
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="terminal-font">Сделано с</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </motion.div>
                <span className="terminal-font">на React + FastAPI</span>
              </div>
              <div className="flex items-center gap-1">
                <Code className="w-4 h-4 text-[var(--neon-cyan)]" />
                <a 
                  href="https://github.com/R0D10Nq/porfolio_GitHubPages"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-font hover:text-[var(--neon-cyan)] transition-colors"
                >
                  ИСХОДНЫЙ_КОД
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* System Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-4 p-3 cyber-border rounded bg-[var(--cyber-dark)]/50 flex items-center justify-between text-xs terminal-font"
        >
          <div className="flex items-center gap-4">
            <span className="text-gray-400">SYSTEM_STATUS:</span>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[var(--terminal-green)]"
              />
              <span className="text-[var(--terminal-green)]">OPERATIONAL</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <span>UPTIME: {Math.floor(Date.now() / 1000 / 60 / 60 / 24)}d</span>
            <span>VERSION: 2.1.0</span>
            <span>BUILD: {currentYear}.{new Date().getMonth() + 1}</span>
          </div>
        </motion.div>
      </div>

      {/* Scan Line Effect */}
      <motion.div
        animate={{ x: [-100, window.innerWidth + 100] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 8 }}
        className="absolute bottom-0 w-1 h-full bg-gradient-to-t from-transparent via-[var(--neon-cyan)] to-transparent opacity-20 pointer-events-none"
      />
    </footer>
  );
};

export default CyberFooter;
