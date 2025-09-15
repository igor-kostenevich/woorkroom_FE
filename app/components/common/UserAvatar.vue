<template>
  <Progress :progress="progress" :size="size" :color="color">
    <img
      v-if="image"
      :class="['rounded-full object-cover', { ...sizes }]"
      :src="image"
      alt="user avatar"
    />
    <div
      v-else
      :class="[
        'text-md absolute flex items-center justify-center rounded-full font-bold uppercase text-white',
        selectedBackgroundColor,
        { ...sizes },
      ]"
    >
      {{ fullNameInitials }}
    </div>
  </Progress>
</template>

<script setup lang="ts">
import type { IUserAvatar } from '~/types/components';
const Progress = defineAsyncComponent(() => import('~/UIKit/Progress.vue'));

const props = defineProps<IUserAvatar>();

const fullNameInitials = computed(() =>
  (props.fullName ?? '').replace(/(\p{L})\p{L}*/gu, '$1').replace(/\s+/g, '')
);

const sizes = computed(() => {
  return {
    'h-6 w-6 text-[9px]': props.size === 'xs',
    'h-7 w-7 text-xs': props.size === 'sm',
    'h-10 w-10 text-xs': props.size === 'md',
    'h-[50px] w-[50px] text-sm': props.size === 'lg',
    'h-[64px] w-[64px]': props.size === 'xl',
  };
});

const selectedBackgroundColor = computed(() => {
  if (props.color) {
    return `bg-${props.color}`;
  }
  return 'bg-primary';
});
</script>
