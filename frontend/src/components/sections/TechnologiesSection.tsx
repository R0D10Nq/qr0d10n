/**
 * Секция технологий и навыков.
 */

import React from 'react';
import { useTechnologies } from '../../hooks/usePortfolio';
import { TechnologyBadgeSkeleton } from '../Loading';
import { TECHNOLOGY_CATEGORIES } from '../../types';

const TechnologiesSection: React.FC = () => {
  const { data: technologies, isLoading } = useTechnologies();

  // Группируем технологии по категориям
  const groupedTechnologies = technologies?.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof technologies>);

  const categoryLabels = {
    [TECHNOLOGY_CATEGORIES.BACKEND]: 'Backend',
    [TECHNOLOGY_CATEGORIES.FRONTEND]: 'Frontend',
    [TECHNOLOGY_CATEGORIES.DATABASE]: 'Базы данных',
    [TECHNOLOGY_CATEGORIES.DEVOPS]: 'DevOps',
    [TECHNOLOGY_CATEGORIES.TOOLS]: 'Инструменты',
    [TECHNOLOGY_CATEGORIES.TESTING]: 'Тестирование',
  };

  return (
    <section id="technologies" className="section bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <h2 className="section-title">Технологии и навыки</h2>
        
        {isLoading ? (
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="flex flex-wrap gap-3">
                  {Array.from({ length: 6 }).map((_, techIndex) => (
                    <TechnologyBadgeSkeleton key={techIndex} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedTechnologies || {}).map(([category, techs]) => (
              <div key={category}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {categoryLabels[category as keyof typeof categoryLabels] || category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {techs.map((tech) => (
                    <span
                      key={tech.id}
                      className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-900 dark:text-gray-100 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
                      style={{
                        borderColor: tech.color ? `${tech.color}20` : undefined,
                      }}
                    >
                      {tech.color && (
                        <span
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: tech.color }}
                        />
                      )}
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TechnologiesSection;