<script setup lang="ts">
import Icon from '~/UIKit/Icon.vue';
</script>

<template>
  <div
    class="hidden min-h-[600px] w-1/2 flex-col bg-primary lg:flex lg:px-11 lg:pb-10 lg:pt-7 xl:px-24 xl:pb-20 xl:pt-14"
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
    <div class="flex min-h-48 flex-1 items-center justify-center">
      <img
        src="images/common/kanban-board.svg"
        alt="Illustration of a person managing workflow on a project board"
        class="max-h-full max-w-full self-center justify-self-center object-contain"
      />
    </div>
  </div>
</template>
