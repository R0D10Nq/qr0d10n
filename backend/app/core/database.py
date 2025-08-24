"""
Работа с базой данных через SQLAlchemy.
Тут настраиваем подключение, сессии и все такое.
"""

from typing import AsyncGenerator

from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

# Базовый класс для моделей
Base = declarative_base()

# Создаем движок для работы с БД
if settings.DATABASE_URL.startswith("sqlite"):
    # Для SQLite используем обычную синхронную версию
    engine = create_engine(
        settings.DATABASE_URL,
        connect_args={"check_same_thread": False},
        echo=settings.is_development,
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    async_engine = None
    AsyncSessionLocal = None
else:
    # Для PostgreSQL используем асинхронную версию
    async_engine = create_async_engine(
        settings.DATABASE_URL,
        echo=settings.is_development,
        future=True,
    )
    AsyncSessionLocal = async_sessionmaker(
        async_engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )
    
    # Синхронная версия для миграций
    sync_database_url = settings.DATABASE_URL.replace("postgresql+asyncpg://", "postgresql://")
    engine = create_engine(sync_database_url, echo=settings.is_development)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Получаем асинхронную сессию для работы с БД.
    Dependency для FastAPI.
    """
    if AsyncSessionLocal is None:
        raise RuntimeError("Асинхронные сессии не настроены для SQLite")
    
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


def get_sync_session():
    """
    Получаем синхронную сессию для работы с БД.
    Используется для миграций и простых операций.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def init_db() -> None:
    """
    Инициализируем базу данных - создаем таблицы если их нет.
    """
    if async_engine:
        # Для PostgreSQL
        from app.models import *  # noqa: F401, F403
        async with async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    else:
        # Для SQLite
        from app.models import *  # noqa: F401, F403
        Base.metadata.create_all(bind=engine)