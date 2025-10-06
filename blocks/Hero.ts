import { Block } from 'payload'
import { backgroundColorOptions, colorOptionsWithBlack, iconOptions, productIconOptions, badgeStyleOptions } from './shared'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero блок',
    plural: 'Hero блоки',
  },
  fields: [
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Цвет фона',
      defaultValue: '#ffffff',
      required: true,
      options: backgroundColorOptions,
      admin: {
        description: 'Выберите цвет фона из палитры Tailwind',
      },
    },
    {
      name: 'noPadding',
      type: 'checkbox',
      label: 'Без отступов',
      defaultValue: false,
      admin: {
        description: 'Убрать внутренние отступы (padding) у Hero блока',
      },
    },
    {
      name: 'textColor',
      type: 'select',
      label: 'Цвет текста',
      defaultValue: 'foreground',
      required: true,
      options: [
        { label: 'Foreground (темный)', value: 'foreground' },
        { label: 'Background (светлый)', value: 'background' },
      ],
      admin: {
        description: 'Выберите цвет для заголовка и описания',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    {
      name: 'badges',
      type: 'array',
      label: 'Бейджи',
      minRows: 0,
      maxRows: 10,
      labels: {
        singular: 'Бейдж',
        plural: 'Бейджи',
      },
      admin: {
        description: 'Настройте бейджи для Hero блока. Порядок можно менять перетаскиванием.',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Текст бейджа',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Иконка',
          required: true,
          options: productIconOptions,
        },
        {
          name: 'badgeStyle',
          type: 'select',
          label: 'Стиль бейджа',
          required: true,
          defaultValue: 'primary',
          options: badgeStyleOptions,
          admin: {
            description: 'Выберите готовый стиль оформления бейджа',
          },
        },
        {
          name: 'isActive',
          type: 'checkbox',
          label: 'Активный',
          defaultValue: true,
          admin: {
            description: 'Если активен - 100% непрозрачность, если нет - 50%',
          },
        },
        {
          name: 'isBeta',
          type: 'checkbox',
          label: 'Beta версия',
          defaultValue: false,
          admin: {
            description: 'Показать метку "Beta" справа от текста бейджа с обводкой',
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
      required: false,
      admin: {
        description: 'Описание под заголовком (необязательное)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Картинка',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Кнопки',
      minRows: 0,
      maxRows: 2,
      labels: {
        singular: 'Кнопка',
        plural: 'Кнопки',
      },
      admin: {
        description: 'Добавьте до 2 кнопок. На десктопе они будут рядом, на мобильных - друг под другом',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'buttonType',
          type: 'select',
          label: 'Тип кнопки',
          required: true,
          defaultValue: 'link',
          options: [
            { label: 'Просто кнопка (ссылка)', value: 'link' },
            { label: 'Кнопка с формой', value: 'form' },
          ],
          admin: {
            description: 'Выберите тип действия кнопки',
          },
        },
        {
          name: 'text',
          type: 'text',
          label: 'Текст кнопки',
          required: true,
          defaultValue: 'Узнать больше',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Ссылка',
          admin: {
            description: 'URL для перехода',
            condition: (data, siblingData) => siblingData?.buttonType === 'link',
          },
        },
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          label: 'Выберите форму',
          admin: {
            description: 'Форма, которая откроется в модальном окне при нажатии',
            condition: (data, siblingData) => siblingData?.buttonType === 'form',
          },
        },
        {
          name: 'modalTitle',
          type: 'text',
          label: 'Заголовок модального окна',
          admin: {
            description: 'Заголовок для модального окна с формой',
            condition: (data, siblingData) => siblingData?.buttonType === 'form',
          },
        },
        {
          name: 'modalDescription',
          type: 'textarea',
          label: 'Описание в модальном окне',
          admin: {
            description: 'Текст описания, который будет отображаться над формой в модальном окне',
            condition: (data, siblingData) => siblingData?.buttonType === 'form',
          },
        },
        {
          name: 'variant',
          type: 'select',
          label: 'Вариант стиля',
          required: true,
          defaultValue: 'default',
          options: [
            {
              label: 'Default',
              value: 'default',
            },
            {
              label: 'White',
              value: 'white',
            },
            {
              label: 'Destructive',
              value: 'destructive',
            },
            {
              label: 'Outline',
              value: 'outline',
            },
            {
              label: 'Outline Primary',
              value: 'outlinePrimary',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
            {
              label: 'Ghost',
              value: 'ghost',
            },
            {
              label: 'Link',
              value: 'link',
            },
          ],
        },
        {
          name: 'textColor',
          type: 'select',
          label: 'Цвет текста кнопки',
          admin: {
            description: 'Выберите цвет текста кнопки (применится к тексту и иконке)',
          },
          options: colorOptionsWithBlack,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Иконка справа от текста',
          admin: {
            description: 'Выберите иконку, которая будет отображаться справа от текста кнопки',
          },
          options: iconOptions,
        },
      ],
    },
  ],
}

