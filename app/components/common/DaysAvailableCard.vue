<script setup lang="ts">
import type { ProgressProps } from '~/types/components/progress';
const Progress = defineAsyncComponent(() => import('~/UIKit/Progress.vue'));

withDefaults(defineProps<ProgressProps>(), {
  size: 'md',
  progress: 0,
  color: 'blue',
});
</script>

<template>
  <div class="rounded-3xl bg-white p-6 shadow-base">
    <Progress :size="size" :progress="progress" :color="color">12</Progress>
    <div class="mt-4 text-lg font-bold">{{ title }}</div>
    <div class="mt-1 text-sm text-gray-light">{{ label }}</div>
  </div>
</template>
