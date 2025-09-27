<template>
  <div>
    <div class="mb-1 text-sm text-gray-light">
      {{ $t('additional.requestType') }}
    </div>
    <div class="">
      <VacationIndicator status="pending" indicator="sick" />
    </div>
  </div>
</template>

<script setup lang="ts">
const VacationIndicator = defineAsyncComponent(
  () => import('~/components/pages/vacations/VacationIndicator.vue')
);

// interface  {
//
// }
//
// withDefaults(defineProps<>(), {
//
// });
</script>
