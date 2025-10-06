import { CollectionConfig } from 'payload'
import { isPublic, canCreate, canUpdate, canDelete } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Контент',
    description: 'Управление медиафайлами (изображения, видео, документы)',
  },
  access: {
    read: isPublic, // Публичный доступ для чтения
    create: canCreate, // Редакторы и администраторы
    update: canUpdate, // Редакторы и администраторы
    delete: canDelete, // Только администраторы
    admin: ({ req: { user } }) => Boolean(user), // Все авторизованные могут видеть в админке
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt текст',
      required: true,
    },
  ],
  upload: {
    // Разрешенные MIME типы
    mimeTypes: ['image/*', 'application/pdf', 'video/*'],
    
    // Размеры изображений для генерации
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: 768,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    
    // Настройки для админки
    adminThumbnail: 'thumbnail',
    
    // Форматы для генерации
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80,
      },
    },
  },
}

