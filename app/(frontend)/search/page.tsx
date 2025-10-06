import { Suspense } from 'react'
import SearchPage from '@/components/SearchPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Поиск по сайту',
  description: 'Найдите нужную информацию на нашем сайте',
  robots: 'noindex, nofollow', // Не индексируем страницу поиска
}

// ISR: Перегенерация каждый час
export const revalidate = 3600

export default function Search() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Загрузка...</div>}>
      <SearchPage />
    </Suspense>
  )
}

