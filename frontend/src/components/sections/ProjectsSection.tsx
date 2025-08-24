/**
 * Секция избранных проектов.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useFeaturedProjects } from '../../hooks/usePortfolio';
import { ProjectCardSkeleton } from '../Loading';
import {
  fadeIn,
  staggerContainer,
  staggerItem,
  hoverLift
} from '../../utils/animations';

const ProjectsSection: React.FC = () => {
  const { data: projects, isLoading } = useFeaturedProjects();

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
            Избранные проекты
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

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))
          ) : (
            projects?.items.map((project) => (
              <motion.div 
                key={project.id} 
                className="card group"
                variants={staggerItem}
                {...hoverLift}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
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
                <motion.h3 
                  className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2"
                  whileHover={{ color: "rgb(var(--color-primary-600))" }}
                  transition={{ duration: 0.2 }}
                >
                  {project.title}
                </motion.h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.short_description}
                </p>
                <motion.div 
                  className="flex flex-wrap gap-2 mb-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {project.technologies.slice(0, 3).map((tech) => (
                    <motion.span 
                      key={tech.id}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 rounded text-sm"
                      variants={staggerItem}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div 
                  className="flex space-x-3"
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
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      variants={staggerItem}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      GitHub
                    </motion.a>
                  )}
                  {project.demo_url && (
                    <motion.a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      variants={staggerItem}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      Demo
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;