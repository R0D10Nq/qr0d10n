/**
 * Hero секция с приветствием и основной информацией.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail } from 'lucide-react';
import { usePersonalInfo } from '../../hooks/usePortfolio';
import { LoadingSpinner } from '../Loading';
import {
  fadeIn,
  slideUp,
  staggerContainer,
  staggerItem,
  scaleIn,
  hoverScale,
  hoverLift
} from '../../utils/animations';

const HeroSection: React.FC = () => {
  const { data: personalInfo, isLoading } = usePersonalInfo();

  if (isLoading) {
    return (
      <section className="h-screen-safe flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </section>
    );
  }

  return (
    <motion.section 
      className="h-screen-safe flex items-center justify-center gradient-bg"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="container-custom text-center">
        <motion.div 
          className="max-w-4xl mx-auto space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Аватар */}
          {personalInfo?.avatar_url && (
            <motion.div 
              className="flex justify-center"
              variants={staggerItem}
            >
              <motion.img
                src={personalInfo.avatar_url}
                alt={personalInfo.name}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl"
                variants={scaleIn}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}

          {/* Приветствие */}
          <motion.div 
            className="space-y-4"
            variants={staggerItem}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100"
              variants={slideUp}
            >
              Привет, я{' '}
              <motion.span 
                className="gradient-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {personalInfo?.name || 'Родион'}
              </motion.span>
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium"
              variants={fadeIn}
              transition={{ delay: 0.3 }}
            >
              {personalInfo?.title || 'Python / Backend Fullstack Developer'}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              {personalInfo?.bio?.split('\n')[0] || 
               'Middle Python / Fullstack разработчик из Томска с опытом более 3 лет.'}
            </motion.p>
          </motion.div>

          {/* Статус доступности */}
          {personalInfo?.is_available_for_hire && (
            <motion.div 
              className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full text-sm font-medium"
              variants={staggerItem}
              {...hoverScale}
            >
              <motion.span 
                className="w-2 h-2 bg-green-500 rounded-full mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              ></motion.span>
              Открыт к предложениям
            </motion.div>
          )}

          {/* Кнопки действий */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={staggerItem}
          >
            <motion.a
              href="#contact"
              className="btn-primary flex items-center space-x-2"
              {...hoverScale}
              {...hoverLift}
            >
              <Mail className="w-5 h-5" />
              <span>Связаться со мной</span>
            </motion.a>
            
            {personalInfo?.resume_url && (
              <motion.a
                href={personalInfo.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center space-x-2"
                {...hoverScale}
                {...hoverLift}
              >
                <Download className="w-5 h-5" />
                <span>Скачать резюме</span>
              </motion.a>
            )}
          </motion.div>

          {/* Социальные ссылки */}
          <motion.div 
            className="flex items-center justify-center space-x-6"
            variants={staggerItem}
          >
            {personalInfo?.github_url && (
              <motion.a
                href={personalInfo.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                GitHub
              </motion.a>
            )}
            {personalInfo?.telegram_url && (
              <motion.a
                href={personalInfo.telegram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Telegram
              </motion.a>
            )}
            {personalInfo?.email && (
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Email
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* Индикатор прокрутки */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [0, 10, 0],
            opacity: 1
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            opacity: { delay: 1, duration: 0.5 }
          }}
          initial={{ opacity: 0 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;