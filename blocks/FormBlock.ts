import { Block } from 'payload'

export const FormBlock: Block = {
  slug: 'form',
  labels: {
    singular: 'Форма обратной связи',
    plural: 'Формы обратной связи',
  },
  fields: [
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Цвет фона',
      defaultValue: '#ffffff',
      required: true,
      options: [
        { label: 'Primary 50', value: '#E0F7F2' },
        { label: 'Primary 500', value: '#00B08B' },
        { label: 'White', value: '#ffffff' },
        { label: 'Slate 50', value: '#f8fafc' },
        { label: 'Gray 50', value: '#f9fafb' },
        { label: 'Zinc 50', value: '#fafafa' },
      ],
      admin: {
        description: 'Выберите цвет фона блока формы',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      admin: {
        description: 'Заголовок над формой (необязательно)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
      admin: {
        description: 'Текст описания под заголовком (необязательно)',
      },
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Выберите форму',
      required: true,
      admin: {
        description: 'Выберите форму, которую хотите отобразить на странице',
      },
    },
  ],
}

