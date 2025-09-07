<template>
  <div>
    <div v-if="label" class="mb-1 text-sm text-gray-light">
      {{ label }}
    </div>
    <div class="text-dark">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
interface ITextData {
  label?: string;
  text: string;
}
defineProps<ITextData>();
</script>
