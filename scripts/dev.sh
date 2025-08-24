#!/bin/bash

# Скрипт для запуска локальной разработки с Docker

echo "🚀 Запуск портфолио в режиме разработки..."

# Проверяем наличие .env файла
if [ ! -f .env ]; then
    echo "📋 Создаем .env файл из примера..."
    cp .env.example .env
    echo "✅ Скопируйте .env.example в .env и заполните переменные окружения"
fi

# Останавливаем существующие контейнеры
echo "🛑 Останавливаем существующие контейнеры..."
docker-compose down

# Собираем образы заново
echo "🔨 Собираем Docker образы..."
docker-compose build

# Запускаем сервисы
echo "🐳 Запускаем сервисы..."
docker-compose up -d

# Ждем пока сервисы запустятся
echo "⏳ Ждем запуска сервисов..."
sleep 10

# Проверяем статус сервисов
echo "📊 Статус сервисов:"
docker-compose ps

echo ""
echo "✅ Портфолио запущено!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo "🗄️ PostgreSQL: localhost:5432"
echo "🔴 Redis: localhost:6379"
echo ""
echo "📝 Логи: docker-compose logs -f"
echo "🛑 Остановка: docker-compose down"