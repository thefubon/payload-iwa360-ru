// Типы для блоков конструктора страниц

import type { MediaType } from './payload'

// Пропсы для компонента HeroBlock
export interface HeroBlockProps {
  backgroundColor?: string
  textColor?: 'foreground' | 'background'
  title: string
  description: string
  image: MediaType
  button: {
    text: string
    url: string
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    customColor?: string
    textColor?: string
    icon?: string
  }
}

// Данные Hero блока из Payload CMS
export interface HeroBlockData {
  blockType: 'hero'
  id?: string
  backgroundColor?: string
  textColor?: 'foreground' | 'background'
  title: string
  description: string
  image: MediaType
  button: {
    text: string
    url: string
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    customColor?: string
    textColor?: string
    icon?: string
  }
}

// Базовый тип для любого блока
export interface BlockType {
  blockType: string
  id?: string
  [key: string]: any
}

