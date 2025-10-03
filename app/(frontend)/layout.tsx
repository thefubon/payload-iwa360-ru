import type { Metadata } from "next";
import "@/styles/globals.css";
import { getPayload } from "payload";
import config from "@/payload.config";
import Header from "@/components/Header";
import type { SettingsPayload } from "@/types/payload";

export const metadata: Metadata = {
  title: "Payload | Blocks",
  description: "Hello World!",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getPayload({ config });
  
  // Получаем настройки меню
  const settings = await payload.findGlobal({
    slug: 'settings',
  }) as SettingsPayload;

  // Подготавливаем данные для Header
  const menuLogo = settings.menuLogo && typeof settings.menuLogo === 'object' 
    ? settings.menuLogo 
    : undefined;

  const mainMenu = settings.mainMenu?.map((item) => ({
    type: item.type,
    label: item.label,
    url: item.url,
    dropdownItems: item.dropdownItems?.map((dropItem) => ({
      label: dropItem.label,
      url: dropItem.url,
      icon: dropItem.icon && typeof dropItem.icon === 'object' ? dropItem.icon : undefined,
      description: dropItem.description,
    })),
  }));

  return (
    <html lang="ru">
      <body className="antialiased">
        <Header 
          menuLogo={menuLogo}
          mainMenu={mainMenu}
          authMenu={settings.authMenu}
        />
        {children}
      </body>
    </html>
  );
}
