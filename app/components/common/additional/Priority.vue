<template>
  <div>
    <div v-if="showLabel" class="mb-2 ml-2 text-sm text-gray-light">
      {{ $t('additional.priority') }}
    </div>
    <div :class="[colorClass, 'flex capitalize']">
      <Icon :size="24" :name="iconName" />
      {{ props.priority }}
    </div>
  </div>
</template>

<script setup lang="ts">
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

interface IPriorityData {
  priority?: 'low' | 'medium' | 'high';
  showLabel?: boolean;
}
const props = withDefaults(defineProps<IPriorityData>(), {
  priority: 'low',
  showLabel: false,
});

const MAP = {
  low: { icon: 'arrow-down', color: 'text-green-vivid' },
  medium: { icon: 'arrow-right', color: 'text-orange' },
  high: { icon: 'arrow-up', color: 'text-red' },
} as const;

const iconName = computed<'arrow-down' | 'arrow-right' | 'arrow-up'>(
  () => MAP[props.priority].icon
);
const colorClass = computed<string>(() => MAP[props.priority].color);
</script>
