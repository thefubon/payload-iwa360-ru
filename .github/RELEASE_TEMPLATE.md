## 🌟 Основные изменения

### Hero Block
✅ **Прозрачный фон** - опция "Без фона" с автоотключением градиента и декоративной линии  
✅ **Контроль отступов** - чекбокс "Без отступов" для полноэкранных макетов  
✅ **Адаптивная декоративная SVG-линия** - настройки для 6 брейкпоинтов (Mobile, SM, MD, LG, XL, 2XL)

### Резиновая типографика
✅ **Плавное масштабирование H1-H6** без брейкпоинтов через `clamp()`  
✅ **CSS Variables** для всех размеров шрифтов  
✅ **Улучшенная читаемость** с `text-wrap: balance`  
✅ **Нет некорректных переносов** текста

### Глобальная декоративная линия
✅ **Адаптивные отступы** для всех брейкпоинтов  
✅ **Настройка масштаба** и позиционирования

---

## 🔧 Технические детали

```css
/* Новые CSS Variables */
--h1-text: clamp(28px, 8vw, 60px);
--h2-text: clamp(24px, 6vw, 48px);
--h3-text: clamp(20px, 5vw, 40px);
--h4-text: clamp(18px, 4vw, 32px);
--h5-text: clamp(16px, 3vw, 24px);
--h6-text: clamp(14px, 2.5vw, 20px);
```

---

## 📦 Изменённые файлы

**Backend:** `blocks/Hero.ts`, `globals/HomePage.ts`, `types/blocks.ts`  
**Frontend:** `components/blocks/HeroBlock.tsx`, `app/(frontend)/page.tsx`, `styles/globals.css` ⭐  
**Компоненты:** 8+ компонентов (удалены хардкод размеры)

---

## 🚀 Установка

```bash
git checkout v4.1.0
pnpm install
pnpm payload migrate  # При необходимости выберите "rename column"
pnpm dev
```

---

## 📝 Migration

При миграции БД выберите **"rename column"** для `line_top_offset_2xl`.

---

## ⚠️ Breaking Changes

Нет. Все изменения обратно совместимы.

---

**Full Changelog**: [v4.0.0...v4.1.0](https://github.com/yourusername/payload-iwa360-ru/compare/v4.0.0...v4.1.0)

