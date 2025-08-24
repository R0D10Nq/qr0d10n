/**
 * Секция опыта работы.
 */

import React from 'react';
import { useExperience } from '../../hooks/usePortfolio';
import { ExperienceCardSkeleton } from '../Loading';

const ExperienceSection: React.FC = () => {
  const { data: experience, isLoading } = useExperience();

  return (
    <section id="experience" className="section bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <h2 className="section-title">Опыт работы</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <ExperienceCardSkeleton key={index} />
            ))
          ) : (
            experience?.map((exp) => (
              <div key={exp.id} className="card">
                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {exp.position}
                    </h3>
                    <h4 className="text-lg text-primary-600 dark:text-primary-400 font-medium">
                      {exp.company}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {exp.location} • {exp.duration_months} месяцев
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                    {exp.achievements && (
                      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h5 className="font-medium text-green-800 dark:text-green-400 mb-2">
                          Ключевые достижения:
                        </h5>
                        <p className="text-green-700 dark:text-green-300 text-sm">
                          {exp.achievements}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 rounded-full text-sm">
                      {new Date(exp.start_date).getFullYear()} - {exp.end_date ? new Date(exp.end_date).getFullYear() : 'Сейчас'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;