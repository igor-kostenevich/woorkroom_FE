<script setup lang="ts">
import { useCloned } from '@vueuse/core';
import type { IRegisterPayload } from '~/types/auth';
import useAuth from '~/composables/useAuth';

definePageMeta({
  layout: 'auth',
  public: true,
});

const Button = defineAsyncComponent(() => import('~/UIKit/Button.vue'));
const Icon = defineAsyncComponent(() => import('~/UIKit/Icon.vue'));
const LinkButton = defineAsyncComponent(() => import('~/UIKit/LinkButton.vue'));

const StepPhone = defineAsyncComponent(
  () => import('~/components/pages/auth/StepPhone.vue')
);
const StepYourself = defineAsyncComponent(
  () => import('~/components/pages/auth/StepYourself.vue')
);
const StepCompany = defineAsyncComponent(
  () => import('~/components/pages/auth/StepCompany.vue')
);
const Invite = defineAsyncComponent(
  () => import('~/components/pages/auth/InviteStep.vue')
);
const StepSuccess = defineAsyncComponent(
  () => import('~/components/pages/auth/StepSuccess.vue')
);

const { setCookie, getCookie } = useAppCookie();

const { register } = useAuth();

const registerPayload: IRegisterPayload = {
  email: '',
  password: '',
  firstName: '',
  phone: '',
  dial: '',
  smsCode: '',
  phoneToken: '',
  onboarding: { purpose: '', persona: '', extraYesNo: false },
  company: { name: '', direction: '', teamSize: '' },
  invites: [''],
};

const { cloned: payload } = useCloned(registerPayload);

const steps = reactive([
  {
    key: 'phone',
    label: 'register.Valid your phone',
    component: markRaw(StepPhone),
  },
  {
    key: 'yourself',
    label: 'register.Tell about yourself',
    component: markRaw(StepYourself),
  },
  {
    key: 'company',
    label: 'register.Tell about your company',
    component: markRaw(StepCompany),
  },
  {
    key: 'invite',
    label: 'register.Invite Team Members',
    component: markRaw(Invite),
  },
  {
    key: 'success',
    label: 'register.Registration completed',
    component: markRaw(StepSuccess),
  },
]);

const currentIndex = ref(0);
const currentKey = computed(() => steps[currentIndex.value].key);
const currentStepComponent = computed(
  () => steps[currentIndex.value].component
);
const currentLabelComponent = computed(() => steps[currentIndex.value].label);

onMounted(() => {
  const saved = getCookie('register_payload');
  if (!saved) return;

  if (typeof saved === 'object') {
    Object.assign(payload.value, saved);
    return;
  }

  try {
    const parsed = JSON.parse(saved);
    Object.assign(payload.value, parsed);
  } catch {
    setCookie('register_payload', '');
  }
});

watch(
  payload,
  () => {
    setCookie('register_payload', JSON.stringify(payload.value));
  },
  { deep: true }
);
const rulesByStep: Record<string, any> = {
  phone: {
    email: {
      required: helpers.withMessage(
        $t('validation.required'),
        validators.required
      ),
      email: helpers.withMessage(
        $t('validation.invalidEmail'),
        validators.email
      ),
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
  },
  yourself: {
    firstName: {
      required: helpers.withMessage(
        $t('validation.required'),
        validators.required
      ),
    },
  },
  company: {},
};

const rules = computed(() => rulesByStep[currentKey.value] || {});
const { validationErrors, validateForm, validateField } = useValidation(
  payload.value,
  rules
);

const nextStep = async () => {
  const isValid = await validateForm();
  if (!isValid) return;
  if (currentIndex.value < steps.length - 1) currentIndex.value++;
};

const prevStep = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};

const submitRegistration = async () => {
  const isValid = await validateForm();
  if (!isValid) return;

  await register(payload.value);

  Object.assign(payload.value, useCloned(registerPayload).cloned.value);

  setCookie('register_payload', '');
  steps[currentIndex.value].done = true;
  currentIndex.value++;
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
                  i < currentIndex ? 'bg-white text-primary' : '',
                ]"
              >
                <Icon
                  v-if="i < currentIndex"
                  name="checked"
                  :size="14"
                  class="text-primary"
                />
              </span>

              <span
                v-if="Number(i) < steps.length - 1"
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
        {{ $t(currentLabelComponent) }}
      </div>
      <div
        class="mx-auto flex min-w-[100%] flex-auto flex-col pb-10 lg:min-w-[403px]"
      >
        <component
          :is="currentStepComponent"
          v-model="payload"
          :validation-errors="validationErrors"
          :validate-field="validateField"
          :rules="rules"
          class="flex-auto"
        />
      </div>

      <div
        v-if="currentIndex < steps.length - 1"
        class="hidden justify-between border-t border-gray-muted px-10 py-6 sm:flex"
      >
        <LinkButton
          v-if="currentIndex > 0"
          color="text-primary"
          class="inline-flex gap-4"
          icon-before="arrow-left"
          @click="prevStep"
        >
          {{ $t('register.previous') }}
        </LinkButton>

        <Button
          v-if="currentIndex === steps.length - 2"
          class="ml-auto"
          icon-after="arrow-right"
          @click="submitRegistration"
        >
          {{ $t('register.register') }}
        </Button>

        <Button
          v-else
          class="ml-auto"
          icon-after="arrow-right"
          @click="nextStep"
        >
          {{ $t('register.next') }}
        </Button>
      </div>

      <div
        v-if="currentIndex < steps.length - 1"
        class="fixed bottom-0 left-0 z-50 w-full border-t border-gray-muted bg-white px-5 py-4 sm:hidden"
      >
        <div class="flex items-center gap-4">
          <LinkButton
            v-if="currentIndex > 0"
            color="text-primary"
            class="inline-flex gap-2"
            icon-before="arrow-left"
            @click="prevStep"
          >
            {{ $t('register.previous') }}
          </LinkButton>

          <Button
            class="ml-auto flex-1"
            icon-after="arrow-right"
            @click="
              currentIndex === steps.length - 2
                ? submitRegistration()
                : nextStep()
            "
          >
            {{
              currentIndex === steps.length - 2
                ? $t('register.register')
                : $t('register.next')
            }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
