# 🚀 Деплой на Vercel - Пошаговая инструкция

## Подготовка проекта

### ✅ Что уже готово:
- ✅ Payload CMS 3.58 настроен
- ✅ PostgreSQL (Neon) подключен
- ✅ Vercel Blob Storage настроен
- ✅ TypeScript конфигурация
- ✅ Next.js 15 с App Router

---

## 📋 Шаги деплоя

### 1. Создайте аккаунт на Vercel

Перейдите на [vercel.com](https://vercel.com) и зарегистрируйтесь через GitHub.

### 2. Установите Vercel CLI (опционально)

```bash
pnpm add -g vercel
```

### 3. Создайте Vercel Blob Storage

**Важно! Сделайте это ДО деплоя:**

1. Перейдите на [vercel.com/dashboard/stores](https://vercel.com/dashboard/stores)
2. Нажмите **Create Database**
3. Выберите **Blob Storage**
4. Назовите: `payload-iwa360-media`
5. Нажмите **Create**
6. Скопируйте `BLOB_READ_WRITE_TOKEN` из вкладки `.env.local`

### 4. Настройте переменные окружения в Vercel

После создания проекта на Vercel, добавьте переменные окружения:

#### В настройках проекта → Environment Variables:

```env
# Payload CMS Secret
PAYLOAD_SECRET=ваш_существующий_секрет_из_env

# Database (ваш существующий Neon)
DATABASE_URI=postgresql://neondb_owner:...@ep-sparkling-sun-abf0z3iz-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require

# Server URL (замените на ваш домен Vercel)
NEXT_PUBLIC_SERVER_URL=https://your-app-name.vercel.app
PAYLOAD_PUBLIC_SERVER_URL=https://your-app-name.vercel.app

# Vercel Blob Token (из шага 3)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxx

# Node Environment
NODE_ENV=production
```

**💡 Важно:** 
- Добавьте переменные для всех окружений: Production, Preview, Development
- `NEXT_PUBLIC_*` переменные доступны в браузере!

### 5. Подключите GitHub репозиторий

```bash
# Инициализируйте Git (если еще не сделано)
git init
git add .
git commit -m "Initial commit for Vercel deployment"

# Создайте репозиторий на GitHub и подключите
git remote add origin https://github.com/your-username/payload-iwa360-ru.git
git push -u origin main
```

### 6. Импортируйте проект в Vercel

#### Вариант А: Через Dashboard

1. Перейдите на [vercel.com/new](https://vercel.com/new)
2. Выберите репозиторий `payload-iwa360-ru`
3. Vercel автоматически определит Next.js
4. Нажмите **Deploy**

#### Вариант B: Через CLI

```bash
vercel
# Следуйте инструкциям в терминале
```

### 7. Настройте домен (опционально)

1. В Vercel Dashboard → Settings → Domains
2. Добавьте свой домен
3. Обновите DNS записи
4. Обновите `NEXT_PUBLIC_SERVER_URL` на новый домен

---

## 🔧 После деплоя

### Создайте первого администратора

1. Откройте: `https://your-app.vercel.app/admin`
2. Зарегистрируйте первого пользователя
3. Этот пользователь автоматически станет администратором

### Проверьте работу Upload

1. В админ-панели → Media
2. Попробуйте загрузить изображение
3. Оно должно сохраниться в Vercel Blob Storage

### Проверьте API

- **REST API**: `https://your-app.vercel.app/api/users`
- **GraphQL**: `https://your-app.vercel.app/api/graphql-playground`

---

## 🐛 Troubleshooting

### Ошибка: "Database connection failed"

**Решение:** Проверьте `DATABASE_URI` в переменных окружения Vercel.

### Ошибка: "BLOB_READ_WRITE_TOKEN is not defined"

**Решение:** 
1. Создайте Blob Storage в Vercel
2. Добавьте токен в переменные окружения
3. Передеплойте проект

### Ошибка: "Build failed"

**Решение:**
```bash
# Проверьте локально
pnpm build

# Если работает локально, проверьте:
# 1. Все переменные окружения в Vercel
# 2. Версию Node.js (должна быть 20+)
```

### Изображения не загружаются

**Решение:**
1. Убедитесь что `BLOB_READ_WRITE_TOKEN` настроен
2. Проверьте что Blob Storage привязан к проекту
3. Перезапустите деплой

---

## 📊 Мониторинг

### Логи

Vercel Dashboard → Project → Deployments → Function Logs

### База данных

Neon Dashboard → Monitoring → Query Stats

### Blob Storage

Vercel Dashboard → Storage → Blob → Usage

---

## 🔄 Автоматический деплой

После настройки, каждый `git push` в `main` ветку будет автоматически деплоить проект на Vercel!

```bash
# Внесите изменения
git add .
git commit -m "Update content"
git push

# Vercel автоматически задеплоит! 🚀
```

---

## 💰 Стоимость (на январь 2025)

### Vercel
- **Hobby Plan**: Бесплатно
  - 100 GB-часов/месяц
  - Автоматический SSL
  - CDN

### Neon (PostgreSQL)
- **Free Tier**: Бесплатно
  - 0.5 GB хранилища
  - 1 проект

### Vercel Blob
- **Free Tier**: Бесплатно
  - 1 GB хранилища
  - 100 GB передачи/месяц

**Итого для старта: $0/месяц** ✨

---

## 📚 Полезные ссылки

- [Vercel Documentation](https://vercel.com/docs)
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Neon Postgres Docs](https://neon.tech/docs)
- [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)

---

## 🆘 Нужна помощь?

1. Проверьте логи в Vercel Dashboard
2. Проверьте статус Neon Database
3. Проверьте переменные окружения

**Удачного деплоя! 🚀**

