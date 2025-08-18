<template>
  <div :class="['relative inline-block', sizeClasses]">
    <Progress :progress="props.progress" :class="$attrs.class" :size="size" />
    <div class="absolute inset-0 flex items-center justify-center">
      <img
        v-if="image"
        :class="[
          'rounded-full object-cover',
          {
            'h-8 w-8': props.size === 'md',
            'h-[49px] w-[49px]': props.size === 'lg',
            'h-[57px] w-[57px]': props.size === 'xl',
          },
        ]"
        :src="image"
        alt="user avatar"
      />
      <div
        v-else
        :class="[
          'text-md absolute flex items-center justify-center rounded-full font-bold uppercase text-white',
          $attrs.class,
          {
            'w-6 text-[9px]': props.size === 'sm',
            'h-8 w-8 text-xs': props.size === 'md',
            'h-[49px] w-[49px] text-sm': props.size === 'lg',
            'h-[57px] w-[57px]': props.size === 'xl',
          },
        ]"
      >
        {{ fullNameInitials }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUserAvatar } from '~/types/components/UserAvatar';

const Progress = defineAsyncComponent(() => import('~/UIKit/Progress.vue'));

const props = defineProps<IUserAvatar>();

const sizeClasses = computed(() => ({
  'h-6 w-6': props.size === 'sm',
  'h-10 w-10': props.size === 'md',
  'h-14 w-14': props.size === 'lg',
  'h-16 w-16': props.size === 'xl',
}));

const fullNameInitials = computed(() =>
  (props.fullName ?? '').replace(/(\p{L})\p{L}*/gu, '$1').replace(/\s+/g, '')
);

defineOptions({ inheritAttrs: false });
</script>
