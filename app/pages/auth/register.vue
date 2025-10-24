<script setup lang="ts">
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
const Button = defineAsyncComponent(() => import('~/UIKit/Button.vue'));
const Icon = defineAsyncComponent(() => import('~/UIKit/Icon.vue'));

definePageMeta({
  layout: 'auth',
});

const steps = reactive([
  {
    key: 'phone',
    label: 'Valid your phone',
    component: StepPhone,
    done: false,
  },
  {
    key: 'yourself',
    label: 'Tell about yourself',
    component: StepYourself,
    done: false,
  },
  {
    key: 'company',
    label: 'Tell about your company',
    component: StepCompany,
    done: false,
  },
  {
    key: 'invite',
    label: 'Invite Team Members',
    component: Invite,
    done: false,
  },
]);
const currentIndex = ref(0);
const currentStep = computed(() => steps[currentIndex.value].component);
const currentLabel = computed(() => steps[currentIndex.value].label);

const { setCookie, getCookie } = useAppCookie();

const payload = reactive({
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
  setCookie('register_payload', JSON.stringify(payload));

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
  <div class="flex h-full min-h-[calc(100vh-40px)] gap-7">
    <aside class="inline-flex min-w-[346px] rounded-3xl bg-primary">
      <div class="px-10 pt-[60px]">
        <Icon name="white-logo" :size="50" class="mb-[60px]" />
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
      class="flex w-full flex-col rounded-3xl bg-white pt-[75px] shadow-base"
    >
      <div class="mb-1.5 text-center text-sm font-bold uppercase text-primary">
        {{ $t('register.Step') }} {{ currentIndex + 1 }}/{{ steps.length }}
      </div>
      <div class="mb-8 text-center text-[22px] font-bold">
        {{ currentLabel }}
      </div>
      <div
        class="mx-auto flex min-w-[403px] max-w-[403px] flex-auto flex-col pb-5"
      >
        <component
          :is="currentStep"
          v-model="payload"
          :validation-errors="validationErrors"
          :validate-field="validateField"
          class="flex-auto"
        />
      </div>

      <div class="flex justify-between border-t border-gray-muted px-10 py-6">
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
  </div>
</template>
