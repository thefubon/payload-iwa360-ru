import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Настройки сайта',
  access: {
    read: () => true, // Публичный доступ для чтения
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      label: 'Логотип',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок (Title)',
      required: false,
      defaultValue: 'IVA360',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание (Description)',
      required: false,
      defaultValue: 'Добро пожаловать на наш сайт',
    },
  ],
}
