import type { Field } from 'payload'
import { menuColorOptions, productIconOptions } from '../../blocks/shared'

export const menuFields: Field[] = [
  {
    name: 'menuLogo',
    type: 'upload',
    label: 'Логотип в меню',
    relationTo: 'media',
    required: false,
    admin: {
      description: 'Логотип, который будет отображаться в шапке сайта',
    },
  },
  {
    name: 'mainMenu',
    type: 'array',
    label: 'Главное меню',
    admin: {
      description: 'Основные пункты меню (слева)',
    },
    fields: [
      {
        name: 'type',
        type: 'select',
        label: 'Тип пункта',
        required: true,
        defaultValue: 'link',
        options: [
          { label: 'Обычная ссылка', value: 'link' },
          { label: 'Выпадающее меню', value: 'dropdown' },
        ],
      },
      {
        name: 'label',
        type: 'text',
        label: 'Название',
        required: true,
      },
      {
        name: 'url',
        type: 'text',
        label: 'Ссылка',
        required: false,
        admin: {
          description: 'Для обычной ссылки (например: /about)',
        },
      },
      {
        name: 'activeTextColor',
        type: 'select',
        label: 'Цвет текста (активное состояние)',
        required: false,
        admin: {
          description: 'Цвет текста когда пункт меню активен. По умолчанию: Primary',
        },
        options: menuColorOptions,
      },
      {
        name: 'activeBorderColor',
        type: 'select',
        label: 'Цвет бордера (активное состояние)',
        required: false,
        admin: {
          description: 'Цвет нижнего бордера когда пункт меню активен. По умолчанию: Primary',
        },
        options: menuColorOptions,
      },
      {
        name: 'dropdownItems',
        type: 'array',
        label: 'Пункты выпадающего меню',
        fields: [
          {
            name: 'label',
            type: 'text',
            label: 'Название',
            required: true,
          },
          {
            name: 'url',
            type: 'text',
            label: 'Ссылка',
            required: true,
          },
          {
            name: 'iconType',
            type: 'select',
            label: 'Тип иконки',
            required: true,
            defaultValue: 'none',
            options: [
              { label: 'Без иконки', value: 'none' },
              { label: 'Кастомная иконка продукта', value: 'custom' },
              { label: 'Загрузить картинку', value: 'image' },
            ],
            admin: {
              description: 'Выберите тип иконки для пункта меню',
            },
          },
          {
            name: 'customIcon',
            type: 'select',
            label: 'Выберите иконку',
            required: false,
            admin: {
              condition: (data, siblingData) => siblingData?.iconType === 'custom',
            },
            options: productIconOptions,
          },
          {
            name: 'iconBgColor',
            type: 'select',
            label: 'Цвет фона иконки',
            required: false,
            defaultValue: '#E0F7F2',
            admin: {
              condition: (data, siblingData) => siblingData?.iconType === 'custom',
              description: 'Цвет фона квадрата с иконкой. По умолчанию: Primary 50',
            },
            options: menuColorOptions,
          },
          {
            name: 'iconColor',
            type: 'select',
            label: 'Цвет иконки',
            required: false,
            defaultValue: '#00B08B',
            admin: {
              condition: (data, siblingData) => siblingData?.iconType === 'custom',
              description: 'Цвет самой иконки. По умолчанию: Primary 500',
            },
            options: menuColorOptions,
          },
          {
            name: 'iconSize',
            type: 'number',
            label: 'Размер иконки',
            required: false,
            defaultValue: 24,
            min: 12,
            max: 64,
            admin: {
              condition: (data, siblingData) => siblingData?.iconType === 'custom',
              description: 'Размер кастомной иконки в пикселях',
            },
          },
          {
            name: 'icon',
            type: 'upload',
            label: 'Загрузить картинку',
            relationTo: 'media',
            required: false,
            admin: {
              condition: (data, siblingData) => siblingData?.iconType === 'image',
              description: 'Загрузите собственную картинку для иконки',
            },
          },
          {
            name: 'imageWidth',
            type: 'number',
            label: 'Ширина картинки',
            required: false,
            defaultValue: 48,
            min: 24,
            max: 96,
            admin: {
              condition: (data, siblingData) => siblingData?.iconType === 'image',
              description: 'Ширина картинки в пикселях',
            },
          },
          {
            name: 'description',
            type: 'text',
            label: 'Описание',
            required: false,
          },
          {
            name: 'activeTextColor',
            type: 'select',
            label: 'Цвет текста (активное состояние)',
            required: false,
            admin: {
              description: 'Цвет текста когда пункт меню активен. По умолчанию: Primary',
            },
            options: menuColorOptions,
          },
          {
            name: 'activeBorderColor',
            type: 'select',
            label: 'Цвет бордера (активное состояние)',
            required: false,
            admin: {
              description: 'Цвет нижнего бордера родительского пункта когда этот элемент активен. По умолчанию: Primary',
            },
            options: menuColorOptions,
          },
        ],
      },
    ],
  },
  {
    name: 'authMenu',
    type: 'group',
    label: 'Меню авторизации (справа)',
    fields: [
      {
        name: 'loginButton',
        type: 'group',
        label: 'Кнопка "Войти"',
        fields: [
          {
            name: 'label',
            type: 'text',
            label: 'Текст кнопки',
            defaultValue: 'Войти',
            required: true,
          },
          {
            name: 'url',
            type: 'text',
            label: 'Ссылка',
            defaultValue: '/login',
            required: true,
          },
        ],
      },
      {
        name: 'registerButton',
        type: 'group',
        label: 'Кнопка "Регистрация"',
        fields: [
          {
            name: 'label',
            type: 'text',
            label: 'Текст кнопки',
            defaultValue: 'Регистрация',
            required: true,
          },
          {
            name: 'url',
            type: 'text',
            label: 'Ссылка',
            defaultValue: '/register',
            required: true,
          },
        ],
      },
    ],
  },
]

