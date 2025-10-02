# Payload IVA360 RU

Проект на базе **Payload CMS 3.58** + **Next.js 15** + **PostgreSQL (Neon)** + **Vercel Blob Storage**

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
pnpm install
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
PORT=3000
HOSTNAME=localhost

# Database
DATABASE_URI=postgresql://user:password@host/database?sslmode=require

# Payload CMS
PAYLOAD_SECRET=your-secret-key-here

# Server URLs
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Vercel Blob Storage (обязательно!)
PAYLOAD_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx

# Basic Auth для защиты админки на production
BASIC_AUTH_USER=login
BASIC_AUTH_PASSWORD=password
```

### 3. Запуск в режиме разработки

```bash
pnpm dev
```

Приложение будет доступно по адресу: **http://localhost:3000**

### 4. Доступ к админ-панели

После запуска перейдите по адресу:

```
http://localhost:3000/admin
```

При первом запуске вам будет предложено создать первого пользователя-администратора.

## 📚 API Endpoints

- **REST API**: `http://localhost:3000/api/users`
- **GraphQL API**: `http://localhost:3000/api/graphql`
- **GraphQL Playground**: `http://localhost:3000/api/graphql-playground`

## 🗄️ Структура проекта

```
payload-iwa360-ru/
├── app/
│   ├── (frontend)/          # Публичная часть сайта
│   │   ├── layout.tsx       # SEO защита (noindex/nofollow)
│   │   └── page.tsx         # Главная страница с Settings
│   ├── (payload)/           # Payload CMS (авто-генерация)
│   │   ├── admin/           # Админ панель
│   │   └── api/             # API routes
│   └── robots.ts            # robots.txt (disallow: /)
├── collections/             # Коллекции данных
│   ├── Users.ts            # Пользователи
│   └── Media.ts            # Медиа файлы
├── globals/                # Глобальные настройки
│   └── Settings.ts         # Настройки сайта (логотип, title, description)
├── payload.config.ts       # Конфигурация Payload
├── next.config.ts         # Конфигурация Next.js + SEO заголовки
├── middleware.ts          # Защита админки (Basic Auth)
└── .env                   # Переменные окружения
```

## 🔧 Технологии

- **Framework**: Next.js 15.5.4 (App Router)
- **CMS**: Payload CMS 3.58.0
- **Database**: PostgreSQL (Neon Cloud)
- **Storage**: Vercel Blob Storage
- **Rich Text**: Lexical Editor
- **Styling**: Tailwind CSS 4
- **Images**: Sharp + Next.js Image Optimization
- **API**: REST + GraphQL

## 📝 Доступные коллекции и глобальные настройки

### Users (Пользователи)
- Аутентификация включена
- Поля: email, name, role (admin/user)
- REST: `/api/users`
- GraphQL: доступно через playground

### Media (Медиа файлы)
- Загрузка изображений, PDF, видео
- Автоматическая генерация размеров (thumbnail, card, tablet)
- WebP оптимизация (качество 80%)
- **Хранение: Vercel Blob Storage** (и localhost, и production)
- REST: `/api/media`

### Settings (Глобальные настройки)
- Логотип сайта (upload поле)
- Заголовок (Title)
- Описание (Description)
- REST: `/api/globals/settings`
- Используется на фронтенде в `page.tsx`

## 🛠️ Команды

```bash
# Разработка
pnpm dev

# Сборка для production
pnpm build

# Запуск production сервера
pnpm start

# Линтинг
pnpm lint
```

## 🔐 Безопасность и SEO

### Безопасность:
- ✅ `.env` файл исключен из Git
- ✅ PostgreSQL SSL включен (`sslmode=require`)
- ✅ Payload Secret настроен
- ✅ TypeScript строгий режим
- ✅ Basic Auth на админке (production)
- ✅ Middleware защищает только `/admin/*`

### SEO защита (noindex/nofollow):
- ✅ Meta-теги в `layout.tsx`
- ✅ `robots.txt` с `disallow: /`
- ✅ HTTP заголовки `X-Robots-Tag`
- ✅ Полная защита от индексации поисковиками

## 🌐 Production Deployment на Vercel

### 1. Создайте Vercel Blob Storage

1. Откройте Vercel Dashboard → **Storage**
2. **Create Database** → **Blob**
3. Назовите: `payload` (или любое имя)
4. Нажмите **Create**
5. Подключите к проекту через **Connect**

### 2. Настройте переменные окружения в Vercel

Обязательные переменные:

```env
PAYLOAD_SECRET=ваш_секрет
DATABASE_URI=ваш_neon_postgres_url
NEXT_PUBLIC_SERVER_URL=https://your-app.vercel.app
PAYLOAD_PUBLIC_SERVER_URL=https://your-app.vercel.app
PAYLOAD_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx  # автоматически при подключении Blob
BASIC_AUTH_USER=login
BASIC_AUTH_PASSWORD=password
```

### 3. Подключите GitHub и задеплойте

1. Vercel Dashboard → **New Project**
2. Выберите репозиторий
3. Нажмите **Deploy**

**⚠️ Важно:** 
- Vercel Blob Storage **обязателен** для хранения файлов
- После подключения Blob Store сделайте **Redeploy**
- Файлы, загруженные до настройки Blob, нужно перезалить

## 📦 Добавление новых коллекций

1. Создайте файл в `collections/` (например, `Posts.ts`)
2. Импортируйте в `payload.config.ts`
3. Добавьте в массив `collections`

Пример:

```typescript
// collections/Posts.ts
import { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
```

## 🆘 Поддержка

При возникновении проблем проверьте:

1. **База данных**: Neon должен быть активен
2. **Переменные окружения**: Все ли правильно настроены в `.env` и на Vercel
3. **Зависимости**: Установлены ли все пакеты (`pnpm install`)
4. **Vercel Blob**: Создан и подключен к проекту
5. **Токен**: `PAYLOAD_READ_WRITE_TOKEN` правильно прописан

### Частые проблемы:

**Картинки не отображаются на Vercel:**
- Проверьте что Blob Store подключен к проекту
- Сделайте Redeploy после настройки
- Перезалейте файлы через админку

**401/403 на сайте:**
- Проверьте `middleware.ts` - должен блокировать только `/admin/*`
- Basic Auth настроен правильно

**404 на файлах:**
- Файлы должны быть в Vercel Blob Storage, не локально
- URL должен быть `https://xxxxx.public.blob.vercel-storage.com/...`

---

Создано с ❤️ для IVA360
