<script setup lang="ts">
import type { IRegisterPayload } from '~/types/register/registerPayload';

const StepPhone = defineAsyncComponent(
  () => import('~/components/register/StepPhone.vue')
);
const StepYourself = defineAsyncComponent(
  () => import('~/components/register/StepYourself.vue')
);
const StepCompany = defineAsyncComponent(
  () => import('~/components/register/StepCompany.vue')
);
const Invite = defineAsyncComponent(
  () => import('~/components/register/InviteStep.vue')
);

const StepSuccess = defineAsyncComponent(
  () => import('~/components/register/StepSuccess.vue')
);
const Button = defineAsyncComponent(() => import('~/UIKit/Button.vue'));
const Icon = defineAsyncComponent(() => import('~/UIKit/Icon.vue'));

definePageMeta({
  layout: 'auth',
});

const steps = reactive([
  {
    key: 'phone',
    label: 'register.Valid your phone',
    component: markRaw(StepPhone),
    done: false,
  },
  {
    key: 'yourself',
    label: 'register.Tell about yourself',
    component: markRaw(StepYourself),
    done: false,
  },
  {
    key: 'company',
    label: 'register.Tell about your company',
    component: markRaw(StepCompany),
    done: false,
  },
  {
    key: 'invite',
    label: 'register.Invite Team Members',
    component: markRaw(Invite),
    done: false,
  },
  {
    key: 'success',
    label: 'register.Registration completed',
    component: markRaw(StepSuccess),
    done: false,
  },
]);
const currentIndex = ref(0);
const currentStep = computed(() => steps[currentIndex.value].component);
const currentLabel = computed(() => steps[currentIndex.value].label);

const { setCookie, getCookie } = useAppCookie();

const payload = reactive<IRegisterPayload>({
  email: '',
  password: '',
  firstName: '',
  phone: '',
  dial: '',
  smsCode: '',
  phoneToken: '',
  onboarding: {
    purpose: '',
    persona: '',
    extraYesNo: false,
  },
  company: {
    name: '',
    direction: '',
    teamSize: '',
  },
  invites: [''],
});

watch(
  payload,
  (newVal: IRegisterPayload) => {
    setCookie('register_payload', JSON.stringify(toRaw(newVal)));
  },
  { deep: true }
);

onMounted(() => {
  const saved = getCookie('register_payload');
  if (saved) {
    const parsed = JSON.parse(saved);
    Object.assign(payload, parsed);
  }
});

const rules = computed(() => ({
  email: {
    required: helpers.withMessage(
      $t('validation.required'),
      validators.required
    ),
    email: helpers.withMessage($t('validation.invalidEmail'), validators.email),
  },
  password: {
    required: helpers.withMessage(
      $t('validation.required'),
      validators.required
    ),
    minLength: helpers.withMessage(
      $t('validation.minLength', { min: 6 }),
      validators.minLength(6)
    ),
  },
  phone: {
    minLength: helpers.withMessage(
      $t('validation.invalidPhone'),
      validators.minLength(9)
    ),
    maxLength: helpers.withMessage(
      $t('validation.invalidPhone'),
      validators.maxLength(12)
    ),
    digits: helpers.withMessage(
      $t('validation.onlyDigits'),
      (v: string) => v === '' || /^[0-9]+$/.test(v)
    ),
  },
}));

const { validationErrors, validateForm, validateField } = useValidation(
  payload,
  rules
);

const nextStep = async () => {
  const isValid = await validateForm();
  if (!isValid) return;

  steps[currentIndex.value].done = true;
  if (currentIndex.value < steps.length - 1) currentIndex.value++;
};

const prevStep = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    steps[currentIndex.value].done = false;
  }
};
</script>

<template>
  <div
    class="mb-[37px] mt-[60px] flex items-center justify-center gap-4 lg:hidden"
  >
    <Icon name="logo" :size="40" class="text-primary" />
    <span class="text-xl font-bold text-primary">{{
      String('Woorkroom')
    }}</span>
  </div>
  <div
    class="flex h-full flex-col gap-5 sm:min-h-[calc(100vh-40px)] sm:flex-row sm:gap-7"
  >
    <aside class="hidden min-w-[346px] rounded-3xl bg-primary lg:inline-flex">
      <div class="px-10 pb-4 pt-[60px]">
        <Icon name="logo" :size="50" class="mb-[60px] text-white" />
        <div class="mb-12 text-4xl font-bold text-white">
          {{ $t('Get started') }}
        </div>

        <ul class="space-y-9">
          <li
            v-for="(s, i) in steps"
            :key="s.key"
            class="relative flex items-center gap-6"
          >
            <div class="relative flex flex-col items-center">
              <span
                :class="[
                  'box-border inline-flex h-6 w-6 items-center justify-center rounded-full border-2 transition',
                  i === currentIndex
                    ? 'border-white bg-white/30'
                    : 'border-white/60',
                  s.done ? 'bg-white text-primary' : '',
                ]"
              >
                <Icon
                  v-if="s.done"
                  name="checked"
                  :size="14"
                  class="text-primary"
                />
              </span>
              <span
                v-if="i < steps.length - 1"
                :class="[
                  'absolute left-1/2 top-7 h-[26px] w-[2px] -translate-x-1/2',
                  i === currentIndex ? 'bg-white' : 'bg-white/50',
                ]"
              />
            </div>
            <p
              :class="[
                'text-lg font-semibold text-white',
                i === currentIndex ? '' : 'opacity-50',
              ]"
            >
              {{ $t(s.label) }}
            </p>
          </li>
        </ul>
      </div>
    </aside>

    <div
      class="flex w-full flex-col rounded-3xl bg-white px-5 pt-7 shadow-base lg:pt-[75px]"
    >
      <div class="mb-1.5 text-center text-sm font-bold uppercase text-primary">
        {{ $t('register.Step') }} {{ currentIndex + 1 }}/{{ steps.length }}
      </div>
      <div class="mb-8 text-center text-[22px] font-bold">
        {{ $t(currentLabel) }}
      </div>
      <div
        class="mx-auto flex min-w-[100%] flex-auto flex-col pb-10 lg:min-w-[403px]"
      >
        <component
          :is="currentStep"
          v-model="payload"
          :validation-errors="validationErrors"
          :validate-field="validateField"
          class="flex-auto"
        />
      </div>

      <div
        class="hidden justify-between border-t border-gray-muted px-10 py-6 sm:flex"
      >
        <Button
          v-if="currentIndex > 0"
          icon-before="arrow-left"
          color="secondary"
          @click="prevStep"
        >
          {{ $t('register.previous') }}
        </Button>

        <Button class="ml-auto" icon-after="arrow-right" @click="nextStep">
          {{ $t('register.next') }}
        </Button>
      </div>
    </div>
    <div class="flex justify-between sm:hidden">
      <Button
        v-if="currentIndex > 0"
        icon-before="arrow-left"
        color="secondary"
        @click="prevStep"
      >
        {{ $t('register.previous') }}
      </Button>

      <Button class="ml-auto" icon-after="arrow-right" @click="nextStep">
        {{ $t('register.next') }}
      </Button>
    </div>
  </div>
</template>
