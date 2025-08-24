"""
Celery задачи для отправки email уведомлений.
"""

import logging
from typing import Dict, Any

from app.celery_app import celery_app
from app.core.config import settings

logger = logging.getLogger(__name__)


@celery_app.task(bind=True, max_retries=3)
def send_contact_notification(self, message_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Отправка уведомления о новом сообщении с контактной формы.
    """
    try:
        logger.info(
            f"Получено новое сообщение от {message_data['name']} "
            f"({message_data['email']}): {message_data['subject']}"
        )
        
        # TODO: Здесь можно добавить реальную отправку email
        # Пока что просто логируем
        
        return {
            "status": "success",
            "message": "Уведомление отправлено",
            "recipient": message_data["email"]
        }
        
    except Exception as e:
        logger.error(f"Ошибка при отправке уведомления: {e}")
        
        # Retry через минуту
        if self.request.retries < self.max_retries:
            raise self.retry(countdown=60, exc=e)
        
        return {
            "status": "error",
            "message": str(e)
        }


@celery_app.task(bind=True, max_retries=3)
def send_welcome_email(self, subscriber_email: str) -> Dict[str, Any]:
    """
    Отправка приветственного письма новому подписчику.
    """
    try:
        logger.info(f"Отправляем приветственное письмо для {subscriber_email}")
        
        # TODO: Здесь можно добавить отправку приветственного письма
        
        return {
            "status": "success",
            "message": "Приветственное письмо отправлено",
            "recipient": subscriber_email
        }
        
    except Exception as e:
        logger.error(f"Ошибка при отправке приветственного письма: {e}")
        
        if self.request.retries < self.max_retries:
            raise self.retry(countdown=60, exc=e)
        
        return {
            "status": "error",
            "message": str(e)
        }


@celery_app.task
def send_newsletter(subject: str, content: str, recipient_emails: list[str]) -> Dict[str, Any]:
    """
    Массовая рассылка подписчикам.
    """
    try:
        logger.info(f"Отправляем рассылку '{subject}' для {len(recipient_emails)} подписчиков")
        
        # TODO: Здесь можно добавить массовую отправку
        
        return {
            "status": "success",
            "message": f"Рассылка отправлена {len(recipient_emails)} подписчикам",
            "subject": subject,
            "recipients_count": len(recipient_emails)
        }
        
    except Exception as e:
        logger.error(f"Ошибка при массовой рассылке: {e}")
        return {
            "status": "error",
            "message": str(e)
        }