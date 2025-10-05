'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
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
import { cn } from '@/lib/utils'

export default function Header({ menuLogo, mainMenu, authMenu }: HeaderProps) {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
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
                        <div className="container">
                          <ul className={cn(
                            "grid w-full gap-4 py-6",
                            // Определяем количество колонок на основе количества элементов
                            item.dropdownItems && item.dropdownItems.length === 1 && "md:grid-cols-1",
                            item.dropdownItems && item.dropdownItems.length === 2 && "md:grid-cols-2",
                            item.dropdownItems && item.dropdownItems.length === 3 && "md:grid-cols-3",
                            item.dropdownItems && item.dropdownItems.length === 4 && "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                            item.dropdownItems && item.dropdownItems.length === 5 && "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                            item.dropdownItems && item.dropdownItems.length >= 6 && "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                          )}>
                            {item.dropdownItems?.map((dropItem, dropIndex) => (
                              <ListItem
                                key={dropIndex}
                                title={dropItem.label}
                                href={normalizeUrl(dropItem.url)}
                                icon={dropItem.icon && typeof dropItem.icon === 'object' ? dropItem.icon : undefined}
                                isActive={isActive(dropItem.url)}
                                activeTextColor={dropItem.activeTextColor}
                              >
                                {dropItem.description}
                              </ListItem>
                            ))}
                          </ul>
                        </div>
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
                <Search className="h-5 w-5" />
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
                <Search className="h-5 w-5" />
              </Button>
              
              {/* Бургер меню */}
              <Button variant="ghost" size="icon">
                <svg
                  className="h-6 w-6"
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
    </header>
  )
}

function ListItem({ title, href, children, icon, isActive, activeTextColor }: ListItemProps & { isActive?: boolean; activeTextColor?: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link 
          href={href} 
          className={cn('min-w-[200px]', isActive && 'font-semibold')}
          style={isActive && activeTextColor ? { color: activeTextColor } : undefined}
        >
          <div className="flex items-start gap-3">
            {icon?.url && (
              <div className="flex-shrink-0">
                <Image
                  src={icon.url}
                  alt={icon.alt || title}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-lg object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className={cn(
                "text-sm font-semibold leading-tight mb-1",
                isActive && "font-bold"
              )}>
                {title}
              </div>
              {children && (
                <p className="text-muted-foreground line-clamp-2 text-xs leading-snug">
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
