'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { TabsBlockProps } from '@/types/blocks'
import type { ProductIconType } from '@/types/components'
import { ProductIcon } from '@/components/icons/ProductIcons'

export default function TabsBlockComponent({ tabs }: TabsBlockProps) {
  const defaultTab = tabs[0]?.id || '0'
  const [activeTab, setActiveTab] = useState(defaultTab)

  // Устанавливаем первый таб как активный при монтировании
  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0]?.id || '0')
    }
  }, [tabs])

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Desktop: вертикальные кнопки слева */}
          {/* Mobile: горизонтальный скролл сверху */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
            {/* Tabs List */}
            <TabsList className="
              flex flex-row lg:flex-col
              flex-nowrap
              w-full lg:w-auto lg:min-w-[200px] xl:min-w-[240px]
              h-auto 
              bg-transparent 
              p-0 
              gap-2 lg:gap-3
              overflow-x-auto overflow-y-hidden lg:overflow-x-visible
              scroll-smooth
              snap-x snap-mandatory lg:snap-none
              scrollbar-hide
              [-webkit-overflow-scrolling:touch]
              justify-start
              items-start
            ">
            {tabs.map((tab, index) => {
              // Определяем компонент иконки
              const renderIcon = () => {
                const isActive = activeTab === (tab.id || String(index))
                const iconColor = isActive ? tab.iconColor : '#9ca3af'

                if (tab.productIcon) {
                  return (
                    <ProductIcon 
                      icon={tab.productIcon as ProductIconType} 
                      size={24}
                      style={{ color: iconColor }}
                    />
                  )
                }
                
                return null
              }

              return (
                <TabsTrigger
                    key={tab.id || index}
                    value={tab.id || String(index)}
                    className="
                      flex items-center gap-2 lg:gap-3
                      px-4 py-2.5 lg:px-5 lg:py-3
                      min-w-[140px] sm:min-w-[160px] lg:min-w-[180px]
                      h-auto
                      rounded-lg
                      data-[state=active]:shadow-md
                      transition-all duration-200
                      snap-center snap-always lg:snap-align-none
                      scroll-m-2
                      flex-shrink-0
                      justify-start
                      text-sm lg:text-base
                      font-medium
                      border border-transparent
                      data-[state=active]:border-border
                    "
                    style={{
                      backgroundColor: activeTab === (tab.id || String(index)) 
                        ? tab.bgColor 
                        : 'transparent',
                    }}
                  >
                    {renderIcon()}
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {/* Tabs Content */}
            <div className="flex-1 w-full lg:w-auto">
              {tabs.map((tab, index) => (
                <TabsContent
                  key={tab.id || index}
                  value={tab.id || String(index)}
                  className="mt-0 space-y-4 lg:space-y-6"
                >
                  <div className="rounded-2xl overflow-hidden bg-muted/30 p-6 lg:p-8 space-y-4 lg:space-y-6">
                    {/* Title */}
                    <h3 
                      className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground"
                      dangerouslySetInnerHTML={{ __html: tab.title }}
                    />
                    
                    {/* Image */}
                    <div className="relative w-full rounded-xl overflow-hidden bg-background/50">
                      <Image
                        src={tab.image.url}
                        alt={tab.image.alt || tab.title}
                        width={tab.image.width || 1200}
                        height={tab.image.height || 800}
                        className="w-full h-auto object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>

      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        /* Smooth momentum scrolling for iOS */
        .scrollbar-hide {
          -webkit-overflow-scrolling: touch;
        }
        /* Принудительное выравнивание scroll-контейнера слева */
        .scrollbar-hide {
          scroll-padding-left: 0 !important;
          scroll-snap-align: start;
        }
        /* Убираем центрирование содержимого */
        @media (max-width: 1023px) {
          [role="tablist"] {
            justify-content: flex-start !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  )
}

