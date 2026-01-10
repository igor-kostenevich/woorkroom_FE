<script setup lang="ts">
import type { TVacationStatus } from '~/types/vacations/vacationIndicator';

defineProps<{
  status: TVacationStatus;
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
    {{ $t('status.' + status) }}
  </div>
</template>
