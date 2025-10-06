import type { Field } from 'payload'

export const brandFields: Field[] = [
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
    defaultValue: 'IWA360',
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Описание (Description)',
    required: false,
    defaultValue: 'Добро пожаловать на наш сайт',
  },
]

