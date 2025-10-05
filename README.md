# Payload IWA360 RU

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
│   ├── (frontend)/              # Публичная часть сайта
│   │   ├── [slug]/             # Динамические страницы
│   │   │   └── page.tsx        # Шаблон страницы с рендером блоков
│   │   ├── personal-data/      # Страница обработки персональных данных
│   │   ├── privacy-policy/     # Политика конфиденциальности
│   │   ├── search/             # Страница поиска
│   │   ├── layout.tsx          # Layout с Header, Footer и SEO
│   │   └── page.tsx            # Главная страница (HOME PAGE GLOBAL) ⭐ NEW
│   ├── (payload)/              # Payload CMS (авто-генерация)
│   │   ├── admin/              # Админ панель
│   │   └── api/                # API routes
│   │       ├── search/         # API поиска
│   │       └── submit-form/    # API отправки форм
│   └── robots.ts               # robots.txt (disallow: /)
├── blocks/                     # Блоки конструктора страниц ⭐
│   ├── Hero.ts                # Hero блок (определение полей)
│   ├── FormBlock.ts           # Форма с полями и валидацией ⭐ NEW
│   ├── Partners.ts            # Блок партнеров с анимацией ⭐ NEW
│   └── index.ts               # Экспорт всех блоков
├── collections/                # Коллекции данных
│   ├── Users.ts               # Пользователи
│   ├── Media.ts               # Медиа файлы
│   ├── Pages.ts               # Страницы с конструктором блоков
│   ├── Forms.ts               # Формы для лидогенерации ⭐ NEW
│   └── FormSubmissions.ts     # Отправленные формы ⭐ NEW
├── components/                 # React компоненты
│   ├── blocks/                # Компоненты блоков ⭐
│   │   ├── HeroBlock.tsx      # Hero блок (рендер)
│   │   ├── FormBlockComponent.tsx # Компонент формы ⭐ NEW
│   │   └── PartnersBlock.tsx  # Infinite scroll логотипов ⭐ NEW
│   ├── RenderBlocks.tsx       # Рендер всех блоков
│   ├── Header.tsx             # Навигация с dropdown и активными состояниями
│   ├── Footer.tsx             # Футер с ссылками ⭐ NEW
│   ├── CookieBanner.tsx       # Cookie баннер ⭐ NEW
│   ├── FormModal.tsx          # Модальное окно формы ⭐ NEW
│   ├── SearchModal.tsx        # Модальное окно поиска ⭐ NEW
│   ├── SearchPage.tsx         # Компонент страницы поиска ⭐ NEW
│   └── ui/                    # UI компоненты (shadcn/ui)
│       ├── button.tsx
│       ├── navigation-menu.tsx
│       ├── dialog.tsx         # Модальное окно
│       ├── input.tsx          # Поля ввода
│       ├── textarea.tsx       # Текстовая область
│       ├── field.tsx          # Обертка для полей формы
│       └── ...                # Другие UI компоненты
├── globals/                   # Глобальные настройки
│   ├── Settings.ts           # Настройки сайта (логотип, меню, title)
│   └── HomePage.ts           # Главная страница (Глобал) ⭐ NEW
├── public/                    # Статические файлы
│   ├── fonts/                # Кастомные шрифты (GuarujaNeue)
│   └── img/                  # Изображения и SVG
│       ├── GradientLine.svg  # Декоративная линия ⭐ NEW
│       ├── demo-content/     # Демо изображения
│       └── partners-logo/    # Логотипы партнеров ⭐ NEW
├── styles/                    # Стили
│   └── globals.css           # Глобальные стили + шрифты
├── types/                     # TypeScript типы
│   ├── blocks.ts             # Типы для блоков конструктора ⭐
│   ├── components.ts         # Типы для компонентов
│   ├── pages.ts              # Типы для страниц
│   ├── api.ts                # Типы для API ⭐ NEW
│   └── payload.ts            # Типы для Payload
├── _docs/                     # Документация ⭐ NEW
│   ├── SEARCH_GUIDE.md       # Гайд по поиску
│   ├── FORMS_GUIDE.md        # Гайд по формам
│   ├── HERO_BLOCK_GUIDE.md   # Гайд по Hero блоку
│   └── ...                   # Другие документы
├── payload.config.ts         # Конфигурация Payload
├── next.config.ts           # Конфигурация Next.js + SEO
├── middleware.ts            # Защита админки (Basic Auth)
├── RELEASE_v4.0.0.md        # Release notes v4.0.0 ⭐ NEW
└── .env                     # Переменные окружения
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

#### 🦸 Hero блок
Эффектный баннер с изображением и CTA
- 🎨 **Настройки фона:**
  - Выбор цвета из палитры Tailwind (50+ оттенков)
  - Двухслойный фон: сплошной цвет + градиент
  - Адаптивный градиент (desktop/mobile)
- 📝 **Контент:**
  - Заголовок и описание с поддержкой HTML entities (`&nbsp;`)
  - Выбор цвета текста (foreground/background)
  - Бейджи для категорий/тегов
- 🖼️ **Изображение:**
  - Адаптивная загрузка без обрезки (object-contain)
  - Оптимизация для всех экранов
- 🎯 **Кнопки:**
  - 6 вариантов стилей (shadcn/ui: default, outline, destructive и т.д.)
  - Кастомный цвет фона и текста (HEX)
  - 80+ иконок из Lucide (стрелки, действия, социальные и т.д.)
  - Поддержка модальных форм через `formId`
- 📱 **Мобильная адаптация:**
  - Inverse layout (картинка сверху, контент снизу)
  - Контент слева, кнопка 100% ширины
  - Адаптивный градиент и декоративная линия
- ✨ **Декор:**
  - SVG линия с адаптивным масштабированием
  - Скругленные углы (rounded-2xl)

#### 🤝 Partners блок ⭐ NEW
Анимированная карусель логотипов партнеров
- ♾️ **Infinite scroll:** Бесконечная плавная прокрутка без видимых швов
- ⚡ **Скорость анимации:** 3 режима (медленная, обычная, быстрая)
- 🎨 **Grayscale эффект:** Логотипы в ч/б с переходом в цвет при hover
- 🎴 **Серые карточки:** Опциональный фон `bg-slate-100` для логотипов
- ⏸️ **Пауза на hover:** Анимация останавливается при наведении
- 📱 **Адаптивность:** Корректное отображение на всех устройствах
- 🔗 **Ссылки:** Поддержка внешних ссылок для каждого логотипа

#### 📝 FormBlock ⭐ NEW
Динамические формы с валидацией и лидогенерацией
- 🎨 **Кастомизация:** Настройка фона, заголовка и описания
- 📋 **Типы полей:** Text, Email, Phone, Textarea, Select, Checkbox, Radio
- ✅ **Валидация:** Встроенная валидация на клиенте и сервере
- 💾 **Сохранение:** Автоматическое сохранение заявок в БД
- 🔔 **Уведомления:** Toast-уведомления об успехе/ошибке
- 🪟 **Модальные окна:** Открытие форм в модальном окне через кнопки Hero
- 📊 **Админка:** Просмотр всех заявок в разделе "Заявки"

**Легко расширяемая** архитектура для добавления новых блоков

### 🧭 Умная навигация
- **Активное состояние** для текущей страницы
- **Поддержка выпадающих меню** с иконками и описаниями
- **Автоматическая нормализация URL** (работает с `/slug` и `slug`)
- **Sticky header** с размытием фона
- **Кастомные цвета:** Настройка цвета текста и бордера активных пунктов (48 цветов Tailwind)
- **Адаптивный дизайн** для мобильных устройств

### 🔍 Поиск по сайту ⭐ NEW
- **Полнотекстовый поиск:** По всем страницам, заголовкам и описаниям
- **Модальное окно:** Быстрый доступ через Header (Ctrl/Cmd + K)
- **Выделение результатов:** Подсветка совпадений в тексте
- **Страница поиска:** Отдельная страница `/search` для расширенного поиска
- **REST API:** Эндпоинт `/api/search?q=query` для внешнего использования

### 📋 Система форм и лидогенерация ⭐ NEW
- **Конструктор форм:** Создание форм через админку без кода
- **Коллекция Forms:** Определение структуры формы (поля, типы, валидация)
- **Коллекция FormSubmissions:** Автоматическое сохранение всех заявок
- **Модальные окна:** Открытие форм в модальных окнах через кнопки
- **Email уведомления:** Отправка уведомлений через Resend (опционально)
- **Cookie баннер:** Согласие на обработку персональных данных

### 🏠 Главная страница (Home Page Global) ⭐ NEW
- **Глобальные настройки:** Управление как Global (не коллекция)
- **SEO поля:** Meta Title и Description для оптимизации
- **Табы в админке:** Разделение на "Основное", "Контент страницы", "Настройки дизайна"
- **Конструктор блоков:** Hero, Partners, FormBlock для построения лендинга
- **Декоративная линия:** SVG градиентная линия на фоне с настройками позиционирования
- **Серый фон:** Опциональный `bg-slate-100` для всей страницы
- **Empty State:** Красивая заглушка с инструкциями при пустой странице

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

#### Pages (Страницы) ⭐
- **Группа:** Контент
- **Поля:**
  - `title` - Заголовок страницы
  - `slug` - URL страницы (автоматическое форматирование)
  - `description` - Описание/контент страницы (Meta Description)
  - `showPageBackground` - Серый фон страницы (checkbox) ⭐ NEW
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
  - 🤝 **Partners** - анимированная лента логотипов партнеров
  - 📝 **FormBlock** - форма с валидацией и сохранением заявок
- REST: `/api/pages`
- **Доступ:** `/{slug}` (например: `/about`, `/contacts`)

#### Forms (Формы) ⭐ NEW
- **Группа:** Контент
- **Назначение:** Создание форм для лидогенерации
- **Поля:**
  - `title` - Название формы
  - `fields` - Конструктор полей (text, email, phone, textarea, select, checkbox, radio)
  - `submitButtonText` - Текст кнопки отправки
  - `successMessage` - Сообщение после успешной отправки
- **Типы полей:**
  - 📝 Text (обычный текст)
  - 📧 Email (с валидацией email)
  - 📱 Phone (с маской телефона)
  - 📄 Textarea (многострочный текст)
  - 📋 Select (выпадающий список)
  - ☑️ Checkbox (чекбокс)
  - 🔘 Radio (радио-кнопки)
- REST: `/api/forms`

#### FormSubmissions (Заявки) ⭐ NEW
- **Группа:** Контент
- **Назначение:** Хранение всех отправленных форм
- **Поля:**
  - `form` - Связь с формой (relationship)
  - `data` - JSON с данными формы
  - `submittedAt` - Дата и время отправки
- **Функционал:**
  - ✅ Автоматическое сохранение при отправке формы
  - ✅ Просмотр всех заявок в админке
  - ✅ Фильтрация по формам
  - ✅ Экспорт данных (через Payload API)
- REST: `/api/form-submissions`
- **Доступ:** Только для администраторов

### ⚙️ Глобальные настройки

#### HomePage (Главная страница) ⭐ NEW
- **Группа:** Контент
- **Назначение:** Централизованное управление главной страницей
- **Табы:**
  - 📝 **Основное:**
    - `title` - Meta Title для SEO
    - `description` - Meta Description для SEO
  - 🧩 **Контент страницы:**
    - `layout` - Конструктор блоков (Hero, Partners, FormBlock)
  - 🎨 **Настройки дизайна:**
    - `showPageBackground` - Серый фон страницы (checkbox)
    - `showDecorativeLine` - Показать декоративную линию (checkbox)
    - `decorativeLineSettings` - Настройки линии (topOffset, leftOffset, rightOffset, scale)
- **Функционал:**
  - ✅ Глобальные настройки (не коллекция)
  - ✅ SEO оптимизация
  - ✅ Конструктор блоков для лендинга
  - ✅ Декоративная SVG линия на фоне
  - ✅ Empty State с инструкциями
- REST: `/api/globals/home-page`
- **Доступ:** `/` (главная страница)

#### Settings (Настройки сайта)
- **Логотип сайта** (upload поле)
- **Заголовок** (Title)
- **Описание** (Description)
- **Главное меню** (Main Menu):
  - Обычные ссылки
  - Выпадающие меню с иконками и описанием
  - Автоматическое активное состояние
  - Кастомные цвета активных пунктов (48 цветов Tailwind)
- **Меню авторизации** (Login/Register кнопки)
- **Текст согласия на обработку ПД** (для форм)
- REST: `/api/globals/settings`
- Используется в Header, Footer и формах

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

Создано с ❤️ для IWA360
