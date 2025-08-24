/**
 * Компонент футера с контактной информацией и ссылками.
 */

import React from 'react';
import { Github, Mail, MessageCircle, Phone } from 'lucide-react';
import { usePersonalInfo } from '../hooks/usePortfolio';

const Footer: React.FC = () => {
  const { data: personalInfo } = usePersonalInfo();

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      href: personalInfo?.github_url || 'https://github.com/R0D10Nq',
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-white',
    },
    {
      name: 'Telegram',
      href: personalInfo?.telegram_url || 'https://t.me/qr0d10n',
      icon: MessageCircle,
      color: 'hover:text-blue-500',
    },
    {
      name: 'Email',
      href: `mailto:${personalInfo?.email || 'q@r0d10n.ru'}`,
      icon: Mail,
      color: 'hover:text-red-500',
    },
    {
      name: 'Phone',
      href: `tel:${personalInfo?.phone || '+79539183149'}`,
      icon: Phone,
      color: 'hover:text-green-500',
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Информация о разработчике */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {personalInfo?.name || 'Родион Шевцов'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {personalInfo?.title || 'Python / Backend Fullstack Developer'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              📍 {personalInfo?.location || 'Томск, Россия'}
            </p>
            {personalInfo?.is_available_for_hire && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                🟢 Открыт к предложениям
              </div>
            )}
          </div>

          {/* Быстрые ссылки */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Быстрые ссылки
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="/#about" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  О себе
                </a>
              </li>
              <li>
                <a 
                  href="/#experience" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Опыт работы
                </a>
              </li>
              <li>
                <a 
                  href="/#projects" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Проекты
                </a>
              </li>
              <li>
                <a 
                  href="/#technologies" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Технологии
                </a>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Свяжитесь со мной
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors duration-200 ${link.color}`}
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            
            {/* Дополнительная контактная информация */}
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>📧 {personalInfo?.email || 'q@r0d10n.ru'}</p>
              <p>📱 {personalInfo?.phone || '+7 (953) 918-31-49'}</p>
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © {currentYear} {personalInfo?.name || 'Родион Шевцов'}. Все права защищены.
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
              <span>Сделано с ❤️ на React + FastAPI</span>
              <a 
                href={personalInfo?.github_url || 'https://github.com/R0D10Nq'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Исходный код
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;