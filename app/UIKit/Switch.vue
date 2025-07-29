<template>
  <div class="flex items-center gap-2">
    <button
      type="button"
      class="relative flex h-8 w-14 cursor-pointer items-center rounded-full transition-colors duration-300"
      :class="modelValue ? 'bg-primary' : 'bg-gray-opacity'"
      role="switch"
      @click="toggle"
    >
      <span
        class="absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-all duration-300"
        :class="modelValue ? 'left-7' : ''"
      />
    </button>

    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

function toggle() {
  emit('update:modelValue', !props.modelValue);
}
</script>
