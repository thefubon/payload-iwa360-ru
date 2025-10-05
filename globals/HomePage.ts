import { GlobalConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { FormBlock } from '../blocks/FormBlock'
import { Partners } from '../blocks/Partners'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Главная страница',
  admin: {
    group: 'Контент',
  },
  access: {
    read: () => true, // Публичный доступ для чтения
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок (Meta Title)',
      required: true,
      admin: {
        description: 'SEO заголовок для главной страницы',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание (Meta Description)',
      required: true,
      admin: {
        description: 'SEO описание для главной страницы',
      },
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

