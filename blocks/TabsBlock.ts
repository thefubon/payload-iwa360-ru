import { Block } from 'payload'
import { colorOptions, colorOptionsWithBlack, lucideIconOptions, productIconOptions } from './shared'

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
          name: 'iconType',
          type: 'select',
          label: 'Тип иконки',
          required: true,
          defaultValue: 'lucide',
          options: [
            { label: 'Lucide иконка', value: 'lucide' },
            { label: 'Продуктовая иконка', value: 'product' },
            { label: 'Загрузить изображение', value: 'upload' },
            { label: 'Без иконки', value: 'none' },
          ],
          admin: {
            description: 'Выберите тип иконки для кнопки таба',
          },
        },
        {
          name: 'lucideIcon',
          type: 'select',
          label: 'Lucide иконка',
          admin: {
            description: 'Выберите иконку из библиотеки Lucide',
            condition: (data, siblingData) => siblingData?.iconType === 'lucide',
          },
          options: lucideIconOptions,
        },
        {
          name: 'productIcon',
          type: 'select',
          label: 'Продуктовая иконка',
          admin: {
            description: 'Выберите продуктовую иконку',
            condition: (data, siblingData) => siblingData?.iconType === 'product',
          },
          options: productIconOptions,
        },
        {
          name: 'iconImage',
          type: 'upload',
          label: 'Изображение иконки',
          relationTo: 'media',
          admin: {
            description: 'Загрузите изображение для иконки (рекомендуется SVG или PNG с прозрачностью)',
            condition: (data, siblingData) => siblingData?.iconType === 'upload',
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

