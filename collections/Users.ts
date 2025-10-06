import { CollectionConfig } from 'payload'
import { isAdmin, isLoggedIn } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Включает аутентификацию для этой коллекции
  admin: {
    useAsTitle: 'email',
    group: 'Управление доступом',
    description: 'Управление пользователями и их ролями',
  },
  // Настройки доступа к коллекции Users
  access: {
    // Читать могут все авторизованные пользователи
    read: isLoggedIn,
    // Создавать, обновлять и удалять могут только администраторы
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    // Доступ к админке могут получить все авторизованные
    admin: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    // Email автоматически добавляется из-за auth: true
    {
      name: 'name',
      type: 'text',
      label: 'Имя',
      required: true,
      admin: {
        description: 'Полное имя пользователя',
      },
    },
    {
      name: 'role',
      type: 'select',
      label: 'Роль пользователя',
      required: true,
      defaultValue: 'viewer',
      options: [
        {
          label: 'Администратор',
          value: 'admin',
        },
        {
          label: 'Редактор',
          value: 'editor',
        },
        {
          label: 'Наблюдатель (только чтение)',
          value: 'viewer',
        },
        {
          label: 'Пользователь (устаревшая роль)',
          value: 'user',
        },
      ],
      admin: {
        description: 'Роль определяет права доступа пользователя в системе',
      },
      // Только администраторы могут изменять роли
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
}

