"""
Celery приложение для фоновых задач.
Тут настраиваем воркеры для асинхронных операций.
"""

from celery import Celery

from app.core.config import settings

# Создаем Celery приложение
celery_app = Celery(
    "r0d10n-portfolio",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=[
        "app.tasks.email_tasks",
        "app.tasks.github_tasks",
        "app.tasks.notification_tasks",
    ]
)

# Конфигурация Celery
celery_app.conf.update(
    # Временная зона
    timezone="Europe/Moscow",
    enable_utc=True,
    
    # Сериализация
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    
    # Роутинг задач
    task_routes={
        "app.tasks.email_tasks.*": {"queue": "emails"},
        "app.tasks.github_tasks.*": {"queue": "github"},
        "app.tasks.notification_tasks.*": {"queue": "notifications"},
    },
    
    # TTL для результатов
    result_expires=3600,
    
    # Retry политика
    task_default_retry_delay=60,
    task_max_retries=3,
    
    # Мониторинг
    worker_send_task_events=True,
    task_send_sent_event=True,
)