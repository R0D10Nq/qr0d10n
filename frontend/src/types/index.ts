/**
 * TypeScript типы для портфолио API.
 * Соответствуют Pydantic схемам в backend.
 */

// Базовые типы
export interface Technology {
  id: number;
  name: string;
  category: string;
  color?: string;
  icon?: string;
  is_active: boolean;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  short_description: string;
  github_url?: string;
  demo_url?: string;
  image_url?: string;
  is_featured: boolean;
  is_active: boolean;
  stars_count?: number;
  created_at: string;
  updated_at: string;
  technologies: Technology[];
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  location: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  company_url?: string;
  achievements?: string;
  duration_months: number;
}

export interface PersonalInfo {
  id: number;
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  github_url?: string;
  telegram_url?: string;
  avatar_url?: string;
  resume_url?: string;
  years_of_experience: number;
  is_available_for_hire: boolean;
  updated_at: string;
}

export interface Portfolio {
  personal_info: PersonalInfo;
  projects: Project[];
  experience: Experience[];
  technologies: Technology[];
}

// Пагинация
export interface ProjectList {
  items: Project[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
}

// Контактные формы
export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  message_id?: number;
}

export interface NewsletterSubscriber {
  email: string;
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  subscriber_id?: number;
}

// API ответы
export interface HealthCheck {
  status: string;
  service: string;
  database?: string;
  timestamp?: string;
  python_version?: string;
  memory_usage?: {
    total: number;
    available: number;
    percent: number;
  };
  cpu_usage?: number;
  uptime?: string;
  version?: string;
}

export interface PortfolioStats {
  projects_total: number;
  projects_featured: number;
  technologies_total: number;
  github_stars_total: number;
  years_of_experience: number;
}

// Фильтры и параметры
export interface ProjectFilters {
  featured_only?: boolean;
  technology?: string;
  page?: number;
  per_page?: number;
}

export interface TechnologyFilters {
  category?: string;
}

// Ошибки API
export interface APIError {
  detail: string | Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
}

// Утилитарные типы
export type APIResponse<T> = {
  data: T;
  success: boolean;
};

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

// Компонентные типы
export interface Theme {
  isDark: boolean;
  toggle: () => void;
}

export interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// Константы
export const TECHNOLOGY_CATEGORIES = {
  BACKEND: 'backend',
  FRONTEND: 'frontend',
  DATABASE: 'database',
  DEVOPS: 'devops',
  TOOLS: 'tools',
  TESTING: 'testing',
} as const;

export type TechnologyCategory = typeof TECHNOLOGY_CATEGORIES[keyof typeof TECHNOLOGY_CATEGORIES];