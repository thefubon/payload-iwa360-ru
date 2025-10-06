import type { Field} from 'payload'

export const cookieFields: Field[] = [
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
]

