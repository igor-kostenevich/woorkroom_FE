<template>
  <div
    class="inline-flex rounded-md border-2 border-gray px-1.5 py-[1px] text-xs font-semibold leading-3 text-gray"
  >
    {{ levelLabel }}
  </div>
</template>

<script setup lang="ts">
import { EmployeeLevel } from '@/types/employees/EmployeeLvl';

const props = defineProps<{
  lvl: number;
}>();

const levelLabel = computed(() => {
  return EmployeeLevel[props.lvl] ?? 'Unknown';
});
</script>
