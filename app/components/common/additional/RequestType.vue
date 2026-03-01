<template>
  <div>
    <div v-if="showLabel" class="mb-1 text-sm text-gray-light">
      {{ $t('additional.requestType') }}
    </div>
    <div class="flex items-center gap-3">
      <div :class="['h-[10px] w-[10px] rounded-full', colorClass]" />
      <div class="font-bold leading-[150%] text-dark">
        {{ $t(`indicator.${requestType}`) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  REQUEST_TYPE_COLORS,
  type TLeaveType,
} from '~/types/shared/vacationIndicator';

const props = withDefaults(
  defineProps<{
    requestType: TLeaveType;
    showLabel?: boolean;
  }>(),
  {
    showLabel: true,
  }
);

const colorClass = computed(() => {
  const type: TLeaveType = props.requestType;
  return REQUEST_TYPE_COLORS[type] ?? '';
});
</script>
