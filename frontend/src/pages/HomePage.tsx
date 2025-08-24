/**
 * Главная страница портфолио.
 * Содержит hero секцию, информацию о себе, опыт работы, проекты и навыки.
 */

import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import TechnologiesSection from '../components/sections/TechnologiesSection';
import StatsSection from '../components/sections/StatsSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero секция */}
      <HeroSection />
      
      {/* Статистика */}
      <StatsSection />
      
      {/* О себе */}
      <AboutSection />
      
      {/* Опыт работы */}
      <ExperienceSection />
      
      {/* Избранные проекты */}
      <ProjectsSection />
      
      {/* Технологии */}
      <TechnologiesSection />
    </div>
  );
};

export default HomePage;