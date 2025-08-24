"""
Redis клиент и кеширование.
Тут настраиваем подключение к Redis и утилиты для кеша.
"""

import json
from typing import Any, Optional

import redis.asyncio as redis
from redis.asyncio import Redis

from app.core.config import settings

# Глобальный клиент Redis
redis_client: Optional[Redis] = None


async def get_redis() -> Redis:
    """
    Получаем Redis клиент.
    Dependency для FastAPI.
    """
    global redis_client
    
    if redis_client is None:
        redis_client = redis.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True,
        )
    
    return redis_client


async def close_redis():
    """Закрываем подключение к Redis."""
    global redis_client
    
    if redis_client:
        await redis_client.close()
        redis_client = None


class CacheService:
    """
    Сервис для работы с кешем.
    Обертка над Redis с удобными методами.
    """
    
    def __init__(self, redis_client: Redis):
        self.redis = redis_client
    
    async def get(self, key: str) -> Optional[Any]:
        """Получаем значение из кеша."""
        try:
            value = await self.redis.get(key)
            if value:
                return json.loads(value)
            return None
        except Exception as e:
            print(f"Ошибка при получении из кеша {key}: {e}")
            return None
    
    async def set(
        self, 
        key: str, 
        value: Any, 
        expire: Optional[int] = None
    ) -> bool:
        """Сохраняем значение в кеш."""
        try:
            json_value = json.dumps(value, default=str)
            if expire:
                await self.redis.setex(key, expire, json_value)
            else:
                await self.redis.set(key, json_value)
            return True
        except Exception as e:
            print(f"Ошибка при сохранении в кеш {key}: {e}")
            return False
    
    async def delete(self, key: str) -> bool:
        """Удаляем значение из кеша."""
        try:
            await self.redis.delete(key)
            return True
        except Exception as e:
            print(f"Ошибка при удалении из кеша {key}: {e}")
            return False
    
    async def clear_pattern(self, pattern: str) -> int:
        """Удаляем все ключи по паттерну."""
        try:
            keys = await self.redis.keys(pattern)
            if keys:
                return await self.redis.delete(*keys)
            return 0
        except Exception as e:
            print(f"Ошибка при очистке кеша по паттерну {pattern}: {e}")
            return 0
    
    async def exists(self, key: str) -> bool:
        """Проверяем существование ключа в кеше."""
        try:
            return bool(await self.redis.exists(key))
        except Exception as e:
            print(f"Ошибка при проверке существования ключа {key}: {e}")
            return False


# Ключи для кеширования
class CacheKeys:
    """Константы для ключей кеша."""
    
    PORTFOLIO_FULL = "portfolio:full"
    PORTFOLIO_PERSONAL = "portfolio:personal"
    PORTFOLIO_PROJECTS = "portfolio:projects"
    PORTFOLIO_EXPERIENCE = "portfolio:experience"
    PORTFOLIO_TECHNOLOGIES = "portfolio:technologies"
    PORTFOLIO_STATS = "portfolio:stats"
    
    # TTL (время жизни кеша в секундах)
    PORTFOLIO_TTL = 3600  # 1 час
    STATS_TTL = 1800  # 30 минут
    
    @staticmethod
    def project_detail(project_id: int) -> str:
        """Ключ для конкретного проекта."""
        return f"portfolio:project:{project_id}"
    
    @staticmethod
    def projects_filtered(featured: bool = False, tech: str = None) -> str:
        """Ключ для отфильтрованных проектов."""
        key = "portfolio:projects:filtered"
        if featured:
            key += ":featured"
        if tech:
            key += f":tech:{tech}"
        return key


async def get_cache_service() -> CacheService:
    """Dependency для получения сервиса кеша."""
    redis_client = await get_redis()
    return CacheService(redis_client)