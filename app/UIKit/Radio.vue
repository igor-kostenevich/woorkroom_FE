<template>
  <label
    :for="props.id"
    class="flex w-max items-center gap-3"
    :class="disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
  >
    <span
      class="flex h-5 w-5 items-center justify-center rounded-full border-2 border-dark"
    >
      <span
        class="h-2.5 w-2.5 rounded-full"
        :class="modelValue === value ? 'bg-primary' : 'bg-transparent'"
      />
    </span>

    <input
      :id="props.id"
      type="radio"
      :name="props.name"
      :value="props.value"
      :checked="modelValue === value"
      :disabled="disabled"
      class="sr-only"
      @change="emit('update:modelValue', props.value)"
    />

    <span v-if="$slots.default">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string;
  name: string;
  value: string;
  modelValue: string;
  disabled?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);
</script>
