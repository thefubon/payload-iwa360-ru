'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X, Loader2, FileText, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Button } from '@/components/ui/button'

interface SearchResult {
  id: string | number
  title: string
  slug: string
  description: string
  url: string
}

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Debounce функция для оптимизации запросов
  const debounce = <T extends (...args: never[]) => void>(func: T, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const performSearch = async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([])
      setError(null)
      // Обновляем URL без перезагрузки страницы
      if (searchQuery.trim().length === 0) {
        window.history.replaceState({}, '', '/search')
      }
      return
    }

    setIsLoading(true)
    setError(null)

    // Обновляем URL с параметром поиска
    window.history.replaceState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`)

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      )

      if (!response.ok) {
        throw new Error('Ошибка при выполнении поиска')
      }

      const data = await response.json()
      setResults(data.results || [])
    } catch (err) {
      console.error('Search error:', err)
      setError('Не удалось выполнить поиск. Попробуйте еще раз.')
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(performSearch, 300), [])

  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  // Выполнить поиск при загрузке страницы если есть параметр q
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleResultClick = (url: string) => {
    router.push(url)
  }

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text
    }

    const regex = new RegExp(`(${highlight})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-primary/20 text-foreground font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  return (
    <main className="bg-background flex-1">
      {/* Header */}
      <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Поиск по сайту</h1>
              <p className="text-sm text-muted-foreground">
                Найдите нужную информацию на нашем сайте
              </p>
            </div>
          </div>

          {/* Search Input */}
          <InputGroup className="[--radius:0.75rem] max-w-3xl">
            <InputGroupInput
              type="text"
              placeholder="Начните вводить запрос..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="text-base"
            />
            <InputGroupAddon>
              <Search className="h-4 w-4" />
            </InputGroupAddon>
            {!isLoading && results.length > 0 && (
              <InputGroupAddon align="inline-end" className="text-xs text-muted-foreground">
                {results.length} {results.length === 1 ? 'результат' : results.length < 5 ? 'результата' : 'результатов'}
              </InputGroupAddon>
            )}
            {isLoading && (
              <InputGroupAddon align="inline-end">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
              </InputGroupAddon>
            )}
            {query && !isLoading && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="icon-xs"
                  variant="ghost"
                  onClick={() => setQuery('')}
                  aria-label="Очистить"
                  className="rounded-full"
                >
                  <X className="h-3.5 w-3.5" />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl">
          {error && (
            <div className="text-center py-8 text-destructive">
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && query.trim().length >= 2 && results.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <FileText className="h-8 w-8 opacity-50" />
              </div>
              <p className="text-lg font-medium mb-1">Ничего не найдено</p>
              <p className="text-sm">по запросу &quot;{query}&quot;</p>
              <p className="text-sm mt-2 text-muted-foreground/70">Попробуйте изменить запрос</p>
            </div>
          )}

          {query.trim().length < 2 && (
            <div className="text-center py-12 text-muted-foreground">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg font-medium mb-1">Начните поиск</p>
              <p className="text-sm text-muted-foreground/70">Введите минимум 2 символа</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-3">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.url)}
                  className="w-full text-left p-5 rounded-xl border hover:bg-accent/50 hover:border-primary/50 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary line-clamp-1 transition-colors">
                        {highlightText(result.title, query)}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {highlightText(result.description, query)}
                      </p>
                      <p className="text-xs text-muted-foreground/70 font-mono">
                        {result.url}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

