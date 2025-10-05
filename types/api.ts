// Типы для API endpoints

export interface ApiFormField {
  name: string
  label: string
  fieldType: string
  required?: boolean
}

export interface ApiFormData {
  id: string
  title: string
  fields?: ApiFormField[]
  emailTo: string
  emailSubject?: string
  sendEmailToUser?: boolean
  userEmailSubject?: string
  userEmailTitle?: string
  userEmailMessage?: string
  successTitle: string
  successMessage: string
  showSuccessIcon: boolean
}

// Типы для поиска
export interface SearchResult {
  id: string | number
  title: string
  slug: string
  description: string
  url: string
}

export interface SearchResponse {
  results: SearchResult[]
  total: number
  query: string
}

