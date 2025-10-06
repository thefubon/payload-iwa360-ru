// Автоматический маппинг иконок для полей формы

export const getFormFieldIcon = (fieldType: string): string => {
  const iconMap: Record<string, string> = {
    email: 'mail',
    tel: 'phone',
    text: 'user',
    textarea: 'message-square',
    number: 'hash',
    date: 'calendar',
    url: 'link',
    select: 'list',
    checkbox: 'check-square',
  }
  
  return iconMap[fieldType] || 'user'
}

