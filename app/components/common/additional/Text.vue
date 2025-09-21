<template>
  <div class="">
    <div v-if="label" class="mb-1 text-sm text-gray-light">
      {{ $t(label) }}
    </div>
    <div class="w-32 truncate text-dark">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
interface ITextData {
  label?: string;
  text: string;
}
defineProps<ITextData>();
</script>
