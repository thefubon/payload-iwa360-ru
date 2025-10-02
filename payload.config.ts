import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

// Import collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'

// Import globals
import { Settings } from './globals/Settings'

export default buildConfig({
  // Server URL - важно для email уведомлений и абсолютных ссылок
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [Users, Media],

  // Define global settings
  globals: [Settings],

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
  }),

  // Admin panel configuration
  admin: {
    meta: {
      titleSuffix: '- IVA360',
    },
    // Можно добавить свой логотип
    // components: {
    //   graphics: {
    //     Logo: '/path/to/logo',
    //     Icon: '/path/to/icon',
    //   },
    // },
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