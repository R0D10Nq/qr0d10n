/**
 * Секция ключевых достижений с конкретными метриками.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../../data/portfolioData';

const AchievementsSection: React.FC = () => {
  return (
    <section className="section bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Результаты и достижения</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Конкретные результаты работы, которые принесли реальную пользу проектам и командам.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className="card text-center group hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-4"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                {achievement.value}
              </motion.div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {achievement.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Дополнительные детали достижений */}
        <motion.div
          className="mt-16 space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Автоматизация создания лендингов
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Разработал систему, которая сократила время создания лендинга с 2-3 дней до 30 минут
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Время создания:</span>
                  <span className="font-medium text-primary-600 dark:text-primary-400">2-3 дня → 30 минут</span>
                </div>
                <div className="flex justify-between">
                  <span>Экономия времени:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">95%</span>
                </div>
                <div className="flex justify-between">
                  <span>Увеличение производительности:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">команды</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Оптимизация производительности
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Ускорил загрузку страниц на 40% через оптимизацию изображений и внедрение WebP
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Загрузка страниц:</span>
                  <span className="font-medium text-primary-600 dark:text-primary-400">+40% быстрее</span>
                </div>
                <div className="flex justify-between">
                  <span>SEO-показатели:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">улучшены</span>
                </div>
                <div className="flex justify-between">
                  <span>Core Web Vitals:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">оптимизированы</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Мультитенантная платформа
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Поддерживаю платформу с 400+ сайтами и 300+ UI-модулями, обеспечивая стабильную работу и масштабируемость
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">400+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Сайтов</div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">300+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">UI-модулей</div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">25%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Эффективность</div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">1 клик</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Диагностика</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;