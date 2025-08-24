"""
Конфигурация приложения.
Тут все настройки из переменных окружения и дефолтные значения.
"""

from typing import Any, Dict, List, Optional, Union

from pydantic import AnyHttpUrl, EmailStr, field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Настройки приложения с валидацией через Pydantic.
    Все значения можно переопределить через переменные окружения.
    """
    
    # Основные настройки проекта
    PROJECT_NAME: str = "R0D10N Portfolio API"
    PROJECT_DESCRIPTION: str = "Backend API для портфолио крутого Python разработчика"
    API_V1_STR: str = "/api/v1"
    
    # Безопасность
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM: str = "HS256"
    
    # База данных
    DATABASE_URL: str = "sqlite:///./portfolio.db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # CORS
    ALLOWED_HOSTS: List[str] = ["*"]
    
    @field_validator("ALLOWED_HOSTS", mode="before")
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        """Парсим CORS origins из строки или списка."""
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)
    
    # Email настройки (для контактной формы)
    SMTP_TLS: bool = True
    SMTP_PORT: Optional[int] = None
    SMTP_HOST: Optional[str] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    EMAILS_FROM_EMAIL: Optional[EmailStr] = None
    EMAILS_FROM_NAME: Optional[str] = "R0D10N Portfolio"
    
    # GitHub интеграция
    GITHUB_TOKEN: Optional[str] = None
    GITHUB_USERNAME: str = "R0D10Nq"
    
    # Telegram бот
    TELEGRAM_BOT_TOKEN: Optional[str] = None
    TELEGRAM_CHAT_ID: Optional[str] = None
    
    # Логирование
    LOG_LEVEL: str = "INFO"
    
    # Окружение
    ENVIRONMENT: str = "development"
    
    @property
    def is_development(self) -> bool:
        """Проверяем, запущены ли мы в development режиме."""
        return self.ENVIRONMENT.lower() == "development"
    
    @property
    def is_production(self) -> bool:
        """Проверяем, запущены ли мы в production."""
        return self.ENVIRONMENT.lower() == "production"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Создаем глобальный объект настроек
settings = Settings()