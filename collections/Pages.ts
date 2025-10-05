import { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { FormBlock } from '../blocks/FormBlock'
import { Partners } from '../blocks/Partners'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Страница',
    plural: 'Страницы',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Контент',
  },
  access: {
    read: () => true, // Публичный доступ для чтения
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL (slug)',
      required: true,
      unique: true,
      admin: {
        description: 'Уникальный URL для страницы (например: about, contacts)',
      },
      // Форматируем slug автоматически
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (typeof value === 'string') {
              return value
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
      required: true,
    },
    {
      name: 'showPageBackground',
      type: 'checkbox',
      label: 'Серый фон страницы',
      defaultValue: false,
      admin: {
        description: 'Включить серый фон (Slate 100) для всей страницы',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Контент страницы',
      blocks: [Hero, FormBlock, Partners],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}

