#!/bin/bash

# Скрипт инициализации окружения разработки

set -e

echo "🚀 Инициализация окружения разработки..."

# Цвета для вывода
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Проверяем Python версию
python_version=$(python3 --version 2>&1 | grep -o '[0-9]\+\.[0-9]\+' | head -1)
required_version="3.11"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" = "$required_version" ]; then
    print_success "Python $python_version найден"
else
    print_warning "Требуется Python $required_version или выше, найден $python_version"
fi

# Создаем виртуальное окружение для backend
if [ ! -d "backend/venv" ]; then
    print_status "Создание виртуального окружения для backend..."
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install --upgrade pip
    cd ..
    print_success "Виртуальное окружение создано"
else
    print_success "Виртуальное окружение уже существует"
fi

# Активируем виртуальное окружение
print_status "Активация виртуального окружения..."
source backend/venv/bin/activate

# Устанавливаем backend зависимости
print_status "Установка backend зависимостей..."
cd backend
pip install -r requirements.txt
cd ..

# Проверяем Node.js версию
if command -v node > /dev/null 2>&1; then
    node_version=$(node --version | grep -o '[0-9]\+' | head -1)
    if [ "$node_version" -ge 18 ]; then
        print_success "Node.js $(node --version) найден"
    else
        print_warning "Рекомендуется Node.js 18 или выше"
    fi
else
    print_warning "Node.js не найден. Установите Node.js 18+"
    exit 1
fi

# Устанавливаем frontend зависимости
print_status "Установка frontend зависимостей..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm ci
    print_success "Frontend зависимости установлены"
else
    print_success "Frontend зависимости уже установлены"
fi
cd ..

# Устанавливаем pre-commit
print_status "Установка pre-commit хуков..."
if command -v pre-commit > /dev/null 2>&1; then
    pre-commit install
    pre-commit install --hook-type commit-msg
    print_success "Pre-commit хуки установлены"
else
    print_warning "pre-commit не найден. Устанавливаем..."
    pip install pre-commit
    pre-commit install
    pre-commit install --hook-type commit-msg
    print_success "Pre-commit установлен и настроен"
fi

# Создаем .env файл если его нет
if [ ! -f ".env" ]; then
    print_status "Создание .env файла..."
    cp .env.example .env
    print_success ".env файл создан из шаблона"
    print_warning "Не забудьте заполнить переменные окружения в .env"
else
    print_success ".env файл уже существует"
fi

# Проверяем Docker
if command -v docker > /dev/null 2>&1; then
    print_success "Docker найден: $(docker --version)"
    if command -v docker-compose > /dev/null 2>&1; then
        print_success "Docker Compose найден"
    else
        print_warning "Docker Compose не найден"
    fi
else
    print_warning "Docker не найден. Установите Docker для контейнеризации"
fi

# Запускаем первую проверку pre-commit
print_status "Запуск первичной проверки pre-commit..."
if pre-commit run --all-files; then
    print_success "Pre-commit проверки прошли успешно"
else
    print_warning "Pre-commit внес изменения. Проверьте файлы."
fi

# Создаем базовые директории
print_status "Создание структуры директорий..."
mkdir -p logs
mkdir -p backup
mkdir -p docs/images
mkdir -p .vscode
print_success "Структура директорий создана"

# VS Code конфигурация
if [ ! -f ".vscode/settings.json" ]; then
    print_status "Создание настроек VS Code..."
    cat > .vscode/settings.json << 'EOF'
{
  "python.defaultInterpreterPath": "./backend/venv/bin/python",
  "python.formatting.provider": "black",
  "python.linting.enabled": true,
  "python.linting.ruffEnabled": true,
  "python.linting.mypyEnabled": true,
  "python.linting.banditEnabled": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll": true
  },
  "files.exclude": {
    "**/__pycache__": true,
    "**/.pytest_cache": true,
    "**/.mypy_cache": true,
    "**/node_modules": true,
    "**/dist": true,
    "**/.coverage": true,
    "**/htmlcov": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "eslint.workingDirectories": ["frontend"],
  "prettier.configPath": "./frontend/.prettierrc"
}
EOF
    print_success "Настройки VS Code созданы"
fi

echo ""
print_success "🎉 Окружение разработки настроено!"
echo ""
echo "📋 Что было настроено:"
echo "  🐍 Python виртуальное окружение"
echo "  📦 Backend и Frontend зависимости"
echo "  🔍 Pre-commit хуки для проверки качества"
echo "  📁 Структура директорий"
echo "  ⚙️  VS Code настройки"
echo ""
echo "🚀 Следующие шаги:"
echo "  1. Заполните переменные в .env файле"
echo "  2. Запустите ./scripts/dev.sh для запуска в Docker"
echo "  3. Или запустите ./scripts/check-quality.sh для проверки кода"
echo ""
print_success "Удачной разработки! 🚀"