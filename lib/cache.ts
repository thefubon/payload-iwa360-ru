import { getPayload } from 'payload'
import config from '@/payload.config'
import { unstable_cache } from 'next/cache'

// Кешированное получение Settings с автоматической инвалидацией через тег
export const getCachedSettings = async () => {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      return await payload.findGlobal({ slug: 'settings' })
    },
    ['global-settings'],
    {
      revalidate: 3600, // Перевалидация каждый час
      tags: ['settings'], // Тег для ручной инвалидации
    }
  )()
}

// Кешированное получение HomePage
export const getCachedHomePage = async () => {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      return await payload.findGlobal({ slug: 'home-page' })
    },
    ['global-homepage'],
    {
      revalidate: 3600,
      tags: ['homepage'],
    }
  )()
}

