/**
 * Секция технологий и навыков.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useTechnologies } from '../../hooks/usePortfolio';
import { TechnologyBadgeSkeleton } from '../Loading';
import { TECHNOLOGY_CATEGORIES } from '../../types';
import {
  fadeIn,
  slideFromLeft,
  staggerContainer,
  staggerItem,
  hoverScale
} from '../../utils/animations';

const TechnologiesSection: React.FC = () => {
  const { data: technologies, isLoading } = useTechnologies();

  // Группируем технологии по категориям
  const groupedTechnologies = technologies?.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof technologies>);

  const categoryLabels = {
    [TECHNOLOGY_CATEGORIES.BACKEND]: 'Backend',
    [TECHNOLOGY_CATEGORIES.FRONTEND]: 'Frontend',
    [TECHNOLOGY_CATEGORIES.DATABASE]: 'Базы данных',
    [TECHNOLOGY_CATEGORIES.DEVOPS]: 'DevOps',
    [TECHNOLOGY_CATEGORIES.TOOLS]: 'Инструменты',
    [TECHNOLOGY_CATEGORIES.TESTING]: 'Тестирование',
  };

  return (
    <motion.section 
      id="technologies" 
      className="section bg-gray-50 dark:bg-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <div className="container-custom">
        <motion.h2 
          className="section-title"
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Технологии и навыки
        </motion.h2>
        
        {isLoading ? (
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="flex flex-wrap gap-3">
                  {Array.from({ length: 6 }).map((_, techIndex) => (
                    <TechnologyBadgeSkeleton key={techIndex} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {Object.entries(groupedTechnologies || {}).map(([category, techs], categoryIndex) => (
              <motion.div 
                key={category}
                variants={staggerItem}
              >
                <motion.h3 
                  className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {categoryLabels[category as keyof typeof categoryLabels] || category}
                </motion.h3>
                <motion.div 
                  className="flex flex-wrap gap-3"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {techs.map((tech) => (
                    <motion.span
                      key={tech.id}
                      className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-900 dark:text-gray-100 hover:border-primary-300 dark:hover:border-primary-600 transition-colors cursor-pointer"
                      style={{
                        borderColor: tech.color ? `${tech.color}20` : undefined,
                      }}
                      variants={staggerItem}
                      {...hoverScale}
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: tech.color || 'rgb(var(--color-primary-300))',
                        backgroundColor: tech.color ? `${tech.color}10` : undefined
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech.color && (
                        <motion.span
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: tech.color }}
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      {tech.name}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default TechnologiesSection;