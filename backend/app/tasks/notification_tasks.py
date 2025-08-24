"""
Celery задачи для отправки уведомлений в Telegram.
"""

import logging
from datetime import datetime
from typing import Dict, Any

import httpx

from app.celery_app import celery_app
from app.core.config import settings

logger = logging.getLogger(__name__)


@celery_app.task(bind=True, max_retries=3)
def send_telegram_notification(self, message: str, parse_mode: str = "HTML") -> Dict[str, Any]:
    """
    Отправка уведомления в Telegram.
    """
    try:
        if not settings.TELEGRAM_BOT_TOKEN or not settings.TELEGRAM_CHAT_ID:
            logger.warning("Telegram не настроен, пропускаем отправку уведомления")
            return {
                "status": "skipped",
                "message": "Telegram не настроен"
            }
        
        url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
        
        payload = {
            "chat_id": settings.TELEGRAM_CHAT_ID,
            "text": message,
            "parse_mode": parse_mode,
            "disable_web_page_preview": True
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload)
            
            if response.status_code == 200:
                logger.info("Telegram уведомление отправлено успешно")
                return {
                    "status": "success",
                    "message": "Уведомление отправлено в Telegram"
                }
            else:
                raise Exception(f"Telegram API error: {response.status_code} - {response.text}")
                
    except Exception as e:
        logger.error(f"Ошибка при отправке в Telegram: {e}")
        
        if self.request.retries < self.max_retries:
            raise self.retry(countdown=60, exc=e)
        
        return {
            "status": "error",
            "message": str(e)
        }


@celery_app.task
def send_new_contact_message_notification(message_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Отправка уведомления о новом сообщении с контактной формы в Telegram.
    """
    try:
        telegram_message = f"""
🔔 <b>Новое сообщение с портфолио!</b>

👤 <b>От:</b> {message_data['name']}
📧 <b>Email:</b> {message_data['email']}
📝 <b>Тема:</b> {message_data['subject']}

💬 <b>Сообщение:</b>
{message_data['message'][:500]}{'...' if len(message_data['message']) > 500 else ''}
        """
        
        # Отправляем уведомление
        result = send_telegram_notification.delay(telegram_message)
        
        return {
            "status": "success",
            "message": "Уведомление о новом сообщении отправлено",
            "task_id": result.id
        }
        
    except Exception as e:
        logger.error(f"Ошибка при формировании уведомления о сообщении: {e}")
        return {
            "status": "error",
            "message": str(e)
        }


@celery_app.task
def send_new_subscriber_notification(subscriber_email: str) -> Dict[str, Any]:
    """
    Отправка уведомления о новом подписчике в Telegram.
    """
    try:
        telegram_message = f"""
🎉 <b>Новый подписчик!</b>

📧 <b>Email:</b> {subscriber_email}
📅 <b>Время:</b> {datetime.now().strftime('%d.%m.%Y %H:%M')}

Теперь у нас еще один заинтересованный человек! 🚀
        """
        
        result = send_telegram_notification.delay(telegram_message)
        
        return {
            "status": "success",
            "message": "Уведомление о новом подписчике отправлено",
            "task_id": result.id
        }
        
    except Exception as e:
        logger.error(f"Ошибка при формировании уведомления о подписчике: {e}")
        return {
            "status": "error",
            "message": str(e)
        }


@celery_app.task
def send_daily_stats_notification() -> Dict[str, Any]:
    """
    Отправка ежедневной статистики в Telegram.
    """
    try:
        
        # TODO: Получаем статистику из БД
        # Пока что заглушка
        stats_message = f"""
📊 <b>Ежедневная статистика портфолио</b>

📅 <b>Дата:</b> {datetime.now().strftime('%d.%m.%Y')}

📧 <b>Сообщения за сутки:</b> 0
🎯 <b>Новые подписчики:</b> 0
👁️ <b>Просмотры портфолио:</b> N/A
⭐ <b>Звезды GitHub:</b> N/A

🚀 Продолжаем развиваться!
        """
        
        result = send_telegram_notification.delay(stats_message)
        
        return {
            "status": "success",
            "message": "Ежедневная статистика отправлена",
            "task_id": result.id
        }
        
    except Exception as e:
        logger.error(f"Ошибка при отправке ежедневной статистики: {e}")
        return {
            "status": "error",
            "message": str(e)
        }