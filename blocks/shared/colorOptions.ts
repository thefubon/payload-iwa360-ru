// Общие опции цветов для использования в разных блоках

export const colorOptions = [
  { label: 'Primary 50', value: '#E0F7F2' },
  { label: 'Primary 500', value: '#00B08B' },
  { label: 'White', value: '#ffffff' },
  { label: 'Slate 50', value: '#f8fafc' },
  { label: 'Slate 500', value: '#64748b' },
  { label: 'Gray 50', value: '#f9fafb' },
  { label: 'Gray 500', value: '#6b7280' },
  { label: 'Zinc 50', value: '#fafafa' },
  { label: 'Zinc 500', value: '#71717a' },
  { label: 'Neutral 50', value: '#f5f5f5' },
  { label: 'Neutral 500', value: '#737373' },
  { label: 'Stone 50', value: '#fafaf9' },
  { label: 'Stone 500', value: '#78716c' },
  { label: 'Red 50', value: '#fef2f2' },
  { label: 'Red 500', value: '#ef4444' },
  { label: 'Orange 50', value: '#fff7ed' },
  { label: 'Orange 500', value: '#f97316' },
  { label: 'Amber 50', value: '#fffbeb' },
  { label: 'Amber 500', value: '#f59e0b' },
  { label: 'Yellow 50', value: '#fefce8' },
  { label: 'Yellow 500', value: '#eab308' },
  { label: 'Lime 50', value: '#f7fee7' },
  { label: 'Lime 500', value: '#84cc16' },
  { label: 'Green 50', value: '#f0fdf4' },
  { label: 'Green 500', value: '#22c55e' },
  { label: 'Emerald 50', value: '#ecfdf5' },
  { label: 'Emerald 500', value: '#10b981' },
  { label: 'Teal 50', value: '#f0fdfa' },
  { label: 'Teal 500', value: '#14b8a6' },
  { label: 'Cyan 50', value: '#ecfeff' },
  { label: 'Cyan 500', value: '#06b6d4' },
  { label: 'Sky 50', value: '#f0f9ff' },
  { label: 'Sky 500', value: '#0ea5e9' },
  { label: 'Blue 50', value: '#eff6ff' },
  { label: 'Blue 500', value: '#3b82f6' },
  { label: 'Indigo 50', value: '#eef2ff' },
  { label: 'Indigo 500', value: '#6366f1' },
  { label: 'Violet 50', value: '#f5f3ff' },
  { label: 'Violet 500', value: '#8b5cf6' },
  { label: 'Purple 50', value: '#faf5ff' },
  { label: 'Purple 500', value: '#a855f7' },
  { label: 'Fuchsia 50', value: '#fdf4ff' },
  { label: 'Fuchsia 500', value: '#d946ef' },
  { label: 'Pink 50', value: '#fdf2f8' },
  { label: 'Pink 500', value: '#ec4899' },
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

