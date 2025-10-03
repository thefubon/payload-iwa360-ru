// Типы для React компонентов (не связаны с Payload)

import type { MediaType, MenuItemPayload, AuthMenuPayload } from './payload'

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

