/**
 * Секция со статистикой портфолио.
 */

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePortfolioStats } from '../../hooks/usePortfolio';
import { LoadingSpinner } from '../Loading';
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
  const { data: stats, isLoading } = usePortfolioStats();

  if (isLoading) {
    return (
      <motion.section 
        className="py-16 bg-white dark:bg-gray-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-custom text-center">
          <LoadingSpinner size="lg" />
        </div>
      </motion.section>
    );
  }

  const statItems = [
    {
      label: 'Лет опыта',
      value: stats?.years_of_experience || 3,
      suffix: '+',
    },
    {
      label: 'Проектов',
      value: stats?.projects_total || 0,
    },
    {
      label: 'Технологий',
      value: stats?.technologies_total || 0,
    },
    {
      label: 'GitHub звезд',
      value: stats?.github_stars_total || 0,
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
              className="text-center"
              variants={staggerItem}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
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
      </div>
    </motion.section>
  );
};

export default StatsSection;