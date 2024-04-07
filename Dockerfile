# Используем образ линукс Alpine с версией Node 14
FROM node:19.5.0-alpine

# Указываем нашу рабочую директорию
WORKDIR /app

# Скопировать package.json и package-lock.json внутрь контейнера 
COPY packag*.json ./
# Устанавливаем зависимости
RUN npm install

# Копируем все остальное приложение в контейнер 
COPY . .
# Установить Prisma
RUN npm install -g prisma
# Генерируем Prisma Client
RUN prisma generate

# Копируем Prisma Schema 
COPY prisma/schema.prisma ./prisma/
# Открыть порт в нашем контейнере
EXPOSE 3000

# Запускаем наш сервер
CMD ["npm", "start"]