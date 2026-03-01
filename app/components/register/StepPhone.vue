<script setup lang="ts">
import { formatSecondsToMMSS } from '~/utils/timeFormatter';

const Button = defineAsyncComponent(() => import('~/UIKit/Button.vue'));
const Input = defineAsyncComponent(() => import('~/UIKit/Input.vue'));
const Phone = defineAsyncComponent(
  () => import('~/components/common/Phone.vue')
);
const SmsCode = defineAsyncComponent(
  () => import('~/components/common/SmsCode.vue')
);

const props = defineProps<{
  validationErrors?: Record<string, { message?: string }>;
  validateField?: (key: string) => Promise<boolean>;
}>();

const MAX_CODE_VALUE = 4;

const smsRef = useTemplateRef('smsRef');
const payload = defineModel<any>();

const { showSmsInfo, isCounting, sendOtp, remaining, verifyPhoneOtp } =
  useAuth();
const { getCookie } = useAppCookie();

const fullPhone = computed(() => `${payload.value.dial}${payload.value.phone}`);

const time = computed(() => formatSecondsToMMSS(remaining.value));

const verifyPhone = async () => {
  await sendOtp(fullPhone.value, props.validateField);
};

watch(
  () => payload.value.smsCode,
  async (code: string) => {
    if (payload.value.phoneToken || code?.length !== MAX_CODE_VALUE) return;

    const res = await verifyPhoneOtp<{ ok: boolean; phoneToken?: string }>(
      fullPhone.value,
      code
    );

    if (!res.ok) return;

    payload.value.phoneToken = res.phoneToken;
    payload.value.smsCode = '';

    showSmsInfo.value = false;
    smsRef.value?.resetCode();

    alert($t('register.phoneVerified'));
  }
);

onMounted(() => {
  const saved = getCookie('register_payload');
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    if (parsed?.phoneToken) {
      payload.value.phoneToken = parsed.phoneToken;
    }
  } catch {
    return;
  }
});
</script>
<template>
  <div>
    <div
      v-if="!payload.phoneToken"
      class="mb-8 border-b border-gray-muted sm:mb-12"
    >
      <Phone
        v-model="payload.phone"
        v-model:dial="payload.dial"
        :error="props.validationErrors?.phone?.message"
      />

      <SmsCode v-if="showSmsInfo" ref="smsRef" v-model="payload.smsCode" />

      <div
        v-if="showSmsInfo"
        class="mb-[26px] rounded-[14px] bg-light px-5 py-5 text-sm font-semibold text-primary"
      >
        {{ $t('register.smsSent', { phone: formattedPhone }) }} — {{ time }}
      </div>

      <Button class="mb-12 w-full" :disabled="isCounting" @click="verifyPhone">
        {{ $t('register.code') }}
      </Button>
    </div>

    <div class="flex w-full flex-col gap-7">
      <Input v-model="payload.email" placeholder="youremail@gmail.com">
        <template #topTextLeft>{{ $t('register.Email Address') }}</template>
        <template v-if="props.validationErrors?.email?.message" #errorMessage>
          {{ props.validationErrors.email.message }}
        </template>
      </Input>

      <Input v-model="payload.password" type="password" placeholder="••••••••">
        <template #topTextLeft>
          {{ $t('register.Create Password') }}
        </template>
        <template
          v-if="props.validationErrors?.password?.message"
          #errorMessage
        >
          {{ props.validationErrors.password.message }}
        </template>
      </Input>
    </div>
  </div>
</template>
