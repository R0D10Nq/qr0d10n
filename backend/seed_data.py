"""
Скрипт для заполнения базы данных начальными данными.
Тут создаем данные для портфолио R0D10N.
"""

import asyncio
from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.core.database import SessionLocal, init_db
from app.models.portfolio import Experience, PersonalInfo, Project, Technology, ProjectTechnology


def create_personal_info(db: Session) -> PersonalInfo:
    """Создаем личную информацию разработчика."""
    personal_info = PersonalInfo(
        name="Родион Шевцов",
        title="Python / Backend-oriented Fullstack Developer",
        bio="""Middle Python / Fullstack разработчик из Томска с опытом более 3 лет. 
        Специализируюсь на разработке надёжного бэкенда и устранении legacy-проблем. 
        Создаю масштабируемые мультитенантные решения и оптимизирую производительность.
        
        Люблю автоматизировать процессы, писать качественный код и изучать новые технологии.
        В pet-проектах применяю LLM и асинхронность - не боюсь экспериментировать.""",
        location="Томск, Россия",
        email="q@r0d10n.ru",
        phone="+7 (953) 918-31-49",
        github_url="https://github.com/R0D10Nq",
        telegram_url="https://t.me/qr0d10n",
        avatar_url="https://avatars.githubusercontent.com/u/174966285?v=4",
        years_of_experience=3,
        is_available_for_hire=True,
    )
    
    db.add(personal_info)
    db.commit()
    db.refresh(personal_info)
    return personal_info


def create_technologies(db: Session) -> list[Technology]:
    """Создаем технологии и навыки."""
    technologies_data = [
        # Backend
        {"name": "Python", "category": "backend", "color": "#3776ab"},
        {"name": "Django", "category": "backend", "color": "#092e20"},
        {"name": "FastAPI", "category": "backend", "color": "#009688"},
        {"name": "Flask", "category": "backend", "color": "#000000"},
        {"name": "SQLAlchemy", "category": "backend", "color": "#bb2528"},
        {"name": "Celery", "category": "backend", "color": "#37b24d"},
        
        # Frontend
        {"name": "React", "category": "frontend", "color": "#61dafb"},
        {"name": "Vue.js", "category": "frontend", "color": "#4fc08d"},
        {"name": "TypeScript", "category": "frontend", "color": "#3178c6"},
        {"name": "JavaScript", "category": "frontend", "color": "#f7df1e"},
        {"name": "HTML5", "category": "frontend", "color": "#e34f26"},
        {"name": "CSS3", "category": "frontend", "color": "#1572b6"},
        {"name": "SCSS", "category": "frontend", "color": "#cf649a"},
        {"name": "Tailwind CSS", "category": "frontend", "color": "#06b6d4"},
        
        # Database
        {"name": "PostgreSQL", "category": "database", "color": "#336791"},
        {"name": "Redis", "category": "database", "color": "#dc382d"},
        {"name": "MySQL", "category": "database", "color": "#4479a1"},
        {"name": "SQLite", "category": "database", "color": "#003b57"},
        {"name": "MongoDB", "category": "database", "color": "#47a248"},
        
        # DevOps
        {"name": "Docker", "category": "devops", "color": "#2496ed"},
        {"name": "Nginx", "category": "devops", "color": "#009639"},
        {"name": "Linux", "category": "devops", "color": "#fcc624"},
        {"name": "Git", "category": "devops", "color": "#f05032"},
        {"name": "GitLab CI", "category": "devops", "color": "#fc6d26"},
        
        # Tools
        {"name": "pytest", "category": "testing", "color": "#0a9edc"},
        {"name": "Vite", "category": "tools", "color": "#646cff"},
        {"name": "Webpack", "category": "tools", "color": "#8dd6f9"},
    ]
    
    technologies = []
    for tech_data in technologies_data:
        tech = Technology(**tech_data)
        db.add(tech)
        technologies.append(tech)
    
    db.commit()
    return technologies


def create_experience(db: Session) -> list[Experience]:
    """Создаем опыт работы."""
    experiences_data = [
        {
            "company": "Sinergium",
            "position": "Python / Fullstack Developer",
            "description": """Разработка мультитенантной платформы Django Landings для стоматологических клиник (~400 сайтов и ~300 UI-модулей).
            
            Обязанности:
            • Backend: фичи на Django/DRF, Celery, SQL-оптимизация
            • Frontend: верстка UI-модулей, миграция legacy-слайдеров → Swiper
            • DevOps: Fabric-скрипты, GitLab CI, обновление зависимостей""",
            "location": "Удалённо",
            "start_date": datetime(2024, 3, 1),
            "end_date": datetime(2025, 8, 1),
            "is_current": False,
            "achievements": """• Создание лендингов: процесс сократился с 2–3 дней до 30 минут
            • Оптимизация изображений: загрузка страниц ускорена на 40%
            • Админ-инструменты: повысил эффективность работы контент-команды на 25%
            • Bookmarklet + API: диагностика страниц в 1 клик""",
        },
        {
            "company": "Фриланс + Pet-projects",
            "position": "Python Developer",
            "description": """Фриланс-разработка и pet-проекты. Период интенсивного изучения современных технологий и перехода на Python backend.
            
            Деятельность:
            • Разработка Telegram-ботов (aiogram, python-telegram-bot)
            • API-интеграции, автоматизация парсинга
            • Изучение FastAPI, Docker, asyncio, React+TypeScript
            • Работа с LLM: локальные модели, embeddings""",
            "location": "Удалённо",
            "start_date": datetime(2023, 8, 1),
            "end_date": datetime(2024, 3, 1),
            "is_current": False,
        },
        {
            "company": "ОГКУ «Центр занятости населения Томской области»",
            "position": "Web Developer",
            "description": """Разработка и поддержка корпоративного портала для сотрудников.
            
            Обязанности:
            • Проектирование и поддержка корпоративного портала
            • Работа со стеком: PHP (WordPress), Vue.js, React (базовый), MySQL
            • Реализация чата сотрудников, дашбордов статистики
            • DevOps: Linux-сервер, настройка CI/CD, деплой проектов""",
            "location": "Томск",
            "start_date": datetime(2022, 1, 1),
            "end_date": datetime(2023, 8, 1),
            "is_current": False,
        },
    ]
    
    experiences = []
    for exp_data in experiences_data:
        exp = Experience(**exp_data)
        db.add(exp)
        experiences.append(exp)
    
    db.commit()
    return experiences


def create_projects(db: Session, technologies: list[Technology]) -> list[Project]:
    """Создаем проекты портфолио."""
    
    # Создаем словарь для быстрого поиска технологий по имени
    tech_map = {tech.name: tech for tech in technologies}
    
    projects_data = [
        {
            "title": "FoodRadar",
            "short_description": "Платформа для поиска и обзора ресторанов с геолокацией",
            "description": """Полнофункциональная платформа для поиска ресторанов с геолокацией в реальном времени.
            
            Особенности:
            • Поиск в реальном времени с геолокацией
            • Система отзывов и рекомендаций
            • Интеграция с платёжными системами
            • WebSocket для live обновлений
            • Административная панель
            
            Технические решения:
            • Django Channels для WebSocket
            • PostGIS для работы с геоданными
            • Redis для кеширования
            • Stripe для платежей""",
            "github_url": "https://github.com/R0D10Nq/foodradar",
            "image_url": "https://via.placeholder.com/600x400?text=FoodRadar",
            "is_featured": True,
            "stars_count": 15,
            "technologies": ["Django", "PostgreSQL", "Redis", "React", "TypeScript"]
        },
        {
            "title": "BydlanBot",
            "short_description": "Умный Telegram бот с ИИ и долговременной памятью",
            "description": """Intelligent Telegram бот с возможностями LLM и векторной памятью пользователей.
            
            Особенности:
            • Контекстные диалоги с памятью пользователей
            • LLM интеграция для генерации ответов
            • Анализ характера пользователей
            • Векторная база знаний
            • Async архитектура
            
            Технические решения:
            • aiogram для Telegram API
            • sentence-transformers для embeddings
            • ChromaDB для векторного поиска
            • OpenAI API для генерации
            • SQLite для хранения сессий""",
            "github_url": "https://github.com/R0D10Nq/bydlanbot",
            "image_url": "https://via.placeholder.com/600x400?text=BydlanBot",
            "is_featured": True,
            "stars_count": 8,
            "technologies": ["Python", "FastAPI", "SQLite", "Redis"]
        },
        {
            "title": "Django Landings Platform",
            "short_description": "Мультитенантная платформа для создания лендингов",
            "description": """Корпоративная платформа для создания лендингов стоматологических клиник.
            
            Особенности:
            • 300+ готовых UI-модулей
            • Мультитенантная архитектура
            • Современная система сборки
            • BEM методология для стилей
            • Автоматическое создание лендингов
            
            Результаты:
            • Обслуживает 400+ сайтов
            • Время создания лендинга: 30 минут
            • Увеличение скорости загрузки на 40%""",
            "github_url": "https://github.com/R0D10Nq/dl_proj",
            "image_url": "https://via.placeholder.com/600x400?text=Django+Landings",
            "is_featured": True,
            "stars_count": 12,
            "technologies": ["Django", "PostgreSQL", "Redis", "Vue.js", "SCSS"]
        },
        {
            "title": "Advanced File Search Tool",
            "short_description": "Инструмент поиска файлов с графическим интерфейсом",
            "description": """Десктопное приложение для продвинутого поиска файлов с GUI.
            
            Особенности:
            • Многопоточный поиск файлов
            • Поддержка регулярных выражений
            • Интуитивный GUI интерфейс
            • Фильтрация по размеру, дате, типу
            • Экспорт результатов
            
            Технические решения:
            • Tkinter для GUI
            • Threading для параллельного поиска
            • Regex для сложных паттернов
            • CSV экспорт результатов""",
            "github_url": "https://github.com/R0D10Nq/file-search-tool",
            "image_url": "https://via.placeholder.com/600x400?text=File+Search+Tool",
            "is_featured": False,
            "stars_count": 5,
            "technologies": ["Python", "Tkinter"]
        },
        {
            "title": "R0D10N Portfolio",
            "short_description": "Современное портфолио на React + FastAPI",
            "description": """Это портфолио - демонстрация навыков fullstack разработки.
            
            Особенности:
            • Современный React frontend
            • FastAPI backend с полной типизацией
            • Контейнеризация с Docker
            • CI/CD с GitHub Actions
            • Комплексные тесты
            • Адаптивный дизайн
            
            Технические решения:
            • React 18 + TypeScript
            • FastAPI + SQLAlchemy
            • Tailwind CSS для стилей
            • Framer Motion для анимаций
            • PostgreSQL + Redis
            • GitHub Pages для деплоя""",
            "github_url": "https://github.com/R0D10Nq/qr0d10n",
            "demo_url": "https://r0d10nq.github.io/qr0d10n",
            "image_url": "https://via.placeholder.com/600x400?text=Portfolio",
            "is_featured": True,
            "stars_count": 20,
            "technologies": ["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "Tailwind CSS"]
        }
    ]
    
    projects = []
    for project_data in projects_data:
        tech_names = project_data.pop("technologies", [])
        project = Project(**project_data)
        db.add(project)
        db.flush()  # Получаем ID проекта
        
        # Добавляем связи с технологиями
        for tech_name in tech_names:
            if tech_name in tech_map:
                project_tech = ProjectTechnology(
                    project_id=project.id,
                    technology_id=tech_map[tech_name].id
                )
                db.add(project_tech)
        
        projects.append(project)
    
    db.commit()
    return projects


async def main():
    """Основная функция для заполнения базы данных."""
    print("🚀 Инициализируем базу данных...")
    await init_db()
    
    print("📝 Заполняем базу данных начальными данными...")
    
    db = SessionLocal()
    try:
        # Проверяем, есть ли уже данные
        existing_personal = db.query(PersonalInfo).first()
        if existing_personal:
            print("✅ Данные уже существуют, пропускаем создание")
            return
        
        print("👤 Создаем личную информацию...")
        personal_info = create_personal_info(db)
        
        print("🛠 Создаем технологии...")
        technologies = create_technologies(db)
        
        print("💼 Создаем опыт работы...")
        experience = create_experience(db)
        
        print("🚀 Создаем проекты...")
        projects = create_projects(db, technologies)
        
        print(f"""
✅ База данных успешно заполнена!

Статистика:
• Личная информация: 1 запись
• Технологии: {len(technologies)} записей
• Опыт работы: {len(experience)} записей  
• Проекты: {len(projects)} записей

🎉 Готово! Теперь можно запускать API.
        """)
        
    except Exception as e:
        print(f"❌ Ошибка при заполнении базы данных: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    asyncio.run(main())