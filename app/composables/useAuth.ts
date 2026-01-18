import { useUserStore } from '@/stores/user';
import { useCountdown } from '@vueuse/core';

export default function useAuth() {
  const { post } = useApi();
  const { setToken, removeToken } = useAppCookie();
  const auth = useUserStore();
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

  const isCounting = computed(() => isActive.value && remaining.value > 0);

  const sendOtp = async (
    phone: string,
    validateField?: (key: string) => Promise<boolean>
  ) => {
    if (isCounting.value) return false;

    // TODO: Do this after you call sendOtp method
    if (validateField) {
      const ok = await validateField('phone');
      if (!ok) return false;
    }

    try {
      // TODO: Нема цього методу requestPhoneOtp, може Єгор затьор
      const { ttl } = await auth.requestPhoneOtp(phone);
      showSmsInfo.value = true;
      start(ttl);
      // TODO: точно треба вертати true? і чи взагалі метод має шось вертати?
      return true;
    } catch {
      showSmsInfo.value = false;
      // TODO: точно треба вертати false? і чи взагалі метод має шось вертати?
      return false;
    }
  };

  return {
    login,
    logout,
    refreshAccessToken,
    passwordChange,
    showSmsInfo,
    remaining,
    isCounting,
    sendOtp,
  };
}
