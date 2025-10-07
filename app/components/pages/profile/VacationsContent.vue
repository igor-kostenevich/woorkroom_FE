<script setup lang="ts">
const DaysAvailableCard = defineAsyncComponent(
  () => import('~/components/common/DaysAvailableCard.vue')
);

const EntityCardTable = defineAsyncComponent(
  () => import('~/components/projects/EntityCardTable.vue')
);
const Text = defineAsyncComponent(
  () => import('~/components/common/additional/Text.vue')
);
const VacationStatus = defineAsyncComponent(
  () => import('~/components/pages/vacations/VacationStatus.vue')
);
const RequestType = defineAsyncComponent(
  () => import('~/components/common/additional/RequestType.vue')
);

const cardsOfDaysAvailable = [
  {
    size: 'xl',
    progress: 80,
    color: 'blue',
    title: 'Vacation',
    label: '12/16 days available',
  },
  {
    size: 'xl',
    progress: 50,
    color: 'yellow',
    title: 'Sick Leave',
    label: '5/10 days available',
  },
  {
    size: 'xl',
    progress: 30,
    color: 'red',
    title: 'Remote Work',
    label: '3/12 days available',
  },
];

const vacationsCardData = [
  [
    {
      componentName: RequestType,
      data: {
        requestType: 'sick',
      },
    },
    {
      componentName: Text,
      data: {
        label: 'additional.Duration',
        text: '3 days',
      },
    },
    {
      componentName: Text,
      data: {
        label: 'additional.Start Day',
        text: 'Sep 13, 2020',
      },
    },
    {
      componentName: Text,
      data: {
        label: 'additional.End Day',
        text: 'Sep 16, 2020',
      },
    },
    {
      componentName: VacationStatus,
      data: {
        status: 'pending',
      },
    },
  ],
];
</script>

<template>
  <div class="mb-12 grid grid-cols-1 gap-7 lg:grid-cols-2 xl:grid-cols-3">
    <DaysAvailableCard
      v-for="(card, index) in cardsOfDaysAvailable"
      :key="index"
      v-bind="card"
    />
  </div>

  <h2 class="text-xl font-bold">{{ $t('My Requests') }}</h2>

  <EntityCardTable
    :first-column-width="250"
    :cards-data="vacationsCardData"
    :show-action-button="false"
  />
</template>
