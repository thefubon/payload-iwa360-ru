import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { PageComponentProps } from '@/types/components'
import type { PageResult, GenerateStaticParamsResult } from '@/types/pages'

// Отключаем кэширование для получения актуальных данных
export const revalidate = 0

// Генерация статических путей для всех страниц
export async function generateStaticParams(): Promise<GenerateStaticParamsResult[]> {
  const payload = await getPayload({ config })
  
  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
  }) as PageResult

  return pages.docs.map((page) => ({
    slug: page.slug,
  }))
}

export default async function Page({ params }: PageComponentProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  // Получаем страницу по slug
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  }) as PageResult

  const page = result.docs[0]

  // Если страница не найдена, показываем 404
  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Кнопка назад */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8">
          ← Назад на главную
        </Link>

        {/* Заголовок страницы */}
        <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          {page.title}
        </h1>

        {/* Описание страницы */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {page.description}
          </p>
        </div>

        {/* Метаинформация */}
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Обновлено:{' '}
            {new Date(page.updatedAt).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

