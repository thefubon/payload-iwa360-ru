'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Loader2, FileText } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface SearchResult {
  id: string | number
  title: string
  slug: string
  description: string
  url: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Обработка горячих клавиш Escape для закрытия
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

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
      return
    }

    setIsLoading(true)
    setError(null)

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

  // Сбросить состояние при закрытии модального окна
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setResults([])
      setError(null)
      setIsLoading(false)
    }
  }, [isOpen])

  const handleResultClick = (url: string) => {
    router.push(url)
    onClose()
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex flex-col justify-between gap-y-4">
            <div>
              <DialogTitle className="text-xl font-semibold">Поиск по сайту</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Введите запрос для поиска по страницам и разделам
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                asChild
                className="hidden sm:flex text-xs"
              >
                <Link href={query ? `/search?q=${encodeURIComponent(query)}` : '/search'} target="_blank">
                  Открыть в новой вкладке
                </Link>
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-4">
          <InputGroup className="[--radius:0.75rem]">
            <InputGroupInput
              type="text"
              placeholder="Начните вводить запрос..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
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

        <div className="flex-1 overflow-y-auto px-6 pb-6">
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
            <div className="space-y-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.url)}
                  className="w-full text-left p-4 rounded-xl border hover:bg-accent/50 hover:border-primary/50 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1.5 group-hover:text-primary line-clamp-1 transition-colors">
                        {highlightText(result.title, query)}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-1.5">
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
      </DialogContent>
    </Dialog>
  )
}

