/**
 * Страница контактов с формой обратной связи.
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react';
import { useSendMessage, usePersonalInfo } from '../hooks/usePortfolio';
import { LoadingSpinner } from '../components/Loading';
import type { ContactMessage } from '../types';

const ContactPage: React.FC = () => {
  const { data: personalInfo } = usePersonalInfo();
  const sendMessage = useSendMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactMessage>();

  const onSubmit = async (data: ContactMessage) => {
    try {
      await sendMessage.mutateAsync(data);
      reset();
      alert('Сообщение отправлено!');
    } catch (error) {
      alert('Ошибка при отправке сообщения');
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: personalInfo?.email || 'q@r0d10n.ru',
      href: `mailto:${personalInfo?.email || 'q@r0d10n.ru'}`,
    },
    {
      icon: MessageCircle,
      title: 'Telegram',
      value: '@qr0d10n',
      href: personalInfo?.telegram_url || 'https://t.me/qr0d10n',
    },
    {
      icon: Phone,
      title: 'Телефон',
      value: personalInfo?.phone || '+7 (953) 918-31-49',
      href: `tel:${personalInfo?.phone || '+79539183149'}`,
    },
    {
      icon: MapPin,
      title: 'Локация',
      value: personalInfo?.location || 'Томск, Россия',
      href: '#',
    },
  ];

  return (
    <div className="section">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="section-title">Свяжитесь со мной</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Открыт к новым проектам и предложениям. 
            Напишите мне, и я отвечу в течение 24 часов.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Контактная информация
            </h2>
            
            <div className="space-y-6">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div key={method.title} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {method.title}
                      </h3>
                      <a
                        href={method.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {method.value}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Форма обратной связи */}
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Отправить сообщение
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Имя *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Имя обязательно' })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Ваше имя"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email обязателен',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Неверный формат email'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Тема *
                </label>
                <input
                  type="text"
                  {...register('subject', { required: 'Тема обязательна' })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Тема сообщения"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Сообщение *
                </label>
                <textarea
                  rows={6}
                  {...register('message', { required: 'Сообщение обязательно' })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Ваше сообщение..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={sendMessage.isPending}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                {sendMessage.isPending ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Отправляем...</span>
                  </>
                ) : (
                  <span>Отправить сообщение</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;