# ✅ Проект готов к деплою на Vercel!

## 📋 Чек-лист готовности

### ✅ Локальная конфигурация
- [x] Payload CMS 3.58.0 настроен
- [x] PostgreSQL (Neon) подключен
- [x] Vercel Blob Storage настроен
- [x] Коллекция Users создана
- [x] Коллекция Media создана с Blob Storage
- [x] TypeScript конфигурация
- [x] Next.js 15 с Webpack
- [x] Все переменные окружения настроены

### ✅ Файлы созданы
- [x] `payload.config.ts` - полная конфигурация
- [x] `collections/Users.ts` - пользователи с auth
- [x] `collections/Media.ts` - загрузка файлов
- [x] `vercel.json` - конфигурация для Vercel
- [x] `.gitignore` - обновлен
- [x] `README.md` - документация
- [x] `DEPLOYMENT.md` - инструкция по деплою
- [x] `BLOB_SETUP.md` - настройка Blob Storage

---

## 🚀 Следующие шаги

### 1. Протестируйте локально

```bash
# Запустите проект
pnpm dev

# Откройте браузер
open http://localhost:3000/admin
```

**Что проверить:**
- ✅ Админ-панель открывается
- ✅ Можете создать первого пользователя
- ✅ Можете войти в систему
- ✅ Можете загрузить файл в Media
- ✅ GraphQL Playground работает: http://localhost:3000/api/graphql-playground

### 2. Подготовьте Git репозиторий

```bash
# Инициализация (если еще не сделано)
git init

# Проверьте что .env НЕ будет в Git
git status | grep .env
# Не должно ничего показать!

# Добавьте все файлы
git add .

# Коммит
git commit -m "Initial Payload CMS setup ready for production"

# Создайте репозиторий на GitHub
# https://github.com/new

# Подключите remote
git remote add origin https://github.com/YOUR_USERNAME/payload-iwa360-ru.git

# Запушьте
git branch -M main
git push -u origin main
```

### 3. Деплой на Vercel

#### Вариант A: Через веб-интерфейс (рекомендуется)

1. **Зайдите на Vercel**: https://vercel.com/new
2. **Import Git Repository**: выберите ваш репозиторий
3. **Configure Project**:
   - Framework Preset: `Next.js` (автоопределение)
   - Root Directory: `./` (по умолчанию)
   - Build Command: `pnpm build` (автоматически)
   - Output Directory: `.next` (автоматически)

4. **Environment Variables** - добавьте:

```env
PAYLOAD_SECRET=Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1
DATABASE_URI=postgresql://neondb_owner:npg_GoZsct7l2Jre@ep-sparkling-sun-abf0z3iz-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require
NEXT_PUBLIC_SERVER_URL=https://ваш-проект.vercel.app
PAYLOAD_PUBLIC_SERVER_URL=https://ваш-проект.vercel.app
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_7qv5pUYFuSTNvFhz_bhzUTTNesAoSE6zrHaBln1M8ACuhNN
NODE_ENV=production
```

5. **Deploy!** 🚀

#### Вариант B: Через CLI

```bash
# Установите Vercel CLI
pnpm add -g vercel

# Деплой
vercel

# Следуйте инструкциям
```

### 4. После деплоя

#### Обновите NEXT_PUBLIC_SERVER_URL

После первого деплоя Vercel даст вам URL (например: `https://payload-iwa360-ru.vercel.app`)

1. **Vercel Dashboard** → Settings → Environment Variables
2. Обновите `NEXT_PUBLIC_SERVER_URL` на реальный URL
3. **Redeploy** проект

#### Создайте первого администратора

1. Откройте: `https://ваш-проект.vercel.app/admin`
2. Создайте первого пользователя
3. Войдите в систему

#### Проверьте загрузку файлов

1. В админке → Media
2. Загрузите тестовое изображение
3. Проверьте что оно отображается
4. В Vercel Dashboard → Storage → Blob → Browse - увидите загруженный файл

---

## 🔒 Безопасность

### ⚠️ ВАЖНО: Никогда не коммитьте .env в Git!

Ваш `.env` уже в `.gitignore`, но проверьте:

```bash
# Проверка
git status

# .env НЕ должен отображаться в списке файлов для коммита!
```

### 🔐 Секретные данные в .env

Ваш `.env` содержит:
- ✅ `PAYLOAD_SECRET` - секретный ключ
- ✅ `DATABASE_URI` - строка подключения к БД (с паролем!)
- ✅ `BLOB_READ_WRITE_TOKEN` - токен доступа к Blob Storage

**Эти данные НИКОГДА не должны попасть в публичный репозиторий!**

### 📝 .env.example

Создан файл `.env.example` (без секретов) для других разработчиков.

---

## 🎨 Что дальше?

### Добавьте свои коллекции

Например, Posts, Pages, Products и т.д.:

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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
```

Затем добавьте в `payload.config.ts`:
```typescript
import { Posts } from './collections/Posts'

collections: [Users, Media, Posts],
```

### Настройте email (опционально)

Для сброса паролей и уведомлений:

```typescript
// payload.config.ts
email: {
  transportOptions: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  fromName: 'IVA360',
  fromAddress: process.env.SMTP_FROM_EMAIL || 'noreply@iva360.com',
},
```

### Кастомизируйте админ-панель

```typescript
// payload.config.ts
admin: {
  meta: {
    titleSuffix: '- IVA360',
    ogImage: '/og-image.png',
  },
  // Добавьте свой логотип
  // Настройте navigation
  // Добавьте custom components
},
```

---

## 📊 Текущая конфигурация

### Зависимости
- Next.js: 15.5.4
- Payload CMS: 3.58.0
- PostgreSQL: Neon (облако)
- Storage: Vercel Blob
- Rich Text: Lexical
- Images: Sharp + WebP

### API Endpoints
- REST API: `/api/*`
- GraphQL: `/api/graphql`
- GraphQL Playground: `/api/graphql-playground`
- Admin: `/admin`

### Коллекции
1. **Users** - аутентификация + роли
2. **Media** - загрузка файлов в Blob Storage

---

## 🆘 Помощь

### Документация
- [README.md](./README.md) - основная документация
- [DEPLOYMENT.md](./DEPLOYMENT.md) - подробная инструкция по деплою
- [BLOB_SETUP.md](./BLOB_SETUP.md) - настройка Blob Storage
- [QUICKSTART_BLOB.md](./QUICKSTART_BLOB.md) - быстрый старт

### Полезные ссылки
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Neon Postgres](https://neon.tech/docs)

---

## ✨ Готово к production!

Ваш проект **полностью настроен** и готов к деплою на Vercel! 🎉

**Следующий шаг**: Запустите `pnpm dev` и протестируйте всё локально перед деплоем!

```bash
pnpm dev
```

**Удачи! 🚀**

