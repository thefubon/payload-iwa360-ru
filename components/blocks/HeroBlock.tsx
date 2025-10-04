import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { HeroBlockProps, Badge } from '@/types/blocks'
import * as Icons from 'lucide-react'

// SVG иконки для бейджей
const BadgeIcons = {
  meetings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.5" d="M2.00012 11.5C2.00012 8.21252 2.00012 6.56878 2.90808 5.46243C3.0743 5.25989 3.26001 5.07418 3.46255 4.90796C4.5689 4 6.21264 4 9.50012 4C12.7876 4 14.4313 4 15.5377 4.90796C15.7402 5.07418 15.9259 5.25989 16.0921 5.46243C17.0001 6.56878 17.0001 8.21252 17.0001 11.5V12.5C17.0001 15.7875 17.0001 17.4312 16.0921 18.5376C15.9259 18.7401 15.7402 18.9258 15.5377 19.092C14.4313 20 12.7876 20 9.50012 20C6.21264 20 4.5689 20 3.46255 19.092C3.26001 18.9258 3.0743 18.7401 2.90808 18.5376C2.00012 17.4312 2.00012 15.7875 2.00012 12.5V11.5Z" fill="currentColor"/>
      <path d="M17.0001 9.50019L17.6585 9.17101C19.6043 8.19807 20.5773 7.7116 21.2887 8.15127C22.0001 8.59094 22.0001 9.67872 22.0001 11.8543V12.1461C22.0001 14.3217 22.0001 15.4094 21.2887 15.8491C20.5773 16.2888 19.6043 15.8023 17.6585 14.8294L17.0001 14.5002V9.50019Z" fill="currentColor"/>
    </svg>
  ),
  none: null,
}

export default function HeroBlock({
  backgroundColor = '#ffffff',
  textColor = 'foreground',
  title,
  badges = [],
  description,
  image,
  button,
}: HeroBlockProps) {
  // Определяем классы цвета текста
  const textColorClasses = textColor === 'background' 
    ? 'text-background dark:text-background' 
    : 'text-foreground dark:text-foreground'
  
  // Получаем компонент иконки из lucide-react
  const IconComponent = button.icon && button.icon in Icons 
    ? Icons[button.icon as keyof typeof Icons] as React.ComponentType<{ className?: string; style?: React.CSSProperties }>
    : null
  
  return (
    <section className="py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Слой 1: Цвет фона */}
          <div
            className="absolute inset-0 z-0"
            style={{ backgroundColor }}
          />
          
          {/* Слой 2: Градиент (адаптивный) */}
          <div
            className="absolute inset-0 z-10 bg-gradient-to-br from-white/60 to-white/0 lg:bg-gradient-to-tl lg:from-white/60 lg:to-white/0"
          />

          {/* Декоративная линия SVG */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[110%] h-auto pointer-events-none lg:left-auto lg:-right-6 lg:translate-x-0 lg:w-[65%] lg:-bottom-16">
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

          {/* Контент */}
          <div className="relative z-20 px-6 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12">
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:items-center">
              {/* Текстовый блок */}
              <div className="space-y-4 text-left w-full">
                <h1 
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${textColorClasses}`}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                
                {/* Бейджи */}
                {badges && badges.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {badges.map((badge, index) => {
                      const icon = BadgeIcons[badge.icon as keyof typeof BadgeIcons]
                      const opacity = badge.isActive !== false ? 'opacity-100' : 'opacity-50'
                      
                      return (
                        <span
                          key={badge.id || index}
                          className={`inline-flex items-center gap-1.5 px-2 py-1.5 lg:gap-1.5 lg:px-3 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium transition-opacity ${opacity}`}
                          style={{
                            backgroundColor: badge.bgColor,
                            color: badge.textColor,
                          }}
                        >
                          {icon && (
                            <span className="flex-shrink-0 size-4" style={{ color: badge.textColor }}>
                              {icon}
                            </span>
                          )}
                          <span>{badge.label}</span>
                        </span>
                      )
                    })}
                  </div>
                )}
                
                <p 
                  className={`text-lg md:text-xl leading-relaxed ${textColorClasses}`}
                  dangerouslySetInnerHTML={{ __html: description }}
                />

                {/* Кнопка */}
                <div className="pt-2 flex justify-start w-full">
                  <Button
                    asChild
                    variant={button.variant || 'default'}
                    size="lg"
                    style={
                      button.customColor
                        ? {
                            backgroundColor: button.customColor,
                            color: button.textColor || '#ffffff',
                            borderColor: button.customColor,
                          }
                        : undefined
                    }
                    className="text-base px-8 py-6 w-full lg:w-auto"
                  >
                    <Link href={button.url} scroll={true} className="inline-flex items-center gap-2">
                      <span>{button.text}</span>
                      {IconComponent && (
                        <IconComponent 
                          className="w-5 h-5" 
                          style={
                            button.customColor
                              ? { color: button.textColor || '#ffffff' }
                              : undefined
                          }
                        />
                      )}
                    </Link>
                  </Button>
                </div>
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
    </section>
  )
}

