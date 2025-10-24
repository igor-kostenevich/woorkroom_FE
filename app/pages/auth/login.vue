<script setup lang="ts">
import Icon from '~/UIKit/Icon.vue';
const Input = defineAsyncComponent(() => import('@/UIKit/Input.vue'));

definePageMeta({
  layout: 'auth',
});
</script>

<template>
  <div class="flex h-full">
    <div
      class="h-full min-h-[calc(100vh-120px)] w-1/2 rounded-l-3xl bg-primary px-24 pb-20 pt-14"
    >
      <div class="mb-11 flex items-center gap-7">
        <Icon name="logo" class="text-white" :size="50" />
        <div class="text-3xl font-bold text-white">
          {{ String('Woorkroom') }}
        </div>
      </div>
      <h1 class="mb-12 text-[40px] font-bold leading-snug text-white">
        {{ $t('auth.slogan') }}
      </h1>
      <div class="flex justify-center">
        <img
          src="/images/common/kanban-board.svg"
          alt="Illustration of a person managing workflow on a project board"
        />
      </div>
    </div>
    <div
      class="h-full min-h-[calc(100vh-120px)] w-1/2 rounded-r-3xl bg-white px-[138px] py-28"
    >
      <h2 class="mb-8 text-center text-[22px] font-bold text-dark">
        {{ $t('auth.signIn') }}
      </h2>
      <div>
        <div class="mb-7">
          <Input placeholder="youremail@gmail.com">
            <template #topTextLeft>{{ $t('email') }}</template>
            <!--          <template v-if="validationErrors.test.message" #errorMessage>-->
            <!--            {{ validationErrors.test.message }}-->
            <!--          </template>-->
          </Input>
        </div>
        <div>
          <Input v-model="inputPassword" type="password" placeholder="Password">
            <template #topTextLeft>{{ $t('password') }}</template>
            <!--          <template v-if="validationErrors.test.message" #errorMessage>-->
            <!--            {{ validationErrors.test.message }}-->
            <!--          </template>-->
          </Input>
        </div>
      </div>
      <div />
      <div />
    </div>
  </div>
</template>
