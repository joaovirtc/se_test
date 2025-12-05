import createMiddleware from 'next-intl/middleware';
import { COOKIE_KEYS } from './app/constants/cookies';

const intlMiddleware = createMiddleware({
  locales: ['en', 'pt-BR', 'es', 'it', 'fr', 'de'],
  localeDetection: true,
  defaultLocale: 'en',
});

export function middleware(req: any) {
  const cookieValue = req.cookies.get(`${COOKIE_KEYS.VERSION}`);
  if (!cookieValue) {
    const response = intlMiddleware(req);
    response.cookies.set(`${COOKIE_KEYS.VERSION}`, 'true', {
      httpOnly: false,
      path: '/',
      secure: true,
      maxAge: 4 * 30 * 24 * 60 * 60, // 4 months
    });

    return response;
  }

  // Se o cookie já existe, não alterá-lo
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(pt-br|pt-BR|en|es|it|fr|de)/:path*'],
};