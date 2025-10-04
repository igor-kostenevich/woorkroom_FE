<script setup lang="ts">
const Input = defineAsyncComponent(() => import('@/UIKit/Input.vue'));

interface Props {
  label: string;
  start: string;
  end: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:start', 'update:end']);

function parse12h(time: string, fallbackPeriod: 'AM' | 'PM'): number {
  const m = time
    .trim()
    .match(/^(0?[1-9]|1[0-2])(?::([0-5][0-9]))?\s*(AM|PM)?$/i);
  if (!m) return NaN;

  let h = Number(m[1]);
  const min = m[2] ? Number(m[2]) : 0;
  const period = (m[3]?.toUpperCase() as 'AM' | 'PM') ?? fallbackPeriod;

  if (period === 'AM' && h === 12) h = 0;
  if (period === 'PM' && h !== 12) h += 12;

  return h * 60 + min;
}

const duration = computed(() => {
  if (!props.start || !props.end) return '';

  const start = parse12h(props.start, 'AM');
  const end = parse12h(props.end, 'PM');
  if (!isFinite(start) || !isFinite(end)) return '';

  let diff = end - start;
  if (diff < 0) diff += 24 * 60;

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  return `${hours}h ${minutes}m`;
});
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
