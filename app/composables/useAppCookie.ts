import { COOKIE_NAMES } from '@/types/composables/cookies';

const DEFAULT_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const DIVIDER = '__';

export const useAppCookie = () => {
  function setCookie(cookieName: string, value: string) {
    const cookie = useCookie(cookieName, {
      maxAge: DEFAULT_COOKIE_MAX_AGE,
      path: '/',
    });

    cookie.value = `${value}${DIVIDER}${new Date().getTime()}`;
  }

  function getCookie(cookieName: string, isObject?: boolean) {
    const cookie = useCookie(cookieName);
    const [value, date] = cookie.value ? cookie.value.split(DIVIDER) : [];
    if (isObject) {
      const dataObj = { value };

      if (date) {
        return Object.assign(dataObj, { date: +date });
      }

      return dataObj;
    }

    return value;
  }

  function removeCookie(cookieName: string) {
    const cookie = useCookie(cookieName);
    cookie.value = null;
  }

  const getToken = () => getCookie(COOKIE_NAMES.TOKEN);
  const setToken = (token: string) => setCookie(COOKIE_NAMES.TOKEN, token);
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
