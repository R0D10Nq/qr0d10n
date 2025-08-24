# Makefile для управления backend проектом
# Удобные команды для разработки и тестирования

.PHONY: help install test test-cov lint format clean run dev docker-build docker-up docker-down seed

# Помощь
help:
	@echo "Доступные команды:"
	@echo "  install     - Установить зависимости"
	@echo "  test        - Запустить тесты"
	@echo "  test-cov    - Запустить тесты с покрытием"
	@echo "  lint        - Проверить код линтерами"
	@echo "  format      - Отформатировать код"
	@echo "  run         - Запустить сервер"
	@echo "  dev         - Запустить в режиме разработки"
	@echo "  seed        - Заполнить БД тестовыми данными"
	@echo "  clean       - Очистить временные файлы"
	@echo "  docker-*    - Docker команды"

# Установка зависимостей
install:
	pip install -r requirements.txt

# Запуск тестов
test:
	pytest -v

# Тесты с покрытием
test-cov:
	pytest --cov=app --cov-report=html --cov-report=term-missing -v

# Линтеры
lint:
	ruff check .
	mypy .

# Форматирование кода
format:
	black .
	isort .
	ruff check --fix .

# Запуск сервера
run:
	uvicorn app.main:app --host 0.0.0.0 --port 8000

# Режим разработки с перезагрузкой
dev:
	uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Заполнение БД данными
seed:
	python seed_data.py

# Создание миграции
migration:
	alembic revision --autogenerate -m "$(message)"

# Применение миграций
migrate:
	alembic upgrade head

# Откат миграций
downgrade:
	alembic downgrade -1

# Очистка
clean:
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete
	find . -type d -name ".pytest_cache" -delete
	rm -rf htmlcov/
	rm -rf .coverage
	rm -rf *.db

# Docker команды
docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f

# Полная проверка кода (для CI)
check: lint test-cov

# Перезапуск всех сервисов
restart: docker-down docker-up