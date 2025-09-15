<template>
  <div>
    <div v-if="showLabel" class="mb-1 ml-2 text-sm text-gray-light">
      {{ $t('additional.priority') }}
    </div>
    <div :class="[colors, 'flex capitalize']">
      <Icon :size="24" :name="iconName" :class="['mr-1', iconClass]" />
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
  showLabel: true,
});

const MAP = {
  low: {
    icon: 'arrow-down',
    color: 'text-green-vivid',
    class: 'transfrom rotate-180',
  },
  medium: { icon: 'arrow-up', color: 'text-orange', class: '' },
  high: { icon: 'arrow-up', color: 'text-red', class: '' },
} as const;

const iconName = computed(() => MAP[props.priority].icon);
const colors = computed<string>(() => MAP[props.priority].color);
const iconClass = computed<string>(() => MAP[props.priority].class);
</script>
