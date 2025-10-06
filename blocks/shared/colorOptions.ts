// Общие опции цветов для использования в разных блоках

export const colorOptions = [
  { label: 'White', value: '#ffffff' },
  { label: 'Primary 50', value: '#E0F7F2' },
  { label: 'Primary 500', value: '#00B08B' },
  { label: 'Slate 50', value: '#f8fafc' },
  { label: 'Slate 500', value: '#64748b' },
  { label: 'Yellow 50', value: '#fefce8' },
  { label: 'Yellow 500', value: '#eab308' },
  { label: 'Sky 50', value: '#f0f9ff' },
  { label: 'Sky 500', value: '#0ea5e9' },
  { label: 'Blue 50', value: '#eff6ff' },
  { label: 'Blue 500', value: '#3b82f6' },
  { label: 'Indigo 50', value: '#eef2ff' },
  { label: 'Indigo 500', value: '#6366f1' },
  { label: 'Violet 50', value: '#f5f3ff' },
  { label: 'Violet 500', value: '#8b5cf6' },
  { label: 'Fuchsia 50', value: '#fdf4ff' },
  { label: 'Fuchsia 500', value: '#d946ef' },
  { label: 'Rose 50', value: '#fff1f2' },
  { label: 'Rose 500', value: '#f43f5f' },
]

// Опции цветов с добавлением черного (для текста кнопок)
export const colorOptionsWithBlack = [
  { label: 'По умолчанию (из варианта)', value: '' },
  ...colorOptions,
  { label: 'Black', value: '#000000' },
]

// Опции цветов для фона (включая прозрачный)
export const backgroundColorOptions = [
  { label: 'Без фона', value: 'transparent' },
  ...colorOptions,
]

// Опции цветов для меню (с дефолтным значением)
export const menuColorOptions = [
  { label: 'По умолчанию (Primary)', value: '' },
  ...colorOptions,
]

