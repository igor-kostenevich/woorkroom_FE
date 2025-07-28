<script setup lang="ts">
import type { TTaskStatus } from '~/types/projects/taskStatus';

const props = defineProps<{
  status: TTaskStatus;
}>();
</script>

<template>
  <div
    class="inline-flex rounded-lg px-4 py-2 font-bold"
    :class="{
      'bg-gray-opacity text-gray': props.status === 'To Do',
      'bg-primary-opacity text-primary': props.status === 'In Progress',
      'bg-purpule-opacity text-purpule': props.status === 'In Review',
      'bg-green-light text-green': props.status === 'Done',
    }"
  >
    <slot />
  </div>
</template>
