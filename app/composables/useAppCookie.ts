import { COOKIE_NAMES } from '@/types/composables/cookies';

const isProd = process.env.NODE_ENV === 'production';

export const useAppCookie = () => {
  const token = useCookie<string | null>(COOKIE_NAMES.TOKEN, {
    path: '/',
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd,
  }) as Ref<string | null>;

  const setToken = (value: string) => {
    token.value = value;
  };

  const removeToken = () => {
    token.value = null;
  };

  return {
    token,
    setToken,
    removeToken,
  };
};
