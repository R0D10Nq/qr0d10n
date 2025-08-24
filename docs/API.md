# 📚 API Documentation

## 🚀 Portfolio API R0D10N

Полнофункциональное REST API для портфолио Python/Fullstack разработчика, построенное на FastAPI с современными практиками разработки.

## 📋 Содержание

- [🔗 Базовая информация](#базовая-информация)
- [🔑 Аутентификация](#аутентификация)  
- [📁 Эндпоинты](#эндпоинты)
- [📊 Модели данных](#модели-данных)
- [🛠️ Примеры использования](#примеры-использования)
- [⚠️ Коды ошибок](#коды-ошибок)
- [🧪 Тестирование](#тестирование)

## 🔗 Базовая информация

### Серверы

| Окружение | URL | Описание |
|-----------|-----|----------|
| Production | `https://api.r0d10n.ru` | Боевой сервер |
| Development | `http://localhost:8000` | Локальная разработка |

### Версионирование

API использует версионирование через URL префикс: `/api/v1/`

### Форматы данных

- **Запросы**: JSON (Content-Type: application/json)
- **Ответы**: JSON
- **Даты**: ISO 8601 формат (YYYY-MM-DDTHH:MM:SSZ)

### Интерактивная документация

- **Swagger UI**: [/docs](http://localhost:8000/docs)
- **ReDoc**: [/redoc](http://localhost:8000/redoc)
- **OpenAPI Schema**: [/api/v1/openapi.json](http://localhost:8000/api/v1/openapi.json)

## 🔑 Аутентификация

API является публичным и не требует аутентификации для большинства эндпоинтов.

### Rate Limiting

- **Общие запросы**: 100 запросов/минуту
- **Контактные формы**: 5 запросов/минуту

## 📁 Эндпоинты

### 🏠 Базовые эндпоинты

#### `GET /` - Корневая страница

**Описание**: Проверка работоспособности API

**Ответ**:
```json
{
  \"message\": \"R0D10N Portfolio API жив и здоров! 🚀\",
  \"docs\": \"/docs\",
  \"redoc\": \"/redoc\",
  \"version\": \"1.0.0\",
  \"author\": \"Родион Шевцов (R0D10N)\",
  \"github\": \"https://github.com/R0D10Nq\"
}
```

#### `GET /health` - Health Check

**Описание**: Проверка здоровья системы для мониторинга

**Ответ**:
```json
{
  \"status\": \"healthy\",
  \"service\": \"r0d10n-portfolio-api\",
  \"version\": \"1.0.0\",
  \"timestamp\": \"2024-08-24T12:00:00Z\",
  \"uptime\": \"running\"
}
```

### 📁 Portfolio Endpoints

#### `GET /api/v1/portfolio/` - Полное портфолио

**Описание**: Получение всей информации о портфолио

**Параметры**: Нет

**Ответ**:
```json
{
  \"personal_info\": {...},
  \"projects\": [...],
  \"experience\": [...],
  \"technologies\": [...]
}
```

#### `GET /api/v1/portfolio/personal` - Личная информация

**Описание**: Получение личной информации разработчика

**Ответ**:
```json
{
  \"id\": 1,
  \"name\": \"Родион Шевцов\",
  \"title\": \"Python / Backend-oriented Fullstack Developer\",
  \"bio\": \"Middle Python / Fullstack разработчик...\",
  \"location\": \"Томск, Россия\",
  \"email\": \"q@r0d10n.ru\",
  \"phone\": \"+7 (953) 918-31-49\",
  \"github_url\": \"https://github.com/R0D10Nq\",
  \"telegram_url\": \"https://t.me/qr0d10n\",
  \"avatar_url\": \"https://avatars.githubusercontent.com/u/174966285\",
  \"years_of_experience\": 3,
  \"is_available_for_hire\": true,
  \"updated_at\": \"2024-08-24T12:00:00Z\"
}
```

#### `GET /api/v1/portfolio/projects` - Список проектов

**Описание**: Получение списка проектов с фильтрацией и пагинацией

**Параметры**:
- `page` (int, optional): Номер страницы (по умолчанию: 1)
- `per_page` (int, optional): Количество на странице (по умолчанию: 10, макс: 100)
- `featured_only` (bool, optional): Только избранные проекты
- `technology` (str, optional): Фильтр по технологии

**Пример запроса**:
```
GET /api/v1/portfolio/projects?featured_only=true&per_page=5
```

**Ответ**:
```json
{
  \"items\": [
    {
      \"id\": 1,
      \"title\": \"R0D10N Portfolio\",
      \"short_description\": \"Современное портфолио на React + FastAPI\",
      \"description\": \"Полное описание проекта...\",
      \"github_url\": \"https://github.com/R0D10Nq/qr0d10n\",
      \"demo_url\": \"https://r0d10nq.github.io/qr0d10n\",
      \"image_url\": \"/portfolio-preview.jpg\",
      \"is_featured\": true,
      \"is_active\": true,
      \"stars_count\": 20,
      \"created_at\": \"2024-08-24T12:00:00Z\",
      \"updated_at\": \"2024-08-24T12:00:00Z\",
      \"technologies\": [...]
    }
  ],
  \"total\": 25,
  \"page\": 1,
  \"per_page\": 5,
  \"pages\": 5
}
```

#### `GET /api/v1/portfolio/projects/{id}` - Конкретный проект

**Описание**: Получение детальной информации о проекте

**Параметры**:
- `id` (int): ID проекта

**Ответ**: Объект проекта (см. выше)

#### `GET /api/v1/portfolio/experience` - Опыт работы

**Описание**: Получение списка мест работы и опыта

**Ответ**:
```json
[
  {
    \"id\": 1,
    \"company\": \"Sinergium\",
    \"position\": \"Python / Fullstack Developer\",
    \"description\": \"Разработка мультитенантной платформы...\",
    \"location\": \"Удалённо\",
    \"start_date\": \"2024-03-01T00:00:00Z\",
    \"end_date\": \"2025-08-01T00:00:00Z\",
    \"is_current\": false,
    \"achievements\": \"Сократил время создания лендингов с 2-3 дней до 30 минут\",
    \"duration_months\": 17
  }
]
```

#### `GET /api/v1/portfolio/technologies` - Технологии

**Описание**: Получение списка технологий и навыков

**Параметры**:
- `category` (str, optional): Фильтр по категории (backend, frontend, database, devops, tools, testing)

**Ответ**:
```json
[
  {
    \"id\": 1,
    \"name\": \"Python\",
    \"category\": \"backend\",
    \"color\": \"#3776ab\",
    \"is_active\": true
  }
]
```

#### `GET /api/v1/portfolio/stats` - Статистика

**Описание**: Получение общей статистики портфолио

**Ответ**:
```json
{
  \"projects_total\": 25,
  \"projects_featured\": 8,
  \"technologies_total\": 45,
  \"github_stars_total\": 150,
  \"years_of_experience\": 3
}
```

### 💬 Contact Endpoints

#### `POST /api/v1/contact/message` - Отправка сообщения

**Описание**: Отправка контактного сообщения

**Тело запроса**:
```json
{
  \"name\": \"Иван Иванов\",
  \"email\": \"ivan@example.com\",
  \"subject\": \"Предложение о работе\",
  \"message\": \"Здравствуйте! Хотел бы обсудить...\",
  \"company\": \"Моя Компания\"
}
```

**Ответ**:
```json
{
  \"success\": true,
  \"message\": \"Сообщение успешно отправлено!\",
  \"message_id\": 123
}
```

#### `POST /api/v1/contact/subscribe` - Подписка на рассылку

**Описание**: Подписка на новости и обновления

**Тело запроса**:
```json
{
  \"email\": \"user@example.com\"
}
```

**Ответ**:
```json
{
  \"success\": true,
  \"message\": \"Подписка оформлена успешно!\",
  \"subscriber_id\": 456
}
```

#### `POST /api/v1/contact/unsubscribe` - Отписка от рассылки

**Описание**: Отписка от рассылки

**Параметры**:
- `email` (str): Email для отписки

**Ответ**:
```json
{
  \"success\": true,
  \"message\": \"Подписка отменена\"
}
```

## 📊 Модели данных

### PersonalInfo
```typescript
interface PersonalInfo {
  id: number;
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  github_url?: string;
  telegram_url?: string;
  linkedin_url?: string;
  avatar_url?: string;
  resume_url?: string;
  years_of_experience: number;
  is_available_for_hire: boolean;
  updated_at: string;
}
```

### Project
```typescript
interface Project {
  id: number;
  title: string;
  short_description: string;
  description: string;
  github_url?: string;
  demo_url?: string;
  image_url?: string;
  is_featured: boolean;
  is_active: boolean;
  stars_count?: number;
  created_at: string;
  updated_at: string;
  technologies: Technology[];
}
```

### Technology
```typescript
interface Technology {
  id: number;
  name: string;
  category: 'backend' | 'frontend' | 'database' | 'devops' | 'tools' | 'testing';
  color?: string;
  is_active: boolean;
}
```

### Experience
```typescript
interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  location: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  achievements?: string;
  duration_months: number;
}
```

## 🛠️ Примеры использования

### JavaScript/TypeScript

```typescript
// Получение портфолио
const response = await fetch('http://localhost:8000/api/v1/portfolio/');
const portfolio = await response.json();

// Отправка сообщения
const messageData = {
  name: 'Иван Иванов',
  email: 'ivan@example.com',
  subject: 'Предложение о работе',
  message: 'Здравствуйте! Хотел бы обсудить возможность сотрудничества.'
};

const response = await fetch('http://localhost:8000/api/v1/contact/message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(messageData)
});

const result = await response.json();
```

### Python

```python
import requests

# Получение проектов
response = requests.get('http://localhost:8000/api/v1/portfolio/projects')
projects = response.json()

# Отправка сообщения
message_data = {
    'name': 'Иван Иванов',
    'email': 'ivan@example.com', 
    'subject': 'Предложение о работе',
    'message': 'Здравствуйте! Хотел бы обсудить возможность сотрудничества.'
}

response = requests.post(
    'http://localhost:8000/api/v1/contact/message',
    json=message_data
)
result = response.json()
```

### cURL

```bash
# Получение статистики
curl -X GET \"http://localhost:8000/api/v1/portfolio/stats\" \\
     -H \"accept: application/json\"

# Отправка сообщения
curl -X POST \"http://localhost:8000/api/v1/contact/message\" \\
     -H \"accept: application/json\" \\
     -H \"Content-Type: application/json\" \\
     -d '{
       \"name\": \"Иван Иванов\",
       \"email\": \"ivan@example.com\",
       \"subject\": \"Предложение о работе\",
       \"message\": \"Здравствуйте! Хотел бы обсудить возможность сотрудничества.\"
     }'
```

## ⚠️ Коды ошибок

| Код | Описание | Пример |
|-----|----------|--------|
| 200 | OK | Успешный запрос |
| 201 | Created | Ресурс создан |
| 400 | Bad Request | Неверные параметры запроса |
| 404 | Not Found | Ресурс не найден |
| 422 | Validation Error | Ошибка валидации данных |
| 429 | Too Many Requests | Превышен лимит запросов |
| 500 | Internal Server Error | Внутренняя ошибка сервера |

### Формат ошибок

```json
{
  \"detail\": [
    {
      \"loc\": [\"body\", \"email\"],
      \"msg\": \"field required\",
      \"type\": \"value_error.missing\"
    }
  ]
}
```

## 🧪 Тестирование

### Запуск тестов

```bash
# Все тесты
pytest

# С покрытием
pytest --cov=app

# Только API тесты
pytest tests/test_api/
```

### Тестовые данные

API включает фиксированные тестовые данные для разработки:

- Личная информация разработчика
- 10+ образцов проектов
- Список технологий и навыков
- Примеры опыта работы

## 📈 Производительность

### Оптимизации

- **Кеширование**: Redis для часто запрашиваемых данных
- **Пагинация**: Все списки поддерживают пагинацию
- **Фильтрация**: Серверная фильтрация данных
- **Сжатие**: Gzip сжатие ответов

### Лимиты

- **Размер запроса**: Максимум 1MB
- **Время ответа**: Цель <200ms для большинства эндпоинтов
- **Пагинация**: Максимум 100 элементов на страницу

## 🔒 Безопасность

- **CORS**: Настроен для разрешенных доменов
- **Rate Limiting**: Защита от злоупотреблений
- **Валидация**: Строгая валидация всех входных данных
- **Санитизация**: Очистка HTML и SQL инъекций

## 📞 Поддержка

Если у вас есть вопросы по API:

- **Email**: q@r0d10n.ru
- **GitHub Issues**: [Создать issue](https://github.com/R0D10Nq/qr0d10n/issues)
- **Telegram**: [@qr0d10n](https://t.me/qr0d10n)

---

**Версия документации**: 1.0.0  
**Последнее обновление**: 24.08.2024