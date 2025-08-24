/**
 * Секция опыта работы с детальной информацией.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../../data/portfolioData';
import {
  fadeIn,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerItem,
  hoverLift
} from '../../utils/animations';

const ExperienceSection: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long'
    });
  };

  const formatAchievements = (achievements: string) => {
    return achievements
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^•\s*/, '').trim());
  };

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
          Путь в разработке
        </motion.h2>
        
        <motion.p
          className="text-center text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          От мечтающего о программировании школьника до опытного Python/Fullstack разработчика. 
          Каждый этап принёс новые знания и реальные результаты.
        </motion.p>

        {/* Временная линия */}
        <div className="relative">
          {/* Линия */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800 transform md:-translate-x-0.5"></div>
          
          <motion.div 
            className="space-y-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {experience.map((exp, index) => (
              <motion.div 
                key={exp.id} 
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                variants={staggerItem}
              >
                {/* Точка на линии */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full transform -translate-x-1/2 flex items-center justify-center z-10">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                
                {/* Карточка */}
                <motion.div 
                  className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'} md:w-1/2`}
                  variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
                  {...hoverLift}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="card">
                    {/* Заголовок */}
                    <div className="mb-4">
                      <motion.h3 
                        className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1"
                        whileHover={{ color: "rgb(var(--color-primary-600))" }}
                        transition={{ duration: 0.2 }}
                      >
                        {exp.position}
                      </motion.h3>
                      <motion.h4 
                        className="text-lg text-primary-600 dark:text-primary-400 font-medium mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {exp.company}
                      </motion.h4>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>📍 {exp.location}</span>
                        <span>•</span>
                        <span>📅 {formatDate(exp.start_date)} — {exp.end_date ? formatDate(exp.end_date) : 'Сейчас'}</span>
                        <span>•</span>
                        <span>⏱️ {exp.duration_months} мес.</span>
                      </div>
                    </div>
                    
                    {/* Описание */}
                    <motion.p 
                      className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {exp.description}
                    </motion.p>
                    
                    {/* Достижения */}
                    {exp.achievements && (
                      <motion.div 
                        className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <h5 className="font-medium text-green-800 dark:text-green-400 mb-3 flex items-center">
                          🏆 Ключевые достижения:
                        </h5>
                        <ul className="space-y-2">
                          {formatAchievements(exp.achievements).map((achievement, achIndex) => (
                            <motion.li
                              key={achIndex}
                              className="text-green-700 dark:text-green-300 text-sm flex items-start"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + achIndex * 0.1, duration: 0.3 }}
                              viewport={{ once: true }}
                            >
                              <span className="text-green-500 mr-2 mt-1">✓</span>
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Статус */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 rounded-full text-sm font-medium">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            Открыт к новым возможностям • Готов к Middle/Middle+ Backend / FullStack позиции
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ExperienceSection;