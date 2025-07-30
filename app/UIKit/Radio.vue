<script setup lang="ts">
const props = defineProps<{
  id: string;
  name: string;
  value: string;
  modelValue: string;
}>();
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <label :for="props.id" class="flex cursor-pointer items-center gap-4">
    <span
      class="border-dark flex h-5 w-5 items-center justify-center rounded-full border-2"
    >
      <span
        class="h-2.5 w-2.5 rounded-full bg-primary"
        :class="modelValue === value ? 'opacity-100' : 'opacity-0'"
      />
    </span>
    <input
      :id="props.id"
      type="radio"
      :name="props.name"
      :value="props.value"
      class="sr-only"
      @change="emit('update:modelValue', props.value)"
    />
    <span class="text-gray">
      <slot />
    </span>
  </label>
</template>
