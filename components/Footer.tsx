import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Копирайт */}
          <div className="text-sm text-muted-foreground">
            © {currentYear} IWA360. Все права защищены.
          </div>

          {/* Ссылки на правила */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <Link
              href="/privacy-policy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/personal-data"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Обработка персональных данных
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

