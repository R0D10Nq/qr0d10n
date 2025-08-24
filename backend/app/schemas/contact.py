"""
Pydantic схемы для контактной формы и сообщений.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


# Схемы для контактных сообщений
class ContactMessageBase(BaseModel):
    """Базовая схема контактного сообщения."""
    name: str
    email: EmailStr
    subject: str
    message: str


class ContactMessageCreate(ContactMessageBase):
    """Схема для создания сообщения."""
    pass


class ContactMessage(ContactMessageBase):
    """Полная схема контактного сообщения."""
    id: int
    is_read: bool = False
    is_replied: bool = False
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    created_at: datetime
    replied_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


# Схемы для подписки на рассылку
class NewsletterSubscriberBase(BaseModel):
    """Базовая схема подписчика."""
    email: EmailStr


class NewsletterSubscriberCreate(NewsletterSubscriberBase):
    """Схема для подписки на рассылку."""
    pass


class NewsletterSubscriber(NewsletterSubscriberBase):
    """Полная схема подписчика."""
    id: int
    is_active: bool = True
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    created_at: datetime
    unsubscribed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


# Ответы API
class ContactResponse(BaseModel):
    """Ответ после отправки сообщения."""
    success: bool
    message: str
    message_id: Optional[int] = None


class SubscriptionResponse(BaseModel):
    """Ответ после подписки на рассылку."""
    success: bool
    message: str
    subscriber_id: Optional[int] = None