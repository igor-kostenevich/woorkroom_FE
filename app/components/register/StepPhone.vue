<script setup lang="ts">
import { useUserStore } from '@/stores/user';

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

const auth = useUserStore();
const smsRef = useTemplateRef('smsRef');
const payload = defineModel<any>();

const { showSmsInfo, isCounting, time, sendOtp } = useAuth();

const { getCookie } = useAppCookie();

const phoneForApi = computed(
  () => `${payload.value.dial}${payload.value.phone}`
);

const verifyPhone = async () => {
  if (isCounting.value) return;
  await sendOtp(phoneForApi.value, props.validateField);
};
const isVerifed = ref(true);
watch(
  () => payload.value.smsCode,
  async (code: string) => {
    if (isVerifed.value === false) return;
    if (code.length === 4) {
      const res = await auth.verifyPhoneOtp(phoneForApi.value, code);
      if (res.ok) {
        payload.value.phoneToken = res.phoneToken;
        alert($t('register.phoneVerified'));
        smsRef.value.resetCode();
        isVerifed.value = false;
      }
    }
  }
);

onMounted(() => {
  const cookie = getCookie('register_payload');
  if (cookie) {
    const parsed = JSON.parse(cookie);
    if (parsed.phoneToken) {
      isVerifed.value = false;
    }
  }
});
</script>

<template>
  <div>
    <div v-if="isVerifed" class="mb-8 border-b border-gray-muted sm:mb-12">
      <Phone
        v-model="payload.phone"
        v-model:dial="payload.dial"
        :error="props.validationErrors.phone.message"
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
        <template #topTextLeft>{{ $t('register.Create Password') }}</template>
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
