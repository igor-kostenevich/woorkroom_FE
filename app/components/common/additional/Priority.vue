<template>
  <div>
    <div v-if="showLabel" class="mb-1 text-sm text-gray-light">
      {{ $t('additional.priority') }}
    </div>
    <div :class="[priorityConfig.color, 'flex capitalize']">
      <Icon
        :size="24"
        :name="priorityConfig.icon"
        :class="['mr-1', priorityConfig.class]"
      />
      {{ priority }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/UIKit/Icon.vue';
import {
  PRIORITY_MAP,
  type IPriorityData,
  type PriorityLevel,
} from '~/types/shared/priority';

const props = withDefaults(defineProps<IPriorityData>(), {
  priority: 'low',
  showLabel: true,
});

const priorityConfig = computed(() => {
  const key: PriorityLevel = props.priority ?? 'low';
  return PRIORITY_MAP[key];
});
</script>
