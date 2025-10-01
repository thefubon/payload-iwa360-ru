import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Включает аутентификацию для этой коллекции
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email автоматически добавляется из-за auth: true
    {
      name: 'name',
      type: 'text',
      label: 'Имя',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Роль',
      required: true,
      defaultValue: 'user',
      options: [
        {
          label: 'Администратор',
          value: 'admin',
        },
        {
          label: 'Пользователь',
          value: 'user',
        },
      ],
    },
  ],
}

