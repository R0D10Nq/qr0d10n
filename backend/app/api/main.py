"""
Главный API роутер.
Тут собираем все роуты в одну кучу.
"""

from fastapi import APIRouter

from app.api.routes import portfolio, contact, health

api_router = APIRouter()

# Подключаем роуты
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(portfolio.router, prefix="/portfolio", tags=["portfolio"])
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])