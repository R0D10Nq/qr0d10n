/**
 * Главная страница портфолио.
 * Содержит все основные секции в стиле эталонного портфолио.
 */

import React from 'react';
import CyberHeroSection from '../components/sections/CyberHeroSection';
import CyberTechStack from '../components/sections/CyberTechStack';
import CyberJourney from '../components/sections/CyberJourney';
import ProjectsSection from '../components/sections/ProjectsSection';
import CyberAchievements from '../components/sections/CyberAchievements';
import CyberContactSection from '../components/sections/CyberContactSection';
import SlideNavigation from '../components/ui/SlideNavigation';

const HomePage: React.FC = () => {
  const sections = [
    'INITIALIZATION',
    'TECH_STACK', 
    'JOURNEY',
    'PROJECTS',
    'ACHIEVEMENTS',
    'CONTACT'
  ];

  return (
    <div className="min-h-screen bg-[var(--cyber-dark)] relative">
      <div id="section-0">
        <CyberHeroSection />
      </div>
      <div id="section-1">
        <CyberTechStack />
      </div>
      <div id="section-2">
        <CyberJourney />
      </div>
      <div id="section-3">
        <ProjectsSection />
      </div>
      <div id="section-4">
        <CyberAchievements />
      </div>
      <div id="section-5">
        <CyberContactSection />
      </div>
      
      <SlideNavigation 
        sections={sections}
      />
    </div>
  );
};

export default HomePage;