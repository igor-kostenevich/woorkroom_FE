<script setup lang="ts">
import Icon from './Icon.vue';

defineProps<{
  id: string;
  modelValue: boolean;
}>();

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <label :for="id" class="relative flex cursor-pointer items-center">
    <input
      :id="id"
      type="checkbox"
      :checked="modelValue"
      class="peer sr-only"
      @change="
        emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
    />
    <div
      class="flex h-6 w-6 items-center justify-center rounded border-2 border-dark-default bg-white transition-colors"
    >
      <Icon
        name="checked"
        class="text-primary transition-transform duration-200"
        :class="modelValue ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
      />
    </div>
    <div class="ml-2">
      <slot />
    </div>
  </label>
</template>
