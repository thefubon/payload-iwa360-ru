'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { PartnersBlockProps } from '@/types/blocks'

export default function PartnersBlock({
  title,
  description,
  logos,
  animationSpeed = 'normal',
  grayscale = true,
  showCardBackground = false,
}: PartnersBlockProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Определяем скорость анимации в секундах
  const getAnimationDuration = () => {
    switch (animationSpeed) {
      case 'slow':
        return 60
      case 'fast':
        return 20
      default:
        return 40
    }
  }

  useEffect(() => {
    // Небольшая задержка для плавного старта
    const timer = setTimeout(() => {
      setIsAnimating(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Дублируем логотипы для бесшовного loop
  // Используем множитель для создания достаточно длинной ленты
  const duplicatedLogos = [...logos, ...logos, ...logos]

  const renderLogo = (logo: PartnersBlockProps['logos'][0], index: number) => {
    const logoContent = (
      <div
        className={`
          group
          relative flex-shrink-0 h-20 w-40 md:h-24 md:w-52 flex items-center justify-center p-6 md:p-7
          rounded-2xl
          transition-all duration-300
          cursor-pointer
          ${showCardBackground ? 'bg-slate-100 hover:bg-white' : 'bg-transparent'}
          hover:shadow-md
        `}>
        <Image
          src={logo.logo.url}
          alt={logo.alt}
          width={160}
          height={64}
          className={`
            max-w-full max-h-full w-auto h-auto object-contain
            transition-all duration-300
            ${grayscale ? 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100' : 'opacity-80 group-hover:opacity-100'}
          `}
          loading="lazy"
          unoptimized // Для избежания артефактов при анимации
        />
      </div>
    )

    if (logo.link) {
      return (
        <Link
          key={`logo-${index}`}
          href={logo.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          {logoContent}
        </Link>
      )
    }

    return (
      <div key={`logo-${index}`} className="inline-block">
        {logoContent}
      </div>
    )
  }

  return (
    <section className="py-12 overflow-hidden">
      <div className="md:container">
        {/* Заголовок и описание */}
        <div className="mb-12">
          <h2
            className="text-foreground mb-4"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {description && (
            <p
              className="text-lg text-muted-foreground max-w-3xl"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        {/* Infinite scroll контейнер */}
        <div
          className="relative w-full overflow-hidden py-2"
          onMouseEnter={() => {
            if (scrollerRef.current) {
              scrollerRef.current.style.animationPlayState = 'paused'
            }
          }}
          onMouseLeave={() => {
            if (scrollerRef.current) {
              scrollerRef.current.style.animationPlayState = 'running'
            }
          }}>
          {/* Анимированная лента логотипов */}
          <div
            ref={scrollerRef}
            className={`flex gap-4 py-2 ${isAnimating ? 'animate-infinite-scroll' : ''}`}
            style={{
              animationDuration: `${getAnimationDuration()}s`,
              width: 'max-content',
            }}>
            {duplicatedLogos.map((logo, index) => renderLogo(logo, index))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll linear infinite;
        }
      `}</style>
    </section>
  )
}

