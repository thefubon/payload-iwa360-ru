import SearchPage from '@/components/SearchPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Поиск по сайту | IWA360',
  description: 'Найдите нужную информацию на нашем сайте',
  robots: 'noindex, nofollow', // Не индексируем страницу поиска
}

export default function Search() {
  return <SearchPage />
}

