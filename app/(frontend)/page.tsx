import { Sparkles, Bot, Wifi, Camera } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Цифровая платформа онлайн-коммуникаций</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Все для вашей работы в{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              едином
            </span>
            {" "}пространстве
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Встречи, мессенджер, вебинары, трансляции, ИИ-ассистент, почта и календарь — продуктовая экосистема для корпоративных онлайн-коммуникаций
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-lg">
              <Sparkles className="w-5 h-5" />
              Попробовать бесплатно
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary/5 transition-colors font-medium text-lg">
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>

      {/* Images Section */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Все продукты в одном приложении
          </h2>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Image 1 */}
            <div className="relative h-[300px] md:h-[400px] lg:row-span-2 lg:h-auto rounded-2xl md:rounded-3xl overflow-hidden">
              <Image
                src="/img/demo-content/img-1.png"
                alt="Product 1"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Image 2 */}
            <div className="relative h-[200px] rounded-2xl md:rounded-3xl overflow-hidden">
              <Image
                src="/img/demo-content/img-2.jpg"
                alt="Product 2"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Image 3 */}
            <div className="relative h-[200px] rounded-2xl md:rounded-3xl overflow-hidden">
              <Image
                src="/img/demo-content/img-3.png"
                alt="Product 3"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Image 4 */}
            <div className="relative h-[300px] md:h-[400px] lg:row-span-2 lg:h-auto rounded-2xl md:rounded-3xl overflow-hidden">
              <Image
                src="/img/demo-content/img-4.jpg"
                alt="Product 4"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Image 5 */}
            <div className="relative h-[200px] rounded-2xl md:rounded-3xl overflow-hidden">
              <Image
                src="/img/demo-content/img-5.jpg"
                alt="Product 5"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Image 6 */}
            <div className="relative h-[200px] md:col-span-2 rounded-2xl md:rounded-3xl overflow-hidden">
              <Image
                src="/img/demo-content/img-6.jpg"
                alt="Product 6"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Image 9 */}
            <div className="relative h-[200px] rounded-2xl md:rounded-3xl overflow-hidden">
              <Image
                src="/img/demo-content/img-9.jpg"
                alt="Product 9"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Image 7 */}
            <div className="relative h-[200px] md:col-span-2 rounded-2xl md:rounded-3xl overflow-hidden">
              <Image
                src="/img/demo-content/img-7.jpg"
                alt="Product 7"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Image 8 */}
            <div className="relative h-[200px] rounded-2xl md:rounded-3xl overflow-hidden">
              <Image
                src="/img/demo-content/img-8.jpg"
                alt="Product 8"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose IVA 360 Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Почему выбирают IVA 360
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="p-6 rounded-xl border border-slate-200 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Искусственный интеллект внутри</h4>
              <p className="text-sm text-muted-foreground">
                Автоматические протоколы встреч, напоминания и поддержка задач — прямо во время работы
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-slate-200 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Wifi className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Стабильная работа даже при слабом интернете</h4>
              <p className="text-sm text-muted-foreground">
                Оптимизированные технологии передачи данных обеспечивают устойчивую видеосвязь даже в удаленных регионах
              </p>
            </div>
            
            <div className="p-6 rounded-xl border border-slate-200 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Совместимость с профессиональным оборудованием</h4>
              <p className="text-sm text-muted-foreground">
                Поддержка современных стандартов связи и интеграция с камерами и переговорными — для бизнеса любого масштаба
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
