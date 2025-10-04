// Типы для React компонентов (не связаны с Payload)

import type { MediaType, MenuItemPayload, AuthMenuPayload } from './payload'
import type { PageParams } from './pages'
import type { BlockType, FormData } from './blocks'

export interface HeaderProps {
  menuLogo?: MediaType
  mainMenu?: MenuItemPayload[]
  authMenu?: AuthMenuPayload
}

export interface ListItemProps {
  title: string
  href: string
  children?: React.ReactNode
  icon?: MediaType
}

export interface PageComponentProps {
  params: Promise<PageParams>
}

// Cookie Banner Props
export interface CookieBannerProps {
  enabled?: boolean
  title?: string
  description?: string
  acceptButtonText?: string
  policyLinkText?: string
}

// Form Modal Props
export interface FormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  modalTitle?: string
  modalDescription?: string
  formData: FormData
  consentText?: string
}

// Form Block Component Props
export interface FormBlockComponentProps {
  backgroundColor?: string
  title?: string
  description?: string
  formData: FormData
}

// Render Blocks Props
export interface RenderBlocksProps {
  blocks: BlockType[]
  consentText?: string
}

// Product Icon Props
export type ProductIconType = 
  | 'meetings' 
  | 'webinars' 
  | 'streams' 
  | 'messenger' 
  | 'mail' 
  | 'disk' 
  | 'ai' 
  | 'none'

export interface ProductIconProps {
  icon: ProductIconType
  className?: string
  size?: number
}

