# 🏗️ Архитектура проекта R0D10N Portfolio

## 📋 Содержание

- [🎯 Обзор архитектуры](#обзор-архитектуры)
- [🔄 Диаграмма компонентов](#диаграмма-компонентов)
- [🐍 Backend архитектура](#backend-архитектура)
- [⚛️ Frontend архитектура](#frontend-архитектура)
- [💾 Управление данными](#управление-данными)
- [🔐 Безопасность](#безопасность)
- [📊 Мониторинг и логирование](#мониторинг-и-логирование)
- [🚀 Деплой и CI/CD](#деплой-и-cicd)

## 🎯 Обзор архитектуры

Проект построен по принципам **чистой архитектуры** с четким разделением ответственности между слоями. Используется **микросервисная** архитектура с отдельными контейнерами для каждого сервиса.

### Ключевые принципы

- **Separation of Concerns** - каждый компонент имеет четкую ответственность
- **Dependency Inversion** - зависимости направлены к абстракциям
- **Single Responsibility** - один класс = одна ответственность
- **Open/Closed Principle** - открыт для расширения, закрыт для изменения

## 🔄 Диаграмма компонентов

```mermaid
graph TB
    User[👤 Пользователь]
    
    subgraph "Frontend Layer"
        React[⚛️ React SPA]
        Router[🔀 React Router]
        Store[📦 React Query]
    end
    
    subgraph "API Gateway"
        Nginx[🌐 Nginx]
        CORS[🔒 CORS]
    end
    
    subgraph "Backend Layer"
        FastAPI[🚀 FastAPI]
        Auth[🔑 Auth Service]
        Cache[💨 Cache Service]
        Email[📧 Email Service]
    end
    
    subgraph "Data Layer"
        PostgreSQL[(🐘 PostgreSQL)]
        Redis[(🔴 Redis)]
        Files[📁 Static Files]
    end
    
    subgraph "Background Tasks"
        Celery[🔄 Celery Worker]
        Scheduler[⏰ Celery Beat]
    end
    
    User --> React
    React --> Router
    React --> Store
    Store --> Nginx
    Nginx --> CORS
    CORS --> FastAPI
    
    FastAPI --> Auth
    FastAPI --> Cache
    FastAPI --> Email
    
    Auth --> PostgreSQL
    Cache --> Redis
    FastAPI --> PostgreSQL
    
    FastAPI --> Celery
    Celery --> Redis
    Scheduler --> Celery
    
    Celery --> Email
    Celery --> PostgreSQL
```

## 🐍 Backend архитектура

### Структура проекта

```
backend/
├── app/
│   ├── api/           # API endpoints
│   │   └── v1/        # Версионирование API
│   ├── core/          # Основная логика
│   │   ├── config.py  # Конфигурация
│   │   ├── redis.py   # Redis клиент
│   │   └── security.py# Безопасность
│   ├── models/        # SQLAlchemy модели
│   ├── schemas/       # Pydantic схемы
│   ├── services/      # Бизнес-логика
│   ├── celery_app.py  # Celery конфигурация
│   └── main.py        # FastAPI приложение
├── tests/             # Тесты
└── requirements.txt   # Зависимости
```

### Слоевая архитектура

1. **Presentation Layer** (`api/`)
   - REST API endpoints
   - Request/Response validation
   - HTTP exception handling
   - OpenAPI documentation

2. **Business Logic Layer** (`services/`)
   - Основная бизнес-логика
   - Валидация данных
   - Обработка событий
   - Кеширование

3. **Data Access Layer** (`models/`)
   - SQLAlchemy ORM модели
   - Database relationships
   - Миграции (Alembic)
   - Seed данные

4. **Infrastructure Layer** (`core/`)
   - Конфигурация
   - Redis клиент
   - Email service
   - Background tasks

### Ключевые компоненты

#### FastAPI Application

```python
# main.py
app = FastAPI(
    title="Portfolio API R0D10N",
    description="Полнофункциональное API портфолио",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(CORSMiddleware)

# API routes
app.include_router(api_router, prefix="/api/v1")
```

#### Database Models

```python
# models/portfolio.py
class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    technologies = relationship("Technology", back_populates="projects")
```

#### Cache Service

```python
# core/redis.py
class CacheService:
    def __init__(self, redis_client: Redis):
        self.redis = redis_client
    
    async def get(self, key: str) -> Optional[str]:
        return await self.redis.get(key)
    
    async def set(self, key: str, value: str, ttl: int = 3600):
        await self.redis.setex(key, ttl, value)
```

## ⚛️ Frontend архитектура

### Структура проекта

```
frontend/
├── src/
│   ├── components/     # React компоненты
│   │   ├── common/     # Общие компоненты
│   │   ├── layout/     # Layout компоненты
│   │   └── sections/   # Секции страниц
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Страницы приложения
│   ├── services/       # API клиенты
│   ├── types/          # TypeScript типы
│   ├── utils/          # Утилиты
│   └── styles/         # Стили
├── public/             # Статические файлы
└── package.json        # Зависимости
```

### Компонентная архитектура

1. **Pages** - Страницы приложения
2. **Sections** - Секции страниц (Hero, About, Projects)
3. **Common** - Переиспользуемые компоненты
4. **Layout** - Layout компоненты (Header, Footer)

### State Management

Используется **React Query** для управления серверным состоянием:

```typescript
// hooks/usePortfolio.ts
export const usePortfolioData = () => {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: portfolioApi.getPortfolio,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
};
```

### Типизация TypeScript

```typescript
// types/index.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: Technology[];
  github_url?: string;
  demo_url?: string;
}
```

### Styling Strategy

- **Tailwind CSS** - utility-first CSS framework
- **CSS Modules** - для компонентных стилей
- **Темная/светлая тема** - через CSS переменные

## 💾 Управление данными

### Database Schema

```sql
-- Основные таблицы
CREATE TABLE personal_info (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(200),
    bio TEXT,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    github_url VARCHAR(500),
    demo_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE technologies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    icon_url VARCHAR(500)
);

-- Связующие таблицы
CREATE TABLE project_technologies (
    project_id INTEGER REFERENCES projects(id),
    technology_id INTEGER REFERENCES technologies(id),
    PRIMARY KEY (project_id, technology_id)
);
```

### Cache Strategy

1. **Portfolio Data** - кеш на 1 час
2. **Projects List** - кеш на 30 минут
3. **Statistics** - кеш на 15 минут
4. **Contact Form** - rate limiting 5 req/min

### Data Flow

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Cache
    participant DB
    
    Client->>API: GET /api/v1/portfolio/
    API->>Cache: Check cache
    alt Cache Hit
        Cache->>API: Cached data
        API->>Client: Response
    else Cache Miss
        API->>DB: Query database
        DB->>API: Raw data
        API->>Cache: Store in cache
        API->>Client: Response
    end
```

## 🔐 Безопасность

### Implemented Security Measures

1. **CORS Configuration**
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:3000", "https://r0d10nq.github.io"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

2. **Input Validation**
   - Pydantic schemas для валидации
   - SQLAlchemy ORM предотвращает SQL injection
   - Email validation

3. **Rate Limiting**
   - Contact form: 5 requests/minute
   - API endpoints: 100 requests/minute

4. **Security Headers**
   ```python
   @app.middleware("http")
   async def security_headers(request: Request, call_next):
       response = await call_next(request)
       response.headers["X-Content-Type-Options"] = "nosniff"
       response.headers["X-Frame-Options"] = "DENY"
       return response
   ```

### Environment Variables

```bash
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key
ENVIRONMENT=development
```

## 📊 Мониторинг и логирование

### Structured Logging

```python
import structlog

logger = structlog.get_logger()

@app.middleware("http")
async def logging_middleware(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    logger.info(
        "HTTP Request",
        method=request.method,
        path=request.url.path,
        status_code=response.status_code,
        process_time=process_time
    )
    return response
```

### Health Checks

```python
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "r0d10n-portfolio-api",
        "version": "1.0.0",
        "timestamp": datetime.utcnow(),
        "uptime": "running"
    }
```

### Metrics Collection

- Response time monitoring
- Error rate tracking
- Cache hit/miss ratios
- Database query performance

## 🚀 Деплой и CI/CD

### GitHub Actions Workflow

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: 3.11
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run tests
        run: pytest --cov=app tests/
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
```

### Deployment Strategies

1. **Development**
   - Docker Compose локально
   - Hot reload для frontend и backend
   - Debug режим

2. **Staging**
   - Kubernetes cluster
   - Automated testing
   - Performance monitoring

3. **Production**
   - GitHub Pages для frontend
   - Heroku/Railway для backend
   - CDN для статических файлов

### Environment Management

```bash
# Development
ENVIRONMENT=development
DEBUG=true
LOG_LEVEL=debug

# Production  
ENVIRONMENT=production
DEBUG=false
LOG_LEVEL=info
```

## 🔄 Continuous Integration

### Pre-commit Hooks

```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 23.11.0
    hooks:
      - id: black
  - repo: https://github.com/charliermarsh/ruff-pre-commit
    rev: v0.1.6
    hooks:
      - id: ruff
  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.7.1
    hooks:
      - id: mypy
```

### Quality Gates

- ✅ **Tests** - минимум 90% покрытие
- ✅ **Linting** - проходят все линтеры
- ✅ **Type Checking** - MyPy без ошибок
- ✅ **Security** - Bandit проверки
- ✅ **Performance** - Lighthouse > 90

---

## 📚 Дополнительные ресурсы

- [API Documentation](./API.md)
- [Docker Guide](./DOCKER.md) 
- [GitHub Actions](./GITHUB_ACTIONS.md)
- [Code Quality](./CODE_QUALITY.md)

---

*Документация создана для демонстрации архитектурных навыков middle-разработчика*