import { getJwtExp } from '~/composables/useAppCookie';
import { useUserStore } from '@/stores/user';
import { useCountdown } from '@vueuse/core';

export default function useAuth() {
  const { post } = useApi();
  const { setToken, removeToken } = useAppCookie();
  const auth = useUserStore();
  const showSmsInfo = ref(false);
  const { remaining, start, isActive } = useCountdown(0);

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
    signIn,
    logout,
    passwordChange,
    showSmsInfo,
    remaining,
    isCounting,
    time,
    sendOtp,
    useDropdownSync,
  };
}