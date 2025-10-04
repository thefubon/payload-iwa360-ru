import { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { FormBlock } from '../blocks/FormBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
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
      name: 'layout',
      type: 'blocks',
      label: 'Контент страницы',
      blocks: [Hero, FormBlock],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}

