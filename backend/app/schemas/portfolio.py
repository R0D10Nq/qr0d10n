"""
Pydantic схемы для портфолио данных.
Тут описываем как данные должны выглядеть в API.
"""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr, HttpUrl


# Схемы для технологий
class TechnologyBase(BaseModel):
    """Базовая схема технологии."""
    name: str
    category: str
    color: Optional[str] = None
    icon: Optional[str] = None


class TechnologyCreate(TechnologyBase):
    """Схема для создания технологии."""
    pass


class Technology(TechnologyBase):
    """Полная схема технологии."""
    id: int
    is_active: bool = True
    
    class Config:
        from_attributes = True


# Схемы для проектов
class ProjectBase(BaseModel):
    """Базовая схема проекта."""
    title: str
    description: str
    short_description: str
    github_url: Optional[HttpUrl] = None
    demo_url: Optional[HttpUrl] = None
    image_url: Optional[HttpUrl] = None
    is_featured: bool = False


class ProjectCreate(ProjectBase):
    """Схема для создания проекта."""
    technology_ids: List[int] = []


class ProjectUpdate(BaseModel):
    """Схема для обновления проекта."""
    title: Optional[str] = None
    description: Optional[str] = None
    short_description: Optional[str] = None
    github_url: Optional[HttpUrl] = None
    demo_url: Optional[HttpUrl] = None
    image_url: Optional[HttpUrl] = None
    is_featured: Optional[bool] = None
    is_active: Optional[bool] = None
    technology_ids: Optional[List[int]] = None


class Project(ProjectBase):
    """Полная схема проекта."""
    id: int
    is_active: bool
    stars_count: Optional[int] = 0
    created_at: datetime
    updated_at: datetime
    technologies: List[Technology] = []
    
    class Config:
        from_attributes = True


class ProjectList(BaseModel):
    """Схема для списка проектов с пагинацией."""
    items: List[Project]
    total: int
    page: int
    per_page: int
    pages: int


# Схемы для опыта работы
class ExperienceBase(BaseModel):
    """Базовая схема опыта работы."""
    company: str
    position: str
    description: str
    location: str
    start_date: datetime
    end_date: Optional[datetime] = None
    is_current: bool = False
    company_url: Optional[HttpUrl] = None
    achievements: Optional[str] = None


class ExperienceCreate(ExperienceBase):
    """Схема для создания записи об опыте."""
    pass


class Experience(ExperienceBase):
    """Полная схема опыта работы."""
    id: int
    duration_months: int
    
    class Config:
        from_attributes = True


# Схемы для личной информации
class PersonalInfoBase(BaseModel):
    """Базовая схема личной информации."""
    name: str
    title: str
    bio: str
    location: str
    email: EmailStr
    phone: Optional[str] = None
    github_url: Optional[HttpUrl] = None
    telegram_url: Optional[HttpUrl] = None
    avatar_url: Optional[HttpUrl] = None
    resume_url: Optional[HttpUrl] = None
    years_of_experience: int = 0
    is_available_for_hire: bool = True


class PersonalInfoUpdate(BaseModel):
    """Схема для обновления личной информации."""
    name: Optional[str] = None
    title: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    github_url: Optional[HttpUrl] = None
    telegram_url: Optional[HttpUrl] = None
    avatar_url: Optional[HttpUrl] = None
    resume_url: Optional[HttpUrl] = None
    years_of_experience: Optional[int] = None
    is_available_for_hire: Optional[bool] = None


class PersonalInfo(PersonalInfoBase):
    """Полная схема личной информации."""
    id: int
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Схема для полного портфолио
class Portfolio(BaseModel):
    """Полная схема портфолио со всей информацией."""
    personal_info: PersonalInfo
    projects: List[Project]
    experience: List[Experience]
    technologies: List[Technology]
    
    class Config:
        from_attributes = True