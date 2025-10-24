// composables/useAuth.ts
import { useUserStore } from '@/stores/user';
import { useCountdown } from '@vueuse/core';

export function useAuth() {
  const auth = useUserStore();
  const showSmsInfo = ref(false);
  const { remaining, start, isActive } = useCountdown(0);

  const time = computed(() => {
    const m = Math.floor(remaining.value / 60)
      .toString()
      .padStart(2, '0');
    const s = (remaining.value % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  });
  const isCounting = computed(() => isActive.value && remaining.value > 0);

  const sendOtp = async (
    phoneForApi: string,
    validateField?: (key: string) => Promise<boolean>
  ) => {
    if (isCounting.value) return false;

    const ok = await validateField?.('phone');
    if (!ok) return false;

    try {
      await auth.requestPhoneOtp(phoneForApi);
      showSmsInfo.value = true;
      start(90);
      return true;
    } catch {
      showSmsInfo.value = false;
      return false;
    }
  };

  return {
    showSmsInfo,
    remaining,
    isCounting,
    time,
    sendOtp,
  };
}
