// Пресеты стилей для бейджей в Hero блоке

export const badgeStylePresets = [
  {
    label: 'Встречи',
    value: 'meetings',
    bgColor: '#E0F7F2', // Primary 50
    textColor: '#00B08B', // Primary 500
  },
  {
    label: 'Вебинары',
    value: 'webinars',
    bgColor: '#f5f3ff', // Violet 50
    textColor: '#8b5cf6', // Violet 500
  },
  {
    label: 'Онлайн-трансляции',
    value: 'streams',
    bgColor: '#f0f9ff', // Sky 50
    textColor: '#0ea5e9', // Sky 500
  },
  {
    label: 'Мессенджер',
    value: 'messenger',
    bgColor: '#eef2ff', // Indigo 50
    textColor: '#6366f1', // Indigo 500
  },
  {
    label: 'Почта и календарь',
    value: 'mail',
    bgColor: '#eff6ff', // Blue 50
    textColor: '#3b82f6', // Blue 500
  },
  {
    label: 'Диск и документы',
    value: 'disk',
    bgColor: '#fff1f2', // Rose 50
    textColor: '#f43f5f', // Rose 500
  },
  {
    label: 'ИИ-ассистент',
    value: 'ai',
    bgColor: '#fdf4ff', // Fuchsia 50
    textColor: '#d946ef', // Fuchsia 500
  },
]

// Опции для селекта
export const badgeStyleOptions = badgeStylePresets.map(preset => ({
  label: preset.label,
  value: preset.value,
}))

// Функция получения цветов по пресету
export const getBadgeColors = (style: string) => {
  const preset = badgeStylePresets.find(p => p.value === style)
  return preset || badgeStylePresets[0] // Возвращаем primary по умолчанию
}

