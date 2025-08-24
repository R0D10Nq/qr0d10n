/**
 * Hero секция с приветствием и основной информацией.
 */

import React from 'react';
import { ChevronDown, Download, Mail } from 'lucide-react';
import { usePersonalInfo } from '../../hooks/usePortfolio';
import { LoadingSpinner } from '../Loading';

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
    <section className="h-screen-safe flex items-center justify-center gradient-bg">
      <div className="container-custom text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Аватар */}
          {personalInfo?.avatar_url && (
            <div className="flex justify-center">
              <img
                src={personalInfo.avatar_url}
                alt={personalInfo.name}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl animate-float"
              />
            </div>
          )}

          {/* Приветствие */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100">
              Привет, я{' '}
              <span className="gradient-text">
                {personalInfo?.name || 'Родион'}
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium">
              {personalInfo?.title || 'Python / Backend Fullstack Developer'}
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {personalInfo?.bio?.split('\n')[0] || 
               'Middle Python / Fullstack разработчик из Томска с опытом более 3 лет.'}
            </p>
          </div>

          {/* Статус доступности */}
          {personalInfo?.is_available_for_hire && (
            <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Открыт к предложениям
            </div>
          )}

          {/* Кнопки действий */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="btn-primary flex items-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Связаться со мной</span>
            </a>
            
            {personalInfo?.resume_url && (
              <a
                href={personalInfo.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Скачать резюме</span>
              </a>
            )}
          </div>

          {/* Социальные ссылки */}
          <div className="flex items-center justify-center space-x-6">
            {personalInfo?.github_url && (
              <a
                href={personalInfo.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                GitHub
              </a>
            )}
            {personalInfo?.telegram_url && (
              <a
                href={personalInfo.telegram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Telegram
              </a>
            )}
            {personalInfo?.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Email
              </a>
            )}
          </div>
        </div>

        {/* Индикатор прокрутки */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;