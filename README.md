# Payload IVA360 RU

Проект на базе **Payload CMS 3.58** + **Next.js 15** + **PostgreSQL (Neon)**

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
pnpm install
```

### 2. Настройка переменных окружения

Файл `.env` уже настроен с:
- ✅ `DATABASE_URI` - подключение к Neon PostgreSQL
- ✅ `PAYLOAD_SECRET` - секретный ключ
- ✅ `NEXT_PUBLIC_SERVER_URL` - URL сервера

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
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── (payload)/           # Payload CMS (авто-генерация)
│       ├── admin/           # Админ панель
│       └── api/             # API routes
├── collections/             # Коллекции данных
│   └── Users.ts            # Коллекция пользователей
├── payload.config.ts        # Конфигурация Payload
├── next.config.ts          # Конфигурация Next.js
└── .env                    # Переменные окружения
```

## 🔧 Технологии

- **Framework**: Next.js 15.5.4 (App Router)
- **CMS**: Payload CMS 3.58.0
- **Database**: PostgreSQL (Neon Cloud)
- **Rich Text**: Lexical Editor
- **Styling**: Tailwind CSS 4
- **Images**: Sharp
- **API**: REST + GraphQL

## 📝 Доступные коллекции

### Users (Пользователи)
- Аутентификация включена
- Поля: email, name, role (admin/user)
- REST: `/api/users`
- GraphQL: доступно через playground

### Media (Медиа файлы)
- Загрузка изображений, PDF, видео
- Автоматическая генерация размеров (thumbnail, card, tablet)
- WebP оптимизация
- Хранение: Vercel Blob (production) / локально (development)
- REST: `/api/media`

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

## 🔐 Безопасность

- ✅ `.env` файл исключен из Git
- ✅ PostgreSQL SSL включен (`sslmode=require`)
- ✅ Payload Secret настроен
- ✅ TypeScript строгий режим

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

## 🌐 Production Deployment на Vercel

### 📋 Быстрый старт:

Смотрите подробную инструкцию в **[DEPLOYMENT.md](./DEPLOYMENT.md)**

### Краткая версия:

1. **Создайте Vercel Blob Storage** (для загрузки файлов)
2. **Настройте переменные окружения** в Vercel Dashboard
3. **Подключите GitHub репозиторий** к Vercel
4. **Нажмите Deploy!** 🚀

### Обязательные переменные для Vercel:

```env
PAYLOAD_SECRET=ваш_секрет
DATABASE_URI=ваш_neon_postgres_url
NEXT_PUBLIC_SERVER_URL=https://your-app.vercel.app
BLOB_READ_WRITE_TOKEN=vercel_blob_token
```

**⚠️ Важно:** На Vercel обычная папка Upload **НЕ работает**! Используется Vercel Blob Storage.

## 📖 Документация

- [Payload CMS Docs](https://payloadcms.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Neon Postgres](https://neon.tech/docs)

## 🆘 Поддержка

При возникновении проблем проверьте:
1. Запущена ли база данных (Neon должен быть активен)
2. Правильно ли настроены переменные в `.env`
3. Установлены ли все зависимости (`pnpm install`)

---

Создано с ❤️ для IVA360
