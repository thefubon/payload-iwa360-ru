# 🎯 v4.2.0 - Новый блок Tabs и многоязычная админка

## 🌟 Основные изменения

### 🆕 Tabs Block (Новый компонент)
✅ **Адаптивный блок с табами** на базе shadcn/ui  
✅ **Гибкий выбор иконок** - Lucide (70+), Продуктовые (8), Загрузка SVG/PNG, Без иконки  
✅ **Настраиваемый дизайн** - цвет фона и иконки для каждого таба  
✅ **Responsive layout** - вертикальные табы на desktop, горизонтальный скролл на mobile  
✅ **Scroll-snap** - плавная прокрутка без scrollbar на мобильных  
✅ **Динамический контент** - изображение + заголовок для каждого таба  
✅ **Компактные кнопки** - фиксированная высота, не растягиваются

### 🌐 Многоязычная админка
✅ **Два языка** - English и Русский  
✅ **Официальные переводы** из `@payloadcms/translations`  
✅ **Переключение в профиле** - настройка языка для каждого пользователя  
✅ **Автоопределение языка** из браузера с fallback на английский

### 🔧 Рефакторинг Hero Block
✅ **Удалена настройка декоративной линии** - упрощена конфигурация  
✅ **Shared constants** для цветов и иконок - переиспользуемые опции  
✅ **Улучшена типизация** - строгие TypeScript типы

### 📦 Оптимизация кода
✅ **Shared опции** - `colorOptions`, `iconOptions`, `productIconOptions`, `lucideIconOptions`  
✅ **Централизованное управление** - все опции в `blocks/shared/`  
✅ **Уменьшение дублирования** - переиспользование констант

---

## 🔧 Технические детали

### Tabs Block API

```typescript
{
  blockType: 'tabs',
  tabs: [
    {
      label: 'Встречи',
      iconType: 'lucide' | 'product' | 'upload' | 'none',
      lucideIcon?: 'Video' | 'Calendar' | ..., // 70+ опций
      productIcon?: 'meetings' | 'webinars' | ..., // 8 опций
      iconImage?: MediaType, // Загруженное изображение
      bgColor: '#f0f9ff', // Tailwind цвета
      iconColor: '#0ea5e9',
      title: 'Заголовок контента',
      image: MediaType
    }
  ]
}
```

### Shared Constants

```typescript
// blocks/shared/colorOptions.ts
export const colorOptions = [ /* 16 Tailwind цветов */ ]
export const backgroundColorOptions = [ /* 9 фоновых цветов */ ]

// blocks/shared/iconOptions.ts
export const lucideIconOptions = [ /* 70+ Lucide иконок */ ]
export const productIconOptions = [ /* 8 продуктовых иконок */ ]
```

### i18n Configuration

```typescript
// payload.config.ts
import { en } from '@payloadcms/translations/languages/en'
import { ru } from '@payloadcms/translations/languages/ru'

export default buildConfig({
  i18n: {
    supportedLanguages: { en, ru },
    fallbackLanguage: 'en',
  },
})
```

---

## 📦 Изменённые файлы

### Новые файлы
- `blocks/TabsBlock.ts` - конфигурация Tabs блока
- `components/blocks/TabsBlockComponent.tsx` - React компонент
- `blocks/shared/colorOptions.ts` - переиспользуемые цвета
- `blocks/shared/iconOptions.ts` - переиспользуемые иконки
- `blocks/shared/index.ts` - экспорт shared констант

### Обновлённые файлы
**Backend:**  
- `blocks/Hero.ts` - удалена `decorativeLineSettings`, добавлены shared опции
- `blocks/index.ts` - экспорт `TabsBlock`
- `collections/Pages.ts` - добавлен `TabsBlock` в конструктор
- `globals/HomePage.ts` - добавлен `TabsBlock` в конструктор
- `payload.config.ts` - добавлена i18n конфигурация
- `types/blocks.ts` - добавлены `TabItem`, `TabsBlockProps`, `TabsBlockData`

**Frontend:**  
- `components/blocks/HeroBlock.tsx` - убрана логика декоративной линии
- `components/RenderBlocks.tsx` - добавлен рендер `TabsBlockComponent`

**Database:**  
- Миграции для `pages_blocks_tabs_tabs` и `home_page_blocks_tabs_tabs` таблиц

---

## 🚀 Установка

```bash
git checkout v4.2.0
pnpm install
pnpm dev
```

### Миграция базы данных

Таблицы для `TabsBlock` создаются автоматически при первом запуске (`push: true` в `postgresAdapter`).

Если нужна ручная миграция:

```sql
-- Для Pages
CREATE TABLE pages_blocks_tabs (
  _order INTEGER NOT NULL,
  _parent_id INTEGER NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  _path TEXT NOT NULL,
  id SERIAL PRIMARY KEY,
  block_name TEXT
);

CREATE TABLE pages_blocks_tabs_tabs (
  _order INTEGER NOT NULL,
  _parent_id INTEGER NOT NULL REFERENCES pages_blocks_tabs(id) ON DELETE CASCADE,
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  icon_type TEXT DEFAULT 'lucide',
  lucide_icon TEXT,
  product_icon TEXT,
  icon_image_id INTEGER REFERENCES media(id) ON DELETE SET NULL,
  bg_color TEXT NOT NULL,
  icon_color TEXT NOT NULL,
  title TEXT NOT NULL,
  image_id INTEGER REFERENCES media(id) ON DELETE SET NULL
);

-- Аналогично для home_page_blocks_tabs и home_page_blocks_tabs_tabs
```

---

## 📝 Как использовать

### Tabs Block в конструкторе

1. Откройте редактор страницы или главной страницы
2. Добавьте блок **"Tabs блок"**
3. Добавьте от 2 до 10 табов
4. Для каждого таба:
   - Укажите название (`label`)
   - Выберите тип иконки (`iconType`)
   - Настройте цвета (`bgColor`, `iconColor`)
   - Добавьте заголовок и изображение контента

### Смена языка админки

1. Войдите в админку → правый верхний угол → Account
2. В поле **"Language"** выберите:
   - **English** (по умолчанию)
   - **Русский**
3. Сохраните изменения

---

## ⚠️ Breaking Changes

### Удалено из Hero Block
- ❌ `decorativeLineSettings` - настройка декоративной линии
- ❌ Все связанные поля: `topOffsetMobile`, `topOffsetSm`, `leftOffset`, `rightOffset`, `scaleMobile`, и т.д.

### Миграция
Если в вашей БД есть старые данные `decorativeLineSettings`, они будут игнорироваться. Никаких действий не требуется.

---

## 🎨 Скриншоты

### Tabs Block
- Адаптивный layout с вертикальными табами на desktop
- Горизонтальный scroll-snap на mobile
- Гибкий выбор иконок (Lucide, Product, Upload)

### Многоязычная админка
- Переключение языка в настройках аккаунта
- Полный перевод интерфейса на русский

---

## 📊 Статистика

- **17 страниц** в production build
- **Размер First Load JS:** 103-543 kB
- **Время сборки:** ~15 секунд
- **Линтер:** ✅ Без ошибок
- **TypeScript:** ✅ Строгая типизация

---

**Full Changelog**: [v4.1.0...v4.2.0](https://github.com/yourusername/payload-iwa360-ru/compare/v4.1.0...v4.2.0)

