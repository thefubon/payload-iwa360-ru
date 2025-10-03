import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Настройки сайта',
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
              name: 'logo',
              type: 'upload',
              label: 'Логотип',
              relationTo: 'media',
              required: false,
            },
            {
              name: 'title',
              type: 'text',
              label: 'Заголовок (Title)',
              required: false,
              defaultValue: 'IVA360',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Описание (Description)',
              required: false,
              defaultValue: 'Добро пожаловать на наш сайт',
            },
          ],
        },
        {
          label: 'Меню',
          fields: [
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
                    {
                      label: 'Обычная ссылка',
                      value: 'link',
                    },
                    {
                      label: 'Выпадающее меню',
                      value: 'dropdown',
                    },
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
                    condition: (data, siblingData) => siblingData?.type === 'link',
                    description: 'Для обычной ссылки (например: /about)',
                  },
                },
                {
                  name: 'dropdownItems',
                  type: 'array',
                  label: 'Пункты выпадающего меню',
                  admin: {
                    condition: (data, siblingData) => siblingData?.type === 'dropdown',
                  },
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
                      name: 'icon',
                      type: 'upload',
                      label: 'Иконка/Картинка',
                      relationTo: 'media',
                      required: false,
                    },
                    {
                      name: 'description',
                      type: 'text',
                      label: 'Описание',
                      required: false,
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
          ],
        },
      ],
    },
  ],
}

