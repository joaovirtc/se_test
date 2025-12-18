import type { Metadata } from 'next';
import '../globals.css';
import Sidebar from '@/app/components/layout/sidebar/sidebar';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, getLocale } from 'next-intl/server';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import { DataProvider } from "@/app/api/context/languageSelectorAPI";
import UpdateLocalizationsData from "@/app/utils/localization-lang-data";
import { cookies } from 'next/headers';
import TrackingAccess from '../components/modules/access-tracking';
import { COOKIE_KEYS } from "@/app/constants/cookies"
import NextTopLoader from "nextjs-toploader";
import Header from "@/app/components/layout/header/header";
import PreviousPageTracker from "@/app/components/modules/forms/PreviousPageTracker";



export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('HomePage');

  return {
    metadataBase: new URL("https://explore.softexpert.com"),
    title: ` SoftExpert Demo | ${t('title')}`,
    description: t('description'),
    openGraph: {
      title: `SoftExpert Demo | ${t('title')}`,
      description: t('description'),
      images: [
        {
          url: "https://demo-softexpert.s3.us-east-1.amazonaws.com/public/open-graph.png",
          alt: 'open-graph-image',
        },
      ],
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}



interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get(COOKIE_KEYS.AUTH)?.value === 'true';
  const appVersion = cookieStore.get(COOKIE_KEYS.VERSION)?.value
  const versionTrackingAccess = appVersion === "true" ? "light" : appVersion === "false" ? "full" : undefined;



  return (
    <>
      <GoogleAnalytics gaId="G-QT8XHGJEMQ" />
      <GoogleTagManager gtmId="GTM-KMGP3M5" />
      <TrackingAccess version={versionTrackingAccess} />
      <PreviousPageTracker />
      <main className="h-screen flex overflow-hidden relative">
        <DataProvider>
          <UpdateLocalizationsData data="" path="" catSlug="" />
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Sidebar />
            <div className="flex-1 flex flex-col max-h-screen overflow-hidden lg:ml-[370px] 2xl:ml-[400px] max-lg:ml-0">
              <Header />
              <div className="flex-1 overflow-y-auto px-4 children-layout">
                {children}
              </div>
            </div>

          </NextIntlClientProvider>
        </DataProvider>
      </main>
      <NextTopLoader
        color="#00207f"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #00207f,0 0 5px #00207f"
        zIndex={1600}
        showAtBottom={false}
      />
    </>

  );
}
