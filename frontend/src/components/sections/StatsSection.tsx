/**
 * Секция со статистикой портфолио.
 */

import React from 'react';
import { usePortfolioStats } from '../../hooks/usePortfolio';
import { LoadingSpinner } from '../Loading';

const StatsSection: React.FC = () => {
  const { data: stats, isLoading } = usePortfolioStats();

  if (isLoading) {
    return (
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container-custom text-center">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  const statItems = [
    {
      label: 'Лет опыта',
      value: stats?.years_of_experience || 3,
      suffix: '+',
    },
    {
      label: 'Проектов',
      value: stats?.projects_total || 0,
    },
    {
      label: 'Технологий',
      value: stats?.technologies_total || 0,
    },
    {
      label: 'GitHub звезд',
      value: stats?.github_stars_total || 0,
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {item.value}{item.suffix}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;