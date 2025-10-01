# 🎯 Vercel Environment Variables - Пошаговая инструкция

## 📍 Шаг 1: Откройте Vercel Dashboard

1. Перейдите на https://vercel.com
2. Войдите в аккаунт
3. Выберите ваш проект **payload-iwa360-ru**

---

## ⚙️ Шаг 2: Откройте настройки переменных

```
Верхнее меню → Settings (⚙️) → Левое меню → Environment Variables
```

Или прямая ссылка:
```
https://vercel.com/[ваш-username]/payload-iwa360-ru/settings/environment-variables
```

---

## ➕ Шаг 3: Добавьте переменные (повторите 5-6 раз)

### Для КАЖДОЙ переменной ниже:

1. **Нажмите кнопку "Add New"** (справа сверху)

2. **Заполните форму:**

   ```
   ┌─────────────────────────────────────────┐
   │ Key                                     │
   │ ┌─────────────────────────────────────┐ │
   │ │ PAYLOAD_SECRET                      │ │ ← Скопируйте название
   │ └─────────────────────────────────────┘ │
   │                                         │
   │ Value                                   │
   │ ┌─────────────────────────────────────┐ │
   │ │ Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1    │ │ ← Скопируйте значение
   │ └─────────────────────────────────────┘ │
   │                                         │
   │ Environments                            │
   │ ☑ Production                            │ ← Все галочки!
   │ ☑ Preview                               │
   │ ☑ Development                           │
   │                                         │
   │          [Cancel]  [Save]               │ ← Нажмите Save
   └─────────────────────────────────────────┘
   ```

3. **Нажмите "Save"**

---

## 📋 Переменные для добавления

### 1/6: PAYLOAD_SECRET

```
Key: PAYLOAD_SECRET
Value: Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1
Environments: ☑ Production ☑ Preview ☑ Development
```

**Что это:** Секретный ключ для шифрования данных Payload CMS

---

### 2/6: DATABASE_URI

```
Key: DATABASE_URI
Value: postgresql://neondb_owner:npg_GoZsct7l2Jre@ep-sparkling-sun-abf0z3iz-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require
Environments: ☑ Production ☑ Preview ☑ Development
```

**Что это:** Строка подключения к PostgreSQL базе данных (Neon)

---

### 3/6: NEXT_PUBLIC_SERVER_URL

```
Key: NEXT_PUBLIC_SERVER_URL
Value: https://ваш-проект.vercel.app
Environments: ☑ Production ☑ Preview ☑ Development
```

**⚠️ ВАЖНО:** 
- Сначала можно указать временный URL
- После первого деплоя ОБЯЗАТЕЛЬНО обновите на реальный URL!

**Что это:** Публичный URL вашего приложения

---

### 4/6: PAYLOAD_PUBLIC_SERVER_URL

```
Key: PAYLOAD_PUBLIC_SERVER_URL
Value: https://ваш-проект.vercel.app
Environments: ☑ Production ☑ Preview ☑ Development
```

**⚠️ ВАЖНО:** Должен быть таким же как NEXT_PUBLIC_SERVER_URL!

**Что это:** URL для Payload CMS (для email, webhooks и т.д.)

---

### 5/6: BLOB_READ_WRITE_TOKEN

```
Key: BLOB_READ_WRITE_TOKEN
Value: vercel_blob_rw_7qv5pUYFuSTNvFhz_bhzUTTNesAoSE6zrHaBln1M8ACuhNN
Environments: ☑ Production ☑ Preview ☑ Development
```

**Что это:** Токен доступа к Vercel Blob Storage для загрузки файлов

**Где взять:**
1. https://vercel.com/dashboard/stores
2. Выберите ваш Blob Storage
3. Вкладка .env.local → скопируйте токен

---

### 6/6: NODE_ENV (опционально)

```
Key: NODE_ENV
Value: production
Environments: ☑ Production ТОЛЬКО! (без Preview и Development)
```

**Что это:** Режим работы Node.js

---

## ✅ Шаг 4: Проверка

После добавления всех переменных вы должны увидеть:

```
┌────────────────────────────────────────────────────────┐
│ Environment Variables                                  │
├────────────────────────────────────────────────────────┤
│                                                        │
│ PAYLOAD_SECRET               Production, Preview, ... │
│ DATABASE_URI                 Production, Preview, ... │
│ NEXT_PUBLIC_SERVER_URL       Production, Preview, ... │
│ PAYLOAD_PUBLIC_SERVER_URL    Production, Preview, ... │
│ BLOB_READ_WRITE_TOKEN        Production, Preview, ... │
│ NODE_ENV                     Production                │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Должно быть минимум 5 переменных!**

---

## 🚀 Шаг 5: Deploy!

Теперь можете деплоить проект:

### Вариант A: Первый деплой через GitHub

```bash
# В терминале на вашем компьютере
git add .
git commit -m "Ready for production"
git push
```

Затем:
1. https://vercel.com/new
2. Import Git Repository
3. Выберите ваш репозиторий
4. **Deploy!**

### Вариант B: Через Vercel CLI

```bash
vercel
```

---

## 🔄 Шаг 6: После первого деплоя (ВАЖНО!)

### 6.1 Получите реальный URL

После деплоя Vercel покажет:

```
✅ Deployment ready!

https://payload-iwa360-ru-abc123.vercel.app
```

**Скопируйте этот URL!**

### 6.2 Обновите переменные

1. Вернитесь в **Settings → Environment Variables**

2. Найдите `NEXT_PUBLIC_SERVER_URL`

3. Нажмите **Edit** (иконка карандаша)

4. Замените значение на реальный URL:
   ```
   https://payload-iwa360-ru-abc123.vercel.app
   ```

5. **Save**

6. То же самое для `PAYLOAD_PUBLIC_SERVER_URL`

### 6.3 Redeploy

```
Deployments → последний деплой → ... (три точки) → Redeploy
```

Или через CLI:
```bash
vercel --prod
```

---

## 🎉 Шаг 7: Проверка

1. **Откройте ваше приложение:**
   ```
   https://ваш-проект.vercel.app
   ```

2. **Откройте админ-панель:**
   ```
   https://ваш-проект.vercel.app/admin
   ```

3. **Создайте первого пользователя**

4. **Попробуйте загрузить файл в Media**

5. **Проверьте GraphQL Playground:**
   ```
   https://ваш-проект.vercel.app/api/graphql-playground
   ```

---

## 🐛 Частые ошибки

### ❌ "Build failed" при деплое

**Причина:** Не все переменные добавлены

**Решение:**
1. Проверьте что все 5-6 переменных добавлены
2. Проверьте что нет опечаток в названиях
3. Посмотрите логи билда

### ❌ "Database connection failed"

**Причина:** Неверный DATABASE_URI

**Решение:**
1. Проверьте что скопировали всю строку (с `?sslmode=require`)
2. Убедитесь что Neon Database активна
3. Проверьте что не истек пароль

### ❌ "Cannot upload files"

**Причина:** Проблема с BLOB_READ_WRITE_TOKEN

**Решение:**
1. Создайте Blob Storage в Vercel
2. Подключите к проекту
3. Получите новый токен
4. Обновите переменную
5. Redeploy

### ❌ Страница 404 после деплоя

**Причина:** Билд прошел, но роуты не работают

**Решение:**
1. Проверьте что `next.config.ts` правильный
2. Убедитесь что `withPayload()` применен
3. Проверьте логи функций в Vercel

---

## 📚 Справка

### Где что находится

| Что нужно | Где находится |
|-----------|---------------|
| Vercel Dashboard | https://vercel.com/dashboard |
| Environment Variables | Settings → Environment Variables |
| Blob Storage | https://vercel.com/dashboard/stores |
| Deployments | Верхнее меню → Deployments |
| Функции логи | Deployment → Functions |

### Полезные команды

```bash
# Деплой через CLI
vercel

# Production деплой
vercel --prod

# Посмотреть логи
vercel logs

# Открыть проект
vercel open
```

---

## ✅ Итоговый чеклист

Перед деплоем убедитесь:

- [ ] Все 5-6 переменных добавлены в Vercel
- [ ] Для каждой выбраны правильные Environments
- [ ] BLOB_READ_WRITE_TOKEN из вашего Blob Storage
- [ ] DATABASE_URI содержит `?sslmode=require`
- [ ] Blob Storage создан и подключен к проекту
- [ ] Git репозиторий запушен
- [ ] После первого деплоя обновлены URL переменные
- [ ] Проект передеплоен с правильными URL

**Готово к production! 🚀**

