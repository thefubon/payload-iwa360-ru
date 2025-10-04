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

