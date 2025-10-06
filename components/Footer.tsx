import Link from 'next/link'

type FooterLink = {
  label: string
  url: string
  id?: string
}

type FooterProps = {
  copyrightText?: string
  footerLinks?: FooterLink[]
}

export default function Footer({ copyrightText, footerLinks }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  // Заменяем {year} на текущий год
  const copyright = copyrightText 
    ? copyrightText.replace('{year}', String(currentYear))
    : `© ${currentYear} IWA360. Все права защищены.`

  // Дефолтные ссылки, если не заданы в CMS
  const defaultLinks: FooterLink[] = [
    { label: '🔍 Поиск', url: '/search' },
    { label: 'Политика конфиденциальности', url: '/privacy-policy' },
    { label: 'Обработка персональных данных', url: '/personal-data' },
  ]

  const links = footerLinks && footerLinks.length > 0 ? footerLinks : defaultLinks
  
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Копирайт */}
          <div className="text-sm text-muted-foreground">
            {copyright}
          </div>

          {/* Ссылки на правила */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            {links.map((link, index) => (
              <Link
                key={link.id || index}
                href={link.url}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

