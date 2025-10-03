'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { MediaType, MenuItemPayload, AuthMenuPayload } from '@/types/payload'

interface HeaderProps {
  menuLogo?: MediaType
  mainMenu?: MenuItemPayload[]
  authMenu?: AuthMenuPayload
}

export default function Header({ menuLogo, mainMenu, authMenu }: HeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

          {/* Главное меню (Desktop) */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:space-x-8">
            {mainMenu?.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.type === 'dropdown' && setOpenDropdown(index)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.type === 'link' ? (
                  <Link
                    href={item.url || '#'}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openDropdown === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Выпадающее меню */}
                    {openDropdown === index && item.dropdownItems && (
                      <div className="absolute left-0 mt-2 w-72 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="py-2">
                          {item.dropdownItems.map((dropItem, dropIndex) => (
                            <Link
                              key={dropIndex}
                              href={dropItem.url}
                              className="flex items-start px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                              {dropItem.icon && typeof dropItem.icon === 'object' && dropItem.icon.url && (
                                <div className="flex-shrink-0 mr-3">
                                  <Image
                                    src={dropItem.icon.url}
                                    alt={dropItem.icon.alt || dropItem.label}
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 rounded object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {dropItem.label}
                                </p>
                                {dropItem.description && (
                                  <p className="mt-1 text-xs text-gray-500">
                                    {dropItem.description}
                                  </p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Меню авторизации (Desktop) */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {authMenu?.loginButton && (
              <Link
                href={authMenu.loginButton.url}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {authMenu.loginButton.label}
              </Link>
            )}
            {authMenu?.registerButton && (
              <Link
                href={authMenu.registerButton.url}
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                {authMenu.registerButton.label}
              </Link>
            )}
          </div>

          {/* Мобильное меню (кнопка) */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Открыть меню</span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>

        {/* Мобильное меню (выезжающее) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {mainMenu?.map((item, index) => (
                <div key={index}>
                  {item.type === 'link' ? (
                    <Link
                      href={item.url || '#'}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openDropdown === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openDropdown === index && item.dropdownItems && (
                        <div className="pl-4 space-y-1">
                          {item.dropdownItems.map((dropItem, dropIndex) => (
                            <Link
                              key={dropIndex}
                              href={dropItem.url}
                              className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {dropItem.icon && typeof dropItem.icon === 'object' && dropItem.icon.url && (
                                <Image
                                  src={dropItem.icon.url}
                                  alt={dropItem.icon.alt || dropItem.label}
                                  width={24}
                                  height={24}
                                  className="h-6 w-6 rounded object-cover"
                                />
                              )}
                              <span>{dropItem.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* Кнопки авторизации в мобильном меню */}
              <div className="border-t pt-4 space-y-2">
                {authMenu?.loginButton && (
                  <Link
                    href={authMenu.loginButton.url}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {authMenu.loginButton.label}
                  </Link>
                )}
                {authMenu?.registerButton && (
                  <Link
                    href={authMenu.registerButton.url}
                    className="block rounded-full bg-blue-600 px-3 py-2 text-center text-base font-medium text-white hover:bg-blue-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {authMenu.registerButton.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

