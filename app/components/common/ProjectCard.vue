<script setup lang="ts">
import type { IProjectCard } from '~/types/profile/ProjectCard';

const PriorityBadge = defineAsyncComponent(
  () => import('~/components/common/additional/Priority.vue')
);
const Assignee = defineAsyncComponent(
  () => import('~/components/common/additional/Assignee.vue')
);
const Icon = defineAsyncComponent(() => import('~/UIKit/Icon.vue'));

const props = defineProps<IProjectCard>();
</script>

<template>
  <div
    class="relative flex flex-col rounded-3xl bg-white pl-6 shadow-base lg:grid lg:grid-cols-2"
  >
    <div class="border-gray-muted py-5 pr-5 lg:border-r lg:pr-8">
      <div class="mb-[22px] flex gap-4">
        <img :src="props.imageUrl" alt="project image" class="h-12 w-12" />

        <div class="flex flex-col">
          <span class="mb-0.5 text-sm text-gray-light">{{ props.id }}</span>

          <span class="text-lg font-bold">{{ props.title }}</span>
        </div>
      </div>

      <div
        class="flex items-center justify-between border-b border-gray-muted pb-5 lg:border-none lg:pb-0"
      >
        <div class="flex items-center gap-1.5">
          <Icon name="calendar" class="text-gray-light" />
          <span class="text-sm text-gray">{{ props.createdAt }}</span>
        </div>

        <PriorityBadge :priority="props.priority" />
      </div>
    </div>

    <div class="py-3 pl-0 lg:pl-8 xl:py-5">
      <div class="mb-5 font-bold lg:pt-1">{{ $t('Project Data') }}</div>

      <div class="flex flex-wrap items-start gap-x-[30px] lg:gap-x-[60px]">
        <div class="flex flex-col gap-1.5">
          <span class="text-sm text-gray-light">{{ $t('All tasks') }}</span>
          <div class="font-bold">{{ props.allTasks }}</div>
        </div>

        <div class="flex flex-col gap-1.5">
          <span class="text-sm text-gray-light">{{ $t('Active tasks') }}</span>
          <div class="font-bold">{{ props.activeTasks }}</div>
        </div>

        <div class="flex flex-col gap-1.5">
          <span class="text-sm text-gray-light">{{ $t('Assignees') }}</span>
          <Assignee
            :show-label="false"
            :user-avatar-data="props.assignees ?? []"
            :max="3"
          />
        </div>
      </div>
    </div>
  </div>
</template>
