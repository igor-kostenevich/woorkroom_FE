<template>
  <div>
    <div class="mb-2 text-sm text-gray-light">
      {{ $t(label) }}
    </div>
    <div class="text-dark">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
interface ITextData {
  label?: string;
  text?: string;
}
defineProps<ITextData>();
</script>
