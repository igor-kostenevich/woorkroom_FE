export default function useAuth() {
  const { post } = useApi();
  const { setToken, removeToken } = useAppCookie();

  const login = async (
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
      } else {
        if (import.meta.client) {
          sessionStorage.setItem('token', accessToken);
        }
      }
      navigateTo('/');
    }
  };

  const refreshAccessToken = async (rememberUser: boolean) => {
    try {
      const { accessToken } = await post<{ accessToken: string }>(
        '/auth/refresh'
      );
      if (accessToken) {
        if (rememberUser) {
          setToken(accessToken);
        } else {
          if (import.meta.client) {
            sessionStorage.setItem('token', accessToken);
          }
        }
      }
    } catch {
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
    sessionStorage.removeItem('token');
    removeToken();
    navigateTo('/auth/login');
  };

  const passwordChange = async (userEmail: { email: string }) => {
    await post('/auth/forgot', { email: userEmail.email });
  };

  return {
    login,
    refreshAccessToken,
    logout,
    passwordChange,
  };
}
