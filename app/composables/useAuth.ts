export default function useAuth() {
  const { post } = useApi();
  const { setToken } = useAppCookie();
  const signIn = async (userData: { email: string; password: string }) => {
    const res = await post<{ accessToken: string }>('/auth/login', {
      email: userData.email,
      password: userData.password,
    });
    if (res && res.accessToken) {
      setToken(res.accessToken);
    }
  };

  return {
    signIn,
  };
}
