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
                  type: 'tabs',
                  tabs: [
                    {
                      label: 'Отступ от шапки',
                      fields: [
                        {
                          name: 'topOffsetMobile',
                          type: 'number',
                          label: 'Mobile (до 640px)',
                          defaultValue: -100,
                          admin: {
                            description: 'Отступ сверху в пикселях. Может быть отрицательным',
                          },
                        },
                        {
                          name: 'topOffsetSm',
                          type: 'number',
                          label: 'SM (640px+)',
                          defaultValue: -100,
                          admin: {
                            description: 'Отступ сверху в пикселях',
                          },
                        },
                        {
                          name: 'topOffsetMd',
                          type: 'number',
                          label: 'MD (768px+)',
                          defaultValue: -100,
                          admin: {
                            description: 'Отступ сверху в пикселях',
                          },
                        },
                        {
                          name: 'topOffsetLg',
                          type: 'number',
                          label: 'LG (1024px+)',
                          defaultValue: -100,
                          admin: {
                            description: 'Отступ сверху в пикселях',
                          },
                        },
                        {
                          name: 'topOffsetXl',
                          type: 'number',
                          label: 'XL (1280px+)',
                          defaultValue: -100,
                          admin: {
                            description: 'Отступ сверху в пикселях',
                          },
                        },
                        {
                          name: 'topOffset2xl',
                          type: 'number',
                          label: '2XL (1536px+)',
                          defaultValue: -100,
                          admin: {
                            description: 'Отступ сверху в пикселях',
                          },
                        },
                      ],
                    },
                    {
                      label: 'Боковые отступы',
                      fields: [
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
                      ],
                    },
                    {
                      label: 'Масштаб',
                      fields: [
                        {
                          name: 'scaleMobile',
                          type: 'number',
                          label: 'Mobile (до 640px)',
                          defaultValue: 105,
                          min: 10,
                          max: 500,
                          admin: {
                            description: 'Масштаб линии в процентах (100 = оригинальный размер)',
                          },
                        },
                        {
                          name: 'scaleSm',
                          type: 'number',
                          label: 'SM (640px+)',
                          defaultValue: 105,
                          min: 10,
                          max: 500,
                          admin: {
                            description: 'Масштаб линии в процентах',
                          },
                        },
                        {
                          name: 'scaleMd',
                          type: 'number',
                          label: 'MD (768px+)',
                          defaultValue: 105,
                          min: 10,
                          max: 500,
                          admin: {
                            description: 'Масштаб линии в процентах',
                          },
                        },
                        {
                          name: 'scaleLg',
                          type: 'number',
                          label: 'LG (1024px+)',
                          defaultValue: 105,
                          min: 10,
                          max: 500,
                          admin: {
                            description: 'Масштаб линии в процентах',
                          },
                        },
                        {
                          name: 'scaleXl',
                          type: 'number',
                          label: 'XL (1280px+)',
                          defaultValue: 105,
                          min: 10,
                          max: 500,
                          admin: {
                            description: 'Масштаб линии в процентах',
                          },
                        },
                        {
                          name: 'scale2xl',
                          type: 'number',
                          label: '2XL (1536px+)',
                          defaultValue: 105,
                          min: 10,
                          max: 500,
                          admin: {
                            description: 'Масштаб линии в процентах',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

