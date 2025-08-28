import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideNavigationProps {
  sections: string[];
}

const SlideNavigation: React.FC<SlideNavigationProps> = ({ sections }) => {
  const [isVisible] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      setScrollProgress(scrollPercent * 100);

      // Calculate current section based on scroll position
      const sectionElements = sections.map((_, index) =>
        document.getElementById(`section-${index}`) ||
        document.querySelector(`[data-section="${index}"]`) ||
        document.querySelector(`section:nth-of-type(${index + 1})`)
      ).filter(Boolean);

      if (sectionElements.length > 0) {
        let newCurrentSection = 0;

        for (let i = 0; i < sectionElements.length; i++) {
          const element = sectionElements[i];
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollTop;
            const elementHeight = rect.height;

            if (scrollTop >= elementTop - window.innerHeight / 2 &&
              scrollTop < elementTop + elementHeight - window.innerHeight / 2) {
              newCurrentSection = i;
              break;
            } else if (scrollTop >= elementTop - window.innerHeight / 2) {
              newCurrentSection = i;
            }
          }
        }

        setCurrentSection(newCurrentSection);
      } else {
        // Fallback: divide scroll into equal sections
        const sectionIndex = Math.floor(scrollPercent * sections.length);
        setCurrentSection(Math.min(sectionIndex, sections.length - 1));
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentSection > 0) {
        scrollToSection(currentSection - 1);
      } else if (e.key === 'ArrowRight' && currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);

    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sections, currentSection]);

  const scrollToSection = (index: number) => {
    const sectionElement =
      document.getElementById(`section-${index}`) ||
      document.querySelector(`[data-section="${index}"]`) ||
      document.querySelector(`section:nth-of-type(${index + 1})`);

    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll to percentage of page
      const targetScroll = (index / (sections.length - 1)) * (document.documentElement.scrollHeight - window.innerHeight);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const progress = Math.max(scrollProgress, ((currentSection + 1) / sections.length) * 100);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-[63.6%] transform -translate-x-1/2 z-50"
        >
          <div className="bg-black/90 backdrop-blur-sm border border-[var(--neon-cyan)] rounded-full px-6 py-3 flex items-center gap-4">
            {/* prev btn */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className="p-2 rounded-full bg-[var(--cyber-dark)] border border-[var(--neon-cyan)] text-[var(--neon-cyan)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--neon-cyan)] hover:text-black transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            {/* Progress Bar */}
            <div className="flex items-center gap-3">
              <div className="w-32 h-1 bg-[var(--cyber-gray)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-magenta)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Section Counter */}
              <span className="terminal-font text-sm text-[var(--neon-cyan)]">
                {String(currentSection + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
              </span>
            </div>

            {/* next btn */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
              disabled={currentSection === sections.length - 1}
              className="p-2 rounded-full bg-[var(--cyber-dark)] border border-[var(--neon-cyan)] text-[var(--neon-cyan)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--neon-cyan)] hover:text-black transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Section Dots */}
          <div className="flex justify-center mt-3 gap-2">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSection
                    ? 'bg-[var(--neon-cyan)] cyber-glow'
                    : 'bg-[var(--cyber-gray)] hover:bg-[var(--neon-cyan)]/50'
                  }`}
              />
            ))}
          </div>

          {/* Section Name */}
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-2"
          >
            <span className="terminal-font text-xs text-[var(--neon-orange)]">
              {sections[currentSection]}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideNavigation;
