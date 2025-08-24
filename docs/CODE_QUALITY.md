# Code Quality & Linting Documentation

## 📋 Обзор

Проект использует современные инструменты для обеспечения высокого качества кода, единообразного стиля и безопасности.

## 🐍 Python Tools (Backend)

### Основные инструменты

#### Ruff - Универсальный линтер
- **Назначение**: Быстрый линтер и форматтер для Python
- **Конфигурация**: `backend/pyproject.toml`
- **Команды**:
  ```bash
  ruff check .          # Проверка
  ruff check . --fix    # Автоисправление
  ruff format .         # Форматирование
  ```

#### Black - Форматировщик кода
- **Назначение**: Автоматическое форматирование Python кода
- **Конфигурация**: `backend/pyproject.toml`
- **Команды**:
  ```bash
  black .               # Форматирование
  black --check .       # Проверка без изменений
  black --diff .        # Показать изменения
  ```

#### isort - Сортировка импортов
- **Назначение**: Автоматическая сортировка и группировка импортов
- **Конфигурация**: `backend/pyproject.toml`
- **Команды**:
  ```bash
  isort .               # Сортировка
  isort --check-only .  # Проверка
  isort --diff .        # Показать изменения
  ```

#### MyPy - Проверка типов
- **Назначение**: Статическая проверка типов
- **Конфигурация**: `backend/pyproject.toml`
- **Команды**:
  ```bash
  mypy app/             # Проверка типов
  mypy --install-types  # Установка отсутствующих типов
  ```

### Безопасность

#### Bandit - Анализ безопасности
- **Назначение**: Поиск уязвимостей в Python коде
- **Конфигурация**: `backend/pyproject.toml`
- **Команды**:
  ```bash
  bandit -r app/        # Сканирование
  bandit -r app/ -f json -o report.json  # JSON отчет
  ```

#### Safety - Проверка зависимостей
- **Назначение**: Проверка известных уязвимостей в зависимостях
- **Команды**:
  ```bash
  safety check          # Проверка requirements.txt
  safety check --json   # JSON отчет
  ```

### Тестирование

#### Pytest - Тестовый фреймворк
- **Конфигурация**: `backend/pyproject.toml`
- **Команды**:
  ```bash
  pytest                # Запуск тестов
  pytest --cov=app     # С покрытием
  pytest -v            # Подробный вывод
  pytest --lf          # Только упавшие тесты
  ```

## 🌐 Frontend Tools

### TypeScript/JavaScript

#### ESLint - Линтер
- **Назначение**: Поиск проблем в JS/TS коде
- **Конфигурация**: `frontend/eslint.config.js`
- **Команды**:
  ```bash
  npm run lint          # Проверка
  npm run lint:fix      # Автоисправление
  ```

#### Prettier - Форматировщик
- **Назначение**: Автоматическое форматирование кода
- **Конфигурация**: `frontend/.prettierrc`
- **Команды**:
  ```bash
  npm run format        # Форматирование
  npm run format:check  # Проверка без изменений
  ```

#### TypeScript - Проверка типов
- **Конфигурация**: `frontend/tsconfig.json`
- **Команды**:
  ```bash
  npm run type-check    # Проверка типов
  tsc --noEmit         # Проверка без компиляции
  ```

## 🔧 Pre-commit Hooks

### Установка
```bash
# Автоматически при setup-dev.sh
./scripts/setup-dev.sh

# Или вручную
pip install pre-commit
pre-commit install
pre-commit install --hook-type commit-msg
```

### Использование
```bash
# Проверка всех файлов
pre-commit run --all-files

# Проверка конкретного хука
pre-commit run ruff

# Обновление хуков
pre-commit autoupdate

# Пропуск хуков (не рекомендуется)
git commit --no-verify
```

### Настроенные хуки

**Общие:**
- trailing-whitespace
- end-of-file-fixer
- check-yaml, check-json, check-toml
- check-merge-conflict
- check-added-large-files

**Python:**
- ruff (линтинг + форматирование)
- black (форматирование)
- isort (сортировка импортов)
- mypy (проверка типов)
- bandit (безопасность)
- safety (уязвимости)

**Frontend:**
- eslint (линтинг)
- prettier (форматирование)
- typescript (проверка типов)

**Дополнительно:**
- hadolint (Docker файлы)
- detect-secrets (поиск секретов)
- markdownlint (документация)
- conventional-pre-commit (формат коммитов)

## 📊 Конфигурационные файлы

### Python конфигурация
- `backend/pyproject.toml` - Основная конфигурация всех Python инструментов
- `.pre-commit-config.yaml` - Настройка pre-commit хуков

### Frontend конфигурация
- `frontend/.prettierrc` - Настройки Prettier
- `frontend/eslint.config.js` - Настройки ESLint
- `frontend/tsconfig.json` - Настройки TypeScript

### Дополнительные файлы
- `.markdownlint.json` - Настройки markdown линтера
- `.secrets.baseline` - Базовая линия для detect-secrets

## 🚀 Автоматизация

### Скрипты разработчика

#### Setup окружения
```bash
./scripts/setup-dev.sh    # Linux/Mac
scripts\setup-dev.bat     # Windows
```

#### Проверка качества
```bash
./scripts/check-quality.sh    # Linux/Mac
scripts\check-quality.bat     # Windows
```

### CI/CD интеграция

Все проверки автоматически запускаются в GitHub Actions:
- `.github/workflows/code-quality.yml` - Основные проверки
- `.github/workflows/ci-cd.yml` - Интеграция в CI/CD

## 📋 Правила и стандарты

### Python код
- **Длина строки**: 100 символов
- **Стиль**: Black + Ruff
- **Импорты**: isort с профилем black
- **Типизация**: Обязательна для всех функций
- **Docstrings**: Google style

### TypeScript код
- **Длина строки**: 100 символов
- **Стиль**: Prettier
- **Кавычки**: Одинарные
- **Точки с запятой**: Обязательны
- **Trailing commas**: ES5

### Коммиты
- **Формат**: Conventional Commits
- **Примеры**:
  - `feat: добавить авторизацию пользователей`
  - `fix: исправить ошибку валидации email`
  - `docs: обновить README`
  - `style: форматирование кода`
  - `refactor: переработать API маршруты`
  - `test: добавить тесты для API`
  - `chore: обновить зависимости`

## 🛠️ Настройка IDE

### VS Code
Рекомендуемые расширения:
- Python
- Pylance
- Ruff
- Black Formatter
- TypeScript and JavaScript Language Features
- ESLint
- Prettier
- GitLens

Настройки создаются автоматически в `.vscode/settings.json`

### PyCharm
1. Настроить интерпретатор: `backend/venv/bin/python`
2. Включить Ruff как внешний инструмент
3. Настроить форматтер на Black
4. Включить MyPy проверки

## 🚨 Troubleshooting

### Частые проблемы

**Ruff конфликтует с другими линтерами:**
```bash
# Отключить в настройках IDE flake8, pylint
# Использовать только ruff
```

**MyPy не находит типы:**
```bash
mypy --install-types
pip install types-redis types-requests
```

**Pre-commit медленно работает:**
```bash
# Обновить хуки
pre-commit autoupdate
# Или очистить кеш
pre-commit clean
```

**Prettier конфликтует с ESLint:**
```bash
# Проверить конфигурацию в eslint.config.js
# Убедиться что правила не пересекаются
```

### Пропуск проверок

**Временно отключить линтер:**
```python
# ruff: noqa
# или
import os  # noqa: F401
```

**Отключить MyPy:**
```python
# type: ignore
# или
from typing import Any
result: Any = some_function()
```

**Пропустить pre-commit:**
```bash
git commit --no-verify -m "WIP: временный коммит"
```

## 📈 Метрики качества

### Цели проекта
- **Code coverage**: >90%
- **MyPy coverage**: 100%
- **Ruff violations**: 0
- **Security issues**: 0
- **Type annotations**: 100%

### Мониторинг
- GitHub Actions показывают все метрики
- Локальные отчеты в `htmlcov/` и `coverage.xml`
- Pre-commit предотвращает коммиты с ошибками

## 🔄 Continuous Improvement

### Регулярные задачи
- Обновление зависимостей (Dependabot)
- Обновление pre-commit хуков
- Анализ новых правил линтеров
- Мониторинг производительности проверок

### Планы развития
- Добавление SonarQube
- Интеграция с CodeClimate
- Автоматическое исправление через AI
- Performance profiling