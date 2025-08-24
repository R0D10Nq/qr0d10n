/**
 * Секция О себе с детальной личной историей.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo, personalStory, principles } from '../../data/portfolioData';

const AboutSection: React.FC = () => {
  const storyParagraphs = personalStory.trim().split('\n\n').filter(p => p.trim());

  return (
    <section id="about" className="section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">О себе</h2>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Фото и основная информация */}
            <div className="lg:col-span-1">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={personalInfo.avatar_url}
                  alt={personalInfo.name}
                  className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-primary-200 dark:border-primary-800 shadow-xl"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {personalInfo.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-4">
                  {personalInfo.title}
                </p>
                <div className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Открыт к предложениям
                </div>
              </motion.div>
            </div>

            {/* Личная история */}
            <div className="lg:col-span-2">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    🚀 Путь в IT
                  </h4>
                  <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
                    {storyParagraphs.map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        viewport={{ once: true }}
                        dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Ключевые принципы */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {principles.map((principle, index) => (
              <motion.div 
                key={principle.id}
                className="card text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl mb-4">{principle.icon}</div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {principle.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Цитата */}
          <motion.blockquote
            className="mt-12 p-6 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 rounded-r-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
              "Сейчас я ищу стабильную компанию, где смогу углубиться в backend-разработку, 
              решать серьёзные задачи и влиять на архитектуру. Я готов к самым сложным вызовам, 
              быстро обучаюсь и умею врываться в новый проект с нуля."
            </p>
            <cite className="text-primary-600 dark:text-primary-400 font-medium">
              — Родион Шевцов
            </cite>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;