# 🚀 R0D10N Portfolio - Middle Developer Showcase

> Комплексный fullstack портфолио проект middle Python/Fullstack разработчика

[![CI/CD Pipeline](https://github.com/R0D10Nq/qr0d10n/actions/workflows/ci.yml/badge.svg)](https://github.com/R0D10Nq/qr0d10n/actions)
[![Code Coverage](https://codecov.io/gh/R0D10Nq/qr0d10n/branch/main/graph/badge.svg)](https://codecov.io/gh/R0D10Nq/qr0d10n)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![React 18](https://img.shields.io/badge/react-18+-61DAFB.svg)](https://reactjs.org/)

## 📋 Описание

Это **production-ready** fullstack портфолио проект, демонстрирующий профессиональные навыки middle Python/Fullstack разработчика. Проект создан с использованием современных технологий и лучших практик разработки, включая чистую архитектуру, comprehensive testing, и enterprise-level DevOps pipeline.

### 🎯 Ключевые особенности

- 🏗️ **Чистая архитектура** - SOLID принципы, слоевая архитектура
- ⚡ **Высокая производительность** - async/await, кеширование, оптимизация
- 🔒 **Enterprise безопасность** - CORS, валидация, rate limiting
- 🧪 **Comprehensive testing** - >90% покрытие, unit + integration тесты
- 🐳 **Полная контейнеризация** - Docker, docker-compose, multi-stage builds
- 🚀 **CI/CD Pipeline** - GitHub Actions, автотесты, автодеплой
- 📊 **Monitoring & Observability** - structured logging, health checks, metrics
- 📚 **Enterprise документация** - API docs, архитектура, deployment guides
- 🎨 **Современный UX/UI** - адаптивный дизайн, анимации, темная тема
- 🔧 **Developer Experience** - hot reload, type safety, code quality tools

**Middle-developer особенности:**
- **Modern stack**: React 18 + TypeScript, FastAPI, PostgreSQL
- **Clean Architecture** с разделением на слои
- **Comprehensive testing**: pytest + Vitest, >90% coverage
- **CI/CD pipeline**: GitHub Actions с multi-stage builds
- **Production-ready**: Docker, Nginx, structured logging
- **Type safety**: MyPy + TypeScript строгая типизация

**Качество кода:** Production-grade с соблюдением SOLID принципов.

## 🛠 Технологический стек

### 🌍 Frontend
- **React 18** + **TypeScript** - современный компонентный UI
- **Vite** - молниеносная сборка и HMR
- **Tailwind CSS** - utility-first CSS framework
- **Framer Motion** - профессиональные анимации
- **React Router v6** - декларативная маршрутизация
- **React Query (TanStack Query)** - серверное состояние и кеширование
- **Axios** - HTTP клиент с интерцепторами
- **React Hook Form** - оптимизированная работа с формами

### 🐍 Backend
- **FastAPI** - современный async Python фреймворк
- **SQLAlchemy 2.0** - ORM с async поддержкой
- **Alembic** - миграции базы данных
- **PostgreSQL** - надежная реляционная БД
- **Redis** - кеширование и session store
- **Celery** - фоновые задачи и расписание
- **Pydantic v2** - валидация данных и сериализация
- **Uvicorn** - высокопроизводительный ASGI сервер
- **Structlog** - структурированное логирование

### 📊 Тестирование & Качество кода
- **pytest** - тестирование с fixtures и плагинами
- **pytest-asyncio** - async тесты
- **pytest-cov** - покрытие кода >90%
- **Vitest** - современные frontend тесты
- **Ruff** - молниеносный Python linter
- **Black** - автоматическое форматирование кода
- **MyPy** - статическая проверка типов
- **ESLint + Prettier** - JavaScript/TypeScript линтинг
- **pre-commit** - автоматические проверки качества

### 🐳 DevOps & Инфраструктура
- **Docker** + **docker-compose** - контейнеризация
- **Multi-stage builds** - оптимизированные Docker образы
- **GitHub Actions** - CI/CD пайплайны
- **GitHub Pages** - статический хостинг
- **Nginx** - reverse proxy и статические файлы
- **Railway/Heroku** - облачный деплой backend

## 🚀 Быстрый старт

### 🌍 Онлайн демо

🌐 **Live Demo**: [https://r0d10nq.github.io/qr0d10n](https://r0d10nq.github.io/qr0d10n)
📚 **API Docs**: [https://api.r0d10n.ru/docs](https://api.r0d10n.ru/docs) (если backend развернут)

### 🐳 Docker (Рекомендуется)

```bash
# Клонируем репозиторий
git clone https://github.com/R0D10Nq/qr0d10n.git
cd qr0d10n

# Настраиваем переменные окружения
cp .env.example .env
# Отредактируйте .env файл по необходимости

# Запускаем весь стек
docker-compose up --build

# Или используйте скрипты:
./scripts/dev.sh     # Linux/Mac (разработка)
scripts\dev.bat      # Windows (разработка)
./scripts/prod.sh    # Production build
```

**🎆 Доступные сервисы:**
- 🌍 **Frontend**: http://localhost:3000
- 🚀 **Backend API**: http://localhost:8000
- 📚 **API Docs (Swagger)**: http://localhost:8000/docs
- 📖 **API Docs (ReDoc)**: http://localhost:8000/redoc
- 🐘 **Database**: localhost:5432 (postgres/password)
- 🔴 **Redis**: localhost:6379

### 💻 Локальная разработка

<details>
<summary>🔧 Подробные инструкции по локальной установке</summary>

**Требования:**
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+ (опционально)
- Redis 6+ (опционально)

```bash
# 1. Клонируем репозиторий
git clone https://github.com/R0D10Nq/qr0d10n.git
cd qr0d10n

# 2. Backend установка
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate     # Windows

pip install -r requirements.txt

# 3. Настройка базы данных (опционально)
export DATABASE_URL="sqlite:///./portfolio.db"  # для спростоты
# или
export DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"

# 4. Запуск backend
uvicorn app.main:app --reload

# 5. Frontend установка (в новом терминале)
cd ../frontend
npm install
npm run dev
```

</details>

### ☁️ Облачный деплой

Подробные инструкции по деплою на Railway, Heroku, Vercel см. в [📚 Deployment Guide](./docs/DEPLOYMENT.md)

## 📁 Структура проекта

```
qr0d10n/
├── backend/           # FastAPI приложение
│   ├── app/
│   ├── tests/
│   └── requirements.txt
├── frontend/          # React приложение
│   ├── src/
│   ├── public/
│   └── package.json
├── docs/              # Документация
├── docker/            # Docker конфигурация
├── .github/           # GitHub Actions
└── README.md
```

## 🎯 Особенности middle-уровня

- **Чистая архитектура** - разделение на слои
- **SOLID принципы** - поддерживаемый код
- **Типизация везде** - TypeScript + Python typing
- **Высокое покрытие тестами** - >90%
- **Мониторинг и логирование** - структурированные логи
- **Контейнеризация** - готов к production
- **CI/CD** - автоматическое тестирование и деплой

## 📊 Статистики проекта

| Метрика | Значение | Описание |
|---------|----------|----------|
| 🧪 **Покрытие тестами** | >90% | Backend + Frontend тесты |
| 📊 **Lighthouse оценка** | 95+ | Performance, Accessibility, SEO |
| 📎 **Кодовая база** | 15,000+ LOC | Качественный TypeScript + Python |
| ⚙️ **API эндпоинты** | 25+ | Полноценное REST API |
| 🐳 **Docker образы** | 6 | Оптимизированные multi-stage |
| ✅ **Pre-commit хуки** | 20+ | Комплексная проверка качества |
| 📝 **Документация** | 6 guides | Полная техническая документация |

## 📚 Документация

### 📝 Основная документация
- 🏗️ [**Архитектура системы**](./docs/ARCHITECTURE.md) - диаграммы, паттерны, принципы
- 🚀 [**Deployment Guide**](./docs/DEPLOYMENT.md) - полный гайд по деплою
- 📚 [**API документация**](./docs/API.md) - детальное описание всех эндпоинтов
- 🐳 [**Docker Guide**](./docs/DOCKER.md) - контейнеризация и оркестрация
- ⚙️ [**Качество кода**](./docs/CODE_QUALITY.md) - линтеры, тесты, практики
- 🚀 [**GitHub Actions**](./docs/GITHUB_ACTIONS.md) - CI/CD pipeline и автоматизация

### 🚀 Интерактивная API документация
- **Swagger UI**: [/docs](http://localhost:8000/docs) - интерактивное тестирование
- **ReDoc**: [/redoc](http://localhost:8000/redoc) - красивая документация
- **Postman Collection**: [docs/R0D10N_Portfolio_API.postman_collection.json](./docs/R0D10N_Portfolio_API.postman_collection.json)
- **HTTP Examples**: [docs/api-examples.http](./docs/api-examples.http) - 29 примеров запросов

## 🤝 Автор

**Родион Шевцов (R0D10N)**
- 🐍 Python/Backend Fullstack Developer
- 📍 Томск, Россия
- 💼 3+ года опыта
- 🎯 Цель: Senior FullStack Developer

### Контакты
- 🐙 GitHub: [@R0D10Nq](https://github.com/R0D10Nq)
- 📧 Email: q@r0d10n.ru
- 📱 Telegram: @qr0d10n
- 📞 Телефон: +7 (953) 918-31-49

## 📄 Лицензия

MIT License - можно использовать для изучения и вдохновения

---

⭐ **Если проект помог или понравился - поставь звездочку!**
