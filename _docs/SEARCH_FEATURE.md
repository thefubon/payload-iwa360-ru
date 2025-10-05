# 🔍 Функция поиска по сайту

## Обзор

Система поиска позволяет пользователям искать контент по всему сайту в реальном времени. Поиск выполняется по заголовкам, описаниям страниц и содержимому блоков.

## Функциональность

### ✨ Основные возможности

- **Мгновенный поиск**: результаты появляются при вводе (debounce 300ms)
- **Подсветка совпадений**: найденные слова выделяются желтым цветом
- **Умные превью**: показывает контекст найденного текста
- **Счетчик результатов**: отображается прямо в поле ввода
- **Индикатор загрузки**: spinner в инпуте во время поиска
- **Адаптивный дизайн**: работает на десктопе и мобильных устройствах

### ⌨️ Горячие клавиши

- **Ctrl+K** (Windows/Linux) или **Cmd+K** (Mac) - открыть поиск
- **Escape** - закрыть модальное окно

### 🎨 Новый дизайн

Использует новый компонент `InputGroup` от shadcn/ui для современного вида:
- Иконка поиска слева
- Счетчик результатов или spinner справа
- Кнопка очистки (появляется при вводе текста)
- Улучшенные карточки результатов с иконками

## Архитектура

### API Endpoint

**URL**: `/api/search?q={query}`

**Метод**: GET

**Параметры**:
- `q` - поисковый запрос (минимум 2 символа)

**Ответ**:
```json
{
  "results": [
    {
      "id": "1",
      "title": "Название страницы",
      "slug": "page-slug",
      "description": "Превью текста с контекстом...",
      "url": "/page-slug"
    }
  ],
  "total": 5,
  "query": "поисковый запрос"
}
```

### Что индексируется

Поиск работает по следующим полям:

1. **Страницы (Pages)**:
   - `title` - заголовок страницы
   - `description` - описание страницы
   
2. **Блоки Hero**:
   - `title` - заголовок блока
   - `description` - описание блока

3. **Блоки Form**:
   - `title` - заголовок блока
   - `description` - описание блока

## Компоненты

### SearchModal (`/components/SearchModal.tsx`)

Главный компонент модального окна поиска.

**Props**:
```typescript
interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}
```

**Особенности**:
- Использует `InputGroup` для поля ввода
- Debounce для оптимизации запросов (300ms)
- Автоматический фокус при открытии
- Обработка клавиши Escape

### Header (`/components/Header.tsx`)

**Изменения**:
- Добавлена кнопка поиска с иконкой
- Глобальный хук для горячей клавиши Ctrl/Cmd+K
- Интеграция SearchModal

## Стилизация

### InputGroup

Используется новый компонент shadcn/ui:
```tsx
<InputGroup className="[--radius:0.75rem]">
  <InputGroupInput placeholder="..." />
  <InputGroupAddon>
    <Search />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    {/* Счетчик или кнопка очистки */}
  </InputGroupAddon>
</InputGroup>
```

### Карточки результатов

```tsx
<button className="w-full text-left p-4 rounded-xl border hover:bg-accent/50 hover:border-primary/50 hover:shadow-sm transition-all group">
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
      <FileText className="h-4 w-4 text-primary" />
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-base mb-1.5 group-hover:text-primary line-clamp-1 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-1.5">
        {description}
      </p>
      <p className="text-xs text-muted-foreground/70 font-mono">
        {url}
      </p>
    </div>
  </div>
</button>
```

## Расширение функционала

### Добавление новых коллекций для поиска

Отредактируйте `/app/(payload)/api/search/route.ts`:

```typescript
// Добавьте поиск по новой коллекции
const newCollectionResult = await payload.find({
  collection: 'your-collection',
  where: {
    or: [
      {
        field1: {
          contains: query,
        },
      },
      {
        field2: {
          contains: query,
        },
      },
    ],
  },
  limit: 10,
})

// Объедините результаты
const allResults = [
  ...pagesResult.docs,
  ...newCollectionResult.docs,
]
```

### Добавление фильтров

Можно добавить фильтры по типу контента, дате, автору и т.д.:

```typescript
// В SearchModal добавьте state для фильтров
const [filters, setFilters] = useState({
  type: 'all',
  date: 'any',
})

// В API используйте фильтры в запросе
where: {
  and: [
    {
      or: [/* поисковые условия */],
    },
    filters.type !== 'all' ? { type: { equals: filters.type } } : {},
  ],
}
```

### Добавление автодополнения

Можно добавить список популярных запросов или последних поисков:

```typescript
const [recentSearches, setRecentSearches] = useState<string[]>([])

// Сохраняйте в localStorage
useEffect(() => {
  const recent = localStorage.getItem('recentSearches')
  if (recent) setRecentSearches(JSON.parse(recent))
}, [])

// Показывайте когда инпут пустой
{query.length === 0 && recentSearches.length > 0 && (
  <div className="space-y-2">
    <h4 className="text-sm font-medium">Недавние поиски</h4>
    {recentSearches.map((search) => (
      <button onClick={() => setQuery(search)}>
        {search}
      </button>
    ))}
  </div>
)}
```

## Производительность

### Оптимизация

- **Debounce**: 300ms задержка перед запросом
- **Limit**: максимум 10 результатов за раз
- **Кэширование**: можно добавить React Query для кэширования

### Рекомендации

1. Добавьте индексы в базе данных для полей поиска
2. Используйте полнотекстовый поиск PostgreSQL для больших объемов
3. Рассмотрите использование Algolia или ElasticSearch для крупных сайтов

## Тестирование

### Ручное тестирование

1. Откройте сайт
2. Нажмите Ctrl+K или кликните на иконку поиска
3. Введите запрос (минимум 2 символа)
4. Проверьте, что результаты появляются
5. Кликните на результат - должен произойти переход
6. Проверьте подсветку совпадений

### Краевые случаи

- Пустой запрос
- Запрос < 2 символов
- Запрос без результатов
- Специальные символы
- Очень длинный запрос

## Поддержка

При возникновении проблем проверьте:

1. **API не возвращает результаты**:
   - Проверьте подключение к базе данных
   - Убедитесь, что есть страницы с контентом
   - Проверьте консоль браузера на ошибки

2. **Модальное окно не открывается**:
   - Проверьте импорт SearchModal в Header
   - Убедитесь, что состояние isOpen управляется правильно

3. **Горячие клавиши не работают**:
   - Проверьте useEffect в Header
   - Убедитесь, что нет конфликтов с другими обработчиками

## Версия

- **Дата создания**: 2025-10-05
- **Последнее обновление**: 2025-10-05
- **Версия**: 1.0
- **Зависимости**:
  - shadcn/ui input-group
  - lucide-react
  - next.js 15.5+
  - payload 3.58+

