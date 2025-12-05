import { setCookie, getCookie } from 'cookies-next';

export function useCookie(cookieName : string) {
  const cookie = getCookie(cookieName);
  return cookie;
}