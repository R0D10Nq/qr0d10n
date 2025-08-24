#!/bin/bash

# Скрипт для production развертывания с Docker

echo "🚀 Развертывание портфолио в production..."

# Проверяем наличие .env файла
if [ ! -f .env ]; then
    echo "❌ Не найден .env файл!"
    echo "Скопируйте .env.example в .env и заполните все переменные"
    exit 1
fi

# Проверяем обязательные переменные
required_vars=("SECRET_KEY" "POSTGRES_PASSWORD" "GITHUB_TOKEN")
for var in "${required_vars[@]}"; do
    if ! grep -q "^${var}=" .env || grep -q "^${var}=$" .env; then
        echo "❌ Переменная $var не установлена в .env"
        exit 1
    fi
done

# Создаем директории для бэкапов
mkdir -p backup

# Останавливаем существующие контейнеры
echo "🛑 Останавливаем существующие контейнеры..."
docker-compose -f docker-compose.prod.yml down

# Собираем образы заново
echo "🔨 Собираем production образы..."
docker-compose -f docker-compose.prod.yml build --no-cache

# Запускаем сервисы
echo "🐳 Запускаем production сервисы..."
docker-compose -f docker-compose.prod.yml up -d

# Ждем пока сервисы запустятся
echo "⏳ Ждем запуска сервисов..."
sleep 15

# Проверяем health checks
echo "🏥 Проверяем здоровье сервисов..."
docker-compose -f docker-compose.prod.yml ps

# Запускаем миграции базы данных
echo "📊 Запускаем миграции базы данных..."
docker-compose -f docker-compose.prod.yml exec backend alembic upgrade head

echo ""
echo "✅ Production портфолио развернуто!"
echo "🌐 Frontend: http://localhost"
echo "🔧 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "📝 Логи: docker-compose -f docker-compose.prod.yml logs -f"
echo "🛑 Остановка: docker-compose -f docker-compose.prod.yml down"
echo "💾 Бэкап БД: docker-compose -f docker-compose.prod.yml exec db pg_dump -U postgres portfolio > backup/backup_$(date +%Y%m%d_%H%M%S).sql"