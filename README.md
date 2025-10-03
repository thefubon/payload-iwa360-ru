# Payload IVA360 RU

Проект на базе **Payload CMS 3.58** + **Next.js 15** + **PostgreSQL (Neon)** + **Vercel Blob Storage**

## 📑 Содержание

- [🚀 Быстрый старт](#-быстрый-старт)
- [✨ Основные возможности](#-основные-возможности)
- [📝 Коллекции и настройки](#-доступные-коллекции-и-глобальные-настройки)
- [📖 Как использовать](#-как-использовать)
- [🌐 Deployment на Vercel](#-production-deployment-на-vercel)
- [📦 Добавление коллекций](#-добавление-новых-коллекций)
- [🎉 История версий](https://github.com/thefubon/payload-iwa360-ru/releases)

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
pnpm install
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
PORT=3000
HOSTNAME=localhost

# Database
DATABASE_URI=postgresql://user:password@host/database?sslmode=require

# Payload CMS
PAYLOAD_SECRET=your-secret-key-here

# Server URLs
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Vercel Blob Storage (обязательно!)
PAYLOAD_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx

# Basic Auth для защиты админки на production
BASIC_AUTH_USER=login
BASIC_AUTH_PASSWORD=password
```

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
│   │   ├── [slug]/         # Динамические страницы
│   │   │   └── page.tsx    # Шаблон страницы с рендером блоков
│   │   ├── layout.tsx      # Layout с Header и SEO
│   │   └── page.tsx        # Главная страница
│   ├── (payload)/          # Payload CMS (авто-генерация)
│   │   ├── admin/          # Админ панель
│   │   └── api/            # API routes
│   └── robots.ts           # robots.txt (disallow: /)
├── blocks/                 # Блоки конструктора страниц ⭐
│   ├── Hero.ts            # Hero блок (определение полей)
│   └── index.ts           # Экспорт всех блоков
├── collections/            # Коллекции данных
│   ├── Users.ts           # Пользователи
│   ├── Media.ts           # Медиа файлы
│   └── Pages.ts           # Страницы с конструктором блоков
├── components/            # React компоненты
│   ├── blocks/           # Компоненты блоков ⭐
│   │   └── HeroBlock.tsx # Hero блок (рендер)
│   ├── RenderBlocks.tsx  # Рендер всех блоков
│   ├── Header.tsx        # Навигация с активными состояниями
│   └── ui/               # UI компоненты (shadcn/ui)
│       ├── button.tsx
│       └── navigation-menu.tsx
├── globals/              # Глобальные настройки
│   └── Settings.ts      # Настройки сайта (логотип, меню, title)
├── public/               # Статические файлы
│   ├── fonts/           # Кастомные шрифты (GuarujaNeue)
│   └── img/             # Изображения и SVG
├── styles/              # Стили
│   └── globals.css     # Глобальные стили + шрифты
├── types/               # TypeScript типы
│   ├── blocks.ts       # Типы для блоков конструктора ⭐
│   ├── components.ts   # Типы для компонентов
│   ├── pages.ts        # Типы для страниц
│   └── payload.ts      # Типы для Payload
├── payload.config.ts   # Конфигурация Payload
├── next.config.ts     # Конфигурация Next.js + SEO
├── middleware.ts      # Защита админки (Basic Auth)
└── .env              # Переменные окружения
```

## 🔧 Технологии

- **Framework**: Next.js 15.5.4 (App Router)
- **CMS**: Payload CMS 3.58.0
- **Database**: PostgreSQL (Neon Cloud)
- **Storage**: Vercel Blob Storage
- **Rich Text**: Lexical Editor
- **Styling**: Tailwind CSS 4
- **Images**: Sharp + Next.js Image Optimization
- **API**: REST + GraphQL
- **UI Components**: shadcn/ui + Radix UI

## ✨ Основные возможности

### 🎯 Система управления страницами
- **Создание страниц** через админ-панель без кода
- **Конструктор страниц** с блоками (Hero и другие)
- **Динамическая генерация** маршрутов на основе slug
- **SEO-friendly URLs** с автоматическим форматированием
- **Предпросмотр** на главной странице в виде карточек

### 🧱 Конструктор блоков страниц ⭐ НОВОЕ
- **Hero блок** - эффектный баннер с изображением и CTA
  - 🎨 **Настройки фона:**
    - Выбор цвета из палитры Tailwind (50+ оттенков)
    - Двухслойный фон: сплошной цвет + градиент
    - Адаптивный градиент (desktop/mobile)
  - 📝 **Контент:**
    - Заголовок и описание с поддержкой HTML entities (`&nbsp;`)
    - Выбор цвета текста (foreground/background)
  - 🖼️ **Изображение:**
    - Адаптивная загрузка без обрезки (object-contain)
    - Оптимизация для всех экранов
  - 🎯 **Кнопка:**
    - 6 вариантов стилей (shadcn/ui: default, outline, destructive и т.д.)
    - Кастомный цвет фона и текста (HEX)
    - 80+ иконок из Lucide (стрелки, действия, социальные и т.д.)
  - 📱 **Мобильная адаптация:**
    - Inverse layout (картинка сверху, контент снизу)
    - Контент слева, кнопка 100% ширины
    - Адаптивный градиент и декоративная линия
  - ✨ **Декор:**
    - SVG линия с адаптивным масштабированием
    - Скругленные углы (rounded-2xl)
- **Легко расширяемая** архитектура для добавления новых блоков

### 🧭 Умная навигация
- **Активное состояние** для текущей страницы
- **Поддержка выпадающих меню** с иконками и описаниями
- **Автоматическая нормализация URL** (работает с `/slug` и `slug`)
- **Sticky header** с размытием фона
- **Адаптивный дизайн** для мобильных устройств

### 🎨 Компоненты UI
- **Header** - навигационное меню с активными состояниями
- **Navigation Menu** - выпадающие меню (Radix UI)
- **Button** - кнопки с вариантами стилей
- **Типизированные компоненты** с полной поддержкой TypeScript
- **Кастомный шрифт GuarujaNeue** для всех заголовков (H1-H6)

### 📱 Адаптивный дизайн
- Мобильная навигация (бургер-меню)
- Гибкая сетка для контента
- Оптимизация изображений для разных экранов
- Responsive блоки с mobile-first подходом
- Адаптивные градиенты и декоративные элементы

## 📝 Доступные коллекции и глобальные настройки

### 📦 Коллекции

#### Users (Пользователи)
- Аутентификация включена
- Поля: email, name, role (admin/user)
- REST: `/api/users`
- GraphQL: доступно через playground

#### Media (Медиа файлы)
- Загрузка изображений, PDF, видео
- Автоматическая генерация размеров (thumbnail, card, tablet)
- WebP оптимизация (качество 80%)
- **Хранение: Vercel Blob Storage** (и localhost, и production)
- REST: `/api/media`

#### Pages (Страницы) ⭐ НОВОЕ
- **Группа:** Контент
- **Поля:**
  - `title` - Заголовок страницы
  - `slug` - URL страницы (автоматическое форматирование)
  - `description` - Описание/контент страницы
  - `layout` - **Конструктор блоков** (blocks)
- **Функционал:**
  - ✅ Уникальные URL (slug)
  - ✅ Автоматическое форматирование slug
  - ✅ Динамическая генерация страниц
  - ✅ **Конструктор блоков** для создания контента
  - ✅ Hero блок с расширенными настройками
  - ✅ Отображение на главной странице
  - ✅ Fallback на старый шаблон (если блоков нет)
- **Доступные блоки:**
  - 🦸 **Hero** - баннер с изображением, текстом и кнопкой
- REST: `/api/pages`
- **Доступ:** `/{slug}` (например: `/about`, `/contacts`)

### ⚙️ Глобальные настройки

#### Settings (Настройки сайта)
- **Логотип сайта** (upload поле)
- **Заголовок** (Title)
- **Описание** (Description)
- **Главное меню** (Main Menu):
  - Обычные ссылки
  - Выпадающие меню с иконками и описанием
  - Автоматическое активное состояние
- **Меню авторизации** (Login/Register кнопки)
- REST: `/api/globals/settings`
- Используется в Header и на главной странице

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

## 📖 Как использовать

### Создание страниц

1. **Откройте админ-панель:** `http://localhost:3000/admin`
2. **Перейдите в раздел "Контент" → "Pages"**
3. **Нажмите "Create new"**
4. **Заполните поля:**
   - **Заголовок:** Название страницы (например: "О нас")
   - **URL (slug):** URL без домена (например: `about` или `o-nas`)
   - **Описание:** Текст страницы
5. **Сохраните**

Страница автоматически станет доступна по адресу: `http://localhost:3000/{slug}`

### Настройка меню

1. **Откройте "Настройки сайта" (Settings)** в админке
2. **Прокрутите до "Главное меню"**
3. **Добавьте пункты меню:**

   **Для обычной ссылки:**
   - Тип: `Link`
   - Название: `Главная`
   - URL: `/` или `about`

   **Для выпадающего меню:**
   - Тип: `Dropdown`
   - Название: `Услуги`
   - Добавьте пункты в "Dropdown Items":
     - Название: `Консультация`
     - URL: `/consultation`
     - Описание: `Профессиональная консультация`
     - Иконка: (загрузите изображение)

4. **Сохраните настройки**

Меню автоматически обновится на сайте с активными состояниями!

### Использование компонента Header

Header автоматически отображается на всех страницах в `app/(frontend)/layout.tsx`:

```typescript
import Header from '@/components/Header'

<Header 
  menuLogo={menuLogo}
  mainMenu={mainMenu}
  authMenu={authMenu}
/>
```

Данные берутся из Settings и автоматически передаются в Header.

## 🔐 Безопасность и SEO

### Безопасность:
- ✅ `.env` файл исключен из Git
- ✅ PostgreSQL SSL включен (`sslmode=require`)
- ✅ Payload Secret настроен
- ✅ TypeScript строгий режим
- ✅ Basic Auth на админке (production)
- ✅ Middleware защищает только `/admin/*`

### SEO защита (noindex/nofollow):
- ✅ Meta-теги в `layout.tsx`
- ✅ `robots.txt` с `disallow: /`
- ✅ HTTP заголовки `X-Robots-Tag`
- ✅ Полная защита от индексации поисковиками

## 🌐 Production Deployment на Vercel

### 1. Создайте Vercel Blob Storage

1. Откройте Vercel Dashboard → **Storage**
2. **Create Database** → **Blob**
3. Назовите: `payload` (или любое имя)
4. Нажмите **Create**
5. Подключите к проекту через **Connect**

### 2. Настройте переменные окружения в Vercel

Обязательные переменные:

```env
PAYLOAD_SECRET=ваш_секрет
DATABASE_URI=ваш_neon_postgres_url
NEXT_PUBLIC_SERVER_URL=https://your-app.vercel.app
PAYLOAD_PUBLIC_SERVER_URL=https://your-app.vercel.app
PAYLOAD_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx  # автоматически при подключении Blob
BASIC_AUTH_USER=login
BASIC_AUTH_PASSWORD=password
```

### 3. Подключите GitHub и задеплойте

1. Vercel Dashboard → **New Project**
2. Выберите репозиторий
3. Нажмите **Deploy**

**⚠️ Важно:** 
- Vercel Blob Storage **обязателен** для хранения файлов
- После подключения Blob Store сделайте **Redeploy**
- Файлы, загруженные до настройки Blob, нужно перезалить

## 📦 Добавление новых коллекций

1. Создайте файл в `collections/` (например, `Blog.ts`)
2. Импортируйте в `payload.config.ts`
3. Добавьте в массив `collections`

### Пример: Создание блога в группе "Контент"

```typescript
// collections/Blog.ts
import { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt'],
    group: 'Контент', // Группировка в админке
  },
  access: {
    read: () => true, // Публичный доступ для чтения
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL',
      required: true,
      unique: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Контент',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      label: 'Автор',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Дата публикации',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
  ],
}
```

**В `payload.config.ts`:**

```typescript
import { Blog } from './collections/Blog'

export default buildConfig({
  collections: [Users, Media, Pages, Blog], // Добавьте Blog
  // ...
})
```

Теперь в админке появится новая коллекция в разделе "Контент" рядом с Pages!

## 🆘 Поддержка

При возникновении проблем проверьте:

1. **База данных**: Neon должен быть активен
2. **Переменные окружения**: Все ли правильно настроены в `.env` и на Vercel
3. **Зависимости**: Установлены ли все пакеты (`pnpm install`)
4. **Vercel Blob**: Создан и подключен к проекту
5. **Токен**: `PAYLOAD_READ_WRITE_TOKEN` правильно прописан

### Частые проблемы:

**Картинки не отображаются на Vercel:**
- Проверьте что Blob Store подключен к проекту
- Сделайте Redeploy после настройки
- Перезалейте файлы через админку

**401/403 на сайте:**
- Проверьте `middleware.ts` - должен блокировать только `/admin/*`
- Basic Auth настроен правильно

**404 на файлах:**
- Файлы должны быть в Vercel Blob Storage, не локально
- URL должен быть `https://xxxxx.public.blob.vercel-storage.com/...`

---

Создано с ❤️ для IVA360
