@echo off
REM Скрипт для запуска локальной разработки с Docker (Windows)

echo 🚀 Запуск портфолио в режиме разработки...

REM Проверяем наличие .env файла
if not exist .env (
    echo 📋 Создаем .env файл из примера...
    copy .env.example .env
    echo ✅ Скопируйте .env.example в .env и заполните переменные окружения
)

REM Останавливаем существующие контейнеры
echo 🛑 Останавливаем существующие контейнеры...
docker-compose down

REM Собираем образы заново
echo 🔨 Собираем Docker образы...
docker-compose build

REM Запускаем сервисы
echo 🐳 Запускаем сервисы...
docker-compose up -d

REM Ждем пока сервисы запустятся
echo ⏳ Ждем запуска сервисов...
timeout /t 10 /nobreak

REM Проверяем статус сервисов
echo 📊 Статус сервисов:
docker-compose ps

echo.
echo ✅ Портфолио запущено!
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo 🗄️ PostgreSQL: localhost:5432
echo 🔴 Redis: localhost:6379
echo.
echo 📝 Логи: docker-compose logs -f
echo 🛑 Остановка: docker-compose down

pause