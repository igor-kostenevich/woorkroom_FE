import { useCountdown } from '@vueuse/core';

export default function useAuth() {
  const { post } = useApi();
  const { setToken, removeToken } = useAppCookie();

  const showSmsInfo = ref(false);
  const { remaining, start, isActive } = useCountdown(0);

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

    setToken(accessToken);
    return accessToken;
  };

  const logout = async () => {
    await post('/auth/logout');
    removeToken();
    navigateTo('/auth/login');
  };

  const passwordChange = async (email: string) => {
    await post('/auth/forgot', { email });
  };

  const requestPhoneOtp = async (phone: string) => {
    return await post<{ ttl: number }>('/auth/phone/request', { phone });
  };

  const verifyPhoneOtp = async <T = any>(
    phone: string,
    code: string
  ): Promise<T> => {
    return await post<T>('/auth/phone/verify', { phone, code });
  };

  const sendOtp = async (
    phone: string,
    validateField?: (key: string) => Promise<boolean>
  ) => {
    if (isCounting.value) return false;

    if (validateField) {
      const ok = await validateField('phone');
      if (!ok) return false;
    }

    try {
      const { ttl } = await requestPhoneOtp(phone);
      showSmsInfo.value = true;
      start(ttl);
      return true;
    } catch {
      showSmsInfo.value = false;
      return false;
    }
  };

  const register = async (payload: any) => {
    return await post('/auth/register', payload);
  };

  const isCounting = computed(() => isActive.value && remaining.value > 0);

  return {
    login,
    logout,
    refreshAccessToken,
    passwordChange,

    requestPhoneOtp,
    verifyPhoneOtp,
    register,

    showSmsInfo,
    remaining,
    isCounting,
    sendOtp,
  };
}
