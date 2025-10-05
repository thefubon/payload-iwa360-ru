import { getPayload } from 'payload'
import config from '@/payload.config'
import RenderBlocks from '@/components/RenderBlocks'
import type { Metadata } from 'next'
import Link from 'next/link'

// Отключаем кэширование для получения актуальных данных
export const revalidate = 0

// Генерация метаданных для SEO
export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })
  
  const homePage = await payload.findGlobal({
    slug: 'home-page',
  })

  return {
    title: homePage.title || 'IЦA360',
    description: homePage.description || 'Цифровая платформа онлайн-коммуникаций',
  }
}

export default async function Home() {
  const payload = await getPayload({ config })

  // Получаем данные главной страницы
  const homePage = await payload.findGlobal({
    slug: 'home-page',
    depth: 3, // Загружаем связанные данные (формы в кнопках, медиа и т.д.)
  })

  // Получаем настройки для текста согласия
  const settings = await payload.findGlobal({
    slug: 'settings',
  })

  const consentText = settings.formConsent?.text || 'Нажимая на кнопку отправить, вы даете согласие на обработку персональных данных и соглашаетесь с политикой конфиденциальности.'

  // Настройки декоративной линии
  const showLine = homePage.showDecorativeLine || false
  const lineSettings = homePage.decorativeLineSettings
  
  // Адаптивные отступы от шапки
  const topOffsetMobile = lineSettings?.topOffsetMobile ?? -100
  const topOffsetSm = lineSettings?.topOffsetSm ?? -100
  const topOffsetMd = lineSettings?.topOffsetMd ?? -100
  const topOffsetLg = lineSettings?.topOffsetLg ?? -100
  const topOffsetXl = lineSettings?.topOffsetXl ?? -100
  const topOffset2xl = lineSettings?.topOffset2xl ?? -100

  // Адаптивный масштаб
  const scaleMobile = lineSettings?.scaleMobile ?? 105
  const scaleSm = lineSettings?.scaleSm ?? 105
  const scaleMd = lineSettings?.scaleMd ?? 105
  const scaleLg = lineSettings?.scaleLg ?? 105
  const scaleXl = lineSettings?.scaleXl ?? 105
  const scale2xl = lineSettings?.scale2xl ?? 105

  // CSS переменные для адаптивных отступов и масштаба
  const lineStyleVars = {
    '--line-top-mobile': `${topOffsetMobile}px`,
    '--line-top-sm': `${topOffsetSm}px`,
    '--line-top-md': `${topOffsetMd}px`,
    '--line-top-lg': `${topOffsetLg}px`,
    '--line-top-xl': `${topOffsetXl}px`,
    '--line-top-2xl': `${topOffset2xl}px`,
    '--line-scale-mobile': `${scaleMobile}%`,
    '--line-scale-sm': `${scaleSm}%`,
    '--line-scale-md': `${scaleMd}%`,
    '--line-scale-lg': `${scaleLg}%`,
    '--line-scale-xl': `${scaleXl}%`,
    '--line-scale-2xl': `${scale2xl}%`,
  } as React.CSSProperties

  // Формируем стили для background (используются CSS переменные)
  const backgroundStyle = showLine ? lineStyleVars : {}

  return (
    <main 
      className={`flex-1 ${homePage.showPageBackground ? 'bg-slate-100' : 'bg-white'} ${showLine ? 'page-decorative-line' : ''}`}
      style={backgroundStyle}
    >
      {/* Контент страницы */}
      <div className='relative'>
        {/* Рендерим блоки конструктора страниц */}
        {homePage.layout && homePage.layout.length > 0 ? (
          <RenderBlocks
            blocks={homePage.layout}
            consentText={consentText}
          />
        ) : (
          // Fallback: если блоков нет, показываем красивую заглушку
          <div className="min-h-[80vh] flex items-center justify-center">
            <div className="container mx-auto px-4 py-12 max-w-3xl">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-3xl p-12 text-center border-2 border-dashed border-slate-300 dark:border-slate-700">
                {/* Иконка */}
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>

                {/* Заголовок */}
                <h1 className="mb-4 text-foreground">
                  Страница пуста
                </h1>

                {/* Описание */}
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Начните создавать свою главную страницу, добавив блоки через
                  конструктор в админ-панели
                </p>

                {/* Инструкции */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-8 text-left max-w-md mx-auto border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">
                      1
                    </span>
                    Как добавить контент:
                  </h3>
                  <ol className="space-y-2 text-sm text-muted-foreground ml-8">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">→</span>
                      <span>Откройте админ-панель</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">→</span>
                      <span>
                        Перейдите в{' '}
                        <strong className="text-foreground">
                          Контент → Главная страница
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">→</span>
                      <span>Добавьте блоки: Hero, Partners, FormBlock</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">→</span>
                      <span>Сохраните изменения</span>
                    </li>
                  </ol>
                </div>

                {/* Кнопка */}
                <Link
                  href="/admin/globals/home-page"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Перейти в админ-панель
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
