import { getLocale } from 'next-intl/server';
import { Open_Sans, Plus_Jakarta_Sans } from 'next/font/google';

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  preload: true
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${plus_Jakarta_Sans.className}`}>
        {children}
      </body>
    </html>
  );
}
