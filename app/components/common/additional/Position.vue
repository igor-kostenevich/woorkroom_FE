<template>
  <div class="">
    <div class="mb-1 text-sm text-gray-light">
      {{ $t('additional.position') }}
    </div>
    <div class="flex flex-1 items-center justify-between gap-3">
      <div class="truncate text-dark">
        {{ positionName }}
      </div>
      <EmployeeLvl :lvl="positionLevel" class="ml-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EmployeeLevel } from '@/types/employees/EmployeeLvl';

const EmployeeLvl = defineAsyncComponent(
  () => import('~/components/pages/employees/EmployeeLvl.vue')
);

interface IPositionData {
  positionName?: string;
  positionLevel?: EmployeeLevel;
}

withDefaults(defineProps<IPositionData>(), {
  positionName: '',
  positionLevel: 1,
});
</script>
