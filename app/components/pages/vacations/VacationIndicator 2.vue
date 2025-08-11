<script setup lang="ts">
import type {
  TLeaveType,
  TVacationStatus,
} from '~/types/vacations/VacationIndicator';

const props = defineProps<{
  status: TVacationStatus;
  indicator: TLeaveType;
}>();

const colorMap: Record<TLeaveType, string> = {
  sick: 'red',
  vacation: 'blue',
  remote: 'violet',
};

const indicatorClass = computed(() => {
  const color = colorMap[props.indicator];

  return props.status === 'approved'
    ? {
        'bg-red': color === 'red',
        'bg-blue': color === 'blue',
        'bg-violet': color === 'violet',
      }
    : {
        'border border-red': color === 'red',
        'border border-blue': color === 'blue',
        'border border-violet': color === 'violet',
      };
});
</script>

<template>
  <div class="flex items-center gap-3 text-sm font-medium text-gray">
    <div class="h-3.5 w-3.5 rounded-full" :class="indicatorClass" />
    <span>{{ props.status }}</span>
  </div>
</template>
