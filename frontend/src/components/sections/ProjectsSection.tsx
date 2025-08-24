/**
 * Секция избранных проектов с детальной информацией.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ExternalLink, Github } from 'lucide-react';
import { projects } from '../../data/portfolioData';
import {
  fadeIn,
  staggerContainer,
  staggerItem,
  hoverLift
} from '../../utils/animations';

const ProjectsSection: React.FC = () => {
  const featuredProjects = projects.filter(project => project.is_featured);

  return (
    <motion.section 
      id="projects" 
      className="section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <div className="container-custom">
        <motion.div 
          className="flex items-center justify-between mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="section-title mb-0"
            variants={staggerItem}
          >
            Проекты и достижения
          </motion.h2>
          <motion.div variants={staggerItem}>
            <Link 
              to="/projects"
              className="btn-outline flex items-center space-x-2"
            >
              <span>Все проекты</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.p
          className="text-center text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Избранные проекты, демонстрирующие опыт работы с современными технологиями и решение реальных задач.
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {featuredProjects.map((project) => (
            <motion.div 
              key={project.id} 
              className="card group"
              variants={staggerItem}
              {...hoverLift}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* Статус и звезды */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.is_active 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                  }`}>
                    {project.is_active ? 'active' : 'completed'}
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
                <motion.div 
                  className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              )}

              {/* Основная информация */}
              <motion.h3 
                className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2"
                whileHover={{ color: "rgb(var(--color-primary-600))" }}
                transition={{ duration: 0.2 }}
              >
                {project.title}
              </motion.h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Технологии */}
              <motion.div 
                className="flex flex-wrap gap-2 mb-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {project.technologies.map((tech) => (
                  <motion.span 
                    key={tech.id}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 rounded-full text-sm font-medium"
                    style={{ borderLeft: `3px solid ${tech.color}` }}
                    variants={staggerItem}
                    whileHover={{ scale: 1.05, backgroundColor: tech.color + '20' }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </motion.div>

              {/* Ключевые особенности */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Ключевые особенности:
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {project.id === 1 && ( // FoodRadar
                    <>
                      <li>• Поиск в реальном времени с геолокацией</li>
                      <li>• Система отзывов и рекомендаций</li>
                      <li>• Интеграция с платёжными системами</li>
                    </>
                  )}
                  {project.id === 2 && ( // BydlanBot
                    <>
                      <li>• Контекстные диалоги с памятью пользователей</li>
                      <li>• LLM интеграция для генерации ответов</li>
                      <li>• Анализ характера пользователей</li>
                    </>
                  )}
                  {project.id === 3 && ( // dl_proj
                    <>
                      <li>• 300+ готовых UI-модулей</li>
                      <li>• Современная система сборки</li>
                      <li>• BEM методология для стилей</li>
                    </>
                  )}
                  {project.id === 4 && ( // portable_doc_search
                    <>
                      <li>• Многопоточный поиск файлов</li>
                      <li>• Поддержка регулярных выражений</li>
                      <li>• Интуитивный GUI интерфейс</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Кнопки действий */}
              <motion.div 
                className="flex space-x-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {project.github_url && (
                  <motion.a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    variants={staggerItem}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </motion.a>
                )}
                {project.demo_url && project.demo_url !== '#' && (
                  <motion.a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    variants={staggerItem}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Demo</span>
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Статистика проектов */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="p-4">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {projects.length}+
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Репозиториев</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {featuredProjects.length}+
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Проектов</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              8+
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Языков</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {projects.reduce((sum, p) => sum + (p.stars_count || 0), 0)}+
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">GitHub звёзд</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;