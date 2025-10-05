import { Block } from 'payload'

export const Partners: Block = {
  slug: 'partners',
  labels: {
    singular: 'Блок партнеров',
    plural: 'Блоки партнеров',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
      defaultValue: 'Trusted by the largest Next.js companies.',
      admin: {
        description: 'Заголовок над логотипами партнеров',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
      admin: {
        description: 'Дополнительное описание под заголовком (необязательно)',
      },
    },
    {
      name: 'showCardBackground',
      type: 'checkbox',
      label: 'Показать фон карточек',
      defaultValue: false,
      admin: {
        description: 'Включить серый фон для карточек логотипов',
      },
    },
    {
      name: 'logos',
      type: 'array',
      label: 'Логотипы',
      minRows: 1,
      maxRows: 30,
      required: true,
      labels: {
        singular: 'Логотип',
        plural: 'Логотипы',
      },
      admin: {
        description: 'Добавьте логотипы партнеров. Рекомендуется минимум 6-8 логотипов для плавной анимации.',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          label: 'Логотип',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Загрузите логотип партнера (PNG с прозрачным фоном рекомендуется)',
          },
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt текст',
          required: true,
          admin: {
            description: 'Название компании для доступности',
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Ссылка',
          admin: {
            description: 'Ссылка на сайт партнера (необязательно)',
          },
        },
      ],
    },
    {
      name: 'animationSpeed',
      type: 'select',
      label: 'Скорость анимации',
      defaultValue: 'normal',
      required: true,
      options: [
        { label: 'Медленная', value: 'slow' },
        { label: 'Обычная', value: 'normal' },
        { label: 'Быстрая', value: 'fast' },
      ],
      admin: {
        description: 'Скорость движения логотипов',
      },
    },
    {
      name: 'grayscale',
      type: 'checkbox',
      label: 'Черно-белые логотипы',
      defaultValue: true,
      admin: {
        description: 'Сделать логотипы черно-белыми с эффектом наведения',
      },
    },
  ],
}

