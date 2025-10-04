'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
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
import type { HeaderProps, ListItemProps } from '@/types/components'
import { cn } from '@/lib/utils'

export default function Header({ menuLogo, mainMenu, authMenu }: HeaderProps) {
  const pathname = usePathname()

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
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
          <NavigationMenu className="hidden md:flex" viewport={true}>
            <NavigationMenuList>
              {mainMenu?.map((item, index) => (
                <NavigationMenuItem key={index}>
                  {item.type === 'link' ? (
                    <NavigationMenuLink asChild className={cn(
                      navigationMenuTriggerStyle(),
                      isActive(item.url || '#') && 'bg-accent text-accent-foreground'
                    )}>
                      <Link href={normalizeUrl(item.url || '#')}>{item.label}</Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger className={cn(
                        isDropdownActive(item.dropdownItems) && 'bg-accent text-accent-foreground'
                      )}>
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.dropdownItems?.map((dropItem, dropIndex) => (
                            <ListItem
                              key={dropIndex}
                              title={dropItem.label}
                              href={normalizeUrl(dropItem.url)}
                              icon={dropItem.icon && typeof dropItem.icon === 'object' ? dropItem.icon : undefined}
                              isActive={isActive(dropItem.url)}
                            >
                              {dropItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Меню авторизации */}
          <div className="hidden md:flex md:items-center md:space-x-4">
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

          {/* Мобильное меню (бургер) */}
          <div className="flex md:hidden">
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
    </header>
  )
}

function ListItem({ title, href, children, icon, isActive }: ListItemProps & { isActive?: boolean }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            isActive && 'bg-accent text-accent-foreground font-semibold'
          )}
        >
          <div className="flex items-start gap-3">
            {icon?.url && (
              <div className="flex-shrink-0">
                <Image
                  src={icon.url}
                  alt={icon.alt || title}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <div className={cn(
                "text-sm font-medium leading-none",
                isActive && "font-semibold"
              )}>
                {title}
              </div>
              {children && (
                <p className={cn(
                  "line-clamp-2 text-sm leading-snug mt-1",
                  isActive ? "text-accent-foreground/80" : "text-muted-foreground"
                )}>
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
