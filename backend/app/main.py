"""
Главная точка входа для FastAPI приложения портфолио R0D10N.
Тут собираем все в кучу и запускаем сервер.
"""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from app.api.main import api_router
from app.core.config import settings
from app.core.database import init_db


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    Lifecycle события для приложения.
    Тут инициализируем БД и прочие штуки при запуске.
    """
    # Инициализируем базу данных
    await init_db()
    yield
    # Тут можно добавить cleanup логику при выключении


# Создаем FastAPI приложение
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="""
    # 🚀 Portfolio API R0D10N
    
    Полнофункциональное API для портфолио Python/Fullstack разработчика.
    
    ## 📚 Основные возможности
    
    - 📁 **Портфолио**: Получение информации о проектах, опыте и навыках
    - 💬 **Контакты**: Отправка сообщений и подписка на рассылку
    - 📈 **Статистика**: Метрики и аналитика
    - 🔍 **Здоровье**: Мониторинг состояния системы
    
    ## 🔧 Технологии
    
    - **FastAPI** - современный async Python фреймворк
    - **SQLAlchemy** - ORM для работы с базой данных
    - **PostgreSQL** - надежная реляционная база данных
    - **Redis** - кеширование и брокер сообщений
    - **Celery** - фоновые задачи
    
    ## 📞 Контакты
    
    - **Автор**: Родион Шевцов (R0D10N)
    - **Email**: q@r0d10n.ru
    - **GitHub**: [@R0D10Nq](https://github.com/R0D10Nq)
    - **Telegram**: [@qr0d10n](https://t.me/qr0d10n)
    """,
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
    contact={
        "name": "Родион Шевцов (R0D10N)",
        "email": "q@r0d10n.ru",
        "url": "https://github.com/R0D10Nq",
    },
    license_info={
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT",
    },
    servers=[
        {
            "url": "https://api.r0d10n.ru",
            "description": "Production server"
        },
        {
            "url": "http://localhost:8000",
            "description": "Development server"
        }
    ],
    tags_metadata=[
        {
            "name": "portfolio",
            "description": "📁 Операции с портфолио: проекты, опыт, навыки",
        },
        {
            "name": "contact",
            "description": "💬 Контактные формы и обратная связь",
        },
        {
            "name": "health",
            "description": "🔍 Мониторинг здоровья системы",
        },
        {
            "name": "statistics",
            "description": "📈 Статистика и метрики",
        },
    ],
)

# Добавляем CORS middleware для работы с фронтендом
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Добавляем middleware для защиты от Host header attacks
app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=settings.ALLOWED_HOSTS
)

# Подключаем роуты
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get(
    "/",
    summary="🏠 Корневая страница API",
    description="Проверка работоспособности API и получение базовой информации.",
    response_description="Базовая информация о API",
    tags=["health"]
)
async def root() -> dict[str, str]:
    """
    🏠 Корневой эндпоинт.
    
    Проверяет работоспособность API и возвращает базовую информацию.
    
    Returns:
        dict: Словарь с информацией о API
    """
    return {
        "message": "R0D10N Portfolio API жив и здоров! 🚀",
        "docs": "/docs",
        "redoc": "/redoc",
        "version": "1.0.0",
        "author": "Родион Шевцов (R0D10N)",
        "github": "https://github.com/R0D10Nq"
    }


@app.get(
    "/health",
    summary="💗 Проверка здоровья",
    description="""
    Проверяет состояние API для мониторинга.
    
    Используется системами мониторинга, load balancer'ами и Docker health check'ами.
    """,
    response_description="Статус здоровья системы",
    tags=["health"]
)
async def health_check() -> dict[str, str]:
    """
    💗 Health check для мониторинга.
    
    Проверяет что API работает и может обрабатывать запросы.
    
    Returns:
        dict: Статус здоровья системы
    """
    return {
        "status": "healthy", 
        "service": "r0d10n-portfolio-api",
        "version": "1.0.0",
        "timestamp": "",  # Можно добавить datetime.utcnow().isoformat()
        "uptime": "running"
    }


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )