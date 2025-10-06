import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { en } from '@payloadcms/translations/languages/en'
import { ru } from '@payloadcms/translations/languages/ru'

// Import collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Forms } from './collections/Forms'
import { FormSubmissions } from './collections/FormSubmissions'

// Import globals
import { HomePage } from './globals/HomePage'
import { Settings } from './globals/Settings'

export default buildConfig({
  // Server URL - важно для email уведомлений и абсолютных ссылок
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [Users, Media, Forms, FormSubmissions, Pages],

  // Define global settings
  globals: [HomePage, Settings],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  
  // TypeScript configuration
  typescript: {
    outputFile: './payload-types.ts',
  },

  // Database configuration
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    // Автоматически обновлять схему только в development
    // На production используйте ручные миграции (см. migrations/README.md)
    push: process.env.NODE_ENV !== 'production',
  }),

  // Admin panel configuration
  admin: {
    meta: {
      titleSuffix: '- IWA360',
    },
    // Можно добавить свой логотип
    // components: {
    //   graphics: {
    //     Logo: '/path/to/logo',
    //     Icon: '/path/to/icon',
    //   },
    // },
  },

  // Internationalization (i18n) для админки
  i18n: {
    supportedLanguages: { en, ru },
    fallbackLanguage: 'en',
  },

  // If you want to resize images, crop, set focal point, etc.
  sharp,

  // CORS configuration (если нужно)
  // cors: [
  //   'http://localhost:3000',
  //   process.env.NEXT_PUBLIC_SERVER_URL || '',
  // ].filter(Boolean),

  // CSRF protection
  // csrf: [
  //   'http://localhost:3000',
  //   process.env.NEXT_PUBLIC_SERVER_URL || '',
  // ].filter(Boolean),

  // Storage plugins
  plugins: [
    // Vercel Blob Storage - используется и в production, и в localhost (если есть токен)
    // Файлы загружаются напрямую в Vercel Blob Storage
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.PAYLOAD_READ_WRITE_TOKEN || '',
    }),
  ],
})