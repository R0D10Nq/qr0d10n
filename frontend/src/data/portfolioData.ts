/**
 * Статические данные портфолио для GitHub Pages.
 * Основано на full_resume.md и эталонном сайте.
 */

import type { PersonalInfo, Project, Experience, Technology, PortfolioStats } from '../types';

export const personalInfo: PersonalInfo = {
  id: 1,
  name: 'Родион Шевцов',
  title: 'Python / Backend-oriented Fullstack Developer',
  bio: 'Middle Python / Fullstack разработчик из Томска с опытом более 3 лет. Специализируюсь на разработке надёжного бэкенда и устранении legacy-проблем. Создаю масштабируемые мультитенантные решения и оптимизирую производительность.',
  location: 'Томск, Россия',
  email: 'q@r0d10n.ru',
  phone: '+7 (953) 918-31-49',
  github_url: 'https://github.com/R0D10Nq',
  telegram_url: 'https://t.me/qr0d10n',
  avatar_url: 'https://avatars.githubusercontent.com/u/174966285?v=4',
  resume_url: '#',
  years_of_experience: 3,
  is_available_for_hire: true,
  updated_at: '2025-08-24T00:00:00Z',
};

export const personalStory = `
Я начал свой путь в программировании ещё в школе — с 4-го класса мечтал стать программистом, собирал и чинил компьютеры, интересовался технологиями и писал первые простые скрипты.

В 2019 году поступил в **Томский техникум информационных технологий (ТТИТ)** на специальность *«Разработка веб и мультимедийных приложений»*. Освоил основы Python, PHP, HTML, CSS, JS, начал знакомиться с WordPress.

Во время практики разработал полноценный корпоративный портал для ОГКУ «Центр занятости населения Томской области». Проект был принят настолько успешно, что меня **сразу взяли в штат**.

После первой работы вышел на фриланс - это был период интенсивного изучения современных технологий и перехода на Python backend. Изучил FastAPI, Docker, asyncio, работал с LLM и создавал интересные pet-проекты.

В Sinergium работал над мультитенантной платформой для ~400 стоматологических клиник, где создал систему автоматизации, которая сократила время создания лендингов с 2-3 дней до 30 минут.

Сейчас я — разработчик, который вырос от «человека, делающего WordPress-порталы» до **Python Backend/Fullstack-инженера** с реальным опытом разработки крупных production-систем.
`;

// Принципы разработки
export const principles = [
  {
    id: 1,
    icon: '🧩',
    title: 'Решение сложных задач',
    description: 'Беру на себя сложные технические вызовы — от оптимизации БД до внедрения real-time и ML. Люблю разбираться в архитектуре и находить элегантные решения.',
  },
  {
    id: 2,
    icon: '⚡',
    title: 'Автоматизация процессов',
    description: 'Пишу скрипты, management-commands, CI/CD, создаю инструменты для бизнеса. Если что-то можно автоматизировать — обязательно автоматизирую.',
  },
  {
    id: 3,
    icon: '🏗️',
    title: 'Качество кода',
    description: 'Слежу за качеством кода, люблю оптимизацию и вижу технические риски. Code review, тестирование, рефакторинг — неотъемлемая часть процесса.',
  },
];

export const experience: Experience[] = [
  {
    id: 1,
    company: 'Sinergium',
    position: 'Python / Fullstack Developer',
    description: 'Разработка мультитенантной платформы Django Landings для стоматологических клиник (~400 сайтов и ~300 UI-модулей).',
    location: 'Удалённо',
    start_date: '2024-03-01',
    end_date: '2025-08-01',
    is_current: false,
    company_url: '#',
    achievements: `
• Создание лендингов: процесс сократился с 2–3 дней до 30 минут
• Оптимизация изображений: загрузка страниц ускорена на 40%, улучшен SEO/Core Web Vitals  
• Админ-инструменты: повысил эффективность работы контент-команды на 25%
• Bookmarklet + API: диагностика страниц в 1 клик, QA начал работать в разы быстрее
• Миграция legacy: фронтенд стал единообразным и поддерживаемым
    `,
    duration_months: 17,
  },
  {
    id: 2,
    company: 'Фриланс + Pet-projects',
    position: 'Python Developer',
    description: 'Фриланс-разработка и pet-проекты. Период интенсивного изучения современных технологий и перехода на Python backend.',
    location: 'Удалённо',
    start_date: '2023-08-01',
    end_date: '2024-03-01',
    is_current: false,
    achievements: `
• Разработал FoodRadar (Django + PostGIS + Stripe)
• Создал BydlanBot с LLM и векторной памятью
• Освоил Docker, asyncio, FastAPI
• Изучил ML-интеграции и embeddings
    `,
    duration_months: 7,
  },
  {
    id: 3,
    company: 'ОГКУ «Центр занятости населения Томской области»',
    position: 'Web Developer',
    description: 'Первое место работы после защиты диплома. Разработка и поддержка корпоративного портала для сотрудников.',
    location: 'Томск',
    start_date: '2022-01-01',
    end_date: '2023-08-01',
    is_current: false,
    achievements: `
• Создал полноценный корпоративный портал как дипломный проект
• Реализовал чат сотрудников и дашборды статистики
• Настроил CI/CD и деплой на Linux-сервере
• Разработал внутренние плагины под бизнес-нужды
    `,
    duration_months: 19,
  },
];

export const technologiesByCategory = {
  backend: [
    { id: 1, name: 'Python', category: 'backend', color: '#3776ab', is_active: true },
    { id: 2, name: 'Django', category: 'backend', color: '#092e20', is_active: true },
    { id: 3, name: 'Django REST Framework', category: 'backend', color: '#092e20', is_active: true },
    { id: 4, name: 'FastAPI', category: 'backend', color: '#009688', is_active: true },
    { id: 5, name: 'Flask', category: 'backend', color: '#000000', is_active: true },
    { id: 6, name: 'Celery', category: 'backend', color: '#37b24d', is_active: true },
    { id: 7, name: 'SQLAlchemy', category: 'backend', color: '#ba1e00', is_active: true },
    { id: 8, name: 'Django Channels', category: 'backend', color: '#092e20', is_active: true },
    { id: 9, name: 'WebSockets', category: 'backend', color: '#010101', is_active: true },
    { id: 10, name: 'JWT', category: 'backend', color: '#000000', is_active: true },
  ],
  frontend: [
    { id: 11, name: 'React', category: 'frontend', color: '#61dafb', is_active: true },
    { id: 12, name: 'TypeScript', category: 'frontend', color: '#3178c6', is_active: true },
    { id: 13, name: 'Vue.js', category: 'frontend', color: '#4fc08d', is_active: true },
    { id: 14, name: 'JavaScript ES6+', category: 'frontend', color: '#f7df1e', is_active: true },
    { id: 15, name: 'HTML5', category: 'frontend', color: '#e34c26', is_active: true },
    { id: 16, name: 'SCSS', category: 'frontend', color: '#cf649a', is_active: true },
    { id: 17, name: 'Tailwind CSS', category: 'frontend', color: '#06b6d4', is_active: true },
    { id: 18, name: 'Vite', category: 'frontend', color: '#646cff', is_active: true },
    { id: 19, name: 'Webpack', category: 'frontend', color: '#8dd6f9', is_active: true },
    { id: 20, name: 'GSAP', category: 'frontend', color: '#88ce02', is_active: true },
    { id: 21, name: 'Framer Motion', category: 'frontend', color: '#0055ff', is_active: true },
    { id: 22, name: 'Swiper', category: 'frontend', color: '#6332f6', is_active: true },
  ],
  database: [
    { id: 23, name: 'PostgreSQL', category: 'database', color: '#336791', is_active: true },
    { id: 24, name: 'PostGIS', category: 'database', color: '#336791', is_active: true },
    { id: 25, name: 'Redis', category: 'database', color: '#dc382d', is_active: true },
    { id: 26, name: 'MySQL', category: 'database', color: '#4479a1', is_active: true },
    { id: 27, name: 'SQLite', category: 'database', color: '#003b57', is_active: true },
    { id: 28, name: 'MongoDB', category: 'database', color: '#47a248', is_active: true },
  ],
  devops: [
    { id: 29, name: 'Docker', category: 'devops', color: '#2496ed', is_active: true },
    { id: 30, name: 'Nginx', category: 'devops', color: '#009639', is_active: true },
    { id: 31, name: 'Gunicorn', category: 'devops', color: '#499848', is_active: true },
    { id: 32, name: 'GitLab CI/CD', category: 'devops', color: '#fc6d26', is_active: true },
    { id: 33, name: 'GitHub Actions', category: 'devops', color: '#2088ff', is_active: true },
    { id: 34, name: 'Linux', category: 'devops', color: '#fcc624', is_active: true },
    { id: 35, name: 'Fabric', category: 'devops', color: '#ff6b6b', is_active: true },
  ],
  testing: [
    { id: 36, name: 'pytest', category: 'testing', color: '#009fe3', is_active: true },
    { id: 37, name: 'coverage', category: 'testing', color: '#007ec6', is_active: true },
    { id: 38, name: 'mypy', category: 'testing', color: '#3776ab', is_active: true },
    { id: 39, name: 'ruff', category: 'testing', color: '#d7ff64', is_active: true },
    { id: 40, name: 'flake8', category: 'testing', color: '#3776ab', is_active: true },
    { id: 41, name: 'black', category: 'testing', color: '#000000', is_active: true },
    { id: 42, name: 'pre-commit', category: 'testing', color: '#fab040', is_active: true },
  ],
  ai: [
    { id: 43, name: 'ChatGPT', category: 'ai', color: '#412991', is_active: true },
    { id: 44, name: 'LM Studio', category: 'ai', color: '#ff6b6b', is_active: true },
    { id: 45, name: 'embeddings', category: 'ai', color: '#009688', is_active: true },
    { id: 46, name: 'sentence-transformers', category: 'ai', color: '#ff9800', is_active: true },
    { id: 47, name: 'Telegram bots', category: 'ai', color: '#0088cc', is_active: true },
    { id: 48, name: 'aiogram', category: 'ai', color: '#0088cc', is_active: true },
  ],
};

export const technologies: Technology[] = Object.values(technologiesByCategory).flat();

export const projects: Project[] = [
  {
    id: 1,
    title: 'FoodRadar',
    description: 'Полнофункциональная платформа для поиска и обзора ресторанов с геолокацией. Включает поиск в реальном времени, систему отзывов и рекомендаций, интеграцию с платёжными системами.',
    short_description: 'Платформа для поиска ресторанов с геолокацией',
    github_url: 'https://github.com/R0D10Nq/FoodRadar',
    demo_url: '#',
    image_url: '/foodradar-preview.jpg',
    is_featured: true,
    is_active: true,
    stars_count: 15,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-08-20T00:00:00Z',
    technologies: [
      technologiesByCategory.backend[1], // Django
      technologiesByCategory.database[1], // PostGIS
      technologiesByCategory.database[2], // Redis
      technologiesByCategory.frontend[12], // Vue.js
    ],
  },
  {
    id: 2,
    title: 'BydlanBot',
    description: 'Умный Telegram бот с искусственным интеллектом и долговременной памятью. Бот запоминает пользователей, анализирует их характер, поддерживает контекстные диалоги и имеет встроенную систему эмоций.',
    short_description: 'Умный Telegram бот с ИИ и долговременной памятью',
    github_url: 'https://github.com/R0D10Nq/BydlanBot',
    demo_url: '#',
    image_url: '/bydlanbot-preview.jpg',
    is_featured: true,
    is_active: true,
    stars_count: 8,
    created_at: '2023-09-01T00:00:00Z',
    updated_at: '2025-07-27T00:00:00Z',
    technologies: [
      technologiesByCategory.backend[0], // Python
      technologiesByCategory.ai[5], // aiogram
      technologiesByCategory.ai[0], // ChatGPT
      technologiesByCategory.ai[2], // embeddings
    ],
  },
  {
    id: 3,
    title: 'dl_proj',
    description: 'Универсальная модульная платформа для создания лендингов и сайтов любой тематики. Современная архитектура с Django бэкендом, ES6 модулями на фронтенде, SCSS стилизацией и системой сборки Vite/Webpack.',
    short_description: 'Модульная платформа для создания лендингов',
    github_url: 'https://github.com/R0D10Nq/dl_proj',
    demo_url: '#',
    image_url: '/dl-proj-preview.jpg',
    is_featured: true,
    is_active: true,
    stars_count: 12,
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2025-08-20T00:00:00Z',
    technologies: [
      technologiesByCategory.backend[1], // Django
      technologiesByCategory.frontend[14], // JavaScript ES6+
      technologiesByCategory.frontend[16], // SCSS
      technologiesByCategory.frontend[17], // Vite
    ],
  },
  {
    id: 4,
    title: 'portable_doc_search',
    description: 'Современная система полнотекстового поиска для PDF и Markdown документов. Построена на FastAPI бэкенде, SQLite FTS5 для молниеносного поиска и Vue.js фронтенде.',
    short_description: 'Система полнотекстового поиска документов',
    github_url: 'https://github.com/R0D10Nq/portable_doc_search',
    demo_url: '#',
    image_url: '/doc-search-preview.jpg',
    is_featured: true,
    is_active: true,
    stars_count: 6,
    created_at: '2024-06-01T00:00:00Z',
    updated_at: '2025-08-20T00:00:00Z',
    technologies: [
      technologiesByCategory.backend[3], // FastAPI
      technologiesByCategory.database[4], // SQLite
      technologiesByCategory.frontend[12], // Vue.js
    ],
  },
  {
    id: 5,
    title: 'ai-mood-diary-bot',
    description: 'Интеллектуальный Telegram бот для отслеживания настроения с анализом ИИ и веб-дашбордом. Анализирует эмоциональное состояние пользователя и предоставляет персональные рекомендации.',
    short_description: 'ИИ-бот для отслеживания настроения',
    github_url: 'https://github.com/R0D10Nq/ai-mood-diary-bot',
    demo_url: '#',
    image_url: '/mood-bot-preview.jpg',
    is_featured: false,
    is_active: true,
    stars_count: 4,
    created_at: '2024-07-01T00:00:00Z',
    updated_at: '2025-08-24T00:00:00Z',
    technologies: [
      technologiesByCategory.frontend[12], // Vue.js
      technologiesByCategory.ai[0], // ChatGPT
      technologiesByCategory.ai[4], // Telegram bots
    ],
  },
  {
    id: 6,
    title: 'task-manager_telegram_bot',
    description: 'Полнофункциональный менеджер задач в Telegram с современной архитектурой, Docker поддержкой и CI/CD. Позволяет создавать, управлять и отслеживать задачи прямо в Telegram.',
    short_description: 'Менеджер задач в Telegram',
    github_url: 'https://github.com/R0D10Nq/task-manager_telegram_bot',
    demo_url: '#',
    image_url: '/task-manager-preview.jpg',
    is_featured: false,
    is_active: true,
    stars_count: 3,
    created_at: '2024-05-01T00:00:00Z',
    updated_at: '2025-08-20T00:00:00Z',
    technologies: [
      technologiesByCategory.backend[0], // Python
      technologiesByCategory.ai[5], // aiogram
      technologiesByCategory.devops[0], // Docker
    ],
  },
  {
    id: 7,
    title: 'ImageProcessor',
    description: 'Профессиональное desktop-приложение для обработки изображений с графическим интерфейсом на PyQt5. Специализируется на удалении фона и водяных знаков с использованием современных алгоритмов компьютерного зрения.',
    short_description: 'Desktop-приложение для обработки изображений',
    github_url: 'https://github.com/R0D10Nq/ImageProcessor',
    demo_url: '#',
    image_url: '/image-processor-preview.jpg',
    is_featured: false,
    is_active: true,
    stars_count: 5,
    created_at: '2024-04-01T00:00:00Z',
    updated_at: '2025-08-20T00:00:00Z',
    technologies: [
      technologiesByCategory.backend[0], // Python
      { id: 99, name: 'PyQt5', category: 'frontend', color: '#41cd52', is_active: true },
      { id: 100, name: 'OpenCV', category: 'ai', color: '#5c3ee8', is_active: true },
    ],
  },
  {
    id: 8,
    title: 'timeBotPF',
    description: 'PlanFix Time Tracking Bot - Профессиональный Telegram бот для автоматизации контроля учета рабочего времени в системе PlanFix. Использует веб-скрапинг через Playwright для проверки внесенного времени.',
    short_description: 'Бот для автоматизации учета времени в PlanFix',
    github_url: 'https://github.com/R0D10Nq/timeBotPF',
    demo_url: '#',
    image_url: '/timebot-preview.jpg',
    is_featured: false,
    is_active: true,
    stars_count: 3,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2025-08-20T00:00:00Z',
    technologies: [
      technologiesByCategory.backend[0], // Python
      technologiesByCategory.ai[5], // aiogram
      { id: 101, name: 'Playwright', category: 'testing', color: '#2eac4a', is_active: true },
    ],
  },
  {
    id: 9,
    title: 'expense-tracker-bot',
    description: 'Telegram бот для учета личных расходов с аналитикой и контролем бюджета. Позволяет отслеживать траты по категориям, строить отчеты и получать insights о финансовых привычках.',
    short_description: 'Бот для учета личных расходов',
    github_url: 'https://github.com/R0D10Nq/expense-tracker-bot',
    demo_url: '#',
    image_url: '/expense-tracker-preview.jpg',
    is_featured: false,
    is_active: true,
    stars_count: 4,
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2025-08-20T00:00:00Z',
    technologies: [
      technologiesByCategory.backend[0], // Python
      technologiesByCategory.ai[5], // aiogram
      technologiesByCategory.database[4], // SQLite
    ],
  },
  {
    id: 10,
    title: 'file-search-tool',
    description: 'Мощный инструмент для поиска файлов и текста с графическим интерфейсом, созданный специально для разработчиков, работающих с большими проектами. Поддерживает регулярные выражения и многопоточный поиск.',
    short_description: 'Инструмент поиска файлов для разработчиков',
    github_url: 'https://github.com/R0D10Nq/file-search-tool',
    demo_url: '#',
    image_url: '/file-search-preview.jpg',
    is_featured: false,
    is_active: true,
    stars_count: 6,
    created_at: '2024-05-01T00:00:00Z',
    updated_at: '2025-08-20T00:00:00Z',
    technologies: [
      technologiesByCategory.backend[0], // Python
      { id: 102, name: 'Tkinter', category: 'frontend', color: '#3776ab', is_active: true },
      { id: 103, name: 'Threading', category: 'backend', color: '#ff6b6b', is_active: true },
    ],
  },
];

export const achievements = [
  {
    id: 1,
    title: 'Сайтов в мультитенантной платформе',
    value: '400+',
    description: 'Поддерживаю платформу Django Landings с более чем 400 активными сайтами стоматологических клиник',
  },
  {
    id: 2,
    title: 'UI-модулей создано',
    value: '300+',
    description: 'Разработал и поддерживаю более 300 переиспользуемых UI-компонентов для быстрого создания лендингов',
  },
  {
    id: 3,
    title: 'Ускорение загрузки',
    value: '40%',
    description: 'Оптимизировал производительность через внедрение WebP, lazy-loading и оптимизацию ассетов',
  },
  {
    id: 4,
    title: 'Эффективность команды',
    value: '25%',
    description: 'Повысил продуктивность контент-команды через создание админ-инструментов и автоматизацию',
  },
  {
    id: 5,
    title: 'Экономия времени',
    value: '95%',
    description: 'Сократил время создания лендинга с 2-3 дней до 30 минут через автоматизацию процессов',
  },
  {
    id: 6,
    title: 'Лет опыта в коммерческой разработке',
    value: '3+',
    description: 'От WordPress-порталов до Python/Django production-систем с реальными пользователями',
  },
  {
    id: 7,
    title: 'Pet-проектов с AI/ML',
    value: '5+',
    description: 'Интеграции с LLM, embeddings, векторная память, компьютерное зрение',
  },
  {
    id: 8,
    title: 'Процессов автоматизировано',
    value: '10+',
    description: 'Management-commands, CI/CD скрипты, bookmarklets, парсинг, мониторинг систем',
  },
];

export const portfolioStats: PortfolioStats = {
  projects_total: projects.length,
  projects_featured: projects.filter(p => p.is_featured).length,
  technologies_total: technologies.length,
  github_stars_total: projects.reduce((sum, p) => sum + (p.stars_count || 0), 0),
  years_of_experience: personalInfo.years_of_experience,
};

// Терминальные команды для киберпанк секции
export const terminalCommands = [
  'root@r0d10n:~$',
  '',
  'user@portfolio:~$ whoami',
  'R0D10Nq (Rodion Shevtsov) - Python/Backend Fullstack Developer',
  'Location: Tomsk, Russia | Status: Available for hire',
  'Experience: 3+ years | Goal: Senior FullStack Developer',
  '',
  'user@portfolio:~$ cat ./about.txt',
  'От мечтающего о программировании школьника',
  'до опытного Python/Fullstack разработчика.',
  'Каждый проект — это новые знания и реальные результаты.',
  '',
  'user@portfolio:~$ cat tech_stack.py',
  '',
  'class Developer:',
  '    def __init__(self, name="Rodion Shevtsov"):',
  '        self.languages = ["Python", "JavaScript", "TypeScript"]',
  '        self.frameworks = ["Django", "FastAPI", "Vue.js", "React"]',
  '        self.databases = ["PostgreSQL", "Redis", "MongoDB"]',
  '        self.tools = ["Docker", "Git", "Linux", "CI/CD"]',
  '        self.experience_years = 3+',
  '        self.goal = "Senior FullStack Developer"',
  '        self.specialization = "Backend/Fullstack"',
  '',
  '    def current_focus(self):',
  '        return [',
  '            "Scalable backend architecture",',
  '            "Performance optimization",',
  '            "AI/ML integrations",',
  '            "DevOps automation"',
  '        ]',
  '',
  'user@portfolio:~$ ls -la projects/',
  'total 10',
  'drwxr-xr-x  2 r0d10n r0d10n 4096 Aug 24 2025 .',
  'drwxr-xr-x  3 r0d10n r0d10n 4096 Aug 24 2025 ..',
  '-rw-r--r--  1 r0d10n r0d10n  512 Aug 20 2025 FoodRadar/',
  '-rw-r--r--  1 r0d10n r0d10n  256 Jul 27 2025 BydlanBot/',
  '-rw-r--r--  1 r0d10n r0d10n  384 Aug 20 2025 dl_proj/',
  '-rw-r--r--  1 r0d10n r0d10n  128 Aug 20 2025 portable_doc_search/',
  '-rw-r--r--  1 r0d10n r0d10n   64 Aug 24 2025 ai-mood-diary-bot/',
  '-rw-r--r--  1 r0d10n r0d10n   32 Aug 20 2025 task-manager_telegram_bot/',
  '',
  'user@portfolio:~$ python3 -c "print(\'Available for hire: \' + str(True))"',
  'Available for hire: True',
  '',
  'user@portfolio:~$ echo $CONTACT_INFO',
  'Telegram: @qr0d10n | Email: q@r0d10n.ru | GitHub: R0D10Nq',
  '',
  'user@portfolio:~$ uptime',
  'System uptime: 3+ years in commercial development',
  'Current status: Seeking Middle/Senior Backend opportunities',
  '',
  'user@portfolio:~$ █',
];

export const binaryCode = '1101100101011101001011111101001101111010001010001000111001000101011111000010001100010101000000111011001100011010001100011101111110110010100011000001010111011011011101010000100100010000110110001101011110001010100100001000010010000111001111011100111011001011101101101101101000111001000111110001011101011100000111100111011110100101101001010100011010000011000001011111101101010100101101001111011111100100';