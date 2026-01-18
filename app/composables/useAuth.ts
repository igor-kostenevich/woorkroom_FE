import { useUserStore } from '@/stores/user';
import { useCountdown } from '@vueuse/core';

export default function useAuth() {
  const { post } = useApi();
  const { setToken, removeToken, token } = useAppCookie();
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

  const time = computed(() => {
    const m = Math.floor(remaining.value / 60)
      .toString()
      .padStart(2, '0');
    const s = (remaining.value % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  });
  const isCounting = computed(() => isActive.value && remaining.value > 0);

  const sendOtp = async (
    phone: string,
    validateField?: (key: string) => Promise<boolean>
  ) => {
    if (isCounting.value) return false;

    const ok = await validateField?.('phone');
    if (!ok) return false;

    try {
      const res = await auth.requestPhoneOtp(phone);
      const ttl = res?.ttl;
      showSmsInfo.value = true;
      start(ttl);
      return true;
    } catch {
      showSmsInfo.value = false;
      return false;
    }
  };

  function useDropdownSync<T extends { value: string }>(
    payloadField: Ref<string>,
    options: T[]
  ) {
    const selected = computed<number | ''>({
      get() {
        const index = options.findIndex(
          (opt) => opt.value === payloadField.value
        );
        return index !== -1 ? index : '';
      },
      set(val) {
        if (typeof val === 'number') {
          payloadField.value = options[val]?.value ?? '';
        } else if (typeof val === 'string') {
          payloadField.value = val;
        }
      },
    });

    onMounted(() => {
      const index = options.findIndex(
        (opt) => opt.value === payloadField.value
      );
      if (index !== -1) {
        payloadField.value = options[index]?.value ?? '';
      }
    });

    return { selected };
  }

  return {
    login,
    logout,
    refreshAccessToken,
    passwordChange,
    showSmsInfo,
    remaining,
    isCounting,
    time,
    sendOtp,
    useDropdownSync,
  };
}
