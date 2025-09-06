<template>
  <div>
    <div v-if="label" class="mb-2 ml-2 text-sm text-gray-light">
      {{ $t('additional.priority') }}
    </div>
    <div :class="[selectedColor, 'flex capitalize']">
      <Icon :size="24" :name="selectedIcon" />
      {{ props.priority }}
    </div>
  </div>
</template>

<script setup lang="ts">
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

interface IPriorityData {
  priority: 'low' | 'medium' | 'high';
  label?: boolean;
}
const props = defineProps<IPriorityData>();

const selectedIcon = computed<'arrow-down' | 'arrow-right' | 'arrow-up'>(() => {
  if (props.priority === 'low') return 'arrow-down';
  return 'arrow-up';
});
const selectedColor = computed(() => {
  if (props.priority === 'low') return 'text-green-vivid';
  if (props.priority === 'medium') return 'text-orange';
  return 'text-red';
});
</script>
