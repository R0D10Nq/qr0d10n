"""
Тесты для контактных API.
Проверяем отправку сообщений и подписки на рассылку.
"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.contact import ContactMessage, NewsletterSubscriber


class TestContactAPI:
    """Тесты для контактного API."""
    
    def test_send_contact_message_success(
        self, 
        client: TestClient, 
        db_session: Session,
        sample_contact_message: dict
    ):
        """Тест успешной отправки контактного сообщения."""
        response = client.post(
            "/api/v1/contact/message",
            json=sample_contact_message
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "message_id" in data
        assert "Сообщение успешно отправлено" in data["message"]
        
        # Проверяем что сообщение сохранилось в БД
        message = db_session.query(ContactMessage).first()
        assert message is not None
        assert message.name == sample_contact_message["name"]
        assert message.email == sample_contact_message["email"]
        assert message.subject == sample_contact_message["subject"]
        assert message.message == sample_contact_message["message"]
        assert message.is_read is False
        assert message.is_replied is False
    
    def test_send_contact_message_invalid_email(self, client: TestClient):
        """Тест отправки сообщения с невалидным email."""
        invalid_message = {
            "name": "Тест",
            "email": "invalid-email",
            "subject": "Тест",
            "message": "Тестовое сообщение"
        }
        
        response = client.post(
            "/api/v1/contact/message",
            json=invalid_message
        )
        
        assert response.status_code == 422  # Validation error
    
    def test_send_contact_message_missing_fields(self, client: TestClient):
        """Тест отправки сообщения с отсутствующими полями."""
        incomplete_message = {
            "name": "Тест",
            "email": "test@example.com"
            # Отсутствуют subject и message
        }
        
        response = client.post(
            "/api/v1/contact/message",
            json=incomplete_message
        )
        
        assert response.status_code == 422
    
    def test_subscribe_to_newsletter_success(
        self, 
        client: TestClient, 
        db_session: Session,
        sample_newsletter_subscriber: dict
    ):
        """Тест успешной подписки на рассылку."""
        response = client.post(
            "/api/v1/contact/subscribe",
            json=sample_newsletter_subscriber
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "subscriber_id" in data
        assert "Подписка оформлена" in data["message"]
        
        # Проверяем что подписка сохранилась в БД
        subscriber = db_session.query(NewsletterSubscriber).first()
        assert subscriber is not None
        assert subscriber.email == sample_newsletter_subscriber["email"]
        assert subscriber.is_active is True
    
    def test_subscribe_duplicate_email(
        self, 
        client: TestClient, 
        db_session: Session,
        sample_newsletter_subscriber: dict
    ):
        """Тест повторной подписки с тем же email."""
        # Первая подписка
        response1 = client.post(
            "/api/v1/contact/subscribe",
            json=sample_newsletter_subscriber
        )
        assert response1.status_code == 200
        
        # Повторная подписка
        response2 = client.post(
            "/api/v1/contact/subscribe",
            json=sample_newsletter_subscriber
        )
        assert response2.status_code == 200
        data = response2.json()
        assert data["success"] is False
        assert "уже подписан" in data["message"]
    
    def test_reactivate_subscription(
        self, 
        client: TestClient, 
        db_session: Session,
        sample_newsletter_subscriber: dict
    ):
        """Тест реактивации отписанного пользователя."""
        # Создаем неактивную подписку
        subscriber = NewsletterSubscriber(
            email=sample_newsletter_subscriber["email"],
            is_active=False
        )
        db_session.add(subscriber)
        db_session.commit()
        
        # Подписываемся заново
        response = client.post(
            "/api/v1/contact/subscribe",
            json=sample_newsletter_subscriber
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "восстановлена" in data["message"]
        
        # Проверяем что подписка реактивирована
        db_session.refresh(subscriber)
        assert subscriber.is_active is True
        assert subscriber.unsubscribed_at is None
    
    def test_unsubscribe_success(
        self, 
        client: TestClient, 
        db_session: Session,
        sample_newsletter_subscriber: dict
    ):
        """Тест успешной отписки от рассылки."""
        # Создаем активную подписку
        subscriber = NewsletterSubscriber(
            email=sample_newsletter_subscriber["email"],
            is_active=True
        )
        db_session.add(subscriber)
        db_session.commit()
        
        # Отписываемся
        response = client.post(
            "/api/v1/contact/unsubscribe",
            params={"email": sample_newsletter_subscriber["email"]}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "отменена" in data["message"]
        
        # Проверяем что подписка деактивирована
        db_session.refresh(subscriber)
        assert subscriber.is_active is False
        assert subscriber.unsubscribed_at is not None
    
    def test_unsubscribe_not_found(self, client: TestClient):
        """Тест отписки несуществующего email."""
        response = client.post(
            "/api/v1/contact/unsubscribe",
            params={"email": "nonexistent@example.com"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is False
        assert "не найдена" in data["message"]
    
    def test_subscribe_invalid_email(self, client: TestClient):
        """Тест подписки с невалидным email."""
        invalid_subscriber = {
            "email": "invalid-email"
        }
        
        response = client.post(
            "/api/v1/contact/subscribe",
            json=invalid_subscriber
        )
        
        assert response.status_code == 422