# 🔍 Отдельная страница поиска

## Обзор

Создана отдельная страница `/search` с полным функционалом поиска. Это позволяет:
- 📎 Делиться прямыми ссылками на поиск
- 🔗 Открывать поиск в новой вкладке
- 📱 Удобнее использовать на мобильных устройствах
- 🌐 Потенциально лучше для SEO (хотя страница помечена noindex)

## URL и параметры

### Базовый URL
```
https://your-site.com/search
```

### С параметром поиска
```
https://your-site.com/search?q=мессенджер
```

Параметр `q` автоматически:
- Заполняет поле поиска
- Выполняет поиск при загрузке страницы
- Обновляется при изменении запроса (без перезагрузки страницы)

## Файловая структура

### 1. Страница `/app/(frontend)/search/page.tsx`

```tsx
import SearchPage from '@/components/SearchPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Поиск по сайту | IWA360',
  description: 'Найдите нужную информацию на нашем сайте',
  robots: 'noindex, nofollow', // Не индексируем страницу поиска
}

export default function Search() {
  return <SearchPage />
}
```

**Особенности:**
- Server Component для SEO
- Метаданные настроены
- `noindex, nofollow` - страница не индексируется поисковиками
- Рендерит клиентский компонент `SearchPage`

### 2. Компонент `/components/SearchPage.tsx`

Основной клиентский компонент с полным функционалом поиска.

**Структура:**

```tsx
'use client'

export default function SearchPage() {
  // 1. State для поиска
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  // 2. Получаем параметр q из URL
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  // 3. Debounce для оптимизации
  const debouncedSearch = useCallback(debounce(performSearch, 300), [])
  
  // 4. Обновляем URL при изменении запроса
  window.history.replaceState({}, '', `/search?q=${query}`)
  
  return (
    // UI компонент
  )
}
```

## Функциональность

### ✅ Основные возможности

1. **Автопоиск в реальном времени**
   - Результаты появляются при вводе (debounce 300ms)
   - Без необходимости нажимать кнопку

2. **URL синхронизация**
   - Параметр `?q=` обновляется при изменении запроса
   - Можно скопировать и поделиться ссылкой
   - История браузера работает корректно

3. **Инициализация из URL**
   - При открытии `/search?q=месс` автоматически выполняется поиск
   - Результаты загружаются сразу

4. **Навигация**
   - Кнопка "Назад" (стрелка влево) для возврата на главную
   - Клик по результату открывает страницу
   - Breadcrumbs навигация

5. **Sticky Header**
   - Поле поиска остается видимым при прокрутке
   - Backdrop blur эффект как в основном Header

### 🎨 UI компоненты

#### Header секция
```tsx
<div className="border-b sticky top-0 z-10">
  <Button variant="ghost" asChild>
    <Link href="/">
      <ArrowLeft /> {/* Кнопка назад */}
    </Link>
  </Button>
  
  <h1>Поиск по сайту</h1>
  
  <InputGroup>
    {/* Поле поиска */}
  </InputGroup>
</div>
```

#### Results секция
```tsx
<div className="container py-8">
  {/* Пустые состояния */}
  {/* Ошибки */}
  {/* Результаты поиска */}
</div>
```

## Связь с модальным окном

### Кнопка "Открыть в новой вкладке" в модалке

В `SearchModal.tsx` добавлена кнопка:

```tsx
<Button variant="ghost" size="sm" asChild>
  <a 
    href={query ? `/search?q=${encodeURIComponent(query)}` : '/search'} 
    target="_blank"
  >
    Открыть в новой вкладке
  </a>
</Button>
```

**Что делает:**
- Если есть запрос → открывает `/search?q=запрос`
- Если запроса нет → открывает `/search`
- Открывается в новой вкладке (`target="_blank"`)
- Сохраняет текущий запрос

## Примеры использования

### Пример 1: Прямая ссылка в меню

```tsx
// В настройках меню добавьте пункт
{
  type: 'link',
  label: 'Поиск',
  url: '/search'
}
```

### Пример 2: Ссылка с параметром

```tsx
<Link href="/search?q=мессенджер">
  Найти информацию о мессенджере
</Link>
```

### Пример 3: Программная навигация

```tsx
const router = useRouter()

const searchForProduct = (productName: string) => {
  router.push(`/search?q=${encodeURIComponent(productName)}`)
}
```

### Пример 4: Кнопка поиска в Footer

```tsx
// В Footer.tsx
<Link 
  href="/search" 
  className="text-sm hover:underline"
>
  🔍 Поиск по сайту
</Link>
```

## Различия между модалкой и страницей

| Функция | Модалка | Страница |
|---------|---------|----------|
| URL | Остается текущий | `/search?q=...` |
| История | Не добавляется | Добавляется |
| Шаринг | ❌ Нельзя | ✅ Можно |
| Горячие клавиши | ✅ Ctrl+K | ❌ Нет |
| Backdrop | ✅ Да | ❌ Нет |
| Фокус | ✅ Ловит фокус | 🔶 Свободный |
| SEO | ❌ Не индексируется | 🔶 noindex |
| Открытие | Быстрое (overlay) | Навигация |
| Мобильные | Полноэкранная | Обычная страница |

## Когда использовать что?

### Используйте **модалку** когда:
- ✅ Быстрый поиск "на лету"
- ✅ Не хотите покидать текущую страницу
- ✅ Нужны горячие клавиши (Ctrl+K)
- ✅ Поиск как вспомогательная функция

### Используйте **страницу** когда:
- ✅ Хотите поделиться ссылкой
- ✅ Нужна закладка в браузере
- ✅ Продвинутый поиск с фильтрами (в будущем)
- ✅ SEO важен (после снятия noindex)
- ✅ Аналитика переходов на поиск

## SEO соображения

### Текущее состояние

```tsx
export const metadata: Metadata = {
  robots: 'noindex, nofollow',
}
```

Страница **не индексируется** поисковиками.

### Если нужно индексировать

```tsx
export const metadata: Metadata = {
  title: 'Поиск по сайту | IWA360',
  description: 'Найдите продукты и услуги компании IWA360',
  robots: 'index, follow', // ⚠️ Будет индексироваться!
}
```

**Рекомендации:**
1. Убрать `noindex` если хотите, чтобы страница была в Google
2. Добавить `canonical` URL
3. Добавить structured data (JSON-LD)
4. Оптимизировать мета-описание

## Аналитика

### Отслеживание поисковых запросов

Можно добавить аналитику:

```tsx
// В performSearch()
const performSearch = async (searchQuery: string) => {
  // ... существующий код ...
  
  // Отправляем событие в аналитику
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchQuery,
      page_path: '/search',
    })
  }
  
  // Или для Yandex Metrika
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(YOUR_COUNTER_ID, 'params', {
      search_query: searchQuery,
    })
  }
}
```

### Отслеживание кликов по результатам

```tsx
const handleResultClick = (url: string, result: SearchResult) => {
  // Аналитика клика
  if (window.gtag) {
    window.gtag('event', 'search_result_click', {
      search_term: query,
      result_url: url,
      result_title: result.title,
    })
  }
  
  router.push(url)
}
```

## Мобильная версия

Страница полностью адаптивна:
- ✅ Sticky header на мобильных
- ✅ Увеличенные области для касания
- ✅ Оптимизированные отступы
- ✅ Кнопка "Назад" на видном месте

## Будущие улучшения

### Возможные дополнения:

1. **Фильтры**
   ```tsx
   <select>
     <option>Все разделы</option>
     <option>Продукты</option>
     <option>Статьи</option>
     <option>Новости</option>
   </select>
   ```

2. **Сортировка**
   - По релевантности
   - По дате
   - По популярности

3. **История поисков**
   - Сохранять в localStorage
   - Показывать недавние запросы
   - Кнопка очистки истории

4. **Автодополнение**
   - Популярные запросы
   - Предложения на основе контента

5. **Продвинутый поиск**
   - Поиск по датам
   - Поиск по автору
   - Поиск по категориям

## Доступ к странице

### Варианты доступа:

1. **Прямой URL**: `https://your-site.com/search`

2. **Из модалки**: кнопка "Открыть в новой вкладке"

3. **Из Header**: можно добавить в меню

4. **Из Footer**: ссылка внизу сайта

5. **404 страница**: "Не нашли? Попробуйте поиск"

## Резюме

✅ Создана страница `/search`  
✅ Поддержка параметра `?q=запрос`  
✅ Автопоиск в реальном времени  
✅ URL синхронизация  
✅ Sticky header  
✅ Полная адаптивность  
✅ Интеграция с модалкой  
✅ Готова к аналитике  

Страница готова к использованию! 🚀

