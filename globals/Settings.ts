import { GlobalConfig } from 'payload'
import { isPublic, canUpdate } from '../access'
import { colorOptions, menuColorOptions, productIconOptions } from '../blocks/shared'
import { revalidateTag } from 'next/cache'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Настройки сайта',
  admin: {
    group: 'Контент',
    description: 'Глобальные настройки сайта (меню, логотип, cookie)',
  },
  access: {
    read: isPublic, // Публичный доступ для чтения
    update: canUpdate, // Редакторы и администраторы могут редактировать
  },
  hooks: {
    afterChange: [
      async () => {
        // Инвалидируем кеш при изменении настроек
        revalidateTag('settings')
      },
    ],
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
                      options: colorOptions,
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
                      options: colorOptions,
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
                        description: 'Размер кастомной иконки в пикселях (применится класс size-{число})',
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
                        description: 'Ширина картинки в пикселях (применится класс w-{число})',
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
          ],
        },
        {
          label: 'Подвал сайта',
          description: 'Настройки footer (подвала) сайта',
          fields: [
            {
              name: 'copyrightText',
              type: 'text',
              label: 'Текст копирайта',
              defaultValue: '© {year} IWA360. Все права защищены.',
              required: true,
              admin: {
                description: 'Используйте {year} для автоподстановки текущего года',
              },
            },
            {
              name: 'footerLinks',
              type: 'array',
              label: 'Ссылки в подвале',
              minRows: 1,
              maxRows: 5,
              admin: {
                description: 'Ссылки, которые будут отображаться в footer',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Текст ссылки',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  required: true,
                  admin: {
                    description: 'Например: /privacy-policy',
                  },
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
