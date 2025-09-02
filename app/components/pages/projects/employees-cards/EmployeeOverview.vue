<template>
  <div class="rounded-3xl bg-white px-7 py-5">
    <component :is="selectedCard" :data="props.data" :gap="props.gap" />
  </div>
</template>

<script setup lang="ts">
import type { TMainEmployee } from '~/types/components/employee-cards';

const props = defineProps<{
  data: TMainEmployee;
  gap: number;
}>();

let selectedCard: any = defineAsyncComponent(
  () =>
    import(
      '~/components/pages/projects/employees-cards/cards/EmployeeOverviewCard.vue'
    )
);

if ('taskName' in props.data)
  selectedCard = defineAsyncComponent(
    () =>
      import('~/components/pages/projects/employees-cards/cards/TaskCard.vue')
  );
else if ('vacations' in props.data)
  selectedCard = defineAsyncComponent(
    () =>
      import(
        '~/components/pages/projects/employees-cards/cards/EmployeeStatsCard.vue'
      )
  );
else if ('requestType' in props.data)
  selectedCard = defineAsyncComponent(
    () =>
      import(
        '~/components/pages/projects/employees-cards/cards/RequestCard.vue'
      )
  );
</script>
