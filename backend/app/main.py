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
    description="API для портфолио крутого Python разработчика",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
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


@app.get("/")
async def root() -> dict[str, str]:
    """
    Корневой эндпоинт - просто проверка что API живое.
    """
    return {
        "message": "R0D10N Portfolio API жив и здоров! 🚀",
        "docs": "/docs",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check() -> dict[str, str]:
    """
    Health check для мониторинга.
    """
    return {"status": "healthy", "service": "r0d10n-portfolio-api"}


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )