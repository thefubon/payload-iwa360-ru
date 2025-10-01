# 🔐 Environment Variables для Vercel

## 📋 Копируйте эти переменные в Vercel Dashboard

### Где добавлять:

1. Откройте ваш проект на Vercel
2. **Settings** (в верхнем меню)
3. **Environment Variables** (слева в меню)
4. Нажмите **Add New**

---

## ✅ Переменные для добавления

### 1. PAYLOAD_SECRET

**Key:**
```
PAYLOAD_SECRET
```

**Value:**
```
Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1
```

**Environments:** ✅ Production ✅ Preview ✅ Development

---

### 2. DATABASE_URI

**Key:**
```
DATABASE_URI
```

**Value:**
```
postgresql://neondb_owner:npg_GoZsct7l2Jre@ep-sparkling-sun-abf0z3iz-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require
```

**Environments:** ✅ Production ✅ Preview ✅ Development

---

### 3. NEXT_PUBLIC_SERVER_URL

**Key:**
```
NEXT_PUBLIC_SERVER_URL
```

**Value (ИЗМЕНИТЕ на ваш домен!):**
```
https://ваш-проект.vercel.app
```

⚠️ **ВАЖНО:** После первого деплоя Vercel даст вам URL типа `https://payload-iwa360-ru.vercel.app`

**Как узнать URL:**
1. После деплоя откройте Deployments
2. Скопируйте Domain (например: `payload-iwa360-ru.vercel.app`)
3. Используйте: `https://payload-iwa360-ru.vercel.app` (с https://)

**Environments:** ✅ Production ✅ Preview ✅ Development

---

### 4. PAYLOAD_PUBLIC_SERVER_URL

**Key:**
```
PAYLOAD_PUBLIC_SERVER_URL
```

**Value (такой же как NEXT_PUBLIC_SERVER_URL):**
```
https://ваш-проект.vercel.app
```

**Environments:** ✅ Production ✅ Preview ✅ Development

---

### 5. BLOB_READ_WRITE_TOKEN

**Key:**
```
BLOB_READ_WRITE_TOKEN
```

**Value:**
```
vercel_blob_rw_7qv5pUYFuSTNvFhz_bhzUTTNesAoSE6zrHaBln1M8ACuhNN
```

⚠️ **ВАЖНО:** Этот токен должен быть из Vercel Blob Storage, который вы создали.

Если вы еще не создали Blob Storage:
1. https://vercel.com/dashboard/stores
2. Create Database → Blob
3. Скопируйте токен из вкладки .env.local

**Environments:** ✅ Production ✅ Preview ✅ Development

---

### 6. NODE_ENV (опционально)

**Key:**
```
NODE_ENV
```

**Value:**
```
production
```

**Environments:** ✅ Production только!

---

## 📸 Пошаговая инструкция с скриншотами

### Шаг 1: Откройте Environment Variables

```
Vercel Dashboard → Ваш проект → Settings → Environment Variables
```

### Шаг 2: Добавьте каждую переменную

Для каждой переменной выше:

1. Нажмите **"Add New"**
2. **Key**: скопируйте название (например, `PAYLOAD_SECRET`)
3. **Value**: скопируйте значение
4. **Environments**: выберите все три галочки:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
5. Нажмите **"Save"**

### Шаг 3: После добавления всех переменных

Должно быть **6 переменных** (или 5, если NODE_ENV пропустили):

- ✅ PAYLOAD_SECRET
- ✅ DATABASE_URI
- ✅ NEXT_PUBLIC_SERVER_URL
- ✅ PAYLOAD_PUBLIC_SERVER_URL
- ✅ BLOB_READ_WRITE_TOKEN
- ✅ NODE_ENV (опционально)

---

## 🔄 После первого деплоя

### Обновите URL переменные

1. После деплоя Vercel даст вам URL (например: `https://payload-iwa360-ru-abc123.vercel.app`)

2. Вернитесь в **Settings → Environment Variables**

3. Найдите `NEXT_PUBLIC_SERVER_URL` и нажмите **Edit**

4. Замените на реальный URL: `https://payload-iwa360-ru-abc123.vercel.app`

5. То же самое для `PAYLOAD_PUBLIC_SERVER_URL`

6. Нажмите **Save**

7. **Redeploy** проект:
   - Deployments → последний деплой → ... (три точки) → Redeploy

---

## 📋 Быстрая копипаста для Vercel

Для удобства вот все переменные списком:

```env
# 1. Payload Secret
PAYLOAD_SECRET=Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1

# 2. Database
DATABASE_URI=postgresql://neondb_owner:npg_GoZsct7l2Jre@ep-sparkling-sun-abf0z3iz-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require

# 3. Server URL (ИЗМЕНИТЕ после первого деплоя!)
NEXT_PUBLIC_SERVER_URL=https://ваш-проект.vercel.app

# 4. Payload Server URL (такой же как выше)
PAYLOAD_PUBLIC_SERVER_URL=https://ваш-проект.vercel.app

# 5. Blob Storage Token
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_7qv5pUYFuSTNvFhz_bhzUTTNesAoSE6zrHaBln1M8ACuhNN

# 6. Node Environment (только для Production)
NODE_ENV=production
```

---

## ⚠️ Важные замечания

### 1. NEXT_PUBLIC_* переменные

Переменные с префиксом `NEXT_PUBLIC_` доступны в браузере!
- НЕ добавляйте в них секретные данные
- Они встраиваются в JavaScript bundle

### 2. Разные URL для Preview

Для Preview deployments Vercel автоматически использует preview URL.
Можно добавить отдельные значения для Preview, если нужно.

### 3. Blob Token

Убедитесь что Blob Storage:
- ✅ Создан в Vercel Dashboard
- ✅ Подключен к вашему проекту
- ✅ Токен актуален

### 4. Database Connection

Убедитесь что Neon Database:
- ✅ Активна (не в sleep mode)
- ✅ Разрешает подключения извне
- ✅ SSL включен (`sslmode=require`)

---

## 🐛 Troubleshooting

### Ошибка: "PAYLOAD_SECRET is required"

**Решение:** Добавьте `PAYLOAD_SECRET` в Environment Variables

### Ошибка: "Database connection failed"

**Решение:** 
1. Проверьте `DATABASE_URI`
2. Убедитесь что Neon Database активна
3. Проверьте что строка подключения правильная

### Ошибка: "BLOB_READ_WRITE_TOKEN is not defined"

**Решение:**
1. Создайте Blob Storage
2. Получите токен
3. Добавьте в Environment Variables
4. Redeploy

### Build failed

**Решение:**
1. Проверьте что ВСЕ переменные добавлены
2. Проверьте что нет опечаток в именах переменных
3. Посмотрите логи билда в Vercel

---

## ✅ Финальная проверка

Перед деплоем убедитесь:

- [ ] Все 5-6 переменных добавлены
- [ ] Для каждой выбраны все Environments
- [ ] URL переменные начинаются с `https://`
- [ ] BLOB_READ_WRITE_TOKEN начинается с `vercel_blob_rw_`
- [ ] DATABASE_URI содержит `?sslmode=require` в конце

**Готово! Теперь можно деплоить! 🚀**

