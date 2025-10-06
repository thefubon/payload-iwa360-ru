// Общие опции иконок для использования в разных блоках

export const iconOptions = [
  { label: 'Без иконки', value: '' },
  
  // Стрелки
  { label: 'Стрелка вправо', value: 'ArrowRight' },
  { label: 'Стрелка вверх-вправо', value: 'ArrowUpRight' },
  { label: 'Стрелка вниз-вправо', value: 'ArrowDownRight' },
  { label: 'Стрелка влево', value: 'ArrowLeft' },
  { label: 'Стрелка вверх', value: 'ArrowUp' },
  { label: 'Стрелка вниз', value: 'ArrowDown' },
  { label: 'Шеврон вправо', value: 'ChevronRight' },
  { label: 'Шевроны вправо', value: 'ChevronsRight' },
  { label: 'Шеврон влево', value: 'ChevronLeft' },
  { label: 'Шеврон вверх', value: 'ChevronUp' },
  { label: 'Шеврон вниз', value: 'ChevronDown' },
  { label: 'Обновить', value: 'RefreshCw' },
  { label: 'Поделиться', value: 'Share' },
  { label: 'Переход', value: 'MoveRight' },
  
  // Действия
  { label: 'Скачать', value: 'Download' },
  { label: 'Загрузить', value: 'Upload' },
  { label: 'Отправить', value: 'Send' },
  { label: 'Плей', value: 'Play' },
  { label: 'Плюс', value: 'Plus' },
  { label: 'Проверка', value: 'Check' },
  { label: 'Двойная проверка', value: 'CheckCheck' },
  { label: 'Закрыть', value: 'X' },
  { label: 'Плюс в кружке', value: 'PlusCircle' },
  { label: 'Минус в кружке', value: 'MinusCircle' },
  { label: 'Глаз', value: 'Eye' },
  { label: 'Замок', value: 'Lock' },
  { label: 'Открытый замок', value: 'Unlock' },
  
  // Бизнес и покупки
  { label: 'Корзина', value: 'ShoppingCart' },
  { label: 'Сумка', value: 'ShoppingBag' },
  { label: 'Кредитная карта', value: 'CreditCard' },
  { label: 'Деньги', value: 'DollarSign' },
  { label: 'Подарок', value: 'Gift' },
  { label: 'Ярлык', value: 'Tag' },
  { label: 'Процент', value: 'Percent' },
  
  // Коммуникация
  { label: 'Почта', value: 'Mail' },
  { label: 'Сообщение', value: 'MessageCircle' },
  { label: 'Телефон', value: 'Phone' },
  { label: 'Видео', value: 'Video' },
  { label: 'Колокольчик', value: 'Bell' },
  { label: 'Чат', value: 'MessageSquare' },
  
  // Медиа и файлы
  { label: 'Файл', value: 'File' },
  { label: 'Папка', value: 'Folder' },
  { label: 'Картинка', value: 'Image' },
  { label: 'Скрепка', value: 'Paperclip' },
  { label: 'Ссылка', value: 'Link' },
  { label: 'Внешняя ссылка', value: 'ExternalLink' },
  { label: 'Поиск', value: 'Search' },
  { label: 'Увеличить поиск', value: 'ZoomIn' },
  
  // Интерфейс
  { label: 'Настройки', value: 'Settings' },
  { label: 'Информация', value: 'Info' },
  { label: 'Вопрос', value: 'HelpCircle' },
  { label: 'Предупреждение', value: 'AlertTriangle' },
  { label: 'Круг предупреждения', value: 'AlertCircle' },
  { label: 'Пользователь', value: 'User' },
  { label: 'Пользователи', value: 'Users' },
  { label: 'Дом', value: 'Home' },
  { label: 'Местоположение', value: 'MapPin' },
  { label: 'Глобус', value: 'Globe' },
  
  // Время и календарь
  { label: 'Календарь', value: 'Calendar' },
  { label: 'Часы', value: 'Clock' },
  { label: 'Таймер', value: 'Timer' },
  { label: 'Часы-круг', value: 'Clock3' },
  
  // Социальные и другие
  { label: 'Звезда', value: 'Star' },
  { label: 'Сердце', value: 'Heart' }, 
  { label: 'Палец вверх', value: 'ThumbsUp' },
  { label: 'Палец вниз', value: 'ThumbsDown' },
  { label: 'Закладка', value: 'Bookmark' },
  { label: 'Цель', value: 'Target' },
  { label: 'Трофей', value: 'Trophy' },
  { label: 'Молния', value: 'Zap' },
  { label: 'Ракета', value: 'Rocket' },
  { label: 'Искры', value: 'Sparkles' },
  
  // Продукты (специфичные)
  { label: 'Встречи', value: 'meetings' },
  { label: 'Вебинары', value: 'webinars' },
  { label: 'Онлайн-трансляции', value: 'streams' },
  { label: 'Мессенджер', value: 'messenger' },
  { label: 'Почта и календарь', value: 'mail' },
  { label: 'Диск и документы', value: 'disk' },
  { label: 'ИИ-ассистент', value: 'ai' },
  { label: 'Без иконки (None)', value: 'none' },
]

// Опции иконок только для продуктов
export const productIconOptions = [
  { label: 'Встречи', value: 'meetings' },
  { label: 'Вебинары', value: 'webinars' },
  { label: 'Онлайн-трансляции', value: 'streams' },
  { label: 'Мессенджер', value: 'messenger' },
  { label: 'Почта и календарь', value: 'mail' },
  { label: 'Диск и документы', value: 'disk' },
  { label: 'ИИ-ассистент', value: 'ai' },
  { label: 'Календарь', value: 'calendar' },
  { label: 'Без иконки', value: 'none' },
]

// Опции базовых иконок Lucide (без кастомных продуктовых)
export const lucideIconOptions = iconOptions.filter(
  icon => !['meetings', 'webinars', 'streams', 'messenger', 'mail', 'disk', 'ai', 'none'].includes(icon.value)
)

