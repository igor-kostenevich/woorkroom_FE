<template>
  <div class="rounded-3xl bg-white px-7 py-5">
    <component
      :is="selectedComponent"
      :data="props.data"
      :spacing="props.spacing"
    />
  </div>
</template>

<script setup lang="ts">
import type { TEntityCardData } from '~/types/projects/entityCard';

const EmployeeMainCard = defineAsyncComponent(
  () =>
    import('~/components/projects/entity-card/variants/EmployeeMainCard.vue')
);
const EmployeeStatsCard = defineAsyncComponent(
  () =>
    import('~/components/projects/entity-card/variants/EmployeeStatsCard.vue')
);
const ActiveTaskCard = defineAsyncComponent(
  () => import('~/components/projects/entity-card/variants/ActiveTaskCard.vue')
);
const BacklogTaskCard = defineAsyncComponent(
  () => import('~/components/projects/entity-card/variants/BacklogTaskCard.vue')
);
const RequestCard = defineAsyncComponent(
  () => import('~/components/projects/entity-card/variants/RequestCard.vue')
);

const props = defineProps<{
  data: TEntityCardData;
  spacing?: number;
}>();

let selectedComponent: Component = EmployeeMainCard;

if ('taskName' in props.data) {
  if ('status' in props.data) selectedComponent = ActiveTaskCard;
  else selectedComponent = BacklogTaskCard;
} else if ('requestType' in props.data) {
  selectedComponent = RequestCard;
} else {
  if (
    'vacations' in props.data &&
    'sickLeave' in props.data &&
    'workRemotely' in props.data
  ) {
    selectedComponent = EmployeeStatsCard;
  }
}
</script>
