"""
Модели для портфолио данных - проекты, навыки, опыт работы.
"""

from datetime import datetime
from typing import List, Optional

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Project(Base):
    """
    Модель проекта в портфолио.
    Хранит информацию о проектах разработчика.
    """
    
    __tablename__ = "projects"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    short_description: Mapped[str] = mapped_column(String(500), nullable=False)
    github_url: Mapped[Optional[str]] = mapped_column(String(500))
    demo_url: Mapped[Optional[str]] = mapped_column(String(500))
    image_url: Mapped[Optional[str]] = mapped_column(String(500))
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    stars_count: Mapped[Optional[int]] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Связи
    technologies: Mapped[List["ProjectTechnology"]] = relationship("ProjectTechnology", back_populates="project")


class Technology(Base):
    """
    Модель технологии/навыка.
    """
    
    __tablename__ = "technologies"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    category: Mapped[str] = mapped_column(String(50), nullable=False)  # backend, frontend, devops, etc.
    color: Mapped[Optional[str]] = mapped_column(String(7))  # HEX цвет для UI
    icon: Mapped[Optional[str]] = mapped_column(String(100))  # иконка
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    
    # Связи
    projects: Mapped[List["ProjectTechnology"]] = relationship("ProjectTechnology", back_populates="technology")


class ProjectTechnology(Base):
    """
    Связь между проектами и технологиями (many-to-many).
    """
    
    __tablename__ = "project_technologies"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    project_id: Mapped[int] = mapped_column(Integer, ForeignKey("projects.id"))
    technology_id: Mapped[int] = mapped_column(Integer, ForeignKey("technologies.id"))
    
    # Связи
    project: Mapped["Project"] = relationship("Project", back_populates="technologies")
    technology: Mapped["Technology"] = relationship("Technology", back_populates="projects")


class Experience(Base):
    """
    Модель опыта работы.
    """
    
    __tablename__ = "experiences"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    company: Mapped[str] = mapped_column(String(200), nullable=False)
    position: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    location: Mapped[str] = mapped_column(String(100), nullable=False)
    start_date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    end_date: Mapped[Optional[datetime]] = mapped_column(DateTime)
    is_current: Mapped[bool] = mapped_column(Boolean, default=False)
    company_url: Mapped[Optional[str]] = mapped_column(String(500))
    achievements: Mapped[Optional[str]] = mapped_column(Text)  # JSON string с достижениями
    
    @property
    def duration_months(self) -> int:
        """Вычисляем продолжительность работы в месяцах."""
        end = self.end_date if self.end_date else datetime.utcnow()
        delta = end - self.start_date
        return int(delta.days / 30)


class PersonalInfo(Base):
    """
    Модель личной информации разработчика.
    Singleton - должна быть только одна запись.
    """
    
    __tablename__ = "personal_info"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    bio: Mapped[str] = mapped_column(Text, nullable=False)
    location: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False)
    phone: Mapped[Optional[str]] = mapped_column(String(20))
    github_url: Mapped[Optional[str]] = mapped_column(String(500))
    telegram_url: Mapped[Optional[str]] = mapped_column(String(500))
    avatar_url: Mapped[Optional[str]] = mapped_column(String(500))
    resume_url: Mapped[Optional[str]] = mapped_column(String(500))
    years_of_experience: Mapped[int] = mapped_column(Integer, default=0)
    is_available_for_hire: Mapped[bool] = mapped_column(Boolean, default=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)