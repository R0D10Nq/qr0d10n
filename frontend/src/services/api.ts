/**
 * API сервисы для взаимодействия с backend.
 * Тут все запросы к FastAPI и mock данные для GitHub Pages.
 */

import axios from 'axios';
import type {
  Portfolio,
  Project,
  ProjectList,
  ProjectFilters,
  Experience,
  Technology,
  TechnologyFilters,
  PersonalInfo,
  ContactMessage,
  ContactResponse,
  NewsletterSubscriber,
  SubscriptionResponse,
  HealthCheck,
  PortfolioStats,
} from '../types';

// Конфигурация API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const IS_GITHUB_PAGES = import.meta.env.VITE_GITHUB_PAGES === 'true';

// Создаем axios instance
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    // Если мы на GitHub Pages и API недоступен, используем mock данные
    if (IS_GITHUB_PAGES && error.code === 'ECONNABORTED') {
      console.log('Переключаемся на mock данные для GitHub Pages');
      return Promise.resolve({ data: null }); // Будет обработано в mock функциях
    }
    
    return Promise.reject(error);
  }
);

// Mock данные для GitHub Pages
const mockTechnologies: Technology[] = [
  { id: 1, name: 'Python', category: 'backend', color: '#3776ab', is_active: true },
  { id: 2, name: 'Django', category: 'backend', color: '#092e20', is_active: true },
  { id: 3, name: 'FastAPI', category: 'backend', color: '#009688', is_active: true },
  { id: 4, name: 'React', category: 'frontend', color: '#61dafb', is_active: true },
  { id: 5, name: 'TypeScript', category: 'frontend', color: '#3178c6', is_active: true },
  { id: 6, name: 'PostgreSQL', category: 'database', color: '#336791', is_active: true },
  { id: 7, name: 'Redis', category: 'database', color: '#dc382d', is_active: true },
  { id: 8, name: 'Docker', category: 'devops', color: '#2496ed', is_active: true },
];

const mockData = {
  personalInfo: {
    id: 1,
    name: 'Родион Шевцов',
    title: 'Python / Backend-oriented Fullstack Developer',
    bio: `Middle Python / Fullstack разработчик из Томска с опытом более 3 лет. 
    Специализируюсь на разработке надёжного бэкенда и устранении legacy-проблем. 
    Создаю масштабируемые мультитенантные решения и оптимизирую производительность.
    
    Люблю автоматизировать процессы, писать качественный код и изучать новые технологии.
    В pet-проектах применяю LLM и асинхронность - не боюсь экспериментировать.`,
    location: 'Томск, Россия',
    email: 'q@r0d10n.ru',
    phone: '+7 (953) 918-31-49',
    github_url: 'https://github.com/R0D10Nq',
    telegram_url: 'https://t.me/qr0d10n',
    avatar_url: 'https://avatars.githubusercontent.com/u/174966285?v=4',
    years_of_experience: 3,
    is_available_for_hire: true,
    updated_at: new Date().toISOString(),
  } as PersonalInfo,

  technologies: mockTechnologies,

  projects: [
    {
      id: 1,
      title: 'R0D10N Portfolio',
      short_description: 'Современное портфолио на React + FastAPI',
      description: 'Это портфолио - демонстрация навыков fullstack разработки с React, TypeScript, FastAPI и современными технологиями.',
      github_url: 'https://github.com/R0D10Nq/qr0d10n',
      demo_url: 'https://r0d10nq.github.io/qr0d10n',
      image_url: '/portfolio-preview.jpg',
      is_featured: true,
      is_active: true,
      stars_count: 20,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      technologies: [mockTechnologies[0], mockTechnologies[3], mockTechnologies[4]],
    },
    {
      id: 2,
      title: 'FoodRadar',
      short_description: 'Платформа для поиска ресторанов с геолокацией',
      description: 'Полнофункциональная платформа для поиска ресторанов с геолокацией в реальном времени.',
      github_url: 'https://github.com/R0D10Nq/foodradar',
      image_url: '/foodradar-preview.jpg',
      is_featured: true,
      is_active: true,
      stars_count: 15,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      technologies: [mockTechnologies[1], mockTechnologies[5], mockTechnologies[6]],
    },
  ] as Project[],

  experience: [
    {
      id: 1,
      company: 'Sinergium',
      position: 'Python / Fullstack Developer',
      description: 'Разработка мультитенантной платформы Django Landings для стоматологических клиник.',
      location: 'Удалённо',
      start_date: '2024-03-01T00:00:00Z',
      end_date: '2025-08-01T00:00:00Z',
      is_current: false,
      achievements: 'Сократил время создания лендингов с 2-3 дней до 30 минут',
      duration_months: 17,
    },
    {
      id: 2,
      company: 'Фриланс + Pet-projects',
      position: 'Python Developer',
      description: 'Фриланс-разработка и pet-проекты.',
      location: 'Удалённо',
      start_date: '2023-08-01T00:00:00Z',
      end_date: '2024-03-01T00:00:00Z',
      is_current: false,
      duration_months: 7,
    },
  ] as Experience[],
};

// API функции
export const portfolioAPI = {
  // Получение полного портфолио
  async getFullPortfolio(): Promise<Portfolio> {
    if (IS_GITHUB_PAGES) {
      return {
        personal_info: mockData.personalInfo,
        projects: mockData.projects,
        experience: mockData.experience,
        technologies: mockData.technologies,
      };
    }
    
    const response = await apiClient.get<Portfolio>('/portfolio/');
    return response.data;
  },

  // Получение личной информации
  async getPersonalInfo(): Promise<PersonalInfo> {
    if (IS_GITHUB_PAGES) {
      return mockData.personalInfo;
    }
    
    const response = await apiClient.get<PersonalInfo>('/portfolio/personal');
    return response.data;
  },

  // Получение проектов
  async getProjects(filters: ProjectFilters = {}): Promise<ProjectList> {
    if (IS_GITHUB_PAGES) {
      let filteredProjects = mockData.projects;
      
      if (filters.featured_only) {
        filteredProjects = filteredProjects.filter(p => p.is_featured);
      }
      
      const page = filters.page || 1;
      const perPage = filters.per_page || 10;
      const start = (page - 1) * perPage;
      const end = start + perPage;
      
      return {
        items: filteredProjects.slice(start, end),
        total: filteredProjects.length,
        page,
        per_page: perPage,
        pages: Math.ceil(filteredProjects.length / perPage),
      };
    }
    
    const response = await apiClient.get<ProjectList>('/portfolio/projects', {
      params: filters,
    });
    return response.data;
  },

  // Получение конкретного проекта
  async getProject(id: number): Promise<Project> {
    if (IS_GITHUB_PAGES) {
      const project = mockData.projects.find(p => p.id === id);
      if (!project) {
        throw new Error('Проект не найден');
      }
      return project;
    }
    
    const response = await apiClient.get<Project>(`/portfolio/projects/${id}`);
    return response.data;
  },

  // Получение опыта работы
  async getExperience(): Promise<Experience[]> {
    if (IS_GITHUB_PAGES) {
      return mockData.experience;
    }
    
    const response = await apiClient.get<Experience[]>('/portfolio/experience');
    return response.data;
  },

  // Получение технологий
  async getTechnologies(filters: TechnologyFilters = {}): Promise<Technology[]> {
    if (IS_GITHUB_PAGES) {
      let filteredTech = mockData.technologies;
      
      if (filters.category) {
        filteredTech = filteredTech.filter(t => 
          t.category.toLowerCase().includes(filters.category!.toLowerCase())
        );
      }
      
      return filteredTech;
    }
    
    const response = await apiClient.get<Technology[]>('/portfolio/technologies', {
      params: filters,
    });
    return response.data;
  },

  // Получение статистики
  async getStats(): Promise<PortfolioStats> {
    if (IS_GITHUB_PAGES) {
      return {
        projects_total: mockData.projects.length,
        projects_featured: mockData.projects.filter(p => p.is_featured).length,
        technologies_total: mockData.technologies.length,
        github_stars_total: mockData.projects.reduce((sum, p) => sum + (p.stars_count || 0), 0),
        years_of_experience: mockData.personalInfo.years_of_experience,
      };
    }
    
    const response = await apiClient.get<PortfolioStats>('/portfolio/stats');
    return response.data;
  },
};

export const contactAPI = {
  // Отправка сообщения
  async sendMessage(message: ContactMessage): Promise<ContactResponse> {
    if (IS_GITHUB_PAGES) {
      // На GitHub Pages просто симулируем успешную отправку
      console.log('Симуляция отправки сообщения:', message);
      return {
        success: true,
        message: 'Сообщение отправлено! (симуляция для GitHub Pages)',
        message_id: Date.now(),
      };
    }
    
    const response = await apiClient.post<ContactResponse>('/contact/message', message);
    return response.data;
  },

  // Подписка на рассылку
  async subscribe(subscriber: NewsletterSubscriber): Promise<SubscriptionResponse> {
    if (IS_GITHUB_PAGES) {
      console.log('Симуляция подписки:', subscriber);
      return {
        success: true,
        message: 'Подписка оформлена! (симуляция для GitHub Pages)',
        subscriber_id: Date.now(),
      };
    }
    
    const response = await apiClient.post<SubscriptionResponse>('/contact/subscribe', subscriber);
    return response.data;
  },
};

export const healthAPI = {
  // Проверка здоровья API
  async checkHealth(): Promise<HealthCheck> {
    if (IS_GITHUB_PAGES) {
      return {
        status: 'healthy',
        service: 'github-pages-mock',
        version: '1.0.0',
      };
    }
    
    const response = await apiClient.get<HealthCheck>('/health/');
    return response.data;
  },
};

export default apiClient;