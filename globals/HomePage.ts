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
      type: 'tabs',
      tabs: [
        {
          label: 'Основное',
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
          ],
        },
        {
          label: 'Контент страницы',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'Блоки конструктора',
              blocks: [Hero, FormBlock, Partners],
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          label: 'Настройки дизайна',
          fields: [
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
              name: 'showDecorativeLine',
              type: 'checkbox',
              label: 'Показать декоративную линию',
              defaultValue: false,
              admin: {
                description: 'Включить декоративную линию на фоне страницы',
              },
            },
            {
              name: 'decorativeLineSettings',
              type: 'group',
              label: 'Настройки декоративной линии',
              admin: {
                condition: (data) => data?.showDecorativeLine === true,
              },
              fields: [
                {
                  name: 'topOffsetMobile',
                  type: 'number',
                  label: 'Отступ от шапки Mobile (px)',
                  defaultValue: -100,
                  admin: {
                    description: 'Отступ сверху для мобильных (до 640px). Может быть отрицательным',
                  },
                },
                {
                  name: 'topOffsetSm',
                  type: 'number',
                  label: 'Отступ от шапки SM (px)',
                  defaultValue: -100,
                  admin: {
                    description: 'Отступ сверху для экранов от 640px',
                  },
                },
                {
                  name: 'topOffsetMd',
                  type: 'number',
                  label: 'Отступ от шапки MD (px)',
                  defaultValue: -100,
                  admin: {
                    description: 'Отступ сверху для экранов от 768px',
                  },
                },
                {
                  name: 'topOffsetLg',
                  type: 'number',
                  label: 'Отступ от шапки LG (px)',
                  defaultValue: -100,
                  admin: {
                    description: 'Отступ сверху для экранов от 1024px',
                  },
                },
                {
                  name: 'topOffsetXl',
                  type: 'number',
                  label: 'Отступ от шапки XL (px)',
                  defaultValue: -100,
                  admin: {
                    description: 'Отступ сверху для экранов от 1280px',
                  },
                },
                {
                  name: 'topOffset2xl',
                  type: 'number',
                  label: 'Отступ от шапки 2XL (px)',
                  defaultValue: -100,
                  admin: {
                    description: 'Отступ сверху для экранов от 1536px',
                  },
                },
                {
                  name: 'leftOffset',
                  type: 'number',
                  label: 'Отступ слева (px)',
                  defaultValue: 0,
                  admin: {
                    description: 'Отступ слева. Может быть отрицательным',
                  },
                },
                {
                  name: 'rightOffset',
                  type: 'number',
                  label: 'Отступ справа (px)',
                  defaultValue: 0,
                  admin: {
                    description: 'Отступ справа. Может быть отрицательным',
                  },
                },
                {
                  name: 'scale',
                  type: 'number',
                  label: 'Масштаб (%)',
                  defaultValue: 105,
                  min: 10,
                  max: 500,
                  admin: {
                    description: 'Масштаб линии в процентах (100 = оригинальный размер)',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

