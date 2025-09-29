<script setup lang="ts">
import type { IEmployeesCardData } from '~/types/components/employees-card';

const UserAvatar = defineAsyncComponent(
  () => import('~/components/common/UserAvatar.vue')
);
const EmployeeLvl = defineAsyncComponent(
  () => import('~/components/pages/employees/EmployeeLvl.vue')
);

withDefaults(
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
</script>

<template>
  <div>
    <div>
      <UserAvatar
        :progress="data.progress"
        size="lg"
        :full-name="data.fullName"
        :image="data.userImage"
      />
      <div>
        {{ data.fullName }}
      </div>
      <div>
        {{ data.positionName }}
      </div>
      <div v-if="data.positionLevel">
        <EmployeeLvl :lvl="data.positionLevel" />
      </div>
    </div>
    <div>
      <div>
        <div>
          {{ data.backlogTasks }}
        </div>
        {{ $t('employeesCard.backlogTasks') }}
      </div>
      <div>
        <div>
          {{ data.tasksInProgress }}
        </div>
        {{ $t('employeesCard.tasksInProgress') }}
      </div>
      <div>
        <div>
          {{ data.tasksInReview }}
        </div>
        {{ $t('employeesCard.tasksInReview') }}
      </div>
    </div>
  </div>
</template>
