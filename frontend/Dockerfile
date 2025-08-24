# Dockerfile для React frontend
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Аргументы сборки для переменных окружения
ARG VITE_API_URL=http://localhost:8000
ARG VITE_GITHUB_PAGES=false

# Устанавливаем переменные окружения
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_GITHUB_PAGES=$VITE_GITHUB_PAGES

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Копируем исходный код
COPY . .

# Собираем приложение для production
RUN npm run build

# Production образ с nginx
FROM nginx:alpine

# Копируем собранное приложение
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx для SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

# Добавляем health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]