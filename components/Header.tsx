'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import { ProductIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import SearchModal from '@/components/SearchModal'
import type { HeaderProps, ListItemProps } from '@/types/components'
import type { MediaType, MenuItemPayload, AuthMenuPayload } from '@/types/payload'
import { cn } from '@/lib/utils'

// Компонент мобильного меню
function MobileMenu({ 
  isOpen, 
  onClose, 
  menuLogo, 
  mainMenu, 
  authMenu,
  normalizeUrl,
  isActive
}: {
  isOpen: boolean
  onClose: () => void
  menuLogo?: MediaType
  mainMenu?: MenuItemPayload[]
  authMenu?: AuthMenuPayload
  normalizeUrl: (url: string) => string
  isActive: (url: string) => boolean
}) {
  const [expandedItem, setExpandedItem] = useState<number | null>(null)

  // Блокируем скролл body когда меню открыто
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background md:hidden">
      {/* Header с логотипом и кнопкой закрыть - Sticky Top */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Логотип */}
          <Link href="/" onClick={onClose}>
            {menuLogo?.url ? (
              <Image
                src={menuLogo.url}
                alt={menuLogo.alt || 'Logo'}
                width={menuLogo.width || 120}
                height={menuLogo.height || 40}
                className="h-10 w-auto"
                priority
              />
            ) : (
              <span className="text-xl font-bold">IWA360</span>
            )}
          </Link>
          
          {/* Кнопка закрыть */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            aria-label="Закрыть меню"
          >
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Контент меню - Scrollable */}
      <div className="overflow-y-auto bg-background" style={{ height: 'calc(100vh - 4rem - 80px)' }}>
        <nav className="px-4 py-6">
          {mainMenu?.map((item, index) => {
            const isItemActive = item.type === 'link' ? isActive(item.url || '#') : false
            const isExpanded = expandedItem === index
            
            return (
              <div key={index} className="border-b border-border last:border-0">
                {item.type === 'link' ? (
                  <Link
                    href={normalizeUrl(item.url || '#')}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between py-4 text-base font-medium transition-colors",
                      isItemActive && "font-semibold"
                    )}
                    style={isItemActive && item.activeTextColor ? { color: item.activeTextColor } : undefined}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setExpandedItem(isExpanded ? null : index)}
                      className="flex items-center justify-between w-full py-4 text-base font-medium transition-colors"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={cn(
                          "size-5 transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    
                    {/* Выпадающие элементы */}
                    {isExpanded && item.dropdownItems && (
                      <div className="pb-4 space-y-2">
                        {item.dropdownItems.map((dropItem, dropIndex: number) => (
                          <Link
                            key={dropIndex}
                            href={normalizeUrl(dropItem.url)}
                            onClick={onClose}
                            className={cn(
                              "flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-muted",
                              isActive(dropItem.url) && "bg-muted"
                            )}
                          >
                            {/* Иконка */}
                            {dropItem.iconType === 'custom' && dropItem.customIcon && (
                              <div 
                                className="flex-shrink-0 flex items-center justify-center rounded-lg p-2"
                                style={{ 
                                  backgroundColor: dropItem.iconBgColor || '#E0F7F2'
                                }}
                              >
                                <ProductIcon 
                                  icon={dropItem.customIcon} 
                                  size={dropItem.iconSize || 20}
                                  className="transition-colors"
                                  style={{ 
                                    color: dropItem.iconColor || '#00B08B',
                                    width: `${dropItem.iconSize || 20}px`,
                                    height: `${dropItem.iconSize || 20}px`
                                  }}
                                />
                              </div>
                            )}
                            
                            {dropItem.iconType === 'image' && dropItem.icon && typeof dropItem.icon === 'object' && dropItem.icon.url && (
                              <div className="flex-shrink-0">
                                <Image
                                  src={dropItem.icon.url}
                                  alt={dropItem.icon.alt || dropItem.label}
                                  width={dropItem.imageWidth || 40}
                                  height={dropItem.imageWidth || 40}
                                  className="rounded-lg object-cover"
                                />
                              </div>
                            )}
                            
                            {/* Текст */}
                            <div className="flex-1 min-w-0">
                              <div 
                                className={cn(
                                  "text-sm font-semibold leading-tight mb-1",
                                  isActive(dropItem.url) && "font-bold"
                                )}
                                style={isActive(dropItem.url) && dropItem.activeTextColor ? { color: dropItem.activeTextColor } : undefined}
                              >
                                {dropItem.label}
                              </div>
                              {dropItem.description && (
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {dropItem.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </nav>
      </div>

      {/* Footer с кнопками - Sticky Bottom */}
      <div className="sticky bottom-0 z-10 bg-background border-t p-4">
        <div className="flex flex-col gap-3">
          {authMenu?.loginButton && (
            <Button 
              variant="outline" 
              className="w-full"
              asChild
            >
              <Link href={authMenu.loginButton.url} onClick={onClose}>
                {authMenu.loginButton.label}
              </Link>
            </Button>
          )}
          {authMenu?.registerButton && (
            <Button 
              className="w-full"
              asChild
            >
              <Link href={authMenu.registerButton.url} onClick={onClose}>
                {authMenu.registerButton.label}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Header({ menuLogo, mainMenu, authMenu }: HeaderProps) {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Горячая клавиша для открытия поиска (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Нормализация URL - добавляет "/" в начало, если его нет
  const normalizeUrl = (url: string) => {
    if (!url) return '#'
    // Если URL начинается с http/https, возвращаем как есть
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    // Добавляем "/" в начало, если его нет
    return url.startsWith('/') ? url : `/${url}`
  }

  // Проверка активности ссылки
  const isActive = (url: string) => {
    const normalizedUrl = normalizeUrl(url)
    return pathname === normalizedUrl
  }

  // Проверка активности выпадающего меню (если любая из внутренних ссылок активна)
  const isDropdownActive = (dropdownItems?: Array<{ url: string }>) => {
    return dropdownItems?.some((item) => isActive(item.url)) || false
  }

  // Получить активный пункт выпадающего меню
  const getActiveDropdownItem = (dropdownItems?: Array<{ url: string; activeTextColor?: string; activeBorderColor?: string }>) => {
    return dropdownItems?.find((item) => isActive(item.url))
  }

  // Получить цвет текста для активного пункта
  const getActiveTextColor = (item: { url?: string; activeTextColor?: string }, dropdownItems?: Array<{ url: string; activeTextColor?: string; activeBorderColor?: string }>) => {
    // Для обычной ссылки
    if (item.url && isActive(item.url)) {
      return item.activeTextColor || null
    }
    // Для выпадающего меню - проверяем активный элемент внутри
    const activeDropdownItem = getActiveDropdownItem(dropdownItems)
    if (activeDropdownItem) {
      return activeDropdownItem.activeTextColor || null
    }
    return null
  }

  // Получить цвет бордера для активного пункта
  const getActiveBorderColor = (item: { url?: string; activeBorderColor?: string }, dropdownItems?: Array<{ url: string; activeTextColor?: string; activeBorderColor?: string }>) => {
    // Для обычной ссылки
    if (item.url && isActive(item.url)) {
      return item.activeBorderColor || null
    }
    // Для выпадающего меню - проверяем активный элемент внутри
    const activeDropdownItem = getActiveDropdownItem(dropdownItems)
    if (activeDropdownItem) {
      return activeDropdownItem.activeBorderColor || null
    }
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="relative">
          <div className="flex h-16 items-center justify-between">
            {/* Логотип */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                {menuLogo?.url ? (
                  <Image
                    src={menuLogo.url}
                    alt={menuLogo.alt || 'Logo'}
                    width={menuLogo.width || 120}
                    height={menuLogo.height || 40}
                    className="h-10 w-auto"
                    priority
                  />
                ) : (
                  <span className="text-xl font-bold text-gray-900">IWA360</span>
                )}
              </Link>
            </div>

            {/* Главное меню */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
              {mainMenu?.map((item, index) => {
                const isItemActive = item.type === 'link' ? isActive(item.url || '#') : isDropdownActive(item.dropdownItems)
                const textColor = isItemActive ? getActiveTextColor(item, item.dropdownItems) : null
                const borderColor = isItemActive ? getActiveBorderColor(item, item.dropdownItems) : null
                
                // Формируем стили если элемент активен
                const activeStyles = isItemActive ? {
                  color: textColor || undefined,
                  '--border-color': borderColor || '#00B08B'
                } as React.CSSProperties & { '--border-color'?: string } : undefined
                
                return (
                  <NavigationMenuItem key={index}>
                    {item.type === 'link' ? (
                      <NavigationMenuLink 
                        asChild 
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isItemActive && 'after:h-1',
                          'hover:bg-transparent focus:bg-transparent hover:text-current focus:text-current'
                        )}
                        style={activeStyles}
                      >
                        <Link href={normalizeUrl(item.url || '#')}>{item.label}</Link>
                      </NavigationMenuLink>
                    ) : (
                      <>
                        <NavigationMenuTrigger 
                          className={cn(
                            isItemActive && 'after:h-1'
                          )}
                          style={activeStyles}
                        >
                          {item.label}
                        </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <DropdownMenuContent 
                          items={item.dropdownItems || []} 
                          normalizeUrl={normalizeUrl}
                          isActive={isActive}
                        />
                      </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                )
              })}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Меню авторизации */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {/* Иконка поиска */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Поиск по сайту (Ctrl+K)"
                title="Поиск по сайту (Ctrl+K)"
              >
                <Search className="size-5" />
              </Button>
              
              {authMenu?.loginButton && (
                <Button variant="ghost" asChild>
                  <Link href={authMenu.loginButton.url}>
                    {authMenu.loginButton.label}
                  </Link>
                </Button>
              )}
              {authMenu?.registerButton && (
                <Button asChild>
                  <Link href={authMenu.registerButton.url}>
                    {authMenu.registerButton.label}
                  </Link>
                </Button>
              )}
            </div>

            {/* Мобильное меню */}
            <div className="flex md:hidden gap-2">
              {/* Иконка поиска для мобильных */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Поиск по сайту"
              >
                <Search className="size-5" />
              </Button>
              
              {/* Бургер меню */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Открыть меню"
              >
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <span className="sr-only">Открыть меню</span>
              </Button>
            </div>
          </div>
        </nav>
      </div>
      
      {/* Модальное окно поиска */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Мобильное меню - полноэкранное */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuLogo={menuLogo}
        mainMenu={mainMenu}
        authMenu={authMenu}
        normalizeUrl={normalizeUrl}
        isActive={isActive}
      />
    </header>
  )
}

// Компонент для выпадающего меню с локальным состоянием hover
function DropdownMenuContent({ 
  items, 
  normalizeUrl, 
  isActive 
}: { 
  items: MenuItemPayload['dropdownItems']
  normalizeUrl: (url: string) => string
  isActive: (url: string) => boolean
}) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div className="container">
      <ul className={cn(
        "grid w-full gap-4 py-6",
        // Определяем количество колонок на основе количества элементов
        items && items.length === 1 && "md:grid-cols-1",
        items && items.length === 2 && "md:grid-cols-2",
        items && items.length === 3 && "md:grid-cols-3",
        items && items.length === 4 && "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        items && items.length === 5 && "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        items && items.length >= 6 && "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      )}>
        {items?.map((dropItem, dropIndex) => (
          <ListItem
            key={dropIndex}
            title={dropItem.label}
            href={normalizeUrl(dropItem.url)}
            iconType={dropItem.iconType}
            customIcon={dropItem.customIcon}
            iconBgColor={dropItem.iconBgColor}
            iconColor={dropItem.iconColor}
            iconSize={dropItem.iconSize}
            icon={dropItem.icon && typeof dropItem.icon === 'object' ? dropItem.icon : undefined}
            imageWidth={dropItem.imageWidth}
            isActive={isActive(dropItem.url)}
            activeTextColor={dropItem.activeTextColor}
            hoveredItem={hoveredItem}
            onHoverChange={setHoveredItem}
          >
            {dropItem.description}
          </ListItem>
        ))}
      </ul>
    </div>
  )
}

function ListItem({ 
  title, 
  href, 
  children, 
  iconType, 
  customIcon, 
  iconBgColor, 
  iconColor, 
  iconSize, 
  icon, 
  imageWidth, 
  isActive, 
  activeTextColor,
  hoveredItem,
  onHoverChange
}: ListItemProps & { 
  isActive?: boolean; 
  activeTextColor?: string;
  hoveredItem?: string | null;
  onHoverChange?: (href: string | null) => void;
}) {
  // Определяем, показывать ли иконку/картинку
  const showImage = iconType === 'image' && icon?.url
  const showCustomIcon = iconType === 'custom' && customIcon

  // Дефолтные значения
  const bgColor = iconBgColor || '#E0F7F2' // Primary 50
  const iconColorValue = iconColor || '#00B08B' // Primary 500
  const iconSizeValue = iconSize || 24 // Размер иконки по умолчанию
  const imgWidth = imageWidth || 48 // Ширина картинки по умолчанию
  
  // Цвет для border - используем activeTextColor если указан, иначе primary
  const borderColor = activeTextColor || '#00B08B' // Primary 500

  // Определяем, должен ли показываться бордер
  // Показываем бордер только если:
  // 1. Элемент в hover и это текущий элемент (hoveredItem === href)
  // 2. Элемент активный (isActive) и НЕТ никакого hover (hoveredItem === null)
  const shouldShowBorder = hoveredItem === href || (isActive && hoveredItem === null)

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link 
          href={href} 
          className="min-w-[200px] border-2 rounded-xl transition-all duration-200"
          style={{
            borderColor: shouldShowBorder ? borderColor : 'transparent',
            ['--menu-border-color' as string]: borderColor,
          } as React.CSSProperties}
          onMouseEnter={() => {
            onHoverChange?.(href)
          }}
          onMouseLeave={() => {
            onHoverChange?.(null)
          }}
        >
          <div className="flex items-start gap-3">
            {showImage && (
              <div className="flex-shrink-0">
                <Image
                  src={icon!.url!}
                  alt={icon!.alt || title}
                  width={imgWidth}
                  height={imgWidth}
                  className={cn('rounded-lg object-cover', `w-${imgWidth} h-${imgWidth}`)}
                  style={{ width: `${imgWidth}px`, height: `${imgWidth}px` }}
                />
              </div>
            )}
            {showCustomIcon && (
              <div 
                className="flex-shrink-0 flex items-center justify-center rounded-lg p-3"
                style={{ 
                  backgroundColor: bgColor
                }}
              >
                <ProductIcon 
                  icon={customIcon} 
                  size={iconSizeValue}
                  className={cn('transition-colors', `size-${iconSizeValue}`)}
                  style={{ 
                    color: iconColorValue,
                    width: `${iconSizeValue}px`,
                    height: `${iconSizeValue}px`
                  }}
                />
              </div>
            )}
            <div className="space-y-1 min-w-0">
              <div className={cn(
                "text-base font-semibold leading-tight mb-1.5 transition-colors",
                isActive && "font-bold"
              )}
              style={isActive && activeTextColor ? { color: activeTextColor } : undefined}
              >
                {title}
              </div>
              {children && (
                <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                  {children}
                </p>
              )}
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
