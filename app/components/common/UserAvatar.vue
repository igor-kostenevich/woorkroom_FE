<template>
  <Progress :progress="props.progress" :size="size" :color="props.color">
    <img
      v-if="props.image"
      :class="[
        'rounded-full object-cover',
        {
          'h-10 w-10': props.size === 'md',
          'h-[50px] w-[50px]': props.size === 'lg',
          'h-[64px] w-[64px]': props.size === 'xl',
        },
      ]"
      :src="props.image"
      alt="user avatar"
    />
    <div
      v-else
      :class="[
        'text-md absolute flex items-center justify-center rounded-full font-bold uppercase text-white',
        selectedBackgroundColor,
        {
          'h-6 w-6 text-[9px]': props.size === 'sm',
          'h-10 w-10 text-xs': props.size === 'md',
          'h-[50px] w-[50px] text-sm': props.size === 'lg',
          'h-[64px] w-[64px]': props.size === 'xl',
        },
      ]"
    >
      {{ fullNameInitials }}
    </div>
  </Progress>
</template>

<script setup lang="ts">
import type { IUserAvatar } from '~/types/components/user-avatar';
const Progress = defineAsyncComponent(() => import('~/UIKit/Progress.vue'));

const props = defineProps<IUserAvatar>();

const fullNameInitials = computed(() =>
  (props.fullName ?? '').replace(/(\p{L})\p{L}*/gu, '$1').replace(/\s+/g, '')
);

const selectedBackgroundColor = computed(() => {
  if (props.color) {
    return `bg-${props.color}`;
  }
  return 'bg-primary';
});
</script>
