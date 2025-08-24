/**
 * Секция опыта работы.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useExperience } from '../../hooks/usePortfolio';
import { ExperienceCardSkeleton } from '../Loading';
import {
  fadeIn,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
  hoverLift
} from '../../utils/animations';

const ExperienceSection: React.FC = () => {
  const { data: experience, isLoading } = useExperience();

  return (
    <motion.section 
      id="experience" 
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
          Опыт работы
        </motion.h2>
        <motion.div 
          className="max-w-4xl mx-auto space-y-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <ExperienceCardSkeleton key={index} />
            ))
          ) : (
            experience?.map((exp, index) => (
              <motion.div 
                key={exp.id} 
                className="card"
                variants={staggerItem}
                {...hoverLift}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="flex-1"
                    variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
                  >
                    <motion.h3 
                      className="text-xl font-semibold text-gray-900 dark:text-gray-100"
                      whileHover={{ color: "rgb(var(--color-primary-600))" }}
                      transition={{ duration: 0.2 }}
                    >
                      {exp.position}
                    </motion.h3>
                    <motion.h4 
                      className="text-lg text-primary-600 dark:text-primary-400 font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {exp.company}
                    </motion.h4>
                    <motion.p 
                      className="text-gray-600 dark:text-gray-400 mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {exp.location} • {exp.duration_months} месяцев
                    </motion.p>
                    <motion.p 
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {exp.description}
                    </motion.p>
                    {exp.achievements && (
                      <motion.div 
                        className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <h5 className="font-medium text-green-800 dark:text-green-400 mb-2">
                          Ключевые достижения:
                        </h5>
                        <p className="text-green-700 dark:text-green-300 text-sm">
                          {exp.achievements}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                  <motion.div 
                    className="flex-shrink-0"
                    variants={index % 2 === 0 ? slideFromRight : slideFromLeft}
                  >
                    <motion.span 
                      className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 rounded-full text-sm"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {new Date(exp.start_date).getFullYear()} - {exp.end_date ? new Date(exp.end_date).getFullYear() : 'Сейчас'}
                    </motion.span>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ExperienceSection;