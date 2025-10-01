# 📦 Настройка Vercel Blob Storage - Пошаговая инструкция

## 🎯 Два варианта работы

### ✅ Локальная разработка (без Blob)
- Файлы сохраняются в папку `/media`
- Не требует настройки Blob Storage
- **BLOB_READ_WRITE_TOKEN** оставить пустым в `.env`

### ✅ Production (с Blob)
- Файлы сохраняются в Vercel Blob Storage
- Требует настройки на Vercel
- **BLOB_READ_WRITE_TOKEN** обязателен

---

## 🚀 Настройка Vercel Blob Storage для Production

### Шаг 1: Создайте проект на Vercel (если еще не создан)

```bash
# Вариант A: Через веб-интерфейс
1. Перейдите на https://vercel.com/new
2. Импортируйте ваш GitHub репозиторий
3. Нажмите Deploy

# Вариант B: Через CLI
vercel
```

### Шаг 2: Создайте Blob Storage

#### 2.1 Откройте Vercel Dashboard

1. Перейдите на https://vercel.com/dashboard
2. Выберите ваш проект `payload-iwa360-ru`

#### 2.2 Перейдите в Storage

1. В меню проекта найдите вкладку **Storage**
2. Или перейдите напрямую: https://vercel.com/dashboard/stores

#### 2.3 Создайте Blob

1. Нажмите кнопку **Create Database**
2. Выберите **Blob** (иконка с облаком)
3. В поле Name введите: `payload-media`
4. Нажмите **Create**

#### 2.4 Подключите к проекту

1. После создания откроется страница Blob Storage
2. Нажмите **Connect Project**
3. Выберите ваш проект `payload-iwa360-ru`
4. Нажмите **Connect**

### Шаг 3: Получите токен доступа

#### 3.1 Откройте вкладку .env.local

На странице Blob Storage:
1. Найдите вкладку **.env.local** (в верхнем меню)
2. Там будет показан токен

#### 3.2 Скопируйте токен

Вы увидите что-то вроде:
```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXXXXXXXXXXXXXXXXXXXXXXXX
```

**Скопируйте значение токена** (часть после `=`)

### Шаг 4: Добавьте токен в переменные окружения

#### 4.1 В Vercel Dashboard

1. Перейдите в настройки проекта: **Settings → Environment Variables**
2. Нажмите **Add New**
3. Заполните:
   - **Key**: `BLOB_READ_WRITE_TOKEN`
   - **Value**: `vercel_blob_rw_XXXXXXXXXXXXXXXXXXXXXXXXX` (ваш токен)
   - **Environments**: Выберите все (Production, Preview, Development)
4. Нажмите **Save**

#### 4.2 Для локального тестирования (опционально)

Если хотите тестировать Blob локально, добавьте в `.env`:

```bash
# Откройте .env
nano .env

# Добавьте строку:
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXXXXXXXXXXXXXXXXXXXXXXXX
```

**⚠️ Внимание:** `.env` в `.gitignore`, токен не попадет в Git!

### Шаг 5: Передеплойте проект

После добавления переменных окружения:

#### Вариант A: Через Dashboard

1. В Vercel Dashboard → **Deployments**
2. Найдите последний деплой
3. Нажмите **⋯** (три точки) → **Redeploy**

#### Вариант B: Через Git

```bash
git add .
git commit -m "Add Blob Storage configuration"
git push
```

Vercel автоматически задеплоит!

### Шаг 6: Проверьте работу

1. Откройте админ-панель: `https://your-app.vercel.app/admin`
2. Войдите в систему
3. Перейдите в **Media**
4. Попробуйте загрузить изображение
5. Если загрузка прошла успешно — всё работает! ✅

---

## 🔍 Проверка настройки

### Проверка переменных окружения

```bash
# В Vercel Dashboard → Settings → Environment Variables
# Должны быть все переменные:

✅ PAYLOAD_SECRET
✅ DATABASE_URI
✅ NEXT_PUBLIC_SERVER_URL
✅ BLOB_READ_WRITE_TOKEN  ← Эта важна для загрузки файлов!
```

### Проверка Blob Storage

В Vercel Dashboard → Storage → Blob:

- ✅ Blob Storage создан
- ✅ Подключен к проекту
- ✅ Токен скопирован
- ✅ Переменная окружения добавлена

---

## 📊 Мониторинг и использование

### Просмотр загруженных файлов

1. Vercel Dashboard → Storage → Blob
2. Выберите ваш Blob Storage
3. Вкладка **Browse** — все загруженные файлы

### Статистика использования

1. Vercel Dashboard → Storage → Blob
2. Вкладка **Usage**
   - Объем хранилища
   - Трафик передачи

### Лимиты Free Tier

- **Хранилище**: 1 GB
- **Передача**: 100 GB/месяц
- **Запросы**: Безлимитно

---

## 🐛 Troubleshooting

### ❌ Ошибка: "BLOB_READ_WRITE_TOKEN is not defined"

**Причина:** Токен не добавлен в переменные окружения

**Решение:**
1. Проверьте Vercel Dashboard → Settings → Environment Variables
2. Добавьте `BLOB_READ_WRITE_TOKEN`
3. Передеплойте проект

### ❌ Ошибка при загрузке файла

**Причина:** Blob Storage не подключен к проекту

**Решение:**
1. Vercel Dashboard → Storage → Blob
2. Найдите ваш Blob Storage
3. Нажмите **Connect Project**
4. Выберите ваш проект

### ❌ Файлы загружаются локально вместо Blob

**Причина:** `BLOB_READ_WRITE_TOKEN` пустой

**Решение:**
- Это нормально для локальной разработки!
- Файлы сохраняются в `/media`
- На production с токеном будет работать Blob

### ❌ 403 Forbidden при доступе к файлам

**Причина:** Неверный токен

**Решение:**
1. Получите новый токен из Blob Storage
2. Обновите `BLOB_READ_WRITE_TOKEN`
3. Передеплойте

---

## 🔄 Миграция существующих файлов

Если у вас уже есть файлы в `/media`:

### Вариант 1: Ручная загрузка

1. Войдите в админ-панель на production
2. Загрузите файлы через Media

### Вариант 2: Через API (скрипт)

```typescript
// migrate-to-blob.ts
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'

async function migrate() {
  const payload = await getPayload({ config: './payload.config.ts' })
  
  const mediaDir = './media'
  const files = fs.readdirSync(mediaDir)
  
  for (const file of files) {
    const filePath = path.join(mediaDir, file)
    const fileBuffer = fs.readFileSync(filePath)
    
    await payload.create({
      collection: 'media',
      data: {
        alt: file,
      },
      file: {
        data: fileBuffer,
        mimetype: 'image/jpeg', // Определите правильный mimetype
        name: file,
        size: fileBuffer.length,
      },
    })
  }
  
  console.log('Migration complete!')
}

migrate()
```

---

## 💡 Рекомендации

### Для локальной разработки
- ✅ Оставьте `BLOB_READ_WRITE_TOKEN` пустым
- ✅ Файлы будут в `/media` (удобно для отладки)

### Для production
- ✅ Обязательно настройте Blob Storage
- ✅ Добавьте токен в переменные окружения
- ✅ Проверьте работу после деплоя

### Для preview deployments
- ✅ Vercel автоматически использует тот же Blob Storage
- ✅ Файлы доступны во всех окружениях

---

## 📚 Полезные ссылки

- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [Payload Storage Plugin](https://payloadcms.com/docs/upload/overview)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ Чеклист настройки

- [ ] Создан Blob Storage в Vercel
- [ ] Blob подключен к проекту
- [ ] Токен скопирован
- [ ] `BLOB_READ_WRITE_TOKEN` добавлен в переменные окружения Vercel
- [ ] Проект передеплоен
- [ ] Проверена загрузка файлов через админ-панель
- [ ] Проверен доступ к загруженным файлам

**Готово! Ваш Blob Storage настроен! 🎉**

