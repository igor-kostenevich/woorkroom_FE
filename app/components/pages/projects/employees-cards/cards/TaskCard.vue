<template>
  <div class="flex">
    <div :style="{ marginRight: props.gap + 'px' }">
      <div class="mb-2 text-sm text-gray-light">
        {{ $t('employeesCards.taskCard.taskName') }}
      </div>
      <div class="text-dark first-letter:uppercase">
        {{ props.data.taskName }}
      </div>
    </div>
    <div class="flex flex-1 items-center justify-between gap-7">
      <div class="flex-1">
        <div class="mb-2 text-sm text-gray-light">
          {{ $t('employeesCards.taskCard.estimate') }}
        </div>
        <div class="text-dark first-letter:uppercase">
          {{ props.data.estimate }}
        </div>
      </div>
      <div class="flex-1">
        <div class="mb-2 text-sm text-gray-light">
          {{ $t('employeesCards.taskCard.spentTime') }}
        </div>
        <div class="text-dark first-letter:uppercase">
          {{ props.data.spentTime }}
        </div>
      </div>
      <div class="flex-1">
        <div class="mb-2 text-sm text-gray-light">
          {{ $t('employeesCards.taskCard.assignee') }}
        </div>
        <UserAvatar
          size="sm"
          :full-name="props.data.fullName"
          :image="props.data.assigneeImage"
        />
      </div>
      <div class="flex-1">
        <div class="mb-2 text-sm text-gray-light">
          {{ $t('employeesCards.taskCard.priority') }}
        </div>
        <div />
      </div>
      <div v-if="props.data.status" class="flex-1">
        <TaskStatus :status="props.data.status" />
      </div>

      <Progress size="sm" :progress="props.data.progress" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITask } from '~/types/components/employee-cards';
const UserAvatar = defineAsyncComponent(
  () => import('~/components/common/UserAvatar.vue')
);
const TaskStatus = defineAsyncComponent(
  () => import('~/components/pages/projects/TaskStatus.vue')
);
const Progress = defineAsyncComponent(() => import('@/UIKit/Progress.vue'));

const props = defineProps<{
  data: ITask;
  gap: number;
}>();
</script>
