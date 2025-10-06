'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FormModal from '@/components/FormModal'
import type { HeroBlockProps, HeroButton, FormData } from '@/types/blocks'
import { ArrowRight, ArrowUpRight, ChevronRight, Send, Download, Plus, Check, ExternalLink, Search, Rocket, Sparkles } from 'lucide-react'
import { ProductIcon, type ProductIconType } from '@/components/icons'
import { getBadgeColors } from '@/blocks/shared'

export default function HeroBlock({
  backgroundColor = '#ffffff',
  noPadding = false,
  textColor = 'foreground',
  title,
  badges = [],
  description,
  image,
  buttons = [],
  consentText,
}: HeroBlockProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedForm, setSelectedForm] = useState<{
    formData: FormData
    modalTitle?: string
    modalDescription?: string
  } | null>(null)

  // Определяем классы цвета текста
  const textColorClasses = textColor === 'background' 
    ? 'text-background dark:text-background' 
    : 'text-foreground dark:text-foreground'

  // Проверяем, нужно ли скрывать градиент и линию (когда фон прозрачный)
  const isTransparentBackground = backgroundColor === 'transparent'
  
  // Определяем классы padding
  const paddingClasses = noPadding 
    ? 'px-0 py-0' 
    : 'px-6 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12'

  const handleFormButtonClick = (button: HeroButton) => {
    if (button.buttonType === 'form' && button.form && typeof button.form === 'object') {
      setSelectedForm({
        formData: button.form as FormData,
        modalTitle: button.modalTitle,
        modalDescription: button.modalDescription,
      })
      setModalOpen(true)
    }
  }

  const renderButton = (button: HeroButton, index: number) => {
    // Маппинг иконок
    const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
      'ArrowRight': ArrowRight,
      'ArrowUpRight': ArrowUpRight,
      'ChevronRight': ChevronRight,
      'Send': Send,
      'Download': Download,
      'Plus': Plus,
      'Check': Check,
      'ExternalLink': ExternalLink,
      'Search': Search,
      'Rocket': Rocket,
      'Sparkles': Sparkles,
    }
    
    // Получаем компонент иконки
    const IconComponent = button.icon ? iconMap[button.icon] : null

    // Создаем inline стиль для кастомного цвета текста
    const customTextStyle = button.textColor ? {
      color: button.textColor,
    } : undefined

    // Добавляем класс для переопределения цвета текста
    const customColorClass = button.textColor ? '[&]:!text-[--custom-color]' : ''

    const buttonContent = (
      <>
        <span>{button.text}</span>
        {IconComponent && <IconComponent className="size-6" />}
      </>
    )

    if (button.buttonType === 'form') {
      return (
        <Button
          key={button.id || index}
          onClick={() => handleFormButtonClick(button)}
          variant={button.variant || 'default'}
          size="lg"
          className={`text-base px-8 py-6 w-full lg:w-auto rounded-lg ${customColorClass}`}
          style={button.textColor ? { ...customTextStyle, '--custom-color': button.textColor } as React.CSSProperties : undefined}
        >
          <span className="inline-flex items-center gap-2">
            {buttonContent}
          </span>
        </Button>
      )
    }

    return (
      <Button
        key={button.id || index}
        asChild
        variant={button.variant || 'default'}
        size="lg"
        className={`text-base px-8 py-6 w-full lg:w-auto rounded-lg ${customColorClass}`}
        style={button.textColor ? { ...customTextStyle, '--custom-color': button.textColor } as React.CSSProperties : undefined}
      >
        <Link 
          href={button.url || '#'} 
          scroll={true} 
          className="inline-flex items-center gap-2"
        >
          {buttonContent}
        </Link>
      </Button>
    )
  }
  
  return (
    <section className="py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative overflow-hidden ${!isTransparentBackground ? 'rounded-2xl' : ''}`}>
          {/* Слой 1: Цвет фона */}
          <div
            className="absolute inset-0 z-0"
            style={{ backgroundColor }}
          />
          
          {/* Слой 2: Градиент (адаптивный) - скрываем если фон прозрачный */}
          {!isTransparentBackground && (
            <div
              className="absolute inset-0 z-10 bg-gradient-to-br from-white/60 to-white/0 lg:bg-gradient-to-tl lg:from-white/60 lg:to-white/0"
            />
          )}

          {/* Декоративная линия SVG - скрываем если фон прозрачный */}
          {!isTransparentBackground && (
            <div 
              className="absolute z-10 w-[110%] h-auto pointer-events-none lg:w-[65%] lg:bottom-0"
            >
              <svg 
                viewBox="0 0 1196 795" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto lg:scale-110 lg:origin-bottom-right"
                preserveAspectRatio="xMidYMax meet"
              >
                <path 
                  d="M24.9998 737.832C189.289 665.956 469.547 726.919 644.788 755.801C893.013 796.712 1013.31 766.723 812.298 428.519C611.286 90.3144 227.595 -103.948 375.483 123.042C477.922 280.273 935.841 454.764 1171 503.537" 
                  stroke="white" 
                  strokeOpacity="0.2" 
                  strokeWidth="50" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}

          {/* Контент */}
          <div className={`relative z-20 ${paddingClasses}`}>
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:items-center">
              {/* Текстовый блок */}
              <div className="space-y-8 text-left w-full">
                <h1 
                  className={textColorClasses}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                
                {/* Бейджи */}
                {badges && badges.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {badges.map((badge, index) => {
                      const opacity = badge.isActive !== false ? 'opacity-100' : 'opacity-50'
                      // Получаем цвета из пресета (поддержка и старых bgColor/textColor и новых badgeStyle)
                      const colors = badge.badgeStyle 
                        ? getBadgeColors(badge.badgeStyle)
                        : { bgColor: badge.bgColor || '#f0f9ff', textColor: badge.textColor || '#0ea5e9' }
                      
                      return (
                        <span
                          key={badge.id || index}
                          className={`inline-flex items-center gap-1.5 px-2 py-1.5 lg:gap-1.5 lg:px-3 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-opacity ${opacity}`}
                          style={{
                            backgroundColor: colors.bgColor,
                            color: colors.textColor,
                          }}
                        >
                          {badge.icon && badge.icon !== 'none' && (
                            <ProductIcon 
                              icon={badge.icon as ProductIconType} 
                              className="flex-shrink-0 size-4"
                            />
                          )}
                          <span>{badge.label}</span>
                          {badge.isBeta && (
                            <span 
                              className="inline-flex items-center px-1.5 rounded-md text-[10px] lg:text-xs font-semibold border"
                              style={{
                                color: badge.textColor,
                                borderColor: badge.textColor,
                                backgroundColor: 'transparent',
                              }}
                            >
                              Beta
                            </span>
                          )}
                        </span>
                      )
                    })}
                  </div>
                )}
                
                {/* Описание - показываем только если заполнено */}
                {description && (
                  <p 
                    className={`text-lg md:text-xl leading-relaxed ${textColorClasses}`}
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}

                {/* Кнопки */}
                {buttons && buttons.length > 0 && (
                  <div className="pt-2 md:pt-4 flex flex-col lg:flex-row gap-4 justify-start w-full">
                    {buttons.map((button, index) => renderButton(button, index))}
                  </div>
                )}
              </div>

              {/* Картинка */}
              <div className="relative w-full rounded-2xl overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.alt || title}
                  width={image.width || 800}
                  height={image.height || 600}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно с формой */}
      {selectedForm && (
        <FormModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          modalTitle={selectedForm.modalTitle}
          modalDescription={selectedForm.modalDescription}
          formData={selectedForm.formData}
          consentText={consentText}
        />
      )}
    </section>
  )
}

