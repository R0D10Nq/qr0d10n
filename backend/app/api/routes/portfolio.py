"""
API endpoints для портфолио данных.
Тут получаем проекты, опыт работы, технологии и прочую инфу.
"""

from typing import List, Optional, Dict, Any

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.database import get_sync_session
from app.models.portfolio import Experience, PersonalInfo, Project, Technology
from app.schemas.portfolio import (
    Experience as ExperienceSchema,
    PersonalInfo as PersonalInfoSchema,
    Portfolio,
    Project as ProjectSchema,
    ProjectList,
    Technology as TechnologySchema,
)

router = APIRouter()


@router.get(
    "/", 
    response_model=Portfolio,
    summary="📁 Полное портфолио",
    description="""
    Получает всю информацию о портфолио одним запросом.
    
    Включает:
    - Личную информацию разработчика
    - Список всех активных проектов
    - Опыт работы с сортировкой по дате
    - Все активные технологии
    """,
    response_description="Полные данные портфолио",
    tags=["portfolio"]
)
def get_full_portfolio(db: Session = Depends(get_sync_session)) -> Portfolio:
    """
    Получаем полное портфолио со всей информацией.
    Главный endpoint для загрузки всех данных одним запросом.
    """
    # Получаем личную информацию
    personal_info = db.query(PersonalInfo).first()
    if not personal_info:
        raise HTTPException(status_code=404, detail="Личная информация не найдена")
    
    # Получаем проекты (только активные)
    projects = db.query(Project).filter(Project.is_active == True).all()
    
    # Получаем опыт работы (сортируем по дате начала, новые сверху)
    experience = db.query(Experience).order_by(Experience.start_date.desc()).all()
    
    # Получаем технологии (только активные)
    technologies = db.query(Technology).filter(Technology.is_active == True).all()
    
    return Portfolio(
        personal_info=personal_info,
        projects=projects,
        experience=experience,
        technologies=technologies
    )


@router.get(
    "/personal", 
    response_model=PersonalInfoSchema,
    summary="👤 Личная информация",
    description="""
    Получает личную информацию разработчика.
    
    Включает:
    - Имя и должность
    - Контактную информацию
    - Ссылки на соцсети
    - Аватар и резюме
    - Статус доступности для работы
    """,
    response_description="Личная информация разработчика",
    tags=["portfolio"]
)
def get_personal_info(db: Session = Depends(get_sync_session)) -> PersonalInfoSchema:
    """
    Получаем личную информацию разработчика.
    """
    personal_info = db.query(PersonalInfo).first()
    if not personal_info:
        raise HTTPException(status_code=404, detail="Личная информация не найдена")
    return personal_info


@router.get(
    "/projects", 
    response_model=ProjectList,
    summary="📦 Список проектов",
    description="""
    Получает список проектов с фильтрацией и пагинацией.
    
    Возможности фильтрации:
    - По статусу избранного (показать только лучшие)
    - По технологиям (найти проекты с конкретной технологией)
    
    Пагинация поддерживает до 100 элементов на страницу.
    """,
    response_description="Список проектов с метаданными пагинации",
    tags=["portfolio"]
)
def get_projects(
    db: Session = Depends(get_sync_session),
    featured_only: bool = Query(False, description="Показывать только избранные проекты"),
    technology: Optional[str] = Query(None, description="Фильтр по технологии"),
    page: int = Query(1, ge=1, description="Номер страницы"),
    per_page: int = Query(10, ge=1, le=100, description="Проектов на странице"),
) -> ProjectList:
    """
    Получаем список проектов с фильтрацией и пагинацией.
    """
    query = db.query(Project).filter(Project.is_active == True)
    
    # Фильтр по избранным
    if featured_only:
        query = query.filter(Project.is_featured == True)
    
    # Фильтр по технологии
    if technology:
        query = query.join(Project.technologies).join(Technology).filter(
            Technology.name.ilike(f"%{technology}%")
        )
    
    # Подсчитываем общее количество
    total = query.count()
    
    # Применяем пагинацию
    offset = (page - 1) * per_page
    projects = query.offset(offset).limit(per_page).all()
    
    # Вычисляем количество страниц
    pages = (total + per_page - 1) // per_page
    
    return ProjectList(
        items=projects,
        total=total,
        page=page,
        per_page=per_page,
        pages=pages
    )


@router.get("/projects/{project_id}", response_model=ProjectSchema)
def get_project(project_id: int, db: Session = Depends(get_sync_session)) -> ProjectSchema:
    """
    Получаем конкретный проект по ID.
    """
    project = db.query(Project).filter(
        Project.id == project_id,
        Project.is_active == True
    ).first()
    
    if not project:
        raise HTTPException(status_code=404, detail="Проект не найден")
    
    return project


@router.get("/experience", response_model=List[ExperienceSchema])
def get_experience(db: Session = Depends(get_sync_session)) -> List[ExperienceSchema]:
    """
    Получаем опыт работы, отсортированный по дате.
    """
    experience = db.query(Experience).order_by(Experience.start_date.desc()).all()
    return experience


@router.get("/technologies", response_model=List[TechnologySchema])
def get_technologies(
    db: Session = Depends(get_sync_session),
    category: Optional[str] = Query(None, description="Фильтр по категории")
) -> List[TechnologySchema]:
    """
    Получаем список технологий с фильтрацией по категории.
    """
    query = db.query(Technology).filter(Technology.is_active == True)
    
    if category:
        query = query.filter(Technology.category.ilike(f"%{category}%"))
    
    technologies = query.order_by(Technology.name).all()
    return technologies


@router.get("/stats")
def get_portfolio_stats(db: Session = Depends(get_sync_session)) -> Dict[str, Any]:
    """
    Получаем статистику портфолио.
    """
    projects_count = db.query(Project).filter(Project.is_active == True).count()
    featured_projects_count = db.query(Project).filter(
        Project.is_active == True, 
        Project.is_featured == True
    ).count()
    technologies_count = db.query(Technology).filter(Technology.is_active == True).count()
    total_stars = db.query(Project).filter(Project.is_active == True).with_entities(
        func.sum(Project.stars_count)
    ).scalar() or 0
    
    return {
        "projects_total": projects_count,
        "projects_featured": featured_projects_count,
        "technologies_total": technologies_count,
        "github_stars_total": total_stars,
        "years_of_experience": 3,  # TODO: вычислять динамически
    }