/**
 * Минималистичный киберпанк футер с терминальным стилем
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Send, Phone, Terminal, MapPin, Code } from 'lucide-react';
import { usePersonalInfo } from '../hooks/usePortfolio';

const Footer: React.FC = () => {
  const { data: personalInfo } = usePersonalInfo();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GITHUB',
      href: personalInfo?.github_url || 'https://github.com/R0D10Nq',
      icon: Github,
      color: 'neon-cyan',
      command: 'git clone github.com/R0D10Nq'
    },
    {
      name: 'TELEGRAM',
      href: personalInfo?.telegram_url || 'https://t.me/qr0d10n',
      icon: Send,
      color: 'neon-orange',
      command: 'telegram @qr0d10n'
    },
    {
      name: 'EMAIL',
      href: `mailto:${personalInfo?.email || 'q@r0d10n.ru'}`,
      icon: Mail,
      color: 'neon-magenta',
      command: 'mail q@r0d10n.ru'
    },
    {
      name: 'PHONE',
      href: `tel:${personalInfo?.phone || '+79539183149'}`,
      icon: Phone,
      color: 'terminal-green',
      command: 'call +7-953-918-31-49'
    },
  ];

  const quickLinks = [
    { name: 'HOME', href: '/', command: 'cd ~/' },
    { name: 'PROJECTS', href: '/#projects', command: 'ls projects/' },
    { name: 'CONTACT', href: '/#contact', command: 'ping contact' },
    { name: 'REPO', href: 'https://github.com/R0D10Nq/porfolio_GitHubPages', command: 'git clone repo' },
  ];

  return (
    <footer className="bg-gradient-to-t from-black via-[var(--cyber-dark)] to-[var(--cyber-dark)] border-t border-[var(--cyber-border)] relative overflow-hidden h-[460px]">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[var(--neon-cyan)] rounded-full"
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="container-custom py-8 relative z-10">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-6 pb-3 border-b border-[var(--cyber-border)]"
        >
          <Terminal className="w-4 h-4 text-[var(--neon-cyan)]" />
          <span className="terminal-font text-[var(--neon-cyan)] text-sm">
            FOOTER_SYSTEM.exe
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Developer Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-bold terminal-font text-[var(--neon-cyan)] animate-neon-glow">
              DEVELOPER_INFO
            </h3>
            <div className="space-y-2">
              <p className="text-[var(--neon-orange)] terminal-font font-bold">
                {personalInfo?.name?.toUpperCase() || 'RODION SHEVTSOV'}
              </p>
              <p className="text-gray-300 text-sm terminal-font">
                {personalInfo?.title || 'Python / Backend Fullstack Developer'}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-3 h-3 text-[var(--neon-magenta)]" />
                <span className="terminal-font">
                  {personalInfo?.location?.toUpperCase() || 'TOMSK, RUSSIA'}
                </span>
              </div>
              {(personalInfo?.is_available_for_hire !== false) && (
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-2 py-1 cyber-border rounded bg-[var(--terminal-green)]/10 text-[var(--terminal-green)] text-xs terminal-font"
                >
                  <div className="w-2 h-2 rounded-full bg-[var(--terminal-green)]" />
                  AVAILABLE_FOR_HIRE
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-3 max-w-[200px]"
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
                    className="group flex items-center justify-between text-sm text-gray-300 hover:text-[var(--neon-cyan)] transition-colors"
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
            className="space-y-3 justify-self-end"
          >
            <h3 className="text-lg font-bold terminal-font text-[var(--neon-magenta)] animate-neon-glow">
              SOCIAL_LINKS
            </h3>
            <div className="grid grid-cols-4 gap-4">
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group p-2 cyber-border rounded bg-[var(--${link.color})]/10 hover:bg-[var(--${link.color})]/20 transition-all duration-300`}
                    title={link.command}
                  >
                    <Icon className={`w-4 h-4 text-[var(--${link.color})] mb-1 group-hover:animate-pulse`} />
                    <div className="text-xs terminal-font text-gray-400 group-hover:text-white">
                      {link.name}
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-[var(--cyber-border)] mt-6 pt-4"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-sm text-gray-400 terminal-font">
              {currentYear} {personalInfo?.name || 'Родион Шевцов'}. Все права защищены.
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Code className="w-3 h-3 text-[var(--neon-cyan)]" />
                <a
                  href={personalInfo?.github_url || 'https://github.com/R0D10Nq/qr0d10n'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-font hover:text-[var(--neon-cyan)] transition-colors text-xs"
                >
                  SOURCE_CODE
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scan Line Effect */}
      <motion.div
        animate={{ x: [-50, typeof window !== 'undefined' ? window.innerWidth + 50 : 1200] }}
        transition={{ duration: 6, repeat: Infinity, repeatDelay: 10 }}
        className="absolute bottom-0 w-0.5 h-full bg-gradient-to-t from-transparent via-[var(--neon-cyan)] to-transparent opacity-20 pointer-events-none"
      />
    </footer>
  );
};

export default Footer;