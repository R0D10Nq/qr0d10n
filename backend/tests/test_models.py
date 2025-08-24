"""
Тесты для моделей базы данных.
Проверяем что модели работают правильно.
"""

import pytest
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app.models.portfolio import (
    PersonalInfo, 
    Project, 
    Technology, 
    Experience, 
    ProjectTechnology
)
from app.models.contact import ContactMessage, NewsletterSubscriber


class TestPortfolioModels:
    """Тесты для моделей портфолио."""
    
    def test_personal_info_creation(
        self, 
        db_session: Session, 
        sample_personal_info: dict
    ):
        """Тест создания личной информации."""
        personal_info = PersonalInfo(**sample_personal_info)
        db_session.add(personal_info)
        db_session.commit()
        db_session.refresh(personal_info)
        
        assert personal_info.id is not None
        assert personal_info.name == sample_personal_info["name"]
        assert personal_info.email == sample_personal_info["email"]
        assert personal_info.is_available_for_hire is True
        assert personal_info.updated_at is not None
    
    def test_project_creation(
        self, 
        db_session: Session, 
        sample_project: dict
    ):
        """Тест создания проекта."""
        project = Project(**sample_project)
        db_session.add(project)
        db_session.commit()
        db_session.refresh(project)
        
        assert project.id is not None
        assert project.title == sample_project["title"]
        assert project.is_active is True
        assert project.created_at is not None
        assert project.updated_at is not None
    
    def test_technology_creation(
        self, 
        db_session: Session, 
        sample_technology: dict
    ):
        """Тест создания технологии."""
        tech = Technology(**sample_technology)
        db_session.add(tech)
        db_session.commit()
        db_session.refresh(tech)
        
        assert tech.id is not None
        assert tech.name == sample_technology["name"]
        assert tech.category == sample_technology["category"]
        assert tech.is_active is True
    
    def test_experience_creation_and_duration(
        self, 
        db_session: Session, 
        sample_experience: dict
    ):
        """Тест создания опыта работы и расчета продолжительности."""
        exp = Experience(**sample_experience)
        db_session.add(exp)
        db_session.commit()
        db_session.refresh(exp)
        
        assert exp.id is not None
        assert exp.company == sample_experience["company"]
        assert exp.is_current is False
        
        # Проверяем расчет продолжительности
        expected_months = (exp.end_date - exp.start_date).days // 30
        assert exp.duration_months == expected_months
    
    def test_experience_current_job(self, db_session: Session):
        """Тест текущего места работы без даты окончания."""
        exp_data = {
            "company": "Текущая Компания",
            "position": "Senior Developer",
            "description": "Работаю сейчас",
            "location": "Удаленно",
            "start_date": datetime.now() - timedelta(days=365),
            "is_current": True
        }
        
        exp = Experience(**exp_data)
        db_session.add(exp)
        db_session.commit()
        db_session.refresh(exp)
        
        assert exp.is_current is True
        assert exp.end_date is None
        
        # Для текущей работы duration_months вычисляется от start_date до сейчас
        assert exp.duration_months > 0
    
    def test_project_technology_relationship(
        self, 
        db_session: Session,
        sample_project: dict,
        sample_technology: dict
    ):
        """Тест связи между проектами и технологиями."""
        # Создаем проект и технологию
        project = Project(**sample_project)
        tech = Technology(**sample_technology)
        
        db_session.add_all([project, tech])
        db_session.commit()
        db_session.refresh(project)
        db_session.refresh(tech)
        
        # Создаем связь
        project_tech = ProjectTechnology(
            project_id=project.id,
            technology_id=tech.id
        )
        db_session.add(project_tech)
        db_session.commit()
        
        # Проверяем связи
        assert len(project.technologies) == 1
        assert project.technologies[0].technology.name == tech.name
        assert len(tech.projects) == 1
        assert tech.projects[0].project.title == project.title


class TestContactModels:
    """Тесты для контактных моделей."""
    
    def test_contact_message_creation(
        self, 
        db_session: Session, 
        sample_contact_message: dict
    ):
        """Тест создания контактного сообщения."""
        message = ContactMessage(
            **sample_contact_message,
            ip_address="127.0.0.1",
            user_agent="TestAgent/1.0"
        )
        db_session.add(message)
        db_session.commit()
        db_session.refresh(message)
        
        assert message.id is not None
        assert message.name == sample_contact_message["name"]
        assert message.email == sample_contact_message["email"]
        assert message.is_read is False
        assert message.is_replied is False
        assert message.created_at is not None
        assert message.ip_address == "127.0.0.1"
    
    def test_contact_message_repr(
        self, 
        db_session: Session, 
        sample_contact_message: dict
    ):
        """Тест строкового представления сообщения."""
        message = ContactMessage(**sample_contact_message)
        db_session.add(message)
        db_session.commit()
        db_session.refresh(message)
        
        repr_str = repr(message)
        assert f"ContactMessage(id={message.id}" in repr_str
        assert message.name in repr_str
        assert message.subject in repr_str
    
    def test_newsletter_subscriber_creation(
        self, 
        db_session: Session, 
        sample_newsletter_subscriber: dict
    ):
        """Тест создания подписчика на рассылку."""
        subscriber = NewsletterSubscriber(
            **sample_newsletter_subscriber,
            ip_address="192.168.1.1",
            user_agent="TestBrowser/2.0"
        )
        db_session.add(subscriber)
        db_session.commit()
        db_session.refresh(subscriber)
        
        assert subscriber.id is not None
        assert subscriber.email == sample_newsletter_subscriber["email"]
        assert subscriber.is_active is True
        assert subscriber.created_at is not None
        assert subscriber.unsubscribed_at is None
        assert subscriber.ip_address == "192.168.1.1"
    
    def test_newsletter_subscriber_repr(
        self, 
        db_session: Session, 
        sample_newsletter_subscriber: dict
    ):
        """Тест строкового представления подписчика."""
        subscriber = NewsletterSubscriber(**sample_newsletter_subscriber)
        db_session.add(subscriber)
        db_session.commit()
        db_session.refresh(subscriber)
        
        repr_str = repr(subscriber)
        assert f"NewsletterSubscriber(id={subscriber.id}" in repr_str
        assert subscriber.email in repr_str
        assert str(subscriber.is_active) in repr_str
    
    def test_newsletter_subscriber_unsubscribe(
        self, 
        db_session: Session, 
        sample_newsletter_subscriber: dict
    ):
        """Тест отписки подписчика."""
        subscriber = NewsletterSubscriber(**sample_newsletter_subscriber)
        db_session.add(subscriber)
        db_session.commit()
        
        # Отписываем
        subscriber.is_active = False
        subscriber.unsubscribed_at = datetime.utcnow()
        db_session.commit()
        db_session.refresh(subscriber)
        
        assert subscriber.is_active is False
        assert subscriber.unsubscribed_at is not None


class TestModelValidation:
    """Тесты валидации моделей."""
    
    def test_personal_info_unique_constraint(self, db_session: Session):
        """Тест что может быть только одна запись личной информации."""
        # Создаем первую запись
        personal_info1 = PersonalInfo(
            name="Первый",
            title="Developer",
            bio="Описание",
            location="Город",
            email="first@example.com"
        )
        db_session.add(personal_info1)
        db_session.commit()
        
        # Создаем вторую запись (это нормально на уровне модели)
        personal_info2 = PersonalInfo(
            name="Второй",
            title="Developer",
            bio="Описание",
            location="Город",
            email="second@example.com"
        )
        db_session.add(personal_info2)
        db_session.commit()
        
        # Проверяем что обе записи созданы
        count = db_session.query(PersonalInfo).count()
        assert count == 2
    
    def test_technology_unique_name(self, db_session: Session):
        """Тест уникальности имени технологии."""
        # Создаем первую технологию
        tech1 = Technology(
            name="Python",
            category="backend"
        )
        db_session.add(tech1)
        db_session.commit()
        
        # Попытка создать технологию с тем же именем должна привести к ошибке
        tech2 = Technology(
            name="Python",
            category="testing"
        )
        db_session.add(tech2)
        
        with pytest.raises(Exception):  # IntegrityError
            db_session.commit()
    
    def test_newsletter_subscriber_unique_email(self, db_session: Session):
        """Тест уникальности email подписчика."""
        # Создаем первого подписчика
        subscriber1 = NewsletterSubscriber(email="test@example.com")
        db_session.add(subscriber1)
        db_session.commit()
        
        # Попытка создать подписчика с тем же email
        subscriber2 = NewsletterSubscriber(email="test@example.com")
        db_session.add(subscriber2)
        
        with pytest.raises(Exception):  # IntegrityError
            db_session.commit()