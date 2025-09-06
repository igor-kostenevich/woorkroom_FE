<template>
  <div>
    <div class="mb-2 text-sm text-gray-light">
      {{ $t('additional.position') }}
    </div>
    <div class="text-dark">
      {{ positionName }}
      <EmployeeLvl :lvl="positionLevel" class="ml-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
const EmployeeLvl = defineAsyncComponent(
  () => import('~/components/pages/employees/EmployeeLvl.vue')
);

interface IPositionData {
  positionName: string;
  positionLevel: number;
}

defineProps<IPositionData>();
</script>
