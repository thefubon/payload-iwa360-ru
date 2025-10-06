// Типы для блоков конструктора страниц

import type { MediaType } from './payload'

// Тип для бейджа
export interface Badge {
  label: string
  icon: string
  badgeStyle?: string // Новый пресет стиля
  bgColor?: string // Старый способ (для обратной совместимости)
  textColor?: string // Старый способ (для обратной совместимости)
  isActive?: boolean
  isBeta?: boolean
  id?: string
}

// Типы для кнопок Hero блока
export interface HeroButton {
  id?: string
  buttonType: 'link' | 'form'
  text: string
  url?: string
  form?: string | FormData
  modalTitle?: string
  modalDescription?: string
  variant?: 'default' | 'white' | 'destructive' | 'outline' | 'outlinePrimary' | 'secondary' | 'ghost' | 'link'
  textColor?: string
  icon?: string
}

// Пропсы для компонента HeroBlock
export interface HeroBlockProps {
  backgroundColor?: string
  noPadding?: boolean
  textColor?: 'foreground' | 'background'
  title: string
  badges?: Badge[]
  description?: string
  image: MediaType
  buttons?: HeroButton[]
  consentText?: string
}

// Данные Hero блока из Payload CMS
export interface HeroBlockData {
  blockType: 'hero'
  id?: string
  backgroundColor?: string
  noPadding?: boolean
  textColor?: 'foreground' | 'background'
  title: string
  badges?: Badge[]
  description?: string
  image: MediaType
  buttons?: HeroButton[]
  consentText?: string
}

// Типы для FormBlock
export interface FormField {
  id: string
  name: string
  label: string
  fieldType: string
  placeholder?: string
  required?: boolean
  options?: string
  icon?: string
  width?: 'full' | 'half'
}

export interface FormData {
  id: string
  title: string
  fields: FormField[]
  submitButtonText: string
  emailTo: string
  emailSubject?: string
  sendEmailToUser?: boolean
  userEmailSubject?: string
  successTitle: string
  successMessage: string
  showSuccessIcon: boolean
}

export interface FormBlockData {
  blockType: 'form'
  id?: string
  backgroundColor?: string
  title?: string
  description?: string
  form: string | FormData
}

// Типы для Partners блока
export interface PartnerLogo {
  id?: string
  logo: MediaType
  alt: string
  link?: string
}

export interface PartnersBlockProps {
  title: string
  description?: string
  logos: PartnerLogo[]
  animationSpeed?: 'slow' | 'normal' | 'fast'
  grayscale?: boolean
  showCardBackground?: boolean
}

export interface PartnersBlockData {
  blockType: 'partners'
  id?: string
  title: string
  description?: string
  logos: PartnerLogo[]
  animationSpeed?: 'slow' | 'normal' | 'fast'
  grayscale?: boolean
  showCardBackground?: boolean
}

// Типы для Tabs блока
export interface TabItem {
  id?: string
  label: string
  iconType: 'lucide' | 'product' | 'upload' | 'none'
  lucideIcon?: string
  productIcon?: string
  iconImage?: MediaType
  bgColor: string
  iconColor: string
  title: string
  image: MediaType
}

export interface TabsBlockProps {
  tabs: TabItem[]
}

export interface TabsBlockData {
  blockType: 'tabs'
  id?: string
  tabs: TabItem[]
}

// Базовый тип для любого блока
export interface BlockType {
  blockType: string
  id?: string
  [key: string]: unknown
}

