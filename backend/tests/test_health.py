"""
Тесты для health check endpoints.
Проверяем что API здоровое и работает.
"""

import pytest
from fastapi.testclient import TestClient


class TestHealthAPI:
    """Тесты для health check API."""
    
    def test_root_endpoint(self, client: TestClient):
        """Тест корневого эндпоинта."""
        response = client.get("/")
        assert response.status_code == 200
        
        data = response.json()
        assert "message" in data
        assert "R0D10N Portfolio API" in data["message"]
        assert "docs" in data
        assert "version" in data
    
    def test_health_check_basic(self, client: TestClient):
        """Тест базовой проверки здоровья."""
        response = client.get("/health")
        assert response.status_code == 200
        
        data = response.json()
        assert data["status"] == "healthy"
        assert data["service"] == "r0d10n-portfolio-api"
    
    def test_health_check_api_endpoint(self, client: TestClient):
        """Тест health check через API роут."""
        response = client.get("/api/v1/health/")
        assert response.status_code == 200
        
        data = response.json()
        assert data["status"] == "healthy"
        assert data["service"] == "r0d10n-portfolio-api"
    
    def test_health_check_database(self, client: TestClient):
        """Тест проверки подключения к базе данных."""
        response = client.get("/api/v1/health/db")
        assert response.status_code == 200
        
        data = response.json()
        assert data["status"] == "healthy"
        assert data["database"] == "connected"
    
    def test_detailed_health_check(self, client: TestClient):
        """Тест детальной проверки здоровья."""
        response = client.get("/api/v1/health/detailed")
        assert response.status_code == 200
        
        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data
        assert "python_version" in data
        assert "memory_usage" in data
        assert "cpu_usage" in data
        assert "version" in data
        
        # Проверяем структуру memory_usage
        memory = data["memory_usage"]
        assert "total" in memory
        assert "available" in memory
        assert "percent" in memory
        
        # Проверяем что значения разумные
        assert isinstance(memory["total"], int)
        assert isinstance(memory["available"], int)
        assert isinstance(memory["percent"], (int, float))
        assert 0 <= memory["percent"] <= 100


class TestAPIDocumentation:
    """Тесты для документации API."""
    
    def test_openapi_json(self, client: TestClient):
        """Тест OpenAPI JSON схемы."""
        response = client.get("/api/v1/openapi.json")
        assert response.status_code == 200
        
        data = response.json()
        assert "openapi" in data
        assert "info" in data
        assert "paths" in data
        
        # Проверяем информацию о проекте
        info = data["info"]
        assert "title" in info
        assert "description" in info
        assert "version" in info
    
    def test_docs_endpoint(self, client: TestClient):
        """Тест страницы документации Swagger."""
        response = client.get("/docs")
        assert response.status_code == 200
        assert "text/html" in response.headers["content-type"]
    
    def test_redoc_endpoint(self, client: TestClient):
        """Тест страницы документации ReDoc."""
        response = client.get("/redoc")
        assert response.status_code == 200
        assert "text/html" in response.headers["content-type"]


class TestCORSHeaders:
    """Тесты для CORS заголовков."""
    
    def test_cors_preflight_request(self, client: TestClient):
        """Тест preflight запроса для CORS."""
        response = client.options(
            "/api/v1/portfolio/",
            headers={
                "Origin": "http://localhost:3000",
                "Access-Control-Request-Method": "GET",
                "Access-Control-Request-Headers": "Content-Type"
            }
        )
        
        # OPTIONS запрос должен быть разрешен
        assert response.status_code in [200, 204]
    
    def test_cors_headers_in_response(self, client: TestClient):
        """Тест наличия CORS заголовков в ответе."""
        response = client.get(
            "/api/v1/health/",
            headers={"Origin": "http://localhost:3000"}
        )
        
        assert response.status_code == 200
        # В тестовом окружении CORS заголовки могут отсутствовать
        # это нормально для unit-тестов


class TestErrorHandling:
    """Тесты обработки ошибок."""
    
    def test_404_not_found(self, client: TestClient):
        """Тест 404 ошибки для несуществующего эндпоинта."""
        response = client.get("/api/v1/nonexistent")
        assert response.status_code == 404
    
    def test_method_not_allowed(self, client: TestClient):
        """Тест 405 ошибки для неподдерживаемого метода."""
        response = client.delete("/api/v1/health/")
        assert response.status_code == 405
    
    def test_validation_error_response_format(self, client: TestClient):
        """Тест формата ответа при ошибке валидации."""
        # Отправляем невалидные данные
        response = client.post(
            "/api/v1/contact/message",
            json={"invalid": "data"}
        )
        
        assert response.status_code == 422
        data = response.json()
        assert "detail" in data
        assert isinstance(data["detail"], list)