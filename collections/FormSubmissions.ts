import { CollectionConfig } from 'payload'
import { isPublic, isLoggedIn, canDelete } from '../access'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Письмо',
    plural: 'Почта',
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['form', 'submissionData', 'createdAt'],
    description: 'Все отправленные формы с сайта',
    group: 'Почтовый сервер',
  },
  access: {
    read: isLoggedIn, // Только авторизованные пользователи могут читать
    create: isPublic, // Любой может создать submission (отправить форму с сайта)
    update: () => false, // Никто не может редактировать отправленные формы
    delete: canDelete, // Только администраторы могут удалять
    admin: ({ req: { user } }) => Boolean(user), // Все авторизованные могут видеть в админке
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Форма',
      required: true,
      admin: {
        description: 'Какая форма была отправлена',
      },
    },
    {
      name: 'submissionData',
      type: 'json',
      label: 'Данные формы',
      required: true,
      admin: {
        description: 'JSON с данными, которые пользователь отправил',
      },
    },
    {
      name: 'userIP',
      type: 'text',
      label: 'IP адрес',
      admin: {
        description: 'IP адрес пользователя, отправившего форму',
        readOnly: true,
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      label: 'User Agent',
      admin: {
        description: 'Браузер и устройство пользователя',
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}

