<template>
  <div
    :class="[
      'relative self-center',
      props.progress ? sizeClasses : sizeClassesWithoutProgress,
    ]"
  >
    <svg
      v-if="progress"
      class="absolute left-0 top-0"
      :width="size"
      :height="size"
      :viewBox="`0 0 ${size} ${size}`"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        class="stroke-gray-secondary"
        stroke-width="2"
      />
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        :class="selectedStrokeColor"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        :transform="`translate(${size} 0) scale(-1 1) rotate(-90 ${size / 2} ${size / 2})`"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashoffset"
      />
    </svg>
    <div
      :class="[
        'absolute inset-0 flex items-center justify-center',
        selectedTextClasses,
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUserAvatar } from '~/types/components';

const props = defineProps<IUserAvatar>();

const sizeVariations = {
  sm: 24,
  md: 48,
  lg: 58,
  xl: 72,
} as const;
type SizeKey = keyof typeof sizeVariations;
const size = sizeVariations[(props.size as SizeKey) || 'md'];

const radius = (size - 2) / 2;
const circumference = 2 * Math.PI * radius;
const rate = props.progress ?? 0;
const dashoffset = circumference - (circumference * rate) / 100;

const sizeClasses = computed(() => ({
  'h-6 w-6': props.size === 'sm',
  'h-12 w-12': props.size === 'md',
  'h-[58px] w-[58px]': props.size === 'lg',
  'h-[72px] w-[72px]': props.size === 'xl',
}));
const sizeClassesWithoutProgress = computed(() => ({
  'h- w-6': props.size === 'sm',
  'h-10 w-10': props.size === 'md',
  'h-[50px] w-[50px]': props.size === 'lg',
  'h-[64px] w-[64px]': props.size === 'xl',
}));

const strokeClasses = {
  primary: 'stroke-primary',
  yellow: 'stroke-yellow',
  blue: 'stroke-blue',
  red: 'stroke-red',
  violet: 'stroke-purple',
} as const;
type ColorKey = keyof typeof strokeClasses;
const selectedStrokeColor = computed(
  () => strokeClasses[(props.color as ColorKey) || 'primary']
);

const textClasses = {
  primary: 'text-xl text-primary',
  yellow: 'text-xl text-yellow',
  blue: 'text-blue text-xl font-extrabold',
  red: 'text-red text-xl font-extrabold',
  violet: 'text-purple text-xl font-extrabold',
} as const;
const selectedTextClasses = computed(
  () => textClasses[(props.color as ColorKey) || 'blue']
);
</script>
