#!/bin/bash

# Скрипт для запуска проверок качества кода

set -e

echo "🔍 Запуск проверок качества кода..."

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для вывода статуса
print_status() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Проверяем наличие виртуального окружения
if [[ "$VIRTUAL_ENV" == "" ]]; then
    print_warning "Виртуальное окружение не активировано"
    if [ -d "backend/venv" ]; then
        print_status "Активируем виртуальное окружение..."
        source backend/venv/bin/activate
    else
        print_error "Виртуальное окружение не найдено. Создайте его командой: python -m venv backend/venv"
        exit 1
    fi
fi

# Backend проверки
print_status "Backend проверки..."

cd backend

# Ruff линтинг
print_status "Запуск Ruff линтера..."
if ruff check . --fix; then
    print_success "Ruff: проверка пройдена"
else
    print_error "Ruff: найдены ошибки"
    exit 1
fi

# Black форматирование
print_status "Проверка форматирования Black..."
if black --check .; then
    print_success "Black: форматирование корректно"
else
    print_warning "Black: необходимо переформатировать код"
    black .
    print_success "Black: код переформатирован"
fi

# isort сортировка импортов
print_status "Проверка сортировки импортов isort..."
if isort --check-only .; then
    print_success "isort: импорты отсортированы"
else
    print_warning "isort: необходимо отсортировать импорты"
    isort .
    print_success "isort: импорты отсортированы"
fi

# MyPy проверка типов
print_status "Проверка типов MyPy..."
if mypy app/; then
    print_success "MyPy: типы корректны"
else
    print_error "MyPy: найдены ошибки типизации"
fi

# Bandit проверка безопасности
print_status "Проверка безопасности Bandit..."
if bandit -r app/ -ll; then
    print_success "Bandit: проблем безопасности не найдено"
else
    print_warning "Bandit: найдены потенциальные проблемы безопасности"
fi

# Safety проверка зависимостей
print_status "Проверка уязвимостей Safety..."
if safety check; then
    print_success "Safety: уязвимостей не найдено"
else
    print_warning "Safety: найдены уязвимости в зависимостях"
fi

# Запуск тестов
print_status "Запуск тестов..."
if pytest --cov=app --cov-report=term-missing; then
    print_success "Тесты: все прошли успешно"
else
    print_error "Тесты: есть падающие тесты"
fi

cd ..

# Frontend проверки
print_status "Frontend проверки..."

cd frontend

# Проверяем наличие node_modules
if [ ! -d "node_modules" ]; then
    print_status "Устанавливаем зависимости..."
    npm ci
fi

# ESLint
print_status "Запуск ESLint..."
if npm run lint; then
    print_success "ESLint: проверка пройдена"
else
    print_error "ESLint: найдены ошибки"
fi

# Prettier
print_status "Проверка форматирования Prettier..."
if npm run format:check; then
    print_success "Prettier: форматирование корректно"
else
    print_warning "Prettier: необходимо переформатировать код"
    npm run format
    print_success "Prettier: код переформатирован"
fi

# TypeScript проверка
print_status "Проверка типов TypeScript..."
if npm run type-check; then
    print_success "TypeScript: типы корректны"
else
    print_error "TypeScript: найдены ошибки типизации"
fi

# Сборка
print_status "Тестовая сборка..."
if npm run build; then
    print_success "Сборка: успешно завершена"
else
    print_error "Сборка: ошибка"
    exit 1
fi

cd ..

print_success "Все проверки завершены!"
echo ""
echo "📊 Резюме:"
echo "  🐍 Backend: ruff, black, isort, mypy, bandit, safety, pytest"
echo "  🌐 Frontend: eslint, prettier, typescript, build"
echo ""
print_success "Код готов к коммиту! 🚀"