'use client'

import Link from 'next/link'
import Image from 'next/image'
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
                <span className="text-xl font-bold text-gray-900">IVA360</span>
              )}
            </Link>
          </div>

          {/* Главное меню */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {mainMenu?.map((item, index) => (
                <NavigationMenuItem key={index}>
                  {item.type === 'link' ? (
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link href={item.url || '#'}>{item.label}</Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.dropdownItems?.map((dropItem, dropIndex) => (
                            <ListItem
                              key={dropIndex}
                              title={dropItem.label}
                              href={dropItem.url}
                              icon={dropItem.icon && typeof dropItem.icon === 'object' ? dropItem.icon : undefined}
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

function ListItem({ title, href, children, icon }: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
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
              <div className="text-sm font-medium leading-none">{title}</div>
              {children && (
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
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
