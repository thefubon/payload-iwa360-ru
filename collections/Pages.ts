import { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { FormBlock } from '../blocks/FormBlock'
import { Partners } from '../blocks/Partners'
import { TabsBlock } from '../blocks/TabsBlock'
import { isPublic, canCreate, canUpdate, canDelete } from '../access'

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
    description: 'Управление страницами сайта',
  },
  access: {
    read: isPublic, // Публичный доступ для чтения
    create: canCreate, // Редакторы и администраторы
    update: canUpdate, // Редакторы и администраторы
    delete: canDelete, // Только администраторы
    admin: ({ req: { user } }) => Boolean(user), // Все авторизованные могут видеть в админке
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
      blocks: [Hero, FormBlock, Partners, TabsBlock],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}

