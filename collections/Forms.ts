import { CollectionConfig } from 'payload'
import { isPublic, canCreate, canUpdate, canDelete } from '../access'

export const Forms: CollectionConfig = {
  slug: 'forms',
  labels: {
    singular: 'Форма',
    plural: 'Конструктор форм',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'emailTo', 'updatedAt'],
    description: 'Конструктор форм обратной связи',
    group: 'Почтовый сервер',
  },
  access: {
    read: isPublic, // Формы доступны для чтения всем (для отображения на сайте)
    create: canCreate, // Редакторы и администраторы
    update: canUpdate, // Редакторы и администраторы
    delete: canDelete, // Только администраторы
    admin: ({ req: { user } }) => Boolean(user), // Все авторизованные могут видеть в админке
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название формы',
      required: true,
      admin: {
        description: 'Название для идентификации формы в админке',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Поля формы',
          description: 'Настройте поля, которые будут отображаться в форме',
          fields: [
            {
              name: 'fields',
              type: 'array',
              label: 'Поля формы',
              minRows: 1,
              labels: {
                singular: 'Поле',
                plural: 'Поля',
              },
              admin: {
                description: 'Добавьте поля для формы. Порядок можно менять перетаскиванием.',
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Имя поля (ID)',
                  required: true,
                  admin: {
                    description: 'Уникальное имя поля (латиницей, без пробелов). Например: email, phone, message',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Подпись поля',
                  required: true,
                  admin: {
                    description: 'Текст, который будет отображаться над полем',
                  },
                },
                {
                  name: 'fieldType',
                  type: 'select',
                  label: 'Тип поля',
                  required: true,
                  defaultValue: 'text',
                  options: [
                    { label: 'Текст', value: 'text' },
                    { label: 'Email', value: 'email' },
                    { label: 'Телефон', value: 'tel' },
                    { label: 'Число', value: 'number' },
                    { label: 'Многострочный текст', value: 'textarea' },
                    { label: 'Выпадающий список', value: 'select' },
                    { label: 'Чекбокс', value: 'checkbox' },
                    { label: 'Дата', value: 'date' },
                    { label: 'URL', value: 'url' },
                  ],
                },
                {
                  name: 'placeholder',
                  type: 'text',
                  label: 'Плейсхолдер',
                  admin: {
                    description: 'Текст-подсказка внутри поля (необязательно)',
                  },
                },
                {
                  name: 'required',
                  type: 'checkbox',
                  label: 'Обязательное поле',
                  defaultValue: false,
                },
                {
                  name: 'options',
                  type: 'textarea',
                  label: 'Опции для выпадающего списка',
                  admin: {
                    description: 'Для типа "Выпадающий список". Введите каждую опцию с новой строки',
                    condition: (data, siblingData) => siblingData?.fieldType === 'select',
                  },
                },
                {
                  name: 'width',
                  type: 'select',
                  label: 'Ширина поля',
                  defaultValue: 'full',
                  options: [
                    { label: 'Полная ширина', value: 'full' },
                    { label: 'Половина ширины', value: 'half' },
                  ],
                  admin: {
                    description: 'Поля "Половина ширины" будут располагаться рядом, если их несколько подряд',
                  },
                },
              ],
            },
            {
              name: 'submitButtonText',
              type: 'text',
              label: 'Текст кнопки отправки',
              defaultValue: 'Отправить',
              required: true,
            },
          ],
        },
        {
          label: 'Настройки email',
          description: 'Укажите, куда будут отправляться письма',
          fields: [
            {
              name: 'emailTo',
              type: 'text',
              label: 'Email получателя',
              required: true,
              admin: {
                description: 'Email, на который будут приходить уведомления о заполнении формы',
              },
            },
            {
              name: 'emailSubject',
              type: 'text',
              label: 'Тема письма',
              defaultValue: 'Новая заявка с сайта',
              admin: {
                description: 'Тема email-уведомления',
              },
            },
            {
              name: 'sendEmailToUser',
              type: 'checkbox',
              label: 'Отправить подтверждение пользователю',
              defaultValue: false,
              admin: {
                description: 'Отправлять ли копию письма пользователю (если в форме есть поле email)',
              },
            },
            {
              name: 'userEmailSubject',
              type: 'text',
              label: 'Тема письма пользователю',
              defaultValue: 'Спасибо за обращение!',
              admin: {
                description: 'Тема email, который получит пользователь',
                condition: (data) => data.sendEmailToUser,
              },
            },
            {
              name: 'userEmailTitle',
              type: 'text',
              label: 'Заголовок письма пользователю',
              defaultValue: 'Спасибо за обращение!',
              admin: {
                description: 'Заголовок в теле письма (H2)',
                condition: (data) => data.sendEmailToUser,
              },
            },
            {
              name: 'userEmailMessage',
              type: 'textarea',
              label: 'Текст письма пользователю',
              defaultValue: 'Мы получили ваше сообщение и свяжемся с вами в ближайшее время.',
              admin: {
                description: 'Основной текст письма, который получит пользователь',
                condition: (data) => data.sendEmailToUser,
              },
            },
          ],
        },
        {
          label: 'Экран успеха',
          description: 'Настройте экран, который увидит пользователь после успешной отправки',
          fields: [
            {
              name: 'successTitle',
              type: 'text',
              label: 'Заголовок экрана успеха',
              defaultValue: 'Спасибо!',
              required: true,
              admin: {
                description: 'Заголовок, который отобразится после успешной отправки формы',
              },
            },
            {
              name: 'successMessage',
              type: 'textarea',
              label: 'Текст экрана успеха',
              defaultValue: 'Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.',
              required: true,
              admin: {
                description: 'Сообщение, которое отобразится после успешной отправки формы',
              },
            },
            {
              name: 'showSuccessIcon',
              type: 'checkbox',
              label: 'Показать иконку успеха',
              defaultValue: true,
              admin: {
                description: 'Отображать ли зелёную галочку на экране успеха',
              },
            },
          ],
        },
      ],
    },
  ],
}

