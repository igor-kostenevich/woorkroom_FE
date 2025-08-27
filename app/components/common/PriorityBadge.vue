<script setup lang="ts">
const Icon = defineAsyncComponent(() => import('~/UIKit/Icon.vue'));

const props = defineProps<{
  priority: 'Low' | 'Medium';
}>();
</script>

<template>
  <div class="flex items-center gap-1">
    <Icon
      :name="props.priority === 'Low' ? 'arrow-down' : 'arrow-up'"
      :class="{
        'text-green': props.priority === 'Low',
        'text-yellow': props.priority === 'Medium',
      }"
      class="h-4 w-4"
    />
    <div
      class="font-bold"
      :class="{
        'text-green': props.priority === 'Low',
        'text-yellow': props.priority === 'Medium',
      }"
    >
      {{ props.priority }}
    </div>
  </div>
</template>
