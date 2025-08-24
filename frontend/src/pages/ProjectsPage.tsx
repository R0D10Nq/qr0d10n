/**
 * Страница всех проектов с детальной информацией.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, Filter } from 'lucide-react';
import { projects } from '../data/portfolioData';

type FilterType = 'all' | 'featured' | 'active' | 'completed';

const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredProjects = projects.filter(project => {
    switch (activeFilter) {
      case 'featured':
        return project.is_featured;
      case 'active':
        return project.is_active;
      case 'completed':
        return !project.is_active;
      default:
        return true;
    }
  });

  const filters = [
    { key: 'all' as FilterType, label: 'Все проекты', count: projects.length },
    { key: 'featured' as FilterType, label: 'Избранные', count: projects.filter(p => p.is_featured).length },
    { key: 'active' as FilterType, label: 'Активные', count: projects.filter(p => p.is_active).length },
    { key: 'completed' as FilterType, label: 'Завершённые', count: projects.filter(p => !p.is_active).length },
  ];

  return (
    <div className="section">
      <div className="container-custom">
        {/* Заголовок */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title">Мои проекты</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Здесь собраны все мои проекты — от pet-проектов до коммерческих решений. 
            Каждый проект рассказывает свою историю роста и развития.
          </p>
        </motion.div>

        {/* Фильтры */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Фильтр:</span>
          </div>
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </motion.div>

        {/* Сетка проектов */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className="card group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Статус и звёзды */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.is_featured 
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : project.is_active
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                  }`}>
                    {project.is_featured ? 'featured' : project.is_active ? 'active' : 'completed'}
                  </span>
                </div>
                {project.stars_count && (
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{project.stars_count}</span>
                  </div>
                )}
              </div>

              {/* Изображение */}
              {project.image_url && (
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Основная информация */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Технологии */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech.id}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 rounded-full text-sm font-medium"
                    style={{ borderLeft: `3px solid ${tech.color}` }}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>

              {/* Метаданные */}
              <div className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                Создан: {new Date(project.created_at).toLocaleDateString('ru-RU')} • 
                Обновлён: {new Date(project.updated_at).toLocaleDateString('ru-RU')}
              </div>

              {/* Ссылки */}
              <div className="flex space-x-4">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                )}
                {project.demo_url && project.demo_url !== '#' && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Информация о GitHub */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="card inline-block">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              🚀 Больше проектов на GitHub
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Полный список проектов и вкладов в open source
            </p>
            <a
              href="https://github.com/R0D10Nq?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Github className="w-5 h-5" />
              <span>Посмотреть на GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;