<script setup lang="ts">
import type { TTaskStatus } from '~/types/projects/taskStatus';

defineProps<{
  status: TTaskStatus;
}>();
</script>

<template>
  <div
    class="inline-flex items-center justify-center rounded-lg px-[14px] py-[7px] text-xs font-bold"
    :class="{
      'bg-gray-opacity text-gray': status === 'to-do',
      'bg-primary-opacity text-primary': status === 'in-progress',
      'bg-purple-opacity text-purple': status === 'in-review',
      'bg-green-light text-green': status === 'done',
    }"
  >
    {{ $t('status.' + status) }}
  </div>
</template>
