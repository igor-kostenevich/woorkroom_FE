<template>
  <div class="flex">
    <div
      class="flex items-center gap-5"
      :style="{ marginRight: props.gap + 'px' }"
    >
      <UserAvatar
        size="lg"
        :full-name="props.data.fullName"
        :image="props.data.image"
      />
      <div>
        <div class="mb-2 font-bold text-dark">{{ props.data.fullName }}</div>
        <div class="text-sm text-gray-light">{{ props.data.email }}</div>
      </div>
    </div>
    <div class="flex flex-1 justify-between gap-8">
      <div class="flex-1">
        <div class="mb-2 text-sm text-gray-light">
          {{ $t('employeesCards.employeeOverviewCard.vacations') }}
        </div>
        <div class="text-dark first-letter:uppercase">
          {{ props.data.vacations }}
        </div>
      </div>
      <div class="flex-1">
        <div class="mb-2 text-sm text-gray-light">
          {{ $t('employeesCards.employeeOverviewCard.sickLeave') }}
        </div>
        <div class="text-dark first-letter:uppercase">
          {{ props.data.sickLeave }}
        </div>
      </div>
      <div class="mr-7">
        <div class="mb-2 text-sm text-gray-light">
          {{ $t('employeesCards.employeeOverviewCard.workRemotely') }}
        </div>
        <div class="text-dark first-letter:uppercase">
          {{ props.data.workRemotely }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IEmployeeStats } from '~/types/components/employee-cards';
const UserAvatar = defineAsyncComponent(
  () => import('~/components/common/UserAvatar.vue')
);

const props = defineProps<{
  data: IEmployeeStats;
  gap: number;
}>();
</script>
