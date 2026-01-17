import { useRuntimeConfig } from '#imports';

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.meta.public) {
    return;
  }

  const { token, setToken } = useAppCookie();
  const { logout } = useAuth();

  if (token.value) {
    return;
  }

  try {
    const { serverUrl } = useRuntimeConfig().public;
    const { accessToken } = await $fetch<{ accessToken: string }>(
      '/auth/refresh',
      {
        method: 'POST',
        baseURL: serverUrl,
        credentials: 'include',
      }
    );
    setToken(accessToken);
  } catch {
    await logout();
    return navigateTo('/auth/login');
  }
});
