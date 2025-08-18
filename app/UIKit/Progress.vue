<template>
  <svg
    v-if="props.progress"
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
</template>

<script setup lang="ts">
const props = defineProps<{
  progress?: number;
  size: 'sm' | 'md' | 'lg' | 'xl';
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
const rate = props.progress ?? 0;
const dashoffset = circumference - (circumference * rate) / 100;

defineOptions({ inheritAttrs: false });
</script>
