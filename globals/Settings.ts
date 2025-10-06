import { GlobalConfig } from 'payload'
import { isPublic, canUpdate } from '../access'
import { revalidateTag } from 'next/cache'
import { brandFields } from './settings/brandConfig'
import { menuFields } from './settings/menuConfig'
import { footerFields } from './settings/footerConfig'
import { cookieFields } from './settings/cookieConfig'

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
          fields: brandFields,
        },
        {
          label: 'Меню',
          fields: menuFields,
        },
        {
          label: 'Подвал сайта',
          description: 'Настройки footer (подвала) сайта',
          fields: footerFields,
        },
        {
          label: 'Cookie и согласия',
          description: 'Настройки баннера cookie и текстов согласий',
          fields: cookieFields,
        },
      ],
    },
  ],
}
