<template>
  <div>
    <div class="mb-2 text-sm text-gray-light">
      {{ $t('additional.text.gender') }}
    </div>
    <div class="text-dark">{{ gender }}</div>
  </div>
  <div>
    <div class="mb-2 text-sm text-gray-light">
      {{ $t('additional.text.birthday') }}
    </div>
    <div class="text-dark">{{ birthday }}</div>
  </div>
  <div>
    <div class="mb-2 text-sm text-gray-light">
      {{ $t('additional.text.age') }}
    </div>
    <div class="text-dark">{{ age }}</div>
  </div>
</template>

<script setup lang="ts">
interface ITextData {
  gender: 'Male' | 'Female';
  birthday: string;
  age: number;
}
defineProps<ITextData>();
</script>
