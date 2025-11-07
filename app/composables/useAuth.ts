import { getJwtExp } from '~/composables/useAppCookie';

export default function useAuth() {
  const { post } = useApi();
  const { setToken, removeToken } = useAppCookie();

  let refreshTimer: ReturnType<typeof setTimeout> | null = null;

  const signIn = async (
    userData: { email: string; password: string },
    rememberUser: boolean
  ) => {
    const { accessToken } = await post<{ accessToken: string }>('/auth/login', {
      email: userData.email,
      password: userData.password,
    });

    if (accessToken) {
      if (rememberUser) {
        setToken(accessToken);
        scheduleTokenRefresh(accessToken, rememberUser);
        navigateTo('/');
      } else {
        if (import.meta.client) {
          sessionStorage.setItem('token', accessToken);
        }
        scheduleTokenRefresh(accessToken, rememberUser);
        navigateTo('/');
      }
    }
  };

  const scheduleTokenRefresh = (token: string, rememberUser: boolean) => {
    const exp = getJwtExp(token);
    if (!exp) return;

    const nowSec = Math.floor(Date.now() / 1000);
    const timeLeftSec = exp - nowSec - 60;

    if (timeLeftSec <= 0) {
      void refreshAccessToken(rememberUser);
      return;
    }

    if (refreshTimer) clearTimeout(refreshTimer);

    refreshTimer = setTimeout(() => {
      void refreshAccessToken(rememberUser);
    }, timeLeftSec * 1000);
  };

  const refreshAccessToken = async (rememberUser: boolean) => {
    try {
      const { accessToken } = await post<{ accessToken: string }>(
        '/auth/refresh'
      );
      if (accessToken) {
        if (rememberUser) {
          setToken(accessToken);
          scheduleTokenRefresh(accessToken, rememberUser);
        } else {
          if (import.meta.client) {
            sessionStorage.setItem('token', accessToken);
          }
          scheduleTokenRefresh(accessToken, rememberUser);
        }
      }
    } catch {
      if (refreshTimer) {
        clearTimeout(refreshTimer);
        refreshTimer = null;
      }

      if (rememberUser) {
        removeToken();
      } else {
        if (import.meta.client) {
          sessionStorage.removeItem('token');
        }
      }

      navigateTo('/auth/login');
    }
  };

  const logout = () => {
    if (refreshTimer) {
      clearTimeout(refreshTimer);
      refreshTimer = null;
    }
    if (import.meta.client) {
      sessionStorage.removeItem('token');
    }
    removeToken();
    navigateTo('/auth/login');
  };

  const passwordChange = async (userEmail: { email: string }) => {
    await post('/auth/forgot', { email: userEmail.email });
  };

  return {
    signIn,
    logout,
    passwordChange,
  };
}
