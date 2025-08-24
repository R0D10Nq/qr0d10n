# Docker Documentation

## Обзор

Проект полностью контейнеризован с помощью Docker и Docker Compose для легкого развертывания и разработки.

## Архитектура

### Сервисы

1. **Backend (FastAPI)** - API сервер на порту 8000
2. **Frontend (React + Nginx)** - Статические файлы на порту 3000/80
3. **Database (PostgreSQL)** - База данных на порту 5432
4. **Redis** - Кеширование и брокер сообщений на порту 6379
5. **Celery Worker** - Фоновые задачи
6. **Celery Beat** - Планировщик задач (только в production)

## Файлы конфигурации

- `docker-compose.yml` - Локальная разработка
- `docker-compose.prod.yml` - Production развертывание
- `backend/Dockerfile` - Development образ backend
- `backend/Dockerfile.prod` - Production образ backend
- `frontend/Dockerfile` - Production-ready образ frontend
- `.env.example` - Пример переменных окружения

## Быстрый старт

### Разработка

1. Скопируйте переменные окружения:
   ```bash
   cp .env.example .env
   ```

2. Отредактируйте `.env` файл с вашими настройками

3. Запустите с помощью скрипта:
   ```bash
   # Linux/Mac
   ./scripts/dev.sh
   
   # Windows
   scripts\dev.bat
   ```

4. Или вручную:
   ```bash
   docker-compose up --build
   ```

### Доступные сервисы

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Database**: localhost:5432
- **Redis**: localhost:6379

## Production развертывание

1. Настройте переменные окружения в `.env`
2. Запустите production:
   ```bash
   # Linux/Mac
   ./scripts/prod.sh
   
   # Или вручную
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

### Обязательные переменные для production

```env
SECRET_KEY=your-secret-key-here
POSTGRES_PASSWORD=secure-password
GITHUB_TOKEN=your-github-token
REDIS_PASSWORD=redis-password
```

## Команды управления

### Базовые команды

```bash
# Запуск всех сервисов
docker-compose up -d

# Остановка всех сервисов
docker-compose down

# Пересборка образов
docker-compose build --no-cache

# Просмотр логов
docker-compose logs -f

# Просмотр логов конкретного сервиса
docker-compose logs -f backend
```

### Работа с базой данных

```bash
# Запуск миграций
docker-compose exec backend alembic upgrade head

# Создание новой миграции
docker-compose exec backend alembic revision --autogenerate -m "migration name"

# Подключение к PostgreSQL
docker-compose exec db psql -U postgres -d portfolio

# Создание бэкапа
docker-compose exec db pg_dump -U postgres portfolio > backup/backup_$(date +%Y%m%d_%H%M%S).sql

# Восстановление из бэкапа
docker-compose exec -T db psql -U postgres -d portfolio < backup/backup_file.sql
```

### Мониторинг

```bash
# Статус сервисов
docker-compose ps

# Использование ресурсов
docker stats

# Health check статус
docker-compose exec backend curl http://localhost:8000/api/v1/health/
docker-compose exec frontend curl http://localhost/
```

## Разработка

### Локальная разработка с hot reload

Backend и frontend настроены для hot reload:
- Backend: Uvicorn перезагружается при изменении файлов
- Frontend: Vite dev server с HMR

### Отладка

```bash
# Подключение к контейнеру
docker-compose exec backend bash
docker-compose exec frontend sh

# Просмотр переменных окружения
docker-compose exec backend env
```

## Оптимизация

### Размер образов

- **Multi-stage builds**: Используются для минимизации размера production образов
- **.dockerignore**: Исключает ненужные файлы из контекста сборки
- **Alpine Linux**: Используется для базовых образов

### Безопасность

- **Непривилегированные пользователи**: Контейнеры запускаются не от root
- **Health checks**: Автоматическая проверка состояния сервисов
- **Secrets**: Пароли передаются через переменные окружения

### Production оптимизации

- **Nginx**: Статические файлы раздает nginx с оптимизациями
- **PostgreSQL**: Persistent volumes для данных
- **Redis**: Persistent storage с AOF
- **Celery**: Масштабируемые worker процессы

## Мониторинг и логирование

### Логи

```bash
# Все логи
docker-compose logs

# Логи в реальном времени
docker-compose logs -f --tail=100

# Логи конкретного сервиса
docker-compose logs backend
```

### Health Checks

Все сервисы имеют health checks:
- Backend: `GET /api/v1/health/`
- Frontend: `GET /`
- Database: `pg_isready`
- Redis: `redis-cli ping`

## Troubleshooting

### Частые проблемы

1. **Порты заняты**: Измените порты в docker-compose.yml
2. **Недостаток места**: Очистите Docker: `docker system prune -a`
3. **Ошибки сборки**: Пересоберите без кеша: `docker-compose build --no-cache`
4. **База данных**: Убедитесь что volume смонтирован правильно

### Очистка

```bash
# Удаление всех контейнеров и образов проекта
docker-compose down -v --rmi all

# Полная очистка Docker системы
docker system prune -a --volumes
```

## CI/CD Integration

Docker конфигурация готова для интеграции с CI/CD пайплайнами:
- GitHub Actions
- GitLab CI
- Jenkins

См. `.github/workflows/` для примеров GitHub Actions.