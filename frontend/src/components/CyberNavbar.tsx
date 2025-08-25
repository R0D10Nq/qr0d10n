import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Menu, X } from 'lucide-react';

const CyberNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'ГЛАВНАЯ', href: '/', command: 'cd ~/' },
    { name: 'ПРОЕКТЫ', href: '/projects', command: 'ls projects/' },
    { name: 'КОНТАКТЫ', href: '/contact', command: 'ping contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-md cyber-border-b' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Terminal Header Bar */}
      <div className="h-8 bg-[var(--cyber-dark)] border-b border-[var(--cyber-border)] flex items-center px-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-[var(--terminal-green)]" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs terminal-font text-gray-400">
            NAVIGATION_SYSTEM v2.1.0 - READY
          </span>
        </div>
      </div>

      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <Link 
              to="/" 
              className="flex items-center gap-2 group"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 cyber-border rounded bg-[var(--neon-cyan)]/10 flex items-center justify-center"
              >
                <Terminal className="w-4 h-4 text-[var(--neon-cyan)]" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold terminal-font text-[var(--neon-cyan)] group-hover:animate-glitch">
                  R0D10N
                </span>
                <span className="text-xs terminal-font text-[var(--neon-orange)] -mt-1">
                  {'>'} SYSTEM_ONLINE
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2 }}
                className="relative group"
              >
                <Link
                  to={item.href}
                  className={`relative terminal-font font-bold text-sm transition-all duration-300 hover:text-[var(--neon-cyan)] ${
                    isActive(item.href)
                      ? 'text-[var(--neon-cyan)] animate-neon-glow'
                      : 'text-gray-300'
                  }`}
                >
                  {item.name}
                  
                  {/* Active indicator */}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[var(--neon-cyan)] cyber-glow"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Hover tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    whileHover={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black border border-[var(--neon-cyan)] rounded text-xs terminal-font text-[var(--neon-cyan)] whitespace-nowrap pointer-events-none"
                  >
                    $ {item.command}
                  </motion.div>
                </Link>

                {/* Scan line effect on hover */}
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileHover={{ opacity: 1, x: 100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 w-1 h-full bg-[var(--neon-cyan)] opacity-50 pointer-events-none"
                />
              </motion.div>
            ))}

            {/* System Status */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-2 cyber-border rounded bg-[var(--cyber-dark)]/50"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[var(--terminal-green)]"
              />
              <span className="text-xs terminal-font text-[var(--terminal-green)]">
                ONLINE
              </span>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.button
              onClick={toggleMenu}
              className="p-2 cyber-border rounded bg-[var(--cyber-dark)]/50 text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden py-4 border-t border-[var(--cyber-border)]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="flex flex-col space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 rounded terminal-font font-bold transition-all duration-300 ${
                        isActive(item.href)
                          ? 'cyber-border bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] cyber-glow'
                          : 'text-gray-300 hover:text-[var(--neon-cyan)] hover:bg-[var(--cyber-dark)]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        <span className="text-xs text-[var(--neon-orange)]">
                          $ {item.command}
                        </span>
                      </div>
                      {isActive(item.href) && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          className="h-0.5 bg-[var(--neon-cyan)] mt-2 cyber-glow"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Status */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="px-4 py-2 flex items-center justify-between text-xs terminal-font"
                >
                  <span className="text-gray-400">SYSTEM_STATUS:</span>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-[var(--terminal-green)]"
                    />
                    <span className="text-[var(--terminal-green)]">OPERATIONAL</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glitch effect overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 5 }}
        className="absolute inset-0 bg-[var(--neon-cyan)] mix-blend-screen pointer-events-none"
      />

      {/* Scan line */}
      <motion.div
        animate={{ x: [-100, window.innerWidth + 100] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 7 }}
        className="absolute top-0 w-1 h-full bg-gradient-to-b from-transparent via-[var(--neon-cyan)] to-transparent opacity-30 pointer-events-none"
      />
    </motion.nav>
  );
};

export default CyberNavbar;
