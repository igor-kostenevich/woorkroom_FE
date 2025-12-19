<script setup lang="ts">
import useAuth from '~/composables/useAuth';

const Input = defineAsyncComponent(() => import('~/UIKit/Input.vue'));
const Checkbox = defineAsyncComponent(() => import('~/UIKit/CheckBox.vue'));
const Button = defineAsyncComponent(() => import('~/UIKit/Button.vue'));
const LinkButton = defineAsyncComponent(() => import('~/UIKit/LinkButton.vue'));
const AuthLayout = defineAsyncComponent(
  () => import('~/components/layout/AuthLayout.vue')
);

const { login } = useAuth();

definePageMeta({
  layout: 'auth',
});

const rememberUser = ref(false);

const form = ref({
  email: '',
  password: '',
});
const rules = {
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
      $t('validation.minLength'),
      validators.minLength(6)
    ),
  },
};

const { validationErrors, validateForm } = useValidation(form, rules);

const loginValidation = async () => {
  const isValid = await validateForm();
  if (isValid) {
    await login(form.value, rememberUser.value);
  }
};
</script>

<template>
  <auth-layout>
    <div class="mb-7 md:mb-9 lg:mb-7 xl:mb-9">
      <div class="mb-6 md:mb-7 lg:mb-5 xl:mb-7">
        <Input v-model="form.email" placeholder="youremail@gmail.com">
          <template #topTextLeft>{{ $t('email') }}</template>
          <template v-if="validationErrors.email.message" #errorMessage>
            {{ validationErrors.email.message }}
          </template>
        </Input>
      </div>
      <div>
        <Input v-model="form.password" type="password" placeholder="Password">
          <template #topTextLeft>{{ $t('password') }}</template>
          <template v-if="validationErrors.password.message" #errorMessage>
            {{ validationErrors.password.message }}
          </template>
        </Input>
      </div>
    </div>

    <div class="mb-11 flex justify-between gap-7 md:mb-12 lg:mb-9 xl:mb-12">
      <div class="flex items-center gap-4">
        <Checkbox id="checkbox" v-model="rememberUser" />
        <div class="text-gray">{{ $t('rememberMe') }}</div>
      </div>
      <div>
        <LinkButton to="/auth/forgot" color="secondary"
          >{{ $t('forgotPassword') }}
        </LinkButton>
      </div>
    </div>
    <div class="flex flex-col items-center">
      <Button
        color="primary"
        icon-after="arrow-right"
        class="mb-5 w-full min-w-[170px] md:w-auto"
        @click="loginValidation"
      >
        {{ $t('auth.signIn') }}
      </Button>
      <LinkButton to="/auth/register"
        >{{ $t('auth.dontHaveAccount') }}
      </LinkButton>
    </div>
  </auth-layout>
</template>
