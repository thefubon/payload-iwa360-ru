import type { Metadata } from "next";
import "@/styles/globals.css";
import { getPayload } from "payload";
import config from "@/payload.config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { Toaster } from "@/components/ui/sonner";
import type { SettingsPayload } from "@/types/payload";

export const metadata: Metadata = {
  title: {
    default: "IWA 360",
    template: "%s | IWA 360",
  },
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
    activeTextColor: item.activeTextColor,
    activeBorderColor: item.activeBorderColor,
    dropdownItems: item.dropdownItems?.map((dropItem) => ({
      label: dropItem.label,
      url: dropItem.url,
      icon: dropItem.icon && typeof dropItem.icon === 'object' ? dropItem.icon : undefined,
      description: dropItem.description,
      activeTextColor: dropItem.activeTextColor,
      activeBorderColor: dropItem.activeBorderColor,
    })),
  }));

  return (
    <html lang="ru">
      <body className="antialiased flex flex-col min-h-screen">
        <Header 
          menuLogo={menuLogo}
          mainMenu={mainMenu}
          authMenu={settings.authMenu}
        />
        {children}
        <Footer />
        <CookieBanner
          enabled={settings.cookieBanner?.enabled}
          title={settings.cookieBanner?.title}
          description={settings.cookieBanner?.description}
          acceptButtonText={settings.cookieBanner?.acceptButtonText}
          policyLinkText={settings.cookieBanner?.policyLinkText}
        />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
