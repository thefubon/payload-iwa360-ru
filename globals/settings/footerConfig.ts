import type { Field } from 'payload'

export const footerFields: Field[] = [
  {
    name: 'copyrightText',
    type: 'text',
    label: 'Текст копирайта',
    defaultValue: '© {year} IWA360. Все права защищены.',
    required: true,
    admin: {
      description: 'Используйте {year} для автоподстановки текущего года',
    },
  },
  {
    name: 'footerLinks',
    type: 'array',
    label: 'Ссылки в подвале',
    minRows: 1,
    maxRows: 5,
    admin: {
      description: 'Ссылки, которые будут отображаться в footer',
    },
    fields: [
      {
        name: 'label',
        type: 'text',
        label: 'Текст ссылки',
        required: true,
      },
      {
        name: 'url',
        type: 'text',
        label: 'URL',
        required: true,
        admin: {
          description: 'Например: /privacy-policy',
        },
      },
    ],
  },
]

