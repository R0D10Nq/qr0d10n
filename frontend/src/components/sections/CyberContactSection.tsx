import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Github, Phone, Clock, MapPin, Zap } from 'lucide-react';
import { usePersonalInfo } from '../../hooks/usePortfolio';

const CyberContactSection: React.FC = () => {
  const { data: personalInfo } = usePersonalInfo();

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'q@r0d10n.ru',
      color: 'neon-cyan',
      href: 'mailto:q@r0d10n.ru'
    },
    {
      icon: Send,
      title: 'Telegram',
      value: '@R0D10N',
      color: 'neon-blue',
      href: personalInfo?.telegram_url || 'https://t.me/qr0d10n',
    },
    {
      icon: Github,
      title: 'Github',
      value: 'github.com/R0D10N',
      color: 'neon-purple',
      href: personalInfo?.github_url || 'https://github.com/R0D10Nq',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+7 (953) 918-31-49',
      color: 'neon-orange',
      href: 'tel:+79539183149'
    }
  ];

  const services = [
    'Backend разработка',
    'Fullstack разработка',
    'API интеграции',
    'DevOps настройка',
  ];

  return (
    <section id="contact" className="relative py-20 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute inset-0 opacity-12">
          <div className="matrix-rain"></div>
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={`matrix-${i}`}
              className="absolute w-px bg-gradient-to-b from-[var(--terminal-green)] via-[var(--neon-cyan)] to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${Math.random() * 400 + 200}px`
              }}
              animate={{
                y: ['-100vh', '100vh'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 4,
                repeat: Infinity,
                delay: Math.random() * 4
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" viewBox="0 0 1400 900" fill="none">
            {Array.from({ length: 12 }).map((_, i) => {
              const x = (i % 4) * 350 + 175;
              const y = Math.floor(i / 4) * 300 + 150;
              return (
                <g key={`satellite-${i}`}>
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill="var(--neon-cyan)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0.8, 1.3, 0.8],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.3,
                      repeat: Infinity
                    }}
                  />
                  {Array.from({ length: 3 }).map((_, j) => (
                    <motion.circle
                      key={`wave-${i}-${j}`}
                      cx={x}
                      cy={y}
                      r={20 + j * 15}
                      fill="none"
                      stroke="var(--neon-orange)"
                      strokeWidth="1"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 0.6, 0],
                        r: [10, 50 + j * 20, 80 + j * 30]
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.2 + j * 0.5,
                        repeat: Infinity
                      }}
                    />
                  ))}
                  {i < 8 && (
                    <motion.line
                      x1={x}
                      y1={y}
                      x2={x + 350}
                      y2={y}
                      stroke="var(--neon-magenta)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: [0, 1, 0] }}
                      transition={{
                        duration: 5,
                        delay: i * 0.4,
                        repeat: Infinity
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="absolute inset-0 opacity-15">
          {[
            'SMTP: q@r0d10n.ru',
            'TCP/IP: telegram.connect(@R0D10N)',
            'HTTPS: github.com/R0D10N',
            'SIP: +7(953)918-31-49',
            'WebRTC: voice.channel.active',
            'API: contact.endpoint.ready',
            'SSL: encryption.enabled',
            'OAuth: github.auth.verified',
            'DNS: portfolio.resolved',
            'CDN: assets.cached'
          ].map((protocol, i) => (
            <motion.div
              key={`protocol-${i}`}
              className="absolute text-[var(--terminal-green)] terminal-font text-xs opacity-25"
              style={{
                left: `${Math.random() * 70}%`,
                top: `${Math.random() * 70}%`,
                transform: `rotate(${Math.random() * 15 - 7.5}deg)`
              }}
              animate={{
                y: [-40, 40, -40],
                x: [-15, 15, -15],
                opacity: [0.1, 0.4, 0.1],
                rotate: [0, 8, -8, 0]
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            >
              {protocol}
            </motion.div>
          ))}
        </div>

        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`transmission-${i}`}
              className="absolute w-4 h-4 bg-[var(--neon-cyan)] rounded opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                clipPath: 'polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%)'
              }}
              animate={{
                x: [0, 300, -200, 150, 0],
                y: [0, -150, 200, -100, 0],
                scale: [0.6, 1.2, 0.8, 1.4, 0.6],
                rotate: [0, 120, 240, 360],
                opacity: [0.4, 1, 0.6, 1, 0.4],
              }}
              transition={{
                duration: 15 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`status-${i}`}
              className="absolute h-2 bg-gradient-to-r from-[var(--terminal-green)] via-[var(--neon-cyan)] to-[var(--neon-orange)]"
              style={{
                left: `${Math.random() * 70}%`,
                top: `${Math.random() * 80 + 10}%`,
                width: `${Math.random() * 150 + 80}px`,
              }}
              animate={{
                scaleX: [0, 1, 0.9, 1],
                opacity: [0.3, 0.8, 0.4, 0.8],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>

        {/* Communication Beam Effects */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`beam-${i}`}
              className="absolute w-1 bg-gradient-to-b from-[var(--neon-cyan)] to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${Math.random() * 200 + 100}px`,
                top: `${Math.random() * 50}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scaleY: [0.5, 1, 0.5],
                x: [-20, 20, -20],
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Holographic Contact Grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)]/4 via-transparent via-[var(--neon-orange)]/4 to-[var(--neon-magenta)]/4" />

        {/* Multiple Scan Lines for Contact */}
        {Array.from({ length: 2 }).map((_, i) => (
          <motion.div
            key={`contact-scan-${i}`}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--neon-orange)]/20 to-transparent h-8"
            animate={{ y: [-40, window.innerHeight + 40] }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2.5
            }}
          />
        ))}

        {/* Contact Success Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`contact-particle-${i}`}
              className="absolute w-2 h-2 bg-[var(--terminal-green)] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                y: [0, -80, -160],
                x: [0, Math.random() * 40 - 20, Math.random() * 80 - 40],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: Math.random() * 6,
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
            Связаться со мной
          </h2>
          <div className="text-[var(--neon-orange)] terminal-font text-lg mb-4">
            {'//'} Let's Connect
          </div>
          <div className="text-gray-400 max-w-2xl mx-auto">
            Открыт для новых возможностей и интересных проектов. <br /> Готов обсудить вашу задачу и найти лучшее решение.
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >


            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="cyber-border bg-black/60 backdrop-blur-sm p-6 rounded-lg group cursor-pointer max-h-[102.6px]"
                  onClick={() => window.open(method.href, '_blank')}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-12 h-12 rounded-lg bg-[var(--${method.color})]/20 border border-[var(--${method.color})] flex items-center justify-center group-hover:bg-[var(--${method.color})]/30 transition-colors`}
                    >
                      <Icon className={`w-6 h-6 text-[var(--${method.color})]`} />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold terminal-font text-white mb-1">
                        {method.title}
                      </h4>
                      <p className={`text-[var(--${method.color})] font-mono text-sm mb-2`}>
                        {method.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Status & Services */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Availability Status */}
            <div className="cyber-border bg-black/60 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-[var(--neon-green)] rounded-full shadow-[0_0_10px_var(--neon-green)]"
                />
                <h3 className="text-xl font-bold terminal-font text-[var(--neon-green)]">
                  СТАТУС: ОНЛАЙН
                </h3>
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Отвечаю: в течение 24 часов</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Локация: Томск, Россия (UTC+7)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Готов к новым проектам</span>
                </div>
              </div>
            </div>

            <div className="cyber-border bg-black/60 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-bold terminal-font text-[var(--neon-purple)] mb-4">
                Могу предложить:
              </h3>
              <div className="space-y-2">
                {services.map((service, index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className="w-2 h-2 bg-[var(--neon-purple)] rounded-full" />
                    <span className="font-mono text-sm">{service}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('mailto:q@r0d10n.ru', '_blank')}
                className="flex-1 bg-[var(--neon-cyan)]/20 border border-[var(--neon-cyan)] text-[var(--neon-cyan)] px-6 py-3 rounded-lg font-bold terminal-font hover:bg-[var(--neon-cyan)]/30 transition-colors"
              >
                <span className="inline-flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail w-5 h-5 mr-1.5"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  <span>ОТПРАВИТЬ ПИСЬМО</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-send w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path></svg>
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://drive.google.com/file/d/1MUarK1epDjHVBllIsHBlMcklVqw066mj/view?usp=sharing', '_blank')}
                className="flex-1 bg-[var(--neon-orange)]/20 border border-[var(--neon-orange)] text-[var(--neon-orange)] px-6 py-3 rounded-lg font-bold terminal-font hover:bg-[var(--neon-orange)]/30 transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-external-link w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
                <span>СКАЧАТЬ РЕЗЮМЕ</span>
                <motion.span
                  whileHover={{ scaleZ: 1 }}
                  whileTap={{ scale: 0.95 }}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-external-link w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CyberContactSection;
