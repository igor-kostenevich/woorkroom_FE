<template>
  <div
    class="flex items-center gap-2"
    :class="disabled ? 'opacity-50' : 'cursor-pointer'"
  >
    <button
      type="button"
      class="relative flex h-[31px] w-[51px] items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      :class="[
        modelValue ? 'bg-primary' : 'bg-gray-secondary',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      ]"
      role="switch"
      :aria-checked="modelValue"
      :aria-disabled="disabled"
      tabindex="0"
      @click.space.prevent="
        !disabled && emit('update:modelValue', !props.modelValue)
      "
    >
      <span
        class="absolute top-1 h-[23px] w-[23px] rounded-full bg-white transition-all duration-300"
        :class="modelValue ? 'left-[24px]' : 'left-1'"
      />
    </button>

    <span v-if="$slots.default" class="ml-4 text-gray">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>
