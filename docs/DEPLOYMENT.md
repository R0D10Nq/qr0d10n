# 🚀 Deployment Guide - R0D10N Portfolio

## 📋 Содержание

- [🎯 Обзор деплоя](#обзор-деплоя)
- [🏠 Локальная разработка](#локальная-разработка)
- [🐳 Docker деплой](#docker-деплой)
- [☁️ Облачный деплой](#облачный-деплой)
- [📄 GitHub Pages](#github-pages)
- [🔧 Конфигурация окружений](#конфигурация-окружений)
- [📊 Мониторинг](#мониторинг)
- [🔄 CI/CD Pipeline](#cicd-pipeline)

## 🎯 Обзор деплоя

Проект поддерживает несколько стратегий деплоя:

| Окружение | Frontend | Backend | Database | Назначение |
|-----------|----------|---------|----------|------------|
| **Development** | Vite dev server | FastAPI dev | PostgreSQL/SQLite | Локальная разработка |
| **Docker** | Nginx | Uvicorn | PostgreSQL + Redis | Локальное тестирование |
| **GitHub Pages** | Static build | Mock API | Mock data | Демо и портфолио |
| **Production** | CDN | Cloud hosting | Managed DB | Боевое окружение |

## 🏠 Локальная разработка

### Требования

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+ (опционально)
- Redis 6+ (опционально)

### Быстрый старт

```bash
# 1. Клонируем репозиторий
git clone https://github.com/R0D10Nq/qr0d10n.git
cd qr0d10n

# 2. Настройка окружения
cp .env.example .env
# Отредактируйте .env файл

# 3. Backend
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate     # Windows

pip install -r requirements.txt
uvicorn app.main:app --reload

# 4. Frontend (в новом терминале)
cd frontend
npm install
npm run dev
```

### Доступные сервисы

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000  
- **API Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Настройка базы данных

```bash
# Для локальной разработки можно использовать SQLite
export DATABASE_URL="sqlite:///./portfolio.db"

# Или PostgreSQL
export DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"

# Создание таблиц
cd backend
python -c "from app.models import Base; from app.core.database import engine; Base.metadata.create_all(bind=engine)"
```

## 🐳 Docker деплой

### Docker Compose (Рекомендуется)

```bash
# Разработка с hot reload
./scripts/dev.sh    # Linux/Mac
scripts\dev.bat     # Windows

# Production build
./scripts/prod.sh
```

### Ручной Docker деплой

```bash
# 1. Сборка образов
docker build -t r0d10n-backend ./backend
docker build -t r0d10n-frontend ./frontend

# 2. Запуск инфраструктуры
docker run -d --name postgres \
  -e POSTGRES_DB=portfolio \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  postgres:15-alpine

docker run -d --name redis \
  -p 6379:6379 \
  redis:7-alpine

# 3. Запуск backend
docker run -d --name r0d10n-backend \
  -e DATABASE_URL=postgresql://postgres:password@postgres:5432/portfolio \
  -e REDIS_URL=redis://redis:6379 \
  -p 8000:8000 \
  --link postgres:postgres \
  --link redis:redis \
  r0d10n-backend

# 4. Запуск frontend
docker run -d --name r0d10n-frontend \
  -e VITE_API_URL=http://localhost:8000 \
  -p 3000:80 \
  r0d10n-frontend
```

### Docker Environment Variables

```bash
# .env для Docker
DATABASE_URL=postgresql://postgres:password@db:5432/portfolio
REDIS_URL=redis://redis:6379
ENVIRONMENT=production
SECRET_KEY=your-super-secret-key-here
VITE_API_URL=http://localhost:8000
VITE_GITHUB_PAGES=false
```

## ☁️ Облачный деплой

### Backend деплой (Railway)

```bash
# 1. Установка Railway CLI
npm install -g @railway/cli

# 2. Авторизация
railway login

# 3. Инициализация проекта
railway init

# 4. Добавление переменных окружения
railway variables set DATABASE_URL="postgresql://..."
railway variables set REDIS_URL="redis://..."
railway variables set SECRET_KEY="your-secret-key"

# 5. Деплой
railway up
```

### Backend деплой (Heroku)

```bash
# 1. Создание приложения
heroku create r0d10n-portfolio-api

# 2. Добавление аддонов
heroku addons:create heroku-postgresql:hobby-dev
heroku addons:create heroku-redis:hobby-dev

# 3. Настройка переменных
heroku config:set SECRET_KEY=your-secret-key
heroku config:set ENVIRONMENT=production

# 4. Деплой
git subtree push --prefix backend heroku main
```

### Настройка для облачного деплоя

**Procfile** (для Heroku):
```
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
worker: celery -A app.celery_app worker --loglevel=info
```

**railway.json** (для Railway):
```json
{
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "backend/Dockerfile"
  },
  "deploy": {
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## 📄 GitHub Pages

### Автоматический деплой

GitHub Actions автоматически деплоит frontend на GitHub Pages при push в main:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Build
        run: |
          cd frontend
          npm run build
        env:
          VITE_GITHUB_PAGES: true
          VITE_API_URL: ""
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
```

### Ручной деплой на GitHub Pages

```bash
# 1. Сборка для GitHub Pages
cd frontend
export VITE_GITHUB_PAGES=true
export VITE_API_URL=""
npm run build

# 2. Деплой через gh-pages
npm install -g gh-pages
gh-pages -d dist
```

### Настройка репозитория

1. **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: gh-pages / root
4. **Custom domain**: r0d10n.ru (опционально)

### GitHub Pages особенности

- **Static hosting** - только статические файлы
- **SPA routing** - настроен через 404.html
- **Mock API** - данные встроены в frontend
- **Environment detection** - через VITE_GITHUB_PAGES

## 🔧 Конфигурация окружений

### Environment Variables

#### Backend (.env)

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-super-secret-key-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Application
ENVIRONMENT=development  # development | staging | production
PROJECT_NAME="R0D10N Portfolio API"
VERSION=1.0.0
DEBUG=true

# CORS
ALLOWED_ORIGINS=["http://localhost:3000", "https://r0d10nq.github.io"]

# Email (опционально)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Monitoring (опционально)
SENTRY_DSN=https://your-sentry-dsn
LOG_LEVEL=INFO
```

#### Frontend (.env)

```bash
# API Configuration
VITE_API_URL=http://localhost:8000
VITE_GITHUB_PAGES=false

# Application
VITE_APP_NAME="R0D10N Portfolio"
VITE_APP_VERSION=1.0.0

# Analytics (опционально)
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_YANDEX_METRIKA_ID=XXXXXXXX
```

### Конфигурация по окружениям

#### Development
```bash
ENVIRONMENT=development
DEBUG=true
LOG_LEVEL=DEBUG
DATABASE_URL=sqlite:///./portfolio.db
VITE_API_URL=http://localhost:8000
```

#### Staging
```bash
ENVIRONMENT=staging
DEBUG=false
LOG_LEVEL=INFO
DATABASE_URL=postgresql://...
VITE_API_URL=https://api-staging.r0d10n.ru
```

#### Production
```bash
ENVIRONMENT=production
DEBUG=false
LOG_LEVEL=WARNING
DATABASE_URL=postgresql://...
VITE_API_URL=https://api.r0d10n.ru
```

## 📊 Мониторинг

### Health Checks

```bash
# Backend health
curl http://localhost:8000/health

# Database connection
curl http://localhost:8000/api/v1/health/db

# Redis connection  
curl http://localhost:8000/api/v1/health/redis
```

### Логирование

```python
# Structured logging configuration
import structlog

structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        structlog.processors.JSONRenderer()
    ],
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    cache_logger_on_first_use=True,
)
```

### Метрики

- **Response time** - среднее время ответа API
- **Error rate** - процент ошибок 4xx/5xx
- **Throughput** - количество запросов в секунду
- **Database performance** - время выполнения запросов
- **Cache hit ratio** - эффективность кеширования

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  PYTHON_VERSION: 3.11
  NODE_VERSION: 18

jobs:
  # Тестирование backend
  test-backend:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_portfolio
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}
      
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      
      - name: Run tests
        run: |
          cd backend
          pytest --cov=app --cov-report=xml tests/
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_portfolio
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./backend/coverage.xml

  # Тестирование frontend
  test-frontend:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Run tests
        run: |
          cd frontend
          npm run test:coverage
      
      - name: Build
        run: |
          cd frontend
          npm run build

  # Проверка качества кода
  code-quality:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}
      
      - name: Install Python dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      
      - name: Run Python linters
        run: |
          cd backend
          ruff check .
          black --check .
          mypy .
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install Node dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Run frontend linters
        run: |
          cd frontend
          npm run lint
          npm run type-check

  # Деплой на GitHub Pages
  deploy-github-pages:
    needs: [test-backend, test-frontend, code-quality]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Build for GitHub Pages
        run: |
          cd frontend
          npm run build
        env:
          VITE_GITHUB_PAGES: true
          VITE_API_URL: ""
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
          cname: r0d10n.ru

  # Деплой backend (опционально)
  deploy-backend:
    needs: [test-backend, code-quality]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Railway
        uses: railwayapp/railway-deploy@v3
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
          service: r0d10n-portfolio-api
```

### Deployment Scripts

**scripts/deploy.sh**:
```bash
#!/bin/bash
set -e

echo "🚀 Deploying R0D10N Portfolio..."

# Frontend to GitHub Pages
echo "📦 Building frontend..."
cd frontend
npm ci
VITE_GITHUB_PAGES=true npm run build
npx gh-pages -d dist

# Backend to Railway (опционально)
echo "🐍 Deploying backend..."
cd ../backend
railway up

echo "✅ Deployment completed!"
```

## 🛠️ Troubleshooting

### Частые проблемы

#### Docker проблемы

```bash
# Очистка Docker
docker system prune -a
docker volume prune

# Пересборка образов
docker-compose build --no-cache
```

#### Node.js проблемы

```bash
# Очистка кеша npm
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Python проблемы

```bash
# Пересоздание virtual environment
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

#### База данных

```bash
# Сброс БД
dropdb portfolio
createdb portfolio
python -c "from app.models import Base; from app.core.database import engine; Base.metadata.create_all(bind=engine)"
```

### Логи и отладка

```bash
# Docker логи
docker-compose logs -f backend
docker-compose logs -f frontend

# Проверка статуса сервисов
curl http://localhost:8000/health
curl http://localhost:3000/

# Проверка БД
psql -h localhost -U postgres -d portfolio -c "SELECT * FROM projects;"
```

---

## 📚 Дополнительные ресурсы

- [Architecture Documentation](./ARCHITECTURE.md)
- [API Documentation](./API.md)
- [Docker Guide](./DOCKER.md)
- [Code Quality Guide](./CODE_QUALITY.md)

---

*Руководство создано для демонстрации DevOps навыков middle-разработчика*