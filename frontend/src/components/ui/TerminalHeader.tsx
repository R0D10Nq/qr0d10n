import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TerminalHeader: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentCommand, setCurrentCommand] = useState('');
  
  const commands = [
    'whoami',
    'ls -la /projects',
    'cat /about/skills.txt',
    'git status',
    'npm run dev',
    'docker ps'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const commandTimer = setInterval(() => {
      setCurrentCommand(commands[Math.floor(Math.random() * commands.length)]);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(commandTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 left-4 z-50 bg-black/90 backdrop-blur-sm border border-[var(--neon-cyan)] rounded-lg p-3 terminal-font text-sm"
    >
      <div className="flex items-center gap-3">
        {/* Terminal Icon */}
        <div className="w-3 h-3 bg-[var(--terminal-green)] rounded-full animate-pulse"></div>
        
        {/* User and Path */}
        <span className="text-[var(--terminal-green)]">
          root@R0d10n
        </span>
        <span className="text-white">:</span>
        <span className="text-[var(--neon-cyan)]">~</span>
        <span className="text-white">$</span>
        
        {/* Current Command */}
        <motion.span
          key={currentCommand}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[var(--neon-orange)]"
        >
          {currentCommand}
        </motion.span>
        
        {/* Cursor */}
        <span className="animate-terminal-cursor text-white">_</span>
      </div>
      
      {/* Time Display */}
      <div className="mt-1 text-xs text-gray-400">
        {currentTime.toLocaleTimeString()}
      </div>
    </motion.div>
  );
};

export default TerminalHeader;
