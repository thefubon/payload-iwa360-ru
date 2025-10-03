import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { HeroBlockProps } from '@/types/blocks'
import * as Icons from 'lucide-react'

export default function HeroBlock({
  backgroundColor = '#ffffff',
  textColor = 'foreground',
  title,
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

