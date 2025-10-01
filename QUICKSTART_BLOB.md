# ⚡ Быстрая настройка Blob Storage

## 🎯 Для локальной разработки (СЕЙЧАС)

**Ничего делать не нужно!** ✨

Файлы будут сохраняться в папку `/media` в вашем проекте.

```bash
# Запустите проект
pnpm dev

# Откройте админку
# http://localhost:3000/admin

# Попробуйте загрузить картинку в Media
# Она сохранится в /media/
```

**`BLOB_READ_WRITE_TOKEN` оставьте пустым в `.env`**

---

## 🚀 Для деплоя на Vercel (ПОТОМ)

### Шаг 1: Создайте Blob Storage
1. Зайдите на https://vercel.com/dashboard/stores
2. Нажмите **Create Database** → **Blob**
3. Название: `payload-media`
4. Нажмите **Create**

### Шаг 2: Подключите к проекту
1. Нажмите **Connect Project**
2. Выберите `payload-iwa360-ru`
3. **Connect**

### Шаг 3: Скопируйте токен
1. Вкладка **.env.local**
2. Скопируйте `BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...`

### Шаг 4: Добавьте в Vercel
1. Settings → Environment Variables
2. Add: `BLOB_READ_WRITE_TOKEN` = ваш токен
3. Выберите все окружения
4. Save

### Шаг 5: Redeploy
```bash
git push
```

**Готово! Файлы на production будут в Blob Storage!** ✅

---

## 📝 Итого

| Окружение | Хранилище | Настройка |
|-----------|-----------|-----------|
| 💻 Локально | `/media` папка | Ничего не нужно |
| ☁️ Vercel | Blob Storage | Нужен токен |

**Подробная инструкция: [BLOB_SETUP.md](./BLOB_SETUP.md)**

