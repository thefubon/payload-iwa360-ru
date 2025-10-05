import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

// Функция для декодирования HTML entities
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&lsquo;': "'",
    '&rsquo;': "'",
    '&mdash;': '—',
    '&ndash;': '–',
  }
  
  return text.replace(/&[#\w]+;/g, (entity) => entities[entity] || entity)
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Минимальная длина запроса - 2 символа' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    // Получаем ВСЕ страницы (с лимитом для безопасности)
    const pagesResult = await payload.find({
      collection: 'pages',
      limit: 100,
      depth: 1, // Получаем свежие данные без глубокого кэширования
    })

    const queryLower = query.toLowerCase()

    console.log(`🔍 Поиск: "${query}" | Всего страниц: ${pagesResult.docs.length}`)

    // Фильтруем и форматируем результаты
    const allResults = pagesResult.docs.map((page) => {
      // Извлекаем текст ТОЛЬКО ИЗ БЛОКОВ (то что видно на фронте)
      let blockText = ''
      let heroTitle = ''
      let heroDescription = ''
      
      if (page.layout && Array.isArray(page.layout)) {
        page.layout.forEach((block) => {
          if (block.blockType === 'hero') {
            const title = decodeHtmlEntities(block.title || '')
            const description = decodeHtmlEntities(block.description || '')
            
            // Сохраняем первый Hero для отображения
            if (!heroTitle) {
              heroTitle = title
              heroDescription = description
            }
            
            blockText += ` ${title} ${description}`
            
            // Добавляем текст из бейджей
            if (block.badges && Array.isArray(block.badges)) {
              block.badges.forEach((badge) => {
                blockText += ` ${decodeHtmlEntities(badge.label || '')}`
              })
            }
          } else if (block.blockType === 'form') {
            blockText += ` ${decodeHtmlEntities(block.title || '')} ${decodeHtmlEntities(block.description || '')}`
          }
        })
      }

      // Если нет блоков - пропускаем страницу
      if (!blockText.trim()) {
        return null
      }

      // Ищем только по контенту блоков (то что видно на фронте)
      const allText = blockText.toLowerCase()

      // Проверяем, есть ли совпадение
      const hasMatch = allText.includes(queryLower)

      // Логируем для отладки
      if (hasMatch) {
        console.log(`✅ Найдено в: "${heroTitle || page.slug}" | Контент из блоков`)
      }

      if (!hasMatch) {
        return null
      }

      // Создаем контекстный snippet из блоков
      let snippet = heroDescription
      const queryPosition = blockText.toLowerCase().indexOf(queryLower)
      
      if (queryPosition !== -1) {
        const start = Math.max(0, queryPosition - 50)
        const end = Math.min(blockText.length, queryPosition + query.length + 50)
        snippet = blockText.substring(start, end).trim()
        if (start > 0) snippet = '...' + snippet
        if (end < blockText.length) snippet = snippet + '...'
      }

      // Ограничиваем длину snippet
      if (snippet && snippet.length > 200) {
        snippet = snippet.substring(0, 200) + '...'
      }

      // Если snippet пустой, используем начало текста
      if (!snippet || snippet.trim() === '') {
        snippet = blockText.substring(0, 150).trim() + '...'
      }

      return {
        id: page.id,
        title: heroTitle || page.slug, // Берем заголовок из Hero блока
        slug: page.slug,
        description: snippet,
        url: `/${page.slug}`,
      }
    })

    // Убираем null значения и берем первые 10
    const results = allResults.filter(Boolean).slice(0, 10)

    console.log(`📊 Результаты: найдено ${results.length} совпадений`)

    return NextResponse.json({
      results,
      total: results.length,
      query,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Ошибка при выполнении поиска' },
      { status: 500 }
    )
  }
}

