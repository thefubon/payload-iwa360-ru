import Image from "next/image";
import { getPayload } from "payload";
import config from "@/payload.config";

export default async function Home() {
  const payload = await getPayload({ config });
  
  // Получаем глобальные настройки
  const settings = await payload.findGlobal({
    slug: 'settings',
  });

  // Получаем информацию о логотипе, если он загружен
  const logo = settings.logo && typeof settings.logo === 'object' ? settings.logo : null;

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* Выводим логотип из настроек, если он есть */}
        {logo && logo.url ? (
          <div style={{ width: 180, height: 'auto' }}>
            <Image
              className="dark:invert"
              src={logo.url}
              alt={logo.alt || 'Logo'}
              width={logo.width || 180}
              height={logo.height || 38}
              priority
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ) : (
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        )}

        {/* Блок с данными из Settings */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">
            Данные из Payload Settings:
          </h2>
          
          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">
                Заголовок (Title):
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {settings.title || 'Не установлен'}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">
                Описание (Description):
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                {settings.description || 'Не установлено'}
              </p>
            </div>

            {logo && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-2">
                  Логотип:
                </p>
                <Image
                  src={logo.url}
                  alt={logo.alt || 'Logo'}
                  width={logo.width || 200}
                  height={logo.height || 100}
                  className="rounded border border-gray-200 dark:border-gray-700"
                  style={{ width: 'auto', height: 'auto', maxWidth: '200px' }}
                />
              </div>
            )}
          </div>
        </div>

        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Перейдите в{" "}
            <a href="/admin" className="text-blue-600 dark:text-blue-400 hover:underline">
              панель администратора (/admin)
            </a>
          </li>
          <li className="tracking-[-.01em]">
            Откройте раздел &quot;Настройки сайта&quot; и заполните поля
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/admin"
            rel="noopener noreferrer"
          >
            Админ панель
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://payloadcms.com/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Payload Docs
          </a>
        </div>
      </main>
    </div>
  );
}
