// Типы для коллекции Pages

export interface PageData {
  id: string
  title: string
  slug: string
  description: string
  showPageBackground?: boolean
  layout?: Array<{
    blockType: string
    id?: string
    [key: string]: unknown
  }>
  createdAt: string
  updatedAt: string
}

export interface PageResult {
  docs: PageData[]
  totalDocs: number
  limit: number
  totalPages: number
  page?: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage?: number | null
  nextPage?: number | null
}

export interface PageParams {
  slug: string
}

export interface GenerateStaticParamsResult {
  slug: string
}

