<script setup lang="ts">
import Welcome from '~/components/pages/auth/Welcome.vue';
import Icon from '~/UIKit/Icon.vue';

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
  <div class="flex flex-col items-center">
    <div
      class="mb-[37px] mt-[60px] flex items-center justify-center gap-4 lg:hidden"
    >
      <Icon name="logo" :size="40" class="text-primary" />
      <span class="text-xl font-bold text-primary">{{
        String('Woorkroom')
      }}</span>
    </div>
    <div
      class="flex w-full overflow-y-auto rounded-3xl lg:max-h-[calc(100vh-40px)] lg:min-h-[calc(100vh-40px)]"
    >
      <welcome />
      <div
        class="min-h-[400px] flex-1 bg-white px-5 pb-7 pt-7 md:px-20 md:pt-10 lg:min-h-[600px] lg:w-1/2 lg:px-16 lg:pb-8 lg:pt-10 xl:px-[138px] xl:pt-28"
      >
        <h2 class="mb-8 text-center text-[22px] font-bold text-dark">
          {{ $t('auth.signInWoorkroom') }}
        </h2>
        <div>
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
        </div>
      </div>
    </div>
  </div>
</template>
