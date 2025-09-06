import { COOKIE_NAMES } from '@/types/composables/cookies';

const DEFAULT_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const DIVIDER = '__';
const isProd = process.env.NODE_ENV === 'production';

function getJwtExp(token: string | null | undefined): number | null {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1] || ''));
    return typeof payload?.exp === 'number' ? payload.exp : null;
  } catch {
    return null;
  }
}

export const useAppCookie = () => {
  function setCookie(cookieName: string, value: string, maxAge?: number) {
    const cookie = useCookie<string | null>(cookieName, {
      maxAge: maxAge ?? DEFAULT_COOKIE_MAX_AGE,
      path: '/',
      sameSite: isProd ? 'none' : 'lax',
      secure: isProd,
    });

    cookie.value = `${value}${DIVIDER}${new Date().getTime()}`;
  }

  function getCookie(cookieName: string, isObject?: boolean) {
    const cookie = useCookie<string | null>(cookieName);
    const [value, date] = cookie.value ? cookie.value.split(DIVIDER) : [];
    if (isObject) {
      const dataObj: { value: string | undefined; date?: number } = { value };
      if (date) dataObj.date = +date;
      return dataObj;
    }

    return value;
  }

  function removeCookie(cookieName: string) {
    const cookie = useCookie(cookieName);
    cookie.value = null;
  }

  const getToken = () => {
    const token = getCookie(COOKIE_NAMES.TOKEN) as string | undefined;
    if (!token) return token;
    const exp = getJwtExp(token);
    if (exp && exp <= Math.floor(Date.now() / 1000)) {
      removeToken();
      return undefined;
    }
    return token;
  };

  const setToken = (token: string) => {
    const exp = getJwtExp(token);
    const nowSec = Math.floor(Date.now() / 1000);
    const dynamicMaxAge = exp ? Math.max(1, exp - nowSec - 5) : 60 * 15;
    setCookie(COOKIE_NAMES.TOKEN, token, dynamicMaxAge);
  };

  const removeToken = () => removeCookie(COOKIE_NAMES.TOKEN);

  return {
    setCookie,
    getCookie,
    removeCookie,
    setToken,
    getToken,
    removeToken,
  };
};
