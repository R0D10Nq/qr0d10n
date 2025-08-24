/**
 * Киберпанк терминальная секция в стиле эталонного портфолио.
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { terminalCommands, binaryCode } from '../../data/portfolioData';

const TerminalSection: React.FC = () => {
  const [displayedCommands, setDisplayedCommands] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < terminalCommands.length) {
      const timer = setTimeout(() => {
        setDisplayedCommands(prev => [...prev, terminalCommands[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <section className="section bg-gray-900 text-green-400 font-mono overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Терминал */}
          <motion.div 
            className="bg-black border border-green-400/30 rounded-lg p-6 shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4 text-green-400/70 text-sm">Terminal - R0D10N</div>
            </div>
            
            <div className="space-y-2 text-sm">
              {displayedCommands.map((command, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`${
                    command.startsWith('root@') || command.startsWith('user@') 
                      ? 'text-green-400' 
                      : command.includes('Developer') || command.includes('Location')
                      ? 'text-cyan-300'
                      : command.startsWith('class ') || command.startsWith('    def ')
                      ? 'text-yellow-300'
                      : command.includes('.py') || command.includes('/')
                      ? 'text-blue-300'
                      : 'text-green-300'
                  }`}
                >
                  {command || '\u00A0'}
                </motion.div>
              ))}
              {currentIndex < terminalCommands.length && (
                <div className="flex">
                  <span className="text-green-400">█</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-1"
                  >
                    ▊
                  </motion.span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Бинарный код и описание */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                🐍⚡🔥🚀
              </h2>
              <div className="text-green-400/60 text-xs font-mono leading-tight mb-6 overflow-hidden">
                <motion.div
                  animate={{ x: [0, -100] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="whitespace-nowrap"
                >
                  {binaryCode}
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">
                // Technology Arsenal
              </h3>
            </div>

            <div className="space-y-4 text-gray-300">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white">Status:</span>
                <span className="text-green-400">Available for hire</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-white">Experience:</span>
                <span className="text-blue-300">3+ years</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-white">Location:</span>
                <span className="text-yellow-300">Tomsk, Russia</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-white">Goal:</span>
                <span className="text-purple-300">Senior FullStack Developer</span>
              </div>
            </div>

            <motion.div
              className="mt-8 p-4 border border-green-400/20 rounded-lg bg-green-400/5"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-green-400 font-mono text-sm">
                rodion@workstation:~/projects$ cat main_stack.py
              </div>
              <div className="mt-2 text-xs text-gray-400">
                <span className="text-blue-300">01</span> class Developer:<br/>
                <span className="text-blue-300">02</span> &nbsp;&nbsp;def __init__(self, name='Rodion Shevtsov'):<br/>
                <span className="text-blue-300">03</span> &nbsp;&nbsp;&nbsp;&nbsp;self.languages = ['Python', 'JavaScript', 'TypeScript']<br/>
                <span className="text-blue-300">04</span> &nbsp;&nbsp;&nbsp;&nbsp;self.frameworks = ['Django', 'FastAPI', 'Vue.js', 'React']<br/>
                <span className="text-blue-300">05</span> &nbsp;&nbsp;&nbsp;&nbsp;self.experience_years = 3+<br/>
                <span className="text-blue-300">06</span> &nbsp;&nbsp;&nbsp;&nbsp;self.goal = 'Senior FullStack Developer'
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TerminalSection;