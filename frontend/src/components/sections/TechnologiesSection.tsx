/**
 * Секция технологий, разбитых по категориям как в эталонном портфолио.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { technologiesByCategory } from '../../data/portfolioData';

interface TechCategoryProps {
  title: string;
  description: string;
  technologies: Array<{ name: string; color: string }>;
  delay: number;
}

const TechCategory: React.FC<TechCategoryProps> = ({ title, description, technologies, delay }) => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {technologies.map((tech, index) => (
          <motion.span
            key={tech.name}
            className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-900 dark:text-gray-100 transition-all duration-200 cursor-pointer"
            style={{ 
              borderColor: `${tech.color}20`,
            }}
            whileHover={{ 
              scale: 1.05,
              borderColor: tech.color,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: delay + index * 0.1 }}
            viewport={{ once: true }}
          >
            <span 
              className="w-2 h-2 rounded-full mr-2" 
              style={{ backgroundColor: tech.color }}
            />
            {tech.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const TechnologiesSection: React.FC = () => {
  const categories = [
    {
      title: 'Backend Development',
      description: 'Создание надёжных API и серверной логики с акцентом на производительность и масштабируемость',
      technologies: technologiesByCategory.backend.map(tech => ({ name: tech.name, color: tech.color || '#6366f1' })),
    },
    {
      title: 'Frontend Development', 
      description: 'Современные пользовательские интерфейсы с фокусом на UX и производительность',
      technologies: technologiesByCategory.frontend.map(tech => ({ name: tech.name, color: tech.color || '#6366f1' })),
    },
    {
      title: 'Database & Cache',
      description: 'Проектирование и оптимизация баз данных, кэширование для высокой производительности',
      technologies: technologiesByCategory.database.map(tech => ({ name: tech.name, color: tech.color || '#6366f1' })),
    },
    {
      title: 'DevOps & Infrastructure',
      description: 'Автоматизация развёртывания и мониторинг production-систем',
      technologies: technologiesByCategory.devops.map(tech => ({ name: tech.name, color: tech.color || '#6366f1' })),
    },
    {
      title: 'Quality Assurance',
      description: 'Обеспечение качества кода через тестирование и статический анализ',
      technologies: technologiesByCategory.testing.map(tech => ({ name: tech.name, color: tech.color || '#6366f1' })),
    },
    {
      title: 'AI & Automation',
      description: 'Интеграция LLM и автоматизация рутинных процессов',
      technologies: technologiesByCategory.ai.map(tech => ({ name: tech.name, color: tech.color || '#6366f1' })),
    },
  ];

  return (
    <section id="technologies" className="section bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Технологии и навыки</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Более 3 лет опыта разработки на Python/Django. Специализируюсь на backend-разработке, 
            но также владею frontend-технологиями и DevOps-практиками.
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, index) => (
            <TechCategory
              key={category.title}
              title={category.title}
              description={category.description}
              technologies={category.technologies}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Код секция внизу */}
        <motion.div
          className="mt-16 bg-gray-900 dark:bg-gray-800 rounded-xl p-8 font-mono text-sm overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-green-400 mb-4">
            rodion@workstation:~/projects$ cat main_stack.py
          </div>
          <div className="space-y-1 text-gray-300">
            <div><span className="text-blue-400">01</span> <span className="text-purple-400">class</span> <span className="text-yellow-400">Developer</span>:</div>
            <div><span className="text-blue-400">02</span> &nbsp;&nbsp;<span className="text-purple-400">def</span> <span className="text-yellow-400">__init__</span>(<span className="text-red-400">self</span>, <span className="text-cyan-400">name</span>=<span className="text-green-300">'Rodion Shevtsov'</span>):</div>
            <div><span className="text-blue-400">03</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-400">self</span>.<span className="text-cyan-400">languages</span> = [<span className="text-green-300">'Python'</span>, <span className="text-green-300">'JavaScript'</span>, <span className="text-green-300">'TypeScript'</span>]</div>
            <div><span className="text-blue-400">04</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-400">self</span>.<span className="text-cyan-400">frameworks</span> = [<span className="text-green-300">'Django'</span>, <span className="text-green-300">'FastAPI'</span>, <span className="text-green-300">'Vue.js'</span>, <span className="text-green-300">'React'</span>]</div>
            <div><span className="text-blue-400">05</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-400">self</span>.<span className="text-cyan-400">experience_years</span> = <span className="text-orange-400">3+</span></div>
            <div><span className="text-blue-400">06</span> &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-400">self</span>.<span className="text-cyan-400">goal</span> = <span className="text-green-300">'Senior FullStack Developer'</span></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologiesSection;