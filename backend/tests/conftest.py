"""
Конфигурация для тестов.
Тут настраиваем тестовую базу данных и фикстуры.
"""

import asyncio
from typing import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.database import Base, get_sync_session
from app.main import app

# Используем in-memory SQLite для тестов
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    """Переопределяем зависимость для тестовой БД."""
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


# Переопределяем зависимость
app.dependency_overrides[get_sync_session] = override_get_db


@pytest.fixture(scope="session")
def event_loop():
    """Создаем event loop для async тестов."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="function")
def db_session():
    """Создаем тестовую сессию БД для каждого теста."""
    # Создаем таблицы
    Base.metadata.create_all(bind=engine)
    
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        # Удаляем таблицы после теста
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db_session):
    """Создаем тестовый клиент FastAPI."""
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture
def sample_personal_info():
    """Образец личной информации для тестов."""
    return {
        "name": "Тест Тестов",
        "title": "Test Developer",
        "bio": "Тестовый разработчик для unit-тестов",
        "location": "Тестоград",
        "email": "test@example.com",
        "phone": "+7 (999) 123-45-67",
        "github_url": "https://github.com/testuser",
        "telegram_url": "https://t.me/testuser",
        "years_of_experience": 5,
        "is_available_for_hire": True,
    }


@pytest.fixture
def sample_technology():
    """Образец технологии для тестов."""
    return {
        "name": "TestJS",
        "category": "testing",
        "color": "#ff0000",
        "icon": "test-icon",
    }


@pytest.fixture
def sample_project():
    """Образец проекта для тестов."""
    return {
        "title": "Тестовый проект",
        "description": "Очень крутой тестовый проект для проверки тестов",
        "short_description": "Тестовый проект",
        "github_url": "https://github.com/testuser/test-project",
        "demo_url": "https://test-project.com",
        "is_featured": True,
        "stars_count": 42,
    }


@pytest.fixture
def sample_experience():
    """Образец опыта работы для тестов."""
    from datetime import datetime
    
    return {
        "company": "Тестовая Компания",
        "position": "Test Developer",
        "description": "Писал тесты для тестирования тестов",
        "location": "Тестоград",
        "start_date": datetime(2022, 1, 1),
        "end_date": datetime(2023, 12, 31),
        "is_current": False,
        "company_url": "https://test-company.com",
        "achievements": "Написал 1000+ тестов",
    }


@pytest.fixture
def sample_contact_message():
    """Образец сообщения с контактной формы."""
    return {
        "name": "Тест Клиент",
        "email": "client@example.com",
        "subject": "Тестовое сообщение",
        "message": "Это тестовое сообщение для проверки контактной формы",
    }


@pytest.fixture
def sample_newsletter_subscriber():
    """Образец подписчика на рассылку."""
    return {
        "email": "subscriber@example.com"
    }