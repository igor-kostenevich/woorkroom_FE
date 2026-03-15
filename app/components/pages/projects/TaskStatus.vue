<script setup lang="ts">
import { TaskStatus, type TTaskStatus } from '~/types/shared/taskStatus';

const props = defineProps<{
  status: TTaskStatus;
}>();

const getStatusColor = computed(() => {
  const colorMap: Record<TTaskStatus, string> = {
    [TaskStatus.TO_DO]: 'bg-gray-opacity text-gray',
    [TaskStatus.IN_PROGRESS]: 'bg-primary-opacity text-primary',
    [TaskStatus.IN_REVIEW]: 'bg-purple-opacity text-purple',
    [TaskStatus.DONE]: 'bg-green-light text-green',
  };

  return colorMap[props.status as TTaskStatus];
});

const getStatusLabel = (status: TTaskStatus) => {
  return $t('status.' + status);
};
</script>

<template>
  <div
    class="inline-flex items-center justify-center rounded-lg px-[14px] py-[7px] text-xs font-bold"
    :class="getStatusColor"
  >
    {{ getStatusLabel(status) }}
  </div>
</template>
