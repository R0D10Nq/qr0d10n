#!/usr/bin/env python3
"""
Автоматический тестер API для R0D10N Portfolio.
Проверяет все эндпоинты и валидирует ответы.
"""

import asyncio
import json
import time
from typing import Dict, List, Optional

import httpx
import pytest


class APITester:
    """Класс для тестирования API эндпоинтов."""
    
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api/v1"
        self.client = httpx.AsyncClient(timeout=30.0)
        self.results: List[Dict] = []
    
    async def __aenter__(self):
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.client.aclose()
    
    def log_result(self, test_name: str, success: bool, response_time: float, 
                   status_code: int, details: str = ""):
        """Логирует результат теста."""
        result = {
            "test_name": test_name,
            "success": success,
            "response_time": response_time,
            "status_code": status_code,
            "details": details,
            "timestamp": time.time()
        }
        self.results.append(result)
        
        status = "✅" if success else "❌"
        print(f"{status} {test_name} ({response_time:.3f}s) - {status_code}")
        if details:
            print(f"   {details}")
    
    async def test_endpoint(self, method: str, endpoint: str, 
                          expected_status: int = 200, 
                          json_data: Optional[Dict] = None,
                          params: Optional[Dict] = None) -> Dict:
        """Тестирует конкретный эндпоинт."""
        url = f"{self.base_url}{endpoint}" if endpoint.startswith("/") else f"{self.api_url}{endpoint}"
        
        start_time = time.time()
        try:
            response = await self.client.request(
                method=method,
                url=url,
                json=json_data,
                params=params
            )
            response_time = time.time() - start_time
            
            success = response.status_code == expected_status
            
            try:
                response_json = response.json()
            except:
                response_json = None
            
            return {
                "success": success,
                "status_code": response.status_code,
                "response_time": response_time,
                "data": response_json,
                "headers": dict(response.headers)
            }
        except Exception as e:
            response_time = time.time() - start_time
            return {
                "success": False,
                "status_code": 0,
                "response_time": response_time,
                "error": str(e)
            }
    
    async def test_health_endpoints(self):
        """Тестирует базовые эндпоинты здоровья."""
        print("\n🔍 Тестирование базовых эндпоинтов...")
        
        # Root endpoint
        result = await self.test_endpoint("GET", "/")
        self.log_result("Root endpoint", result["success"], 
                       result["response_time"], result["status_code"])
        
        if result["success"] and result["data"]:
            assert "message" in result["data"]
            assert "version" in result["data"]
        
        # Health check
        result = await self.test_endpoint("GET", "/health")
        self.log_result("Health check", result["success"], 
                       result["response_time"], result["status_code"])
        
        if result["success"] and result["data"]:
            assert result["data"]["status"] == "healthy"
    
    async def test_portfolio_endpoints(self):
        """Тестирует эндпоинты портфолио."""
        print("\n📁 Тестирование эндпоинтов портфолио...")
        
        # Полное портфолио
        result = await self.test_endpoint("GET", "/portfolio/")
        self.log_result("Full portfolio", result["success"], 
                       result["response_time"], result["status_code"])
        
        if result["success"] and result["data"]:
            assert "personal_info" in result["data"]
            assert "projects" in result["data"]
            assert "experience" in result["data"]
            assert "technologies" in result["data"]
        
        # Личная информация
        result = await self.test_endpoint("GET", "/portfolio/personal")
        self.log_result("Personal info", result["success"], 
                       result["response_time"], result["status_code"])
        
        # Проекты
        result = await self.test_endpoint("GET", "/portfolio/projects")
        self.log_result("All projects", result["success"], 
                       result["response_time"], result["status_code"])
        
        if result["success"] and result["data"]:
            assert "items" in result["data"]
            assert "total" in result["data"]
            assert "page" in result["data"]
        
        # Избранные проекты
        result = await self.test_endpoint("GET", "/portfolio/projects", 
                                        params={"featured_only": True})
        self.log_result("Featured projects", result["success"], 
                       result["response_time"], result["status_code"])
        
        # Проекты с фильтром
        result = await self.test_endpoint("GET", "/portfolio/projects", 
                                        params={"technology": "Python", "per_page": 5})
        self.log_result("Filtered projects", result["success"], 
                       result["response_time"], result["status_code"])
        
        # Конкретный проект
        result = await self.test_endpoint("GET", "/portfolio/projects/1")
        self.log_result("Single project", result["success"], 
                       result["response_time"], result["status_code"])
        
        # Несуществующий проект
        result = await self.test_endpoint("GET", "/portfolio/projects/999", 
                                        expected_status=404)
        self.log_result("Non-existent project", result["success"], 
                       result["response_time"], result["status_code"])
        
        # Опыт работы
        result = await self.test_endpoint("GET", "/portfolio/experience")
        self.log_result("Experience", result["success"], 
                       result["response_time"], result["status_code"])
        
        # Технологии
        result = await self.test_endpoint("GET", "/portfolio/technologies")
        self.log_result("All technologies", result["success"], 
                       result["response_time"], result["status_code"])
        
        # Технологии по категориям
        result = await self.test_endpoint("GET", "/portfolio/technologies", 
                                        params={"category": "backend"})
        self.log_result("Backend technologies", result["success"], 
                       result["response_time"], result["status_code"])
        
        # Статистика
        result = await self.test_endpoint("GET", "/portfolio/stats")
        self.log_result("Portfolio stats", result["success"], 
                       result["response_time"], result["status_code"])
        
        if result["success"] and result["data"]:
            expected_keys = ["projects_total", "projects_featured", 
                           "technologies_total", "github_stars_total", 
                           "years_of_experience"]
            for key in expected_keys:
                assert key in result["data"], f"Missing key: {key}"
    
    async def test_contact_endpoints(self):
        """Тестирует контактные эндпоинты."""
        print("\n💬 Тестирование контактных эндпоинтов...")
        
        # Валидное сообщение
        message_data = {
            "name": "API Tester",
            "email": "test@api-tester.com",
            "subject": "API Test Message",
            "message": "This is an automated test message from the API tester.",
            "company": "API Testing Inc"
        }
        
        result = await self.test_endpoint("POST", "/contact/message", 
                                        json_data=message_data)
        self.log_result("Send valid message", result["success"], 
                       result["response_time"], result["status_code"])
        
        # Невалидное сообщение
        invalid_message = {
            "name": "",
            "email": "invalid-email",
            "subject": "",
            "message": ""
        }
        
        result = await self.test_endpoint("POST", "/contact/message", 
                                        json_data=invalid_message, 
                                        expected_status=422)
        self.log_result("Send invalid message", result["success"], 
                       result["response_time"], result["status_code"])
        
        # Подписка на рассылку
        subscribe_data = {"email": "test-subscriber@example.com"}
        
        result = await self.test_endpoint("POST", "/contact/subscribe", 
                                        json_data=subscribe_data)
        self.log_result("Newsletter subscribe", result["success"], 
                       result["response_time"], result["status_code"])
        
        # Повторная подписка (должна вернуть сообщение об уже существующей)
        result = await self.test_endpoint("POST", "/contact/subscribe", 
                                        json_data=subscribe_data)
        self.log_result("Duplicate subscribe", result["success"], 
                       result["response_time"], result["status_code"])
        
        # Отписка
        result = await self.test_endpoint("POST", "/contact/unsubscribe", 
                                        params={"email": "test-subscriber@example.com"})
        self.log_result("Newsletter unsubscribe", result["success"], 
                       result["response_time"], result["status_code"])
    
    async def test_error_cases(self):
        """Тестирует обработку ошибок."""
        print("\n⚠️  Тестирование обработки ошибок...")
        
        # Несуществующий эндпоинт
        result = await self.test_endpoint("GET", "/nonexistent", 
                                        expected_status=404)
        self.log_result("Non-existent endpoint", result["success"], 
                       result["response_time"], result["status_code"])
        
        # Неправильный метод
        result = await self.test_endpoint("POST", "/portfolio/", 
                                        expected_status=405)
        self.log_result("Wrong HTTP method", result["success"], 
                       result["response_time"], result["status_code"])
        
        # Невалидные параметры
        result = await self.test_endpoint("GET", "/portfolio/projects", 
                                        params={"page": 0, "per_page": 1000}, 
                                        expected_status=422)
        self.log_result("Invalid parameters", result["success"], 
                       result["response_time"], result["status_code"])
    
    async def test_performance(self):
        """Тестирует производительность API."""
        print("\n⚡ Тестирование производительности...")
        
        # Тест максимальной пагинации
        result = await self.test_endpoint("GET", "/portfolio/projects", 
                                        params={"per_page": 100})
        self.log_result("Large pagination", result["success"], 
                       result["response_time"], result["status_code"])
        
        # Множественные запросы (простая нагрузка)
        print("   Выполнение 10 параллельных запросов...")
        
        start_time = time.time()
        tasks = [
            self.test_endpoint("GET", "/portfolio/stats") 
            for _ in range(10)
        ]
        results = await asyncio.gather(*tasks)
        total_time = time.time() - start_time
        
        successful = sum(1 for r in results if r["success"])
        avg_response_time = sum(r["response_time"] for r in results) / len(results)
        
        self.log_result("Concurrent requests (10x)", 
                       successful == 10, 
                       avg_response_time, 
                       200 if successful == 10 else 0,
                       f"Total time: {total_time:.3f}s, Success rate: {successful}/10")
    
    def generate_report(self) -> Dict:
        """Генерирует отчет о тестировании."""
        total_tests = len(self.results)
        successful_tests = sum(1 for r in self.results if r["success"])
        
        avg_response_time = sum(r["response_time"] for r in self.results) / total_tests
        max_response_time = max(r["response_time"] for r in self.results)
        
        report = {
            "summary": {
                "total_tests": total_tests,
                "successful_tests": successful_tests,
                "success_rate": successful_tests / total_tests * 100,
                "avg_response_time": avg_response_time,
                "max_response_time": max_response_time
            },
            "details": self.results
        }
        
        return report
    
    def print_summary(self):
        """Выводит краткий отчет."""
        report = self.generate_report()
        summary = report["summary"]
        
        print("\n" + "="*50)
        print("📊 ОТЧЕТ О ТЕСТИРОВАНИИ API")
        print("="*50)
        print(f"Всего тестов: {summary['total_tests']}")
        print(f"Успешных: {summary['successful_tests']}")
        print(f"Процент успеха: {summary['success_rate']:.1f}%")
        print(f"Среднее время ответа: {summary['avg_response_time']:.3f}s")
        print(f"Максимальное время ответа: {summary['max_response_time']:.3f}s")
        
        failed_tests = [r for r in self.results if not r["success"]]
        if failed_tests:
            print(f"\n❌ Упавшие тесты ({len(failed_tests)}):")
            for test in failed_tests:
                print(f"   - {test['test_name']} (status: {test['status_code']})")
        else:
            print("\n✅ Все тесты прошли успешно!")


async def main():
    """Главная функция для запуска всех тестов."""
    print("🚀 Запуск тестирования R0D10N Portfolio API...")
    
    async with APITester() as tester:
        try:
            await tester.test_health_endpoints()
            await tester.test_portfolio_endpoints()
            await tester.test_contact_endpoints()
            await tester.test_error_cases()
            await tester.test_performance()
            
        except Exception as e:
            print(f"❌ Ошибка во время тестирования: {e}")
        
        tester.print_summary()
        
        # Сохраняем детальный отчет
        report = tester.generate_report()
        with open("api_test_report.json", "w", encoding="utf-8") as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
        
        print(f"\n📄 Детальный отчет сохранен в api_test_report.json")


if __name__ == "__main__":
    asyncio.run(main())