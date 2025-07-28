<script setup lang="ts">
import type { TVacationIndicator } from '~/types/vacations/VacationIndicator';

const props = defineProps<{
  status: TVacationIndicator;
}>();
</script>

<template>
  <div
    class="inline-flex rounded-lg px-4 py-2 font-bold"
    :class="{
      'bg-green text-white': props.status === 'Approved',
      'bg-yellow text-white': props.status === 'Pending',
      'h-6 w-6': props.status === 'Progress',
    }"
  >
    <slot />
  </div>
</template>
