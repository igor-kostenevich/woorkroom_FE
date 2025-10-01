<script setup lang="ts">
import type { IEmployeesCardData } from '~/types/components/employees-card';

const UserAvatar = defineAsyncComponent(
  () => import('~/components/common/UserAvatar.vue')
);
const EmployeeLvl = defineAsyncComponent(
  () => import('~/components/pages/employees/EmployeeLvl.vue')
);
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

const props = withDefaults(
  defineProps<{
    data?: IEmployeesCardData;
  }>(),
  {
    data: () => ({
      isBusy: false,
      progress: 0,
      userImage: '',
      fullName: '',
      positionName: '',
      positionLevel: 1,
      backlogTasks: 0,
      tasksInProgress: 0,
      tasksInReview: 0,
    }),
  }
);

const selectedCardColor = computed(() =>
  props.data.isBusy ? 'yellow' : undefined
);
</script>

<template>
  <div class="rounded-3xl bg-white px-2 pb-7 pt-2 shadow-md">
    <div
      :class="[
        'mb-7 flex flex-col items-center rounded-3xl bg-light p-4 pb-6',
        {
          'bg-yellow-opacity': data.isBusy,
        },
      ]"
    >
      <UserAvatar
        :progress="data.progress"
        size="lg"
        :full-name="data.fullName"
        :image="data.userImage"
        :color="selectedCardColor"
        class="mb-4"
      />
      <div class="mb-1 text-center font-bold text-dark">
        {{ data.fullName }}
      </div>
      <div class="mb-2 text-center text-sm text-dark">
        {{ data.positionName }}
      </div>
      <div v-if="data.positionLevel">
        <EmployeeLvl :lvl="data.positionLevel" />
      </div>
    </div>
    <div class="flex items-center justify-between gap-6 px-2">
      <div class="text-center text-sm text-gray-light">
        <div class="mb-4 text-center text-[26px] font-bold text-dark">
          {{ data.backlogTasks }}
        </div>
        {{ $t('employeesCard.backlogTasks') }}
      </div>
      <div class="text-center text-sm text-gray-light">
        <div class="mb-4 text-center text-[26px] font-bold text-dark">
          {{ data.tasksInProgress }}
        </div>
        {{ $t('employeesCard.tasksInProgress') }}
      </div>
      <div class="text-center text-sm text-gray-light">
        <div class="mb-4 text-center text-[26px] font-bold text-dark">
          {{ data.tasksInReview }}
        </div>
        {{ $t('employeesCard.tasksInReview') }}
      </div>
    </div>
  </div>
  <Icon :size="48" name="sleep-z" class="h-1 w-5 text-yellow" />
</template>
