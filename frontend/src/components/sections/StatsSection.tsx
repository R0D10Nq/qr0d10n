/**
 * Секция со статистикой портфолио.
 */

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioStats } from '../../data/portfolioData';
import {
  fadeIn,
  staggerContainer,
  staggerItem
} from '../../utils/animations';

// Компонент для анимированного счетчика
const AnimatedCounter: React.FC<{ value: number; suffix?: string; duration?: number }> = ({ 
  value, 
  suffix = '', 
  duration = 2 
}) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOut * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2"
      initial={{ scale: 0 }}
      animate={isInView ? { scale: 1 } : { scale: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      {count}{suffix}
    </motion.div>
  );
};

const StatsSection: React.FC = () => {
  const statItems = [
    {
      label: 'Лет опыта',
      value: portfolioStats.years_of_experience,
      suffix: '+',
      icon: '📅',
    },
    {
      label: 'Проектов',
      value: portfolioStats.projects_total,
      icon: '🛠️',
    },
    {
      label: 'Технологий',
      value: portfolioStats.technologies_total,
      icon: '⚡',
    },
    {
      label: 'GitHub звёзд',
      value: portfolioStats.github_stars_total,
      icon: '⭐',
    },
  ];

  return (
    <motion.section 
      className="py-16 bg-gray-50 dark:bg-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <div className="container-custom">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {statItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="text-center group cursor-pointer"
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300"
                initial={{ rotateY: 0 }}
                whileHover={{ rotateY: 360 }}
                transition={{ duration: 0.6 }}
              >
                {item.icon}
              </motion.div>
              <AnimatedCounter 
                value={item.value} 
                suffix={item.suffix} 
                duration={2 + index * 0.2}
              />
              <motion.div 
                className="text-gray-600 dark:text-gray-400 font-medium"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {item.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            От мечтающего о программировании школьника до опытного <strong>Python/Fullstack разработчика</strong>. 
            Каждый проект — это новые знания и реальные результаты.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default StatsSection;