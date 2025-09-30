<template>
  <div>
    <div v-if="showLabel" class="mb-1 text-sm text-gray-light">
      {{ $t('additional.requestType') }}
    </div>
    <div class="flex items-center gap-3">
      <div :class="['h-[10px] w-[10px] rounded-full', colorType]" />
      <div class="font-bold leading-[150%] text-dark">
        {{ $t(`indicator.${requestType}`) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TLeaveType } from '~/types/vacations/VacationIndicator';

const props = withDefaults(
  defineProps<{
    requestType: TLeaveType;
    showLabel?: boolean;
  }>(),
  {
    showLabel: true,
  }
);

const colorType = computed(() => {
  return {
    'bg-red': props.requestType === 'sick',
    'bg-violet': props.requestType === 'remote',
    'bg-blue': props.requestType === 'vacation',
  };
});
</script>
