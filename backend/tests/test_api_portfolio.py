"""
Тесты для API роутов портфолио.
Проверяем что все эндпоинты работают как надо.
"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.portfolio import PersonalInfo, Project, Technology, Experience


class TestPortfolioAPI:
    """Тесты для портфолио API."""
    
    def test_get_full_portfolio_empty(self, client: TestClient):
        """Тест получения портфолио когда данных нет."""
        response = client.get("/api/v1/portfolio/")
        assert response.status_code == 404
        assert "Личная информация не найдена" in response.json()["detail"]
    
    def test_get_personal_info_empty(self, client: TestClient):
        """Тест получения личной информации когда данных нет."""
        response = client.get("/api/v1/portfolio/personal")
        assert response.status_code == 404
    
    def test_create_and_get_personal_info(
        self, 
        client: TestClient, 
        db_session: Session, 
        sample_personal_info: dict
    ):
        """Тест создания и получения личной информации."""
        # Создаем личную информацию в БД
        personal_info = PersonalInfo(**sample_personal_info)
        db_session.add(personal_info)
        db_session.commit()
        
        # Получаем через API
        response = client.get("/api/v1/portfolio/personal")
        assert response.status_code == 200
        
        data = response.json()
        assert data["name"] == sample_personal_info["name"]
        assert data["title"] == sample_personal_info["title"]
        assert data["email"] == sample_personal_info["email"]
    
    def test_get_projects_empty(self, client: TestClient):
        """Тест получения проектов когда их нет."""
        response = client.get("/api/v1/portfolio/projects")
        assert response.status_code == 200
        
        data = response.json()
        assert data["items"] == []
        assert data["total"] == 0
    
    def test_create_and_get_projects(
        self, 
        client: TestClient, 
        db_session: Session, 
        sample_project: dict
    ):
        """Тест создания и получения проектов."""
        # Создаем проект в БД
        project = Project(**sample_project)
        db_session.add(project)
        db_session.commit()
        
        # Получаем через API
        response = client.get("/api/v1/portfolio/projects")
        assert response.status_code == 200
        
        data = response.json()
        assert len(data["items"]) == 1
        assert data["total"] == 1
        assert data["items"][0]["title"] == sample_project["title"]
    
    def test_get_projects_featured_filter(
        self, 
        client: TestClient, 
        db_session: Session, 
        sample_project: dict
    ):
        """Тест фильтрации проектов по featured."""
        # Создаем два проекта - один featured, один нет
        project1 = Project(**sample_project)
        project1.is_featured = True
        
        project2_data = sample_project.copy()
        project2_data["title"] = "Обычный проект"
        project2_data["is_featured"] = False
        project2 = Project(**project2_data)
        
        db_session.add_all([project1, project2])
        db_session.commit()
        
        # Получаем все проекты
        response = client.get("/api/v1/portfolio/projects")
        assert response.status_code == 200
        assert response.json()["total"] == 2
        
        # Получаем только featured
        response = client.get("/api/v1/portfolio/projects?featured_only=true")
        assert response.status_code == 200
        data = response.json()
        assert data["total"] == 1
        assert data["items"][0]["is_featured"] is True
    
    def test_get_project_by_id(
        self, 
        client: TestClient, 
        db_session: Session, 
        sample_project: dict
    ):
        """Тест получения конкретного проекта по ID."""
        # Создаем проект
        project = Project(**sample_project)
        db_session.add(project)
        db_session.commit()
        db_session.refresh(project)
        
        # Получаем по ID
        response = client.get(f"/api/v1/portfolio/projects/{project.id}")
        assert response.status_code == 200
        
        data = response.json()
        assert data["id"] == project.id
        assert data["title"] == sample_project["title"]
    
    def test_get_project_not_found(self, client: TestClient):
        """Тест получения несуществующего проекта."""
        response = client.get("/api/v1/portfolio/projects/999")
        assert response.status_code == 404
    
    def test_get_technologies(
        self, 
        client: TestClient, 
        db_session: Session, 
        sample_technology: dict
    ):
        """Тест получения технологий."""
        # Создаем технологию
        tech = Technology(**sample_technology)
        db_session.add(tech)
        db_session.commit()
        
        # Получаем через API
        response = client.get("/api/v1/portfolio/technologies")
        assert response.status_code == 200
        
        data = response.json()
        assert len(data) == 1
        assert data[0]["name"] == sample_technology["name"]
        assert data[0]["category"] == sample_technology["category"]
    
    def test_get_experience(
        self, 
        client: TestClient, 
        db_session: Session, 
        sample_experience: dict
    ):
        """Тест получения опыта работы."""
        # Создаем опыт работы
        exp = Experience(**sample_experience)
        db_session.add(exp)
        db_session.commit()
        
        # Получаем через API
        response = client.get("/api/v1/portfolio/experience")
        assert response.status_code == 200
        
        data = response.json()
        assert len(data) == 1
        assert data[0]["company"] == sample_experience["company"]
        assert data[0]["position"] == sample_experience["position"]
    
    def test_get_portfolio_stats(self, client: TestClient):
        """Тест получения статистики портфолио."""
        response = client.get("/api/v1/portfolio/stats")
        assert response.status_code == 200
        
        data = response.json()
        assert "projects_total" in data
        assert "technologies_total" in data
        assert "github_stars_total" in data
        assert "years_of_experience" in data
    
    def test_get_full_portfolio_with_data(
        self, 
        client: TestClient, 
        db_session: Session, 
        sample_personal_info: dict,
        sample_project: dict,
        sample_technology: dict,
        sample_experience: dict
    ):
        """Тест получения полного портфолио с данными."""
        # Создаем все данные
        personal_info = PersonalInfo(**sample_personal_info)
        project = Project(**sample_project)
        tech = Technology(**sample_technology)
        exp = Experience(**sample_experience)
        
        db_session.add_all([personal_info, project, tech, exp])
        db_session.commit()
        
        # Получаем полное портфолио
        response = client.get("/api/v1/portfolio/")
        assert response.status_code == 200
        
        data = response.json()
        assert "personal_info" in data
        assert "projects" in data
        assert "technologies" in data
        assert "experience" in data
        
        assert data["personal_info"]["name"] == sample_personal_info["name"]
        assert len(data["projects"]) == 1
        assert len(data["technologies"]) == 1
        assert len(data["experience"]) == 1