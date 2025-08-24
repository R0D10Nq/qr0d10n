/**
 * Custom hooks для работы с портфолио API.
 * Используем React Query для кеширования и управления состоянием.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioAPI, contactAPI, healthAPI } from '../services/api';
import type {
  Portfolio,
  Project,
  ProjectFilters,
  Experience,
  Technology,
  TechnologyFilters,
  PersonalInfo,
  ContactMessage,
  NewsletterSubscriber,
  PortfolioStats,
} from '../types';

// Ключи для React Query cache
const QUERY_KEYS = {
  portfolio: ['portfolio'] as const,
  personalInfo: ['portfolio', 'personal'] as const,
  projects: (filters?: ProjectFilters) => ['portfolio', 'projects', filters] as const,
  project: (id: number) => ['portfolio', 'project', id] as const,
  experience: ['portfolio', 'experience'] as const,
  technologies: (filters?: TechnologyFilters) => ['portfolio', 'technologies', filters] as const,
  stats: ['portfolio', 'stats'] as const,
  health: ['health'] as const,
};

// Хуки для портфолио
export const usePortfolio = () => {
  return useQuery({
    queryKey: QUERY_KEYS.portfolio,
    queryFn: portfolioAPI.getFullPortfolio,
    staleTime: 1000 * 60 * 10, // 10 минут
  });
};

export const usePersonalInfo = () => {
  return useQuery({
    queryKey: QUERY_KEYS.personalInfo,
    queryFn: portfolioAPI.getPersonalInfo,
    staleTime: 1000 * 60 * 30, // 30 минут
  });
};

export const useProjects = (filters?: ProjectFilters) => {
  return useQuery({
    queryKey: QUERY_KEYS.projects(filters),
    queryFn: () => portfolioAPI.getProjects(filters),
    staleTime: 1000 * 60 * 5, // 5 минут
  });
};

export const useProject = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.project(id),
    queryFn: () => portfolioAPI.getProject(id),
    staleTime: 1000 * 60 * 10, // 10 минут
    enabled: !!id,
  });
};

export const useExperience = () => {
  return useQuery({
    queryKey: QUERY_KEYS.experience,
    queryFn: portfolioAPI.getExperience,
    staleTime: 1000 * 60 * 30, // 30 минут
  });
};

export const useTechnologies = (filters?: TechnologyFilters) => {
  return useQuery({
    queryKey: QUERY_KEYS.technologies(filters),
    queryFn: () => portfolioAPI.getTechnologies(filters),
    staleTime: 1000 * 60 * 15, // 15 минут
  });
};

export const usePortfolioStats = () => {
  return useQuery({
    queryKey: QUERY_KEYS.stats,
    queryFn: portfolioAPI.getStats,
    staleTime: 1000 * 60 * 5, // 5 минут
  });
};

// Хуки для контактов
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (message: ContactMessage) => contactAPI.sendMessage(message),
    onSuccess: () => {
      // Можно показать уведомление об успехе
      console.log('Сообщение отправлено успешно!');
    },
    onError: (error) => {
      console.error('Ошибка при отправке сообщения:', error);
    },
  });
};

export const useSubscribe = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (subscriber: NewsletterSubscriber) => contactAPI.subscribe(subscriber),
    onSuccess: () => {
      console.log('Подписка оформлена успешно!');
    },
    onError: (error) => {
      console.error('Ошибка при оформлении подписки:', error);
    },
  });
};

// Хук для проверки здоровья API
export const useHealth = () => {
  return useQuery({
    queryKey: QUERY_KEYS.health,
    queryFn: healthAPI.checkHealth,
    staleTime: 1000 * 60 * 2, // 2 минуты
    retry: 1,
  });
};

// Утилитарные хуки
export const useInvalidatePortfolio = () => {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.portfolio });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.personalInfo });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.experience });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.technologies() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.stats });
  };
};

// Хук для получения избранных проектов
export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: QUERY_KEYS.projects({ featured_only: true }),
    queryFn: () => portfolioAPI.getProjects({ featured_only: true }),
    staleTime: 1000 * 60 * 10, // 10 минут
  });
};

// Хук для получения технологий по категории
export const useTechnologiesByCategory = (category: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.technologies({ category }),
    queryFn: () => portfolioAPI.getTechnologies({ category }),
    staleTime: 1000 * 60 * 15, // 15 минут
    enabled: !!category,
  });
};