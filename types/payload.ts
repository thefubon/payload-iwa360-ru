// Типы для данных из Payload CMS

export interface MediaType {
  url: string
  alt?: string
  width?: number
  height?: number
}

export interface DropdownItemPayload {
  label: string
  url: string
  icon?: string | MediaType
  description?: string
}

export interface MenuItemPayload {
  type: 'link' | 'dropdown'
  label: string
  url?: string
  dropdownItems?: DropdownItemPayload[]
}

export interface AuthMenuPayload {
  loginButton: {
    label: string
    url: string
  }
  registerButton: {
    label: string
    url: string
  }
}

export interface SettingsPayload {
  logo?: string | MediaType
  title?: string
  description?: string
  menuLogo?: string | MediaType
  mainMenu?: MenuItemPayload[]
  authMenu?: AuthMenuPayload
}

