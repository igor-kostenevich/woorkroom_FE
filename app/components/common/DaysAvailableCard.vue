<script setup lang="ts">
import type { IProgressProps } from '~/types/components/IProgressProps';
const Progress = defineAsyncComponent(() => import('~/UIKit/Progress.vue'));

withDefaults(defineProps<IProgressProps>(), {
  size: 'md',
  progress: 0,
  color: 'blue',
  title: '',
  label: '',
});
</script>

<template>
  <div class="bg-white rounded-3xl  p-6 shadow-base">
    <Progress :size="size" :progress="progress" :color="color">12</Progress>
    <div class="text-lg font-bold mt-4">{{ title }}</div>

    <div class="mt-1 text-gray-light">{{label}}</div>
  </div>
</template>
