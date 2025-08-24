"""
API endpoints для контактной формы и подписок.
"""

from typing import List

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.core.database import get_sync_session
from app.models.contact import ContactMessage, NewsletterSubscriber
from app.schemas.contact import (
    ContactMessageCreate,
    ContactResponse,
    NewsletterSubscriberCreate,
    SubscriptionResponse,
)

router = APIRouter()


@router.post("/message", response_model=ContactResponse)
async def send_contact_message(
    message_data: ContactMessageCreate,
    background_tasks: BackgroundTasks,
    request: Request,
    db: Session = Depends(get_sync_session),
) -> ContactResponse:
    """
    Отправка сообщения через контактную форму.
    """
    try:
        # Получаем IP и User-Agent для лога
        client_ip = request.client.host if request.client else None
        user_agent = request.headers.get("User-Agent")
        
        # Создаем сообщение в БД
        message = ContactMessage(
            name=message_data.name,
            email=message_data.email,
            subject=message_data.subject,
            message=message_data.message,
            ip_address=client_ip,
            user_agent=user_agent,
        )
        
        db.add(message)
        db.commit()
        db.refresh(message)
        
        # Добавляем фоновую задачу для отправки уведомления
        background_tasks.add_task(
            send_notification_email,
            message_id=message.id,
            message_data=message_data
        )
        
        return ContactResponse(
            success=True,
            message="Сообщение успешно отправлено! Скоро отвечу.",
            message_id=message.id
        )
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Ошибка при отправке сообщения: {str(e)}"
        )


@router.post("/subscribe", response_model=SubscriptionResponse)
async def subscribe_to_newsletter(
    subscriber_data: NewsletterSubscriberCreate,
    request: Request,
    db: Session = Depends(get_sync_session),
) -> SubscriptionResponse:
    """
    Подписка на рассылку.
    """
    try:
        # Проверяем, не подписан ли уже
        existing_subscriber = db.query(NewsletterSubscriber).filter(
            NewsletterSubscriber.email == subscriber_data.email
        ).first()
        
        if existing_subscriber:
            if existing_subscriber.is_active:
                return SubscriptionResponse(
                    success=False,
                    message="Этот email уже подписан на рассылку"
                )
            else:
                # Реактивируем подписку
                existing_subscriber.is_active = True
                existing_subscriber.unsubscribed_at = None
                db.commit()
                
                return SubscriptionResponse(
                    success=True,
                    message="Подписка успешно восстановлена!",
                    subscriber_id=existing_subscriber.id
                )
        
        # Получаем IP и User-Agent
        client_ip = request.client.host if request.client else None
        user_agent = request.headers.get("User-Agent")
        
        # Создаем новую подписку
        subscriber = NewsletterSubscriber(
            email=subscriber_data.email,
            ip_address=client_ip,
            user_agent=user_agent,
        )
        
        db.add(subscriber)
        db.commit()
        db.refresh(subscriber)
        
        return SubscriptionResponse(
            success=True,
            message="Подписка оформлена! Спасибо за интерес к моим проектам.",
            subscriber_id=subscriber.id
        )
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Ошибка при оформлении подписки: {str(e)}"
        )


@router.post("/unsubscribe")
async def unsubscribe_from_newsletter(
    email: str,
    db: Session = Depends(get_sync_session),
) -> SubscriptionResponse:
    """
    Отписка от рассылки.
    """
    try:
        subscriber = db.query(NewsletterSubscriber).filter(
            NewsletterSubscriber.email == email,
            NewsletterSubscriber.is_active == True
        ).first()
        
        if not subscriber:
            return SubscriptionResponse(
                success=False,
                message="Подписка с таким email не найдена"
            )
        
        # Деактивируем подписку
        from datetime import datetime
        subscriber.is_active = False
        subscriber.unsubscribed_at = datetime.utcnow()
        db.commit()
        
        return SubscriptionResponse(
            success=True,
            message="Подписка успешно отменена"
        )
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Ошибка при отписке: {str(e)}"
        )


async def send_notification_email(message_id: int, message_data: ContactMessageCreate) -> None:
    """
    Фоновая задача для отправки уведомления о новом сообщении.
    Пока что просто логируем, в будущем можно добавить реальную отправку.
    """
    import logging
    
    logger = logging.getLogger(__name__)
    logger.info(
        f"Новое сообщение #{message_id} от {message_data.name} ({message_data.email}): "
        f"{message_data.subject}"
    )
    
    # TODO: Здесь можно добавить отправку на email или в Telegram
    # await send_telegram_notification(message_data)
    # await send_email_notification(message_data)