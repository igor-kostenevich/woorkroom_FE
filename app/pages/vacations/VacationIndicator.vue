<script setup lang="ts">
import type {
  TVacationIndicator,
  TLeaveType,
} from '~/types/vacations/VacationIndicator';

const props = defineProps<{
  status: TVacationIndicator;
  indicator: TLeaveType;
}>();
</script>

<template>
  <div class="flex items-center gap-3 text-sm font-medium text-gray">
    <div
      class="h-3.5 w-3.5 rounded-full"
      :class="{
        'bg-red':
          props.indicator === 'Sick Leave' && props.status === 'Approved',
        'border border-red':
          props.indicator === 'Sick Leave' && props.status === 'Pending',

        'bg-blue':
          props.indicator === 'Vacation' && props.status === 'Approved',
        'border border-blue':
          props.indicator === 'Vacation' && props.status === 'Pending',

        'bg-violet':
          props.indicator === 'Work Remotely' && props.status === 'Approved',
        'border border-violet':
          props.indicator === 'Work Remotely' && props.status === 'Pending',
      }"
    />

    <span>{{ props.status }}</span>
  </div>
</template>
