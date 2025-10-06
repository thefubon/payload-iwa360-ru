import { Block } from 'payload'
import { colorOptions, colorOptionsWithBlack, productIconOptions } from './shared'

export const TabsBlock: Block = {
  slug: 'tabs',
  labels: {
    singular: 'Tabs блок',
    plural: 'Tabs блоки',
  },
  fields: [
    {
      name: 'tabs',
      type: 'array',
      label: 'Табы',
      minRows: 2,
      maxRows: 8,
      labels: {
        singular: 'Таб',
        plural: 'Табы',
      },
      admin: {
        description: 'Добавьте от 2 до 6 табов. Порядок можно менять перетаскиванием.',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Название таба',
          required: true,
          admin: {
            description: 'Текст на кнопке таба',
          },
        },
        {
          name: 'productIcon',
          type: 'select',
          label: 'Иконка таба',
          required: true,
          defaultValue: 'meetings',
          options: productIconOptions,
          admin: {
            description: 'Выберите продуктовую иконку для таба',
          },
        },
        {
          name: 'bgColor',
          type: 'select',
          label: 'Цвет фона кнопки',
          required: true,
          defaultValue: '#f0f9ff',
          options: colorOptions,
        },
        {
          name: 'iconColor',
          type: 'select',
          label: 'Цвет иконки',
          required: true,
          defaultValue: '#0ea5e9',
          options: colorOptionsWithBlack,
        },
        {
          name: 'title',
          type: 'textarea',
          label: 'Заголовок контента',
          required: true,
          admin: {
            description: 'Текст, который будет отображаться над картинкой',
          },
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Картинка контента',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Изображение для этого таба',
          },
        },
      ],
    },
  ],
}

