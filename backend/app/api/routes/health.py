"""
Health check endpoints.
Простые роуты для проверки статуса API.
"""

from typing import Dict, Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_sync_session

router = APIRouter()


@router.get("/")
async def health_check() -> Dict[str, str]:
    """
    Простая проверка что API живое.
    """
    return {"status": "healthy", "service": "r0d10n-portfolio-api"}


@router.get("/db")
def health_check_db(db: Session = Depends(get_sync_session)) -> Dict[str, str]:
    """
    Проверяем подключение к базе данных.
    """
    try:
        # Простой запрос к БД
        db.execute("SELECT 1")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}


@router.get("/detailed")
async def detailed_health_check() -> Dict[str, Any]:
    """
    Детальная информация о состоянии сервиса.
    """
    import psutil
    import sys
    from datetime import datetime
    
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "python_version": sys.version,
        "memory_usage": {
            "total": psutil.virtual_memory().total,
            "available": psutil.virtual_memory().available,
            "percent": psutil.virtual_memory().percent,
        },
        "cpu_usage": psutil.cpu_percent(interval=1),
        "uptime": "TODO: add uptime tracking",
        "version": "1.0.0",
    }