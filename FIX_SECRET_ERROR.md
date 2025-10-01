# 🔧 Исправление ошибки SECRET KEY на Vercel

## ❌ Типичная ошибка:

```
Error: PAYLOAD_SECRET is required
Error: A Payload secret key is required
```

или

```
Build failed
Missing environment variable: PAYLOAD_SECRET
```

---

## ✅ БЫСТРОЕ РЕШЕНИЕ (3 минуты)

### Шаг 1: Зайдите в настройки Vercel

```
https://vercel.com/dashboard
→ Выберите ваш проект (payload-iwa360-ru)
→ Settings (верхнее меню)
→ Environment Variables (левое меню)
```

### Шаг 2: Проверьте наличие PAYLOAD_SECRET

Ищите переменную с именем **PAYLOAD_SECRET**

#### ❌ Если её НЕТ:

Нажмите **"Add New"** и добавьте:

```
Key: PAYLOAD_SECRET
Value: Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1
Environments: ☑ Production ☑ Preview ☑ Development
```

Нажмите **Save**

#### ⚠️ Если она ЕСТЬ, но с ошибкой:

Проверьте:
1. **Название точное:** `PAYLOAD_SECRET` (без пробелов, правильный регистр)
2. **Значение не пустое:** должно быть `Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1`
3. **Environments выбраны:** все три галочки
4. **Нет кавычек:** просто `Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1` (без `"` или `'`)

Если есть ошибки:
- Нажмите **Edit** (иконка карандаша)
- Исправьте
- **Save**

### Шаг 3: Redeploy

После добавления/исправления переменной:

**Вариант A: Через Dashboard**
```
Deployments → последний деплой → ... (три точки) → Redeploy
```

**Вариант B: Через Git**
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

---

## 🔍 Проверка всех обязательных переменных

В Vercel должны быть **минимум 5 переменных:**

```
✅ PAYLOAD_SECRET                 = Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1
✅ DATABASE_URI                    = postgresql://neondb_owner:...
✅ NEXT_PUBLIC_SERVER_URL          = https://your-app.vercel.app
✅ PAYLOAD_PUBLIC_SERVER_URL       = https://your-app.vercel.app
✅ BLOB_READ_WRITE_TOKEN           = vercel_blob_rw_...
```

### Проверьте каждую:

1. **PAYLOAD_SECRET**
   - ✅ Должен быть точно: `PAYLOAD_SECRET` (не `PAYLOAD-SECRET` или `PayloadSecret`)
   - ✅ Значение: `Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1`
   - ✅ Без кавычек и пробелов

2. **DATABASE_URI**
   - ✅ Полная строка с паролем
   - ✅ Заканчивается на `?sslmode=require`

3. **NEXT_PUBLIC_SERVER_URL**
   - ✅ Начинается с `https://`
   - ✅ Без слэша в конце

4. **PAYLOAD_PUBLIC_SERVER_URL**
   - ✅ Такой же как NEXT_PUBLIC_SERVER_URL

5. **BLOB_READ_WRITE_TOKEN**
   - ✅ Начинается с `vercel_blob_rw_`

---

## 🐛 Частые ошибки

### ❌ Ошибка 1: Кавычки в значении

**Неправильно:**
```
Value: "Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1"
```

**Правильно:**
```
Value: Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1
```

### ❌ Ошибка 2: Неправильное название

**Неправильно:**
```
PAYLOAD-SECRET
PayloadSecret
payload_secret
```

**Правильно:**
```
PAYLOAD_SECRET
```

### ❌ Ошибка 3: Не выбраны Environments

Убедитесь что выбраны **ВСЕ ТРИ галочки:**
- ☑️ Production
- ☑️ Preview
- ☑️ Development

### ❌ Ошибка 4: Пробелы в начале/конце

**Неправильно:**
```
Value:  Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1   
       ↑ пробел                        ↑ пробел
```

**Правильно:**
```
Value: Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1
```

---

## 📸 Скриншот правильной настройки

```
┌───────────────────────────────────────────────────┐
│ Add New Environment Variable                      │
├───────────────────────────────────────────────────┤
│                                                   │
│ Key                                               │
│ ┌───────────────────────────────────────────────┐ │
│ │ PAYLOAD_SECRET                                │ │
│ └───────────────────────────────────────────────┘ │
│                                                   │
│ Value                                             │
│ ┌───────────────────────────────────────────────┐ │
│ │ Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1              │ │
│ └───────────────────────────────────────────────┘ │
│                                                   │
│ Environments                                      │
│ ☑ Production                                      │
│ ☑ Preview                                         │
│ ☑ Development                                     │
│                                                   │
│              [Cancel]  [Save]                     │
└───────────────────────────────────────────────────┘
```

---

## 🔄 После исправления

1. **Сохраните** переменную (кнопка Save)
2. **Подождите** 2-3 секунды (Vercel сохранит)
3. **Redeploy** проект
4. **Подождите** завершения билда (1-3 минуты)
5. **Проверьте** что деплой успешен ✅

---

## 📋 Чек-лист исправления

- [ ] Зашел в Vercel Dashboard
- [ ] Открыл Settings → Environment Variables
- [ ] Проверил PAYLOAD_SECRET
- [ ] Название точное: `PAYLOAD_SECRET`
- [ ] Значение правильное: `Z64PvEeEFpVSWoqqqUs57hcn4VPH1VQ1`
- [ ] Нет кавычек и пробелов
- [ ] Выбраны все 3 Environments
- [ ] Нажал Save
- [ ] Сделал Redeploy
- [ ] Деплой прошел успешно! ✅

---

## 🆘 Если всё равно не работает

### 1. Проверьте логи билда

```
Vercel Dashboard → Deployments → последний деплой → View Function Logs
```

Найдите точный текст ошибки и покажите его.

### 2. Попробуйте удалить и создать заново

1. Удалите переменную PAYLOAD_SECRET (если есть)
2. Создайте новую точно как в инструкции выше
3. Redeploy

### 3. Проверьте payload.config.ts

Убедитесь что в коде есть:
```typescript
secret: process.env.PAYLOAD_SECRET || '',
```

### 4. Полный список переменных

Добавьте ВСЕ переменные из файла VERCEL_QUICK_SETUP.txt

---

## ✅ Должно заработать!

После правильного добавления PAYLOAD_SECRET деплой должен пройти успешно!

**Удачи! 🚀**

