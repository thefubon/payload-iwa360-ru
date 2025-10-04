'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Cookie } from 'lucide-react'
import type { CookieBannerProps } from '@/types/components'

export default function CookieBanner({
  enabled = true,
  title = 'Мы используем файлы cookie',
  description = 'Этот сайт использует файлы cookie для улучшения пользовательского опыта и анализа трафика. Продолжая использовать сайт, вы соглашаетесь с использованием cookie.',
  acceptButtonText = 'Принять',
  policyLinkText = 'Политика конфиденциальности',
}: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Проверяем, принял ли пользователь cookie
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent && enabled) {
      // Показываем баннер с небольшой задержкой для плавности
      setTimeout(() => setIsVisible(true), 500)
    }
  }, [enabled])

  const handleAccept = () => {
    // Сохраняем согласие в localStorage
    localStorage.setItem('cookieConsent', 'true')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setIsVisible(false)
  }

  if (!isVisible || !enabled) {
    return null
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] w-full max-w-md animate-in slide-in-from-bottom-5 duration-500"
      role="region"
      aria-label="Cookie consent banner"
    >
      <div className="bg-background border border-border shadow-lg rounded-lg p-6 space-y-4">
        {/* Иконка и заголовок */}
        <div className="flex items-start gap-3">
          <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-base text-foreground">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
            <Link
              href="/privacy-policy"
              className="text-sm text-primary hover:underline inline-block"
            >
              {policyLinkText}
            </Link>
          </div>
        </div>

        {/* Кнопка согласия */}
        <Button
          onClick={handleAccept}
          className="w-full"
          size="lg"
        >
          {acceptButtonText}
        </Button>
      </div>
    </div>
  )
}

