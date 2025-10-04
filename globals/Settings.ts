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
              defaultValue: 'IWA360',
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
                    description: 'Для обычной ссылки (например: /about)',
                  },
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
        {
          label: 'Cookie и согласия',
          description: 'Настройки баннера cookie и текстов согласий',
          fields: [
            {
              name: 'cookieBanner',
              type: 'group',
              label: 'Баннер Cookie',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Показывать баннер Cookie',
                  defaultValue: true,
                  admin: {
                    description: 'Включить/выключить баннер о файлах cookie',
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Заголовок',
                  defaultValue: 'Мы используем файлы cookie',
                  required: true,
                  admin: {
                    condition: (data, siblingData) => siblingData?.enabled,
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Описание',
                  defaultValue: 'Этот сайт использует файлы cookie для улучшения пользовательского опыта и анализа трафика. Продолжая использовать сайт, вы соглашаетесь с использованием cookie.',
                  required: true,
                  admin: {
                    description: 'Текст в баннере cookie',
                    condition: (data, siblingData) => siblingData?.enabled,
                  },
                },
                {
                  name: 'acceptButtonText',
                  type: 'text',
                  label: 'Текст кнопки согласия',
                  defaultValue: 'Принять',
                  required: true,
                  admin: {
                    condition: (data, siblingData) => siblingData?.enabled,
                  },
                },
                {
                  name: 'policyLinkText',
                  type: 'text',
                  label: 'Текст ссылки на политику',
                  defaultValue: 'Политика конфиденциальности',
                  admin: {
                    description: 'Текст ссылки на страницу политики конфиденциальности',
                    condition: (data, siblingData) => siblingData?.enabled,
                  },
                },
              ],
            },
            {
              name: 'formConsent',
              type: 'group',
              label: 'Текст согласия в формах',
              fields: [
                {
                  name: 'text',
                  type: 'textarea',
                  label: 'Текст согласия',
                  defaultValue: 'Нажимая на кнопку отправить, вы даете согласие на обработку персональных данных и соглашаетесь с политикой конфиденциальности.',
                  required: true,
                  admin: {
                    description: 'Текст, который будет отображаться под формой',
                  },
                },
                {
                  name: 'privacyPolicyText',
                  type: 'text',
                  label: 'Текст ссылки "Политика конфиденциальности"',
                  defaultValue: 'политикой конфиденциальности',
                  required: true,
                },
                {
                  name: 'personalDataText',
                  type: 'text',
                  label: 'Текст ссылки "Обработка персональных данных"',
                  defaultValue: 'обработку персональных данных',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
