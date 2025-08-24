/**
 * Страница проектов с фильтрацией и пагинацией.
 */

import React, { useState } from 'react';
import { useProjects } from '../hooks/usePortfolio';
import { LoadingScreen, ErrorState, EmptyState } from '../components/Loading';
import type { ProjectFilters as ProjectFiltersType } from '../types';

const ProjectsPage: React.FC = () => {
  const [filters, setFilters] = useState<ProjectFiltersType>({
    page: 1,
    per_page: 9,
  });

  const { data, isLoading, error, refetch } = useProjects(filters);

  if (isLoading) {
    return <LoadingScreen message="Загружаем проекты..." />;
  }

  if (error) {
    return (
      <ErrorState 
        message="Не удалось загрузить проекты" 
        onRetry={() => refetch()}
      />
    );
  }

  if (!data || data.items.length === 0) {
    return <EmptyState message="Проекты не найдены" />;
  }

  return (
    <div className="section">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="section-title">Мои проекты</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Здесь собраны все мои проекты - от pet-проектов до коммерческих решений.
          </p>
        </div>

        {/* Сетка проектов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((project) => (
            <div key={project.id} className="card">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {project.short_description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech.id}
                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 rounded text-sm"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;