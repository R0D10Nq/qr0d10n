/**
 * Секция О себе.
 */

import React from 'react';
import { usePersonalInfo } from '../../hooks/usePortfolio';

const AboutSection: React.FC = () => {
  const { data: personalInfo } = usePersonalInfo();

  return (
    <section id="about" className="section">
      <div className="container-custom">
        <h2 className="section-title">О себе</h2>
        <div className="max-w-4xl mx-auto">
          <div className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
            {personalInfo?.bio?.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            )) || (
              <p>Информация загружается...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;