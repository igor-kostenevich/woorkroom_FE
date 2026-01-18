<script setup lang="ts">
const Button = defineAsyncComponent(() => import('~/UIKit/Button.vue'));
const Input = defineAsyncComponent(() => import('~/UIKit/Input.vue'));
const Phone = defineAsyncComponent(
  () => import('~/components/common/Phone.vue')
);
const SmsCode = defineAsyncComponent(
  () => import('~/components/common/SmsCode.vue')
);

// TODO: ПО ідеї не треба це прокидувати, або роби еміт, або роби це в самому компоненті. Бо в інших компонентах ти такі пропси не приймаєш і ніяк не обробляєш
const props = defineProps<{
  validationErrors?: Record<string, { message?: string }>;
  validateField?: (key: string) => Promise<boolean>;
}>();

const auth = useUserStore();
const smsRef = useTemplateRef('smsRef');
const payload = defineModel<any>();

const isVerified = ref(true);
const { showSmsInfo, isCounting, sendOtp, remaining } = useAuth();
const { getCookie } = useAppCookie();

// TODO: подивись чи точно треба цей метод, чи можна якось інакше шоб не робити це. Можливо з бека якось інакше буду тобі слати/приймати або форматуй це значення в самому методі sendOtp
const phoneForApi = computed(
  () => `${payload.value.dial}${payload.value.phone}`
);

const time = computed(() => {
  const m = Math.floor(remaining.value / 60)
    .toString()
    .padStart(2, '0');
  const s = (remaining.value % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
});

const verifyPhone = async () => {
  await sendOtp(phoneForApi.value, props.validateField);
};

// TODO: Може вийде зробити це проще, я погано розумію шо тут відбувається взагалі, бажано логіку тримати в composable, якщо вона відноситься для реєстрації/авторизації. Якщо проше не виийде, залиш, але бажано зробити
watch(
  () => payload.value.smsCode,
  async (code: string) => {
    if (isVerified.value === false) return;
    if (code.length === 4) {
      const res = await auth.verifyPhoneOtp(phoneForApi.value, code);
      if (res.ok) {
        payload.value.phoneToken = res.phoneToken;
        alert($t('register.phoneVerified'));
        smsRef.value.resetCode();
        isVerified.value = false;
      }
    }
  }
);

onMounted(() => {
  const cookie = getCookie('register_payload');
  if (cookie) {
    const parsed = JSON.parse(cookie);
    if (parsed.phoneToken) {
      isVerified.value = false;
    }
  }
});
</script>

<template>
  <div>
    <div v-if="isVerified" class="mb-8 border-b border-gray-muted sm:mb-12">
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
