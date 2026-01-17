export default function useAuth() {
  const { post, get } = useApi();
  const { setToken, removeToken, token } = useAppCookie();

  const login = async (
    userData: { email: string; password: string },
    rememberUser: boolean
  ) => {
    const { accessToken } = await post<{ accessToken: string }>('/auth/login', {
      email: userData.email,
      password: userData.password,
      rememberMe: rememberUser,
    });

    setToken(accessToken);
    navigateTo('/');
  };

  const refreshAccessToken = async () => {
    const { accessToken } = await post<{ accessToken: string }>(
      '/auth/refresh'
    );
    token.value = accessToken;
    return accessToken;
  };

  const logout = async () => {
    await post('/auth/logout');

    removeToken();
    navigateTo('/auth/login');
  };

  const passwordChange = async (userEmail: { email: string }) => {
    await post('/auth/forgot', { email: userEmail.email });
  };
  const test = async () => {
    try {
      await get('/auth/profile');
    } catch {
      return;
    }
  };

  return {
    login,
    logout,
    refreshAccessToken,
    passwordChange,
    test,
  };
}
