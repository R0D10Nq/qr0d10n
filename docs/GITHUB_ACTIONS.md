# GitHub Actions CI/CD Documentation

## 📋 Обзор

Проект использует GitHub Actions для автоматизации CI/CD процессов, включая тестирование, сборку, развертывание и контроль качества кода.

## 🔄 Workflows

### 1. CI/CD Pipeline (`ci-cd.yml`)

**Триггеры:**
- Push в ветки `main`, `develop`
- Pull requests в ветку `main`

**Задачи:**
- ✅ **backend-test**: Тестирование Python backend с PostgreSQL и Redis
- ✅ **frontend-test**: Тестирование и сборка React frontend
- 🔒 **security-scan**: Сканирование уязвимостей с Trivy
- 🐳 **docker-build**: Тестирование Docker сборки
- 🚀 **deploy-pages**: Деплой на GitHub Pages (только main ветка)
- 📢 **notify**: Уведомления о результатах

### 2. Code Quality (`code-quality.yml`)

**Триггеры:**
- Push в ветки `main`, `develop`
- Pull requests в ветку `main`

**Проверки:**
- **Python**: ruff, black, isort, mypy, bandit, safety
- **TypeScript**: ESLint, Prettier, TypeScript compiler
- **Зависимости**: npm audit, pip-audit
- **Секреты**: gitleaks
- **Производительность**: Lighthouse CI

### 3. Release (`release.yml`)

**Триггеры:**
- Push в ветку `main` (кроме документации)

**Процесс:**
- Семантическое версионирование
- Автогенерация CHANGELOG
- Создание GitHub релизов
- Деплой в production

### 4. Dependabot (`dependabot.yml`)

**Автоматическое обновление:**
- Python зависимости (еженедельно, понедельник)
- Node.js зависимости (еженедельно, понедельник)
- Docker образы (еженедельно, вторник)
- GitHub Actions (еженедельно, среда)

## 🔧 Настройка

### Необходимые Secrets

Настройте следующие секреты в репозитории:

```bash
# GitHub Settings > Secrets and variables > Actions
GITHUB_TOKEN          # Автоматически предоставляется GitHub
NPM_TOKEN            # Для публикации пакетов (опционально)
GITLEAKS_LICENSE     # Для расширенного сканирования секретов (опционально)
```

### Переменные окружения

```bash
# Для GitHub Pages деплоя
VITE_API_URL=https://api.r0d10n.ru
VITE_GITHUB_PAGES=true
```

## 📊 Мониторинг качества

### Coverage Reports

- **Backend**: Codecov интеграция с отчетами покрытия
- **Frontend**: В планах добавление тестов

### Security Scanning

- **Trivy**: Сканирование файловой системы
- **Bandit**: Анализ безопасности Python кода
- **Safety**: Проверка Python зависимостей
- **npm audit**: Проверка Node.js зависимостей
- **Gitleaks**: Поиск секретов в истории git

### Performance Monitoring

- **Lighthouse CI**: Автоматические тесты производительности
  - Performance: 90%+
  - Accessibility: 95%+
  - Best Practices: 90%+
  - SEO: 90%+

## 🎯 Branching Strategy

```
main              # Production branch
├── develop       # Development branch
├── feature/*     # Feature branches
├── bugfix/*      # Bug fix branches
└── hotfix/*      # Hotfix branches
```

### Правила

1. **main**: Только через PR, все проверки должны пройти
2. **develop**: Интеграционная ветка для разработки
3. **feature/***: Новые функции
4. **bugfix/***: Исправления багов
5. **hotfix/***: Критические исправления для production

## 🚀 Deployment Strategy

### GitHub Pages

- **URL**: `https://r0d10nq.github.io/qr0d10n`
- **Триггер**: Push в `main` ветку
- **Сборка**: Статический React build с mock данными
- **CDN**: GitHub Pages CDN

### Future Production

- Docker контейнеры готовы для деплоя
- Environment variables настроены
- Health checks реализованы

## 📋 Статусы проверок

### Required Checks

Для merge в `main` требуется прохождение:

- ✅ Backend tests
- ✅ Frontend build
- ✅ Security scan
- ✅ Code quality
- ✅ Docker build

### Optional Checks

- 📊 Performance tests
- 🔍 Dependency scans
- 📝 Documentation

## 🛠️ Локальная разработка

### Pre-commit хуки

```bash
# Установка pre-commit
pip install pre-commit
pre-commit install

# Ручной запуск проверок
pre-commit run --all-files
```

### Локальные проверки

```bash
# Backend качество
cd backend
ruff check .
black --check .
isort --check .
mypy app/

# Frontend качество
cd frontend
npm run lint
npm run type-check
npm run format:check
```

## 🚨 Troubleshooting

### Частые проблемы

1. **Failing tests**: Проверьте логи в Actions tab
2. **Docker build fails**: Убедитесь что Dockerfile корректен
3. **Pages deployment fails**: Проверьте VITE_* переменные
4. **Security scan alerts**: Обновите зависимости

### Debug Commands

```bash
# Локальный запуск Lighthouse
npm run build
npx lhci autorun

# Локальная проверка безопасности
bandit -r backend/app/
npm audit

# Локальная сборка Docker
docker build -t test-build .
```

## 📈 Метрики

Проект отслеживает:

- 📊 Code coverage (цель: >90%)
- 🏎️ Build time (цель: <5 минут)
- 🔒 Security score (цель: A+)
- ⚡ Performance score (цель: 90+)
- 📱 Accessibility score (цель: 95+)

## 🔄 Continuous Improvement

### Planned Enhancements

- [ ] Добавление E2E тестов с Playwright
- [ ] Интеграция с SonarQube
- [ ] Automated changelog generation
- [ ] Performance budgets
- [ ] Visual regression testing

### Monitoring

- GitHub Actions usage tracking
- Deployment frequency metrics
- Lead time for changes
- Mean time to recovery