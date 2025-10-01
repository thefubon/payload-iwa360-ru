# 🎯 С ЧЕГО НАЧАТЬ - Быстрая навигация

## 📚 Все инструкции по порядку

### 1️⃣ Локальная разработка (СЕЙЧАС)

**→ [README.md](./README.md)** - основная документация проекта

```bash
pnpm install
pnpm dev
# Откройте http://localhost:3000/admin
```

---

### 2️⃣ Настройка Blob Storage

**→ [QUICKSTART_BLOB.md](./QUICKSTART_BLOB.md)** - быстрая шпаргалка (2 мин)

**→ [BLOB_SETUP.md](./BLOB_SETUP.md)** - подробная инструкция (5-10 мин)

**Что делать:**
- Для локальной разработки: ничего (файлы в `/media`)
- Для Vercel: создать Blob Storage и получить токен

---

### 3️⃣ Настройка переменных для Vercel

**→ [VERCEL_QUICK_SETUP.txt](./VERCEL_QUICK_SETUP.txt)** - копируй и вставляй ⚡

**→ [VERCEL_ENV_VARIABLES.md](./VERCEL_ENV_VARIABLES.md)** - что и зачем

**→ [VERCEL_STEP_BY_STEP.md](./VERCEL_STEP_BY_STEP.md)** - пошагово с картинками

**Краткая версия:**
```
Vercel Dashboard → Settings → Environment Variables → Add New
```

Добавьте 5 переменных:
1. `PAYLOAD_SECRET`
2. `DATABASE_URI`
3. `NEXT_PUBLIC_SERVER_URL`
4. `PAYLOAD_PUBLIC_SERVER_URL`
5. `BLOB_READ_WRITE_TOKEN`

---

### 4️⃣ Деплой на Vercel

**→ [DEPLOYMENT.md](./DEPLOYMENT.md)** - полная инструкция по деплою

**→ [READY_FOR_PRODUCTION.md](./READY_FOR_PRODUCTION.md)** - чек-лист готовности

**Краткая версия:**
```bash
git push
# Vercel автоматически задеплоит!
```

---

## ⚡ Быстрый старт (для торопливых)

### Прямо сейчас:

```bash
# 1. Запустите проект
pnpm dev

# 2. Откройте админку
open http://localhost:3000/admin

# 3. Создайте первого пользователя
```

### Когда готовы к деплою:

1. **Откройте:** [VERCEL_QUICK_SETUP.txt](./VERCEL_QUICK_SETUP.txt)
2. **Скопируйте** все переменные в Vercel
3. **Запушьте** в GitHub
4. **Деплой** на Vercel
5. **Обновите** URL переменные после первого деплоя

---

## 🔍 Что где искать

### Нужна помощь с...

| Вопрос | Файл |
|--------|------|
| Как запустить локально? | [README.md](./README.md) |
| Как настроить Blob? | [BLOB_SETUP.md](./BLOB_SETUP.md) |
| Какие env переменные нужны? | [VERCEL_ENV_VARIABLES.md](./VERCEL_ENV_VARIABLES.md) |
| Как задеплоить на Vercel? | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Готов ли проект к production? | [READY_FOR_PRODUCTION.md](./READY_FOR_PRODUCTION.md) |
| Пошаговая инструкция | [VERCEL_STEP_BY_STEP.md](./VERCEL_STEP_BY_STEP.md) |

---

## 📋 Environment Variables (копируй отсюда)

Открыть: [VERCEL_QUICK_SETUP.txt](./VERCEL_QUICK_SETUP.txt)

Или прямо здесь:

```env
PAYLOAD_SECRET=Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1
DATABASE_URI=postgresql://neondb_owner:npg_GoZsct7l2Jre@ep-sparkling-sun-abf0z3iz-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require
NEXT_PUBLIC_SERVER_URL=https://ваш-проект.vercel.app
PAYLOAD_PUBLIC_SERVER_URL=https://ваш-проект.vercel.app
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_7qv5pUYFuSTNvFhz_bhzUTTNesAoSE6zrHaBln1M8ACuhNN
```

⚠️ **После первого деплоя замените URL на реальный!**

---

## 🎯 Типичный workflow

### День 1: Разработка
```bash
pnpm dev
# Работаете локально
# Файлы сохраняются в /media
```

### День 2: Готовность к деплою
1. Читаете [READY_FOR_PRODUCTION.md](./READY_FOR_PRODUCTION.md)
2. Создаете Blob Storage (см. [BLOB_SETUP.md](./BLOB_SETUP.md))
3. Готовите переменные (см. [VERCEL_QUICK_SETUP.txt](./VERCEL_QUICK_SETUP.txt))

### День 3: Деплой
1. Добавляете переменные в Vercel
2. Пушите в GitHub
3. Деплоите (см. [DEPLOYMENT.md](./DEPLOYMENT.md))
4. Обновляете URL переменные
5. Redeploy

### День 4+: Работа
```bash
git add .
git commit -m "New feature"
git push
# Автоматический деплой! 🚀
```

---

## ✅ Чек-лист перед деплоем

- [ ] Проект работает локально (`pnpm dev`)
- [ ] Созданы коллекции Users и Media
- [ ] Blob Storage создан в Vercel
- [ ] Все 5 env переменных скопированы
- [ ] Git репозиторий готов
- [ ] `.env` в `.gitignore`
- [ ] Прочитана документация
- [ ] Готов к деплою! 🚀

---

## 🆘 Проблемы?

1. Проверьте [VERCEL_STEP_BY_STEP.md](./VERCEL_STEP_BY_STEP.md) - раздел "Частые ошибки"
2. Убедитесь что все переменные окружения добавлены
3. Проверьте логи в Vercel Dashboard → Functions

---

## 📞 Полезные ссылки

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Blob Storage**: https://vercel.com/dashboard/stores
- **Neon Database**: https://neon.tech/app/projects
- **Payload CMS Docs**: https://payloadcms.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 🎉 Готово!

**Ваш проект полностью настроен и готов к работе!**

**Следующий шаг:**
```bash
pnpm dev
```

**Удачи! 🚀**

