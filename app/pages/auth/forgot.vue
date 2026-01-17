<script setup lang="ts">
import useAuth from '~/composables/useAuth';

const Input = defineAsyncComponent(() => import('@/UIKit/Input.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const LinkButton = defineAsyncComponent(() => import('@/UIKit/LinkButton.vue'));
const AuthLayout = defineAsyncComponent(
  () => import('~/components/layout/AuthLayout.vue')
);

definePageMeta({
  public: true,
  layout: 'auth',
});
const { passwordChange } = useAuth();

const form = ref({
  email: '',
});
const rules = {
  email: {
    required: helpers.withMessage(
      $t('validation.required'),
      validators.required
    ),
    email: helpers.withMessage($t('validation.invalidEmail'), validators.email),
  },
};

const { validationErrors, validateForm } = useValidation(form, rules);

const loginValidation = async () => {
  form.value.email = '';
  const isValid = await validateForm();
  if (isValid) await passwordChange(form.value);
};
</script>

<template>
  <auth-layout>
    <div class="mb-7 md:mb-9 lg:mb-7 xl:mb-9">
      <Input v-model="form.email" placeholder="youremail@gmail.com">
        <template #topTextLeft>{{ $t('email') }}</template>
        <template v-if="validationErrors.email.message" #errorMessage>
          {{ validationErrors.email.message }}
        </template>
      </Input>
    </div>

    <div class="flex flex-col items-center">
      <Button
        color="primary"
        icon-after="arrow-right"
        class="mb-5 w-full min-w-[170px] md:w-auto"
        @click="loginValidation"
      >
        {{ $t('restorePassword') }}
      </Button>
      <LinkButton to="/auth/login">{{ $t('haveAccount') }}</LinkButton>
    </div>
  </auth-layout>
</template>
