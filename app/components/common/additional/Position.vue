<template>
  <div>
    <div class="mb-1 text-sm text-gray-light">
      {{ $t('additional.position') }}
    </div>
    <div class="text-dark">
      {{ positionName }}
      <EmployeeLvl :lvl="positionLevel" class="ml-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EmployeeLevel, type IPositionData } from '~/types/employees';

import EmployeeLvl from '~/components/pages/employees/EmployeeLvl.vue';

withDefaults(defineProps<IPositionData>(), {
  positionName: '',
  positionLevel: EmployeeLevel.JUNIOR,
});
</script>
