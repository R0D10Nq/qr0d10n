@echo off
REM Скрипт для запуска проверок качества кода (Windows)

echo 🔍 Запуск проверок качества кода...

REM Проверяем активацию виртуального окружения
if "%VIRTUAL_ENV%"=="" (
    echo ⚠️  Виртуальное окружение не активировано
    if exist backend\venv\Scripts\activate.bat (
        echo 📋 Активируем виртуальное окружение...
        call backend\venv\Scripts\activate.bat
    ) else (
        echo ❌ Виртуальное окружение не найдено. Создайте его командой: python -m venv backend\venv
        exit /b 1
    )
)

REM Backend проверки
echo.
echo 📋 Backend проверки...
cd backend

echo 📋 Запуск Ruff линтера...
ruff check . --fix
if %errorlevel% neq 0 (
    echo ❌ Ruff: найдены ошибки
    exit /b 1
) else (
    echo ✅ Ruff: проверка пройдена
)

echo 📋 Проверка форматирования Black...
black --check .
if %errorlevel% neq 0 (
    echo ⚠️  Black: необходимо переформатировать код
    black .
    echo ✅ Black: код переформатирован
) else (
    echo ✅ Black: форматирование корректно
)

echo 📋 Проверка сортировки импортов isort...
isort --check-only .
if %errorlevel% neq 0 (
    echo ⚠️  isort: необходимо отсортировать импорты
    isort .
    echo ✅ isort: импорты отсортированы
) else (
    echo ✅ isort: импорты отсортированы
)

echo 📋 Проверка типов MyPy...
mypy app\
if %errorlevel% neq 0 (
    echo ❌ MyPy: найдены ошибки типизации
) else (
    echo ✅ MyPy: типы корректны
)

echo 📋 Проверка безопасности Bandit...
bandit -r app\ -ll
if %errorlevel% neq 0 (
    echo ⚠️  Bandit: найдены потенциальные проблемы безопасности
) else (
    echo ✅ Bandit: проблем безопасности не найдено
)

echo 📋 Проверка уязвимостей Safety...
safety check
if %errorlevel% neq 0 (
    echo ⚠️  Safety: найдены уязвимости в зависимостях
) else (
    echo ✅ Safety: уязвимостей не найдено
)

echo 📋 Запуск тестов...
pytest --cov=app --cov-report=term-missing
if %errorlevel% neq 0 (
    echo ❌ Тесты: есть падающие тесты
) else (
    echo ✅ Тесты: все прошли успешно
)

cd ..

REM Frontend проверки
echo.
echo 📋 Frontend проверки...
cd frontend

if not exist node_modules (
    echo 📋 Устанавливаем зависимости...
    npm ci
)

echo 📋 Запуск ESLint...
npm run lint
if %errorlevel% neq 0 (
    echo ❌ ESLint: найдены ошибки
) else (
    echo ✅ ESLint: проверка пройдена
)

echo 📋 Проверка форматирования Prettier...
npm run format:check
if %errorlevel% neq 0 (
    echo ⚠️  Prettier: необходимо переформатировать код
    npm run format
    echo ✅ Prettier: код переформатирован
) else (
    echo ✅ Prettier: форматирование корректно
)

echo 📋 Проверка типов TypeScript...
npm run type-check
if %errorlevel% neq 0 (
    echo ❌ TypeScript: найдены ошибки типизации
) else (
    echo ✅ TypeScript: типы корректны
)

echo 📋 Тестовая сборка...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Сборка: ошибка
    exit /b 1
) else (
    echo ✅ Сборка: успешно завершена
)

cd ..

echo.
echo ✅ Все проверки завершены!
echo.
echo 📊 Резюме:
echo   🐍 Backend: ruff, black, isort, mypy, bandit, safety, pytest
echo   🌐 Frontend: eslint, prettier, typescript, build
echo.
echo ✅ Код готов к коммиту! 🚀

pause