<script setup lang="ts">
import type { TVacationIndicator } from '~/types/vacations/VacationIndicator';

defineProps<{
  status: TVacationIndicator;
}>();
</script>

<template>
  <div
    class="inline-flex rounded-lg px-[15px] py-[7px] text-xs font-bold"
    :class="{
      'bg-green text-white': status === 'approved',
      'bg-yellow text-white': status === 'pending',
    }"
  >
    {{ status }}
  </div>
</template>
