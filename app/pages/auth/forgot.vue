<script setup lang="ts">
definePageMeta({
  public: true,
  layout: 'auth',
});

const Input = defineAsyncComponent(() => import('@/UIKit/Input.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const LinkButton = defineAsyncComponent(() => import('@/UIKit/LinkButton.vue'));

const { passwordChange } = useAuth();

const email = ref('');
const rules = {
  email: {
    required: helpers.withMessage(
      $t('validation.required'),
      validators.required
    ),
    email: helpers.withMessage($t('validation.invalidEmail'), validators.email),
  },
};

const { validationErrors, validateField } = useValidation({ email }, rules);

const submit = async () => {
  const isValid = await validateField('email');
  if (!isValid) return;

  await passwordChange(email.value);
  email.value = '';
};
</script>

<template>
  <div class="mb-7 md:mb-9 lg:mb-7 xl:mb-9">
    <Input v-model="email" placeholder="youremail@gmail.com">
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
      @click="submit"
    >
      {{ $t('restorePassword') }}
    </Button>
    <LinkButton to="/auth/login">{{ $t('haveAccount') }}</LinkButton>
  </div>
</template>
