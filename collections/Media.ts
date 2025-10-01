import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true, // Публичный доступ для чтения
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
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        // Высота по умолчанию (сохраняет соотношение)
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

