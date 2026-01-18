import { COOKIE_NAMES } from '@/types/composables/cookies';
import type { CookieOptions } from '#app';

const baseOptions: CookieOptions<string | null> & { readonly: false } = {
  path: '/',
  sameSite: 'none',
  secure: true,
  readonly: false,
};

function cookie(name: string): Ref<string | null> {
  return useCookie<string | null>(name, baseOptions) as Ref<string | null>;
}

export const useAppCookie = () => {
  const token = cookie(COOKIE_NAMES.TOKEN);

  const setToken = (value: string) => {
    token.value = value;
  };

  const removeToken = () => {
    token.value = null;
  };

  const getCookie = (name: string) => {
    return cookie(name).value;
  };

  const setCookie = (name: string, value: string | null) => {
    cookie(name).value = value;
  };

  const removeCookie = (name: string) => {
    cookie(name).value = null;
  };

  return {
    token,
    setToken,
    removeToken,
    getCookie,
    setCookie,
    removeCookie,
  };
};
