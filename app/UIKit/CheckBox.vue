<template>
  <label
    :for="id"
    class="relative flex w-max items-center"
    :class="disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
  >
    <input
      :id="id"
      type="checkbox"
      :disabled="disabled"
      :checked="modelValue"
      class="peer sr-only"
      @change="
        emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
    />
    <div
      class="flex h-6 w-6 items-center justify-center rounded border-2 border-dark bg-white transition-colors"
      role="checkbox"
      :aria-checked="modelValue"
      aria-hidden="false"
    >
      <Icon
        name="checked"
        class="text-primary transition-transform duration-200"
        :size="16"
        :class="modelValue ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
      />
    </div>
    <div v-if="$slots.default" class="ml-4 text-gray">
      <slot />
    </div>
  </label>
</template>

<script setup lang="ts">
import Icon from './Icon.vue';

defineProps<{
  id: string;
  modelValue: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);
</script>
