<script setup lang="ts">
import { getDurationFromTimeRange } from '@/utils/timeFormatter';

const Input = defineAsyncComponent(() => import('@/UIKit/Input.vue'));

interface Props {
  label: string;
  start: string;
  end: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:start', 'update:end']);

const duration = computed(() =>
  getDurationFromTimeRange(props.start, props.end)
);
</script>

<template>
  <div class="mb-6 flex gap-x-7">
    <Input
      :placeholder="$t('calendar.startPlaceholder')"
      icon="time-outlined"
      :model-value="props.start"
      @update:model-value="emit('update:start', $event)"
    >
      <template #topTextLeft>{{ $t('calendar.From') }}</template>
    </Input>

    <Input
      :placeholder="$t('calendar.endPlaceholder')"
      icon="time-outlined"
      :model-value="props.end"
      @update:model-value="emit('update:end', $event)"
    >
      <template #topTextLeft>{{ $t('calendar.To') }}</template>
    </Input>
  </div>

  <div class="flex items-center justify-between rounded-xl bg-light px-7 py-4">
    <div class="text-lg font-bold">
      {{ label }}
    </div>
    <div class="text-3xl font-bold text-blue">
      {{ duration }}
    </div>
  </div>
</template>
