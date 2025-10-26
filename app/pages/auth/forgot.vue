<script setup lang="ts">
import Icon from '~/UIKit/Icon.vue';

const Input = defineAsyncComponent(() => import('@/UIKit/Input.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const LinkButton = defineAsyncComponent(() => import('@/UIKit/LinkButton.vue'));

definePageMeta({
  layout: 'auth',
});

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
  await validateForm();
};
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="mb-8 flex items-center gap-7 lg:hidden">
      <Icon name="logo" class="text-primary" :size="40" />
      <div class="text-3xl font-bold text-primary">
        {{ String('Woorkroom') }}
      </div>
    </div>
    <div
      class="flex w-full lg:max-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-120px)]"
    >
      <div
        class="hidden w-1/2 flex-col rounded-l-3xl bg-primary lg:flex lg:px-11 lg:pb-10 lg:pt-7 xl:px-24 xl:pb-20 xl:pt-14"
      >
        <div class="mb-11 flex items-center gap-7">
          <Icon name="logo" class="text-white" :size="50" />
          <div class="text-3xl font-bold text-white">
            {{ String('Woorkroom') }}
          </div>
        </div>
        <h1
          class="mb-12 font-bold leading-snug text-white lg:text-4xl xl:text-[40px]"
        >
          {{ $t('auth.slogan') }}
        </h1>
        <div class="flex min-h-0 flex-1 items-center justify-center">
          <img
            src="/images/common/kanban-board.svg"
            alt="Illustration of a person managing workflow on a project board"
            class="max-h-full max-w-full self-center justify-self-center object-contain"
          />
        </div>
      </div>
      <div
        class="flex-1 rounded-3xl bg-white px-5 pb-7 pt-7 md:px-20 md:pt-10 lg:w-1/2 lg:rounded-none lg:rounded-r-3xl lg:px-16 lg:pb-8 lg:pt-10 xl:px-[138px] xl:pt-28"
      >
        <h2 class="mb-8 text-center text-[22px] font-bold text-dark">
          {{ $t('auth.signInWoorkroom') }}
        </h2>
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
      </div>
    </div>
  </div>
</template>
