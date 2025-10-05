# 🔍 Как работает поиск - подробное объяснение

## Что индексируется

Поиск работает **ПО ВСЕМУ** контенту страниц:

### 1. ✅ Поля самой страницы (коллекция Pages)

```typescript
const titleText = page.title || ''           // Заголовок страницы
const descriptionText = page.description || ''  // Описание страницы
```

**Пример:**
- Страница с `title: "Мессенджер"` и `description: "Быстрая коммуникация"`
- Поиск "месс" → ✅ найдет
- Поиск "коммуникация" → ✅ найдет

### 2. ✅ Hero блоки

```typescript
if (block.blockType === 'hero') {
  blockText += ` ${block.title || ''} ${block.description || ''}`
  
  // Добавляем текст из бейджей
  if (block.badges) {
    block.badges.forEach((badge) => {
      blockText += ` ${badge.label || ''}`
    })
  }
}
```

**Что индексируется в Hero блоке:**
- `title` - заголовок блока
- `description` - описание блока
- `badges[].label` - текст всех бейджей

**Пример:**
- Hero блок с:
  - `title: "Мессенджер IWA360"`
  - `description: "Корпоративная коммуникация"`
  - badges: `["Встречи", "Вебинары", "Чат"]`
- Поиск "месс" → ✅ найдет
- Поиск "корпоративная" → ✅ найдет
- Поиск "встречи" → ✅ найдет
- Поиск "вебинары" → ✅ найдет

### 3. ✅ Form блоки

```typescript
if (block.blockType === 'form') {
  blockText += ` ${block.title || ''} ${block.description || ''}`
}
```

**Что индексируется:**
- `title` - заголовок формы
- `description` - описание формы

**Пример:**
- Form блок с:
  - `title: "Свяжитесь с нами"`
  - `description: "Оставьте заявку на консультацию"`
- Поиск "свяжитесь" → ✅ найдет
- Поиск "консультацию" → ✅ найдет

## Алгоритм поиска

### Шаг 1: Загрузка страниц

```typescript
const pagesResult = await payload.find({
  collection: 'pages',
  limit: 100,
})
```

Загружаем **все** страницы (до 100) из базы данных.

### Шаг 2: Извлечение текста

Для каждой страницы:

```typescript
// 1. Берем заголовок и описание страницы
const titleText = page.title || ''
const descriptionText = page.description || ''

// 2. Извлекаем текст из блоков
let blockText = ''
page.layout?.forEach((block) => {
  if (block.blockType === 'hero') {
    blockText += ` ${block.title} ${block.description}`
    block.badges?.forEach((badge) => {
      blockText += ` ${badge.label}`
    })
  }
  if (block.blockType === 'form') {
    blockText += ` ${block.title} ${block.description}`
  }
})

// 3. Объединяем ВСЁ в один текст
const allText = `${titleText} ${descriptionText} ${blockText}`
```

### Шаг 3: Проверка совпадения

```typescript
const queryLower = query.toLowerCase()
const allTextLower = allText.toLowerCase()

const hasMatch = allTextLower.includes(queryLower)
```

Проверяем, содержится ли поисковый запрос **где-то** в объединенном тексте.

### Шаг 4: Создание snippet (превью)

Определяем **где** найдено и создаем контекстный preview:

```typescript
// Приоритет:
if (titleText.toLowerCase().includes(queryLower)) {
  // Найдено в заголовке страницы
  matchSource = 'title'
  snippet = descriptionText
} 
else if (descriptionText.toLowerCase().includes(queryLower)) {
  // Найдено в описании страницы
  matchSource = 'description'
  snippet = "...текст вокруг найденного..."
}
else if (blockText.toLowerCase().includes(queryLower)) {
  // Найдено в блоках
  matchSource = 'block'
  snippet = "...текст вокруг найденного..."
}
```

## Примеры работы

### Пример 1: Страница с Hero блоком

**Структура страницы:**
```json
{
  "title": "Messenger",
  "slug": "messenger",
  "description": "Корпоративный мессенджер для бизнеса",
  "layout": [
    {
      "blockType": "hero",
      "title": "Мессенджер IWA360",
      "description": "Безопасная коммуникация внутри компании",
      "badges": [
        { "label": "Встречи" },
        { "label": "Вебинары" },
        { "label": "Чат" }
      ]
    }
  ]
}
```

**Извлеченный текст для поиска:**
```
"Messenger Корпоративный мессенджер для бизнеса Мессенджер IWA360 Безопасная коммуникация внутри компании Встречи Вебинары Чат"
```

**Что найдет:**
- "месс" → ✅ (Messenger, Мессенджер, мессенджер)
- "корпоративный" → ✅ (в description)
- "iwa360" → ✅ (в Hero title)
- "безопасная" → ✅ (в Hero description)
- "встречи" → ✅ (в бейдже)
- "вебинары" → ✅ (в бейдже)
- "чат" → ✅ (в бейдже)
- "коммуникация" → ✅ (в Hero description)

### Пример 2: Страница только с title и description

**Структура:**
```json
{
  "title": "О компании",
  "slug": "about",
  "description": "Мы разрабатываем корпоративные решения для бизнеса",
  "layout": []
}
```

**Извлеченный текст:**
```
"О компании Мы разрабатываем корпоративные решения для бизнеса"
```

**Что найдет:**
- "компании" → ✅ (в title)
- "разрабатываем" → ✅ (в description)
- "корпоративные" → ✅ (в description)
- "решения" → ✅ (в description)

### Пример 3: Комбинированная страница

**Структура:**
```json
{
  "title": "Услуги",
  "description": "Полный спектр IT-услуг",
  "layout": [
    {
      "blockType": "hero",
      "title": "Консультации",
      "description": "Экспертная помощь"
    },
    {
      "blockType": "form",
      "title": "Заявка на услугу",
      "description": "Оставьте контакты"
    }
  ]
}
```

**Извлеченный текст:**
```
"Услуги Полный спектр IT-услуг Консультации Экспертная помощь Заявка на услугу Оставьте контакты"
```

**Что найдет:**
- "услуг" → ✅ (в title и description)
- "консультации" → ✅ (в Hero)
- "заявка" → ✅ (в Form)
- "контакты" → ✅ (в Form)

## Важные особенности

### ✅ Регистронезависимый поиск

```typescript
const queryLower = query.toLowerCase()
const allTextLower = allText.toLowerCase()
```

"Месс", "месс", "МЕСС", "МеСс" - все найдут одинаковые результаты.

### ✅ Частичное совпадение

```typescript
allTextLower.includes(queryLower)
```

- "месс" найдет "Мессенджер"
- "консульт" найдет "консультации"
- "веб" найдет "Вебинары"

### ✅ Контекстный snippet

Показывает текст **вокруг** найденного совпадения:

```typescript
const start = Math.max(0, queryPosition - 50)
const end = Math.min(text.length, queryPosition + query.length + 50)
```

**Пример:**
- Запрос: "безопасная"
- Snippet: "...Мессенджер IWA360 Безопасная коммуникация внутри компании Встречи..."

### ✅ Приоритет источников

1. **Заголовок страницы** (самый важный)
2. **Описание страницы**
3. **Содержимое блоков**

## Отладка

В консоли сервера вы увидите:

```bash
🔍 Поиск: "месс" | Всего страниц: 12
✅ Найдено в: "Messenger" | Источник: title=true, desc=true, blocks=true
✅ Найдено в: "Услуги" | Источник: title=false, desc=false, blocks=true
📊 Результаты: найдено 2 совпадений
```

Это поможет понять:
- Сколько страниц в базе
- Где именно найдено совпадение
- Сколько результатов вернулось

## Резюме

Поиск работает **по всему** контенту:
- ✅ Заголовки страниц
- ✅ Описания страниц
- ✅ Hero блоки (title, description, badges)
- ✅ Form блоки (title, description)
- ✅ Регистронезависимый
- ✅ Частичное совпадение
- ✅ Контекстные превью

Если что-то не находится - проверьте:
1. Есть ли контент в базе данных?
2. Правильно ли написан запрос?
3. Смотрите логи в консоли сервера

