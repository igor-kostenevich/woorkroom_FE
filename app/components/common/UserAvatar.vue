<template>
  <div
    :class="[
      'relative inline',
      {
        'h-6 w-6': props.size === 'sm',
        'h-10 w-10': props.size === 'md',
        'h-14 w-14': props.size === 'lg',
        'h-16 w-16': props.size === 'xl',
      },
    ]"
  >
    <svg
      v-if="props.occupancyRate"
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
        fill="none"
        :class="$attrs.class"
        stroke-width="2"
        stroke-linecap="round"
        :transform="`translate(${size} 0) scale(-1 1) rotate(-90 ${size / 2} ${size / 2})`"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashoffset"
      />
    </svg>

    <div
      v-if="props.size !== 'sm'"
      class="absolute inset-0 flex items-center justify-center"
    >
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
            'h-8 w-8 text-[12px]': props.size === 'md',
            'h-[49px] w-[49px]': props.size === 'lg',
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
const props = defineProps<{
  occupancyRate?: number;
  size: 'sm' | 'md' | 'lg' | 'xl';
  fullName?: string;
  image?: string;
}>();

const sizeVariations = {
  sm: 24,
  md: 40,
  lg: 56,
  xl: 64,
} as const;
const size = sizeVariations[props.size];

const radius = (size - 2) / 2;
const circumference = 2 * Math.PI * radius;
const rate = props.occupancyRate ?? 0;
const dashoffset = circumference - (circumference * rate) / 100;

const fullNameInitials = computed(() =>
  (props.fullName ?? '').replace(/(\p{L})\p{L}*/gu, '$1')
);

defineOptions({ inheritAttrs: false });
</script>
