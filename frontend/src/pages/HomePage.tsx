/**
 * Главная страница портфолио.
 * Содержит все основные секции в стиле эталонного портфолио.
 */

import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import TerminalSection from '../components/sections/TerminalSection';
import AboutSection from '../components/sections/AboutSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import TechnologiesSection from '../components/sections/TechnologiesSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import AchievementsSection from '../components/sections/AchievementsSection';
import StatsSection from '../components/sections/StatsSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero секция */}
      <HeroSection />
      
      {/* Киберпанк терминал */}
      <TerminalSection />
      
      {/* О себе с личной историей */}
      <AboutSection />
      
      {/* Опыт работы */}
      <ExperienceSection />
      
      {/* Технологии по категориям */}
      <TechnologiesSection />
      
      {/* Избранные проекты */}
      <ProjectsSection />
      
      {/* Достижения с метриками */}
      <AchievementsSection />
      
      {/* Статистика */}
      <StatsSection />
    </div>
  );
};

export default HomePage;