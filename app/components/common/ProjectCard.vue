<script setup lang="ts">
import Icon from '~/UIKit/Icon.vue';
import Assigneers from '~/components/common/Assigneers.vue';
import type { IProjectCard } from '~/types/profile/ProjectCard';

const props = defineProps<IProjectCard>();
</script>

<template>
  <div
    class="relative flex flex-col rounded-3xl bg-white py-5 pl-6 shadow-base lg:grid lg:grid-cols-2 xl:py-7"
  >
    <div class="pr-5 lg:pr-8">
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

        <div class="flex items-center gap-1">
          <Icon
            :name="props.priority === 'Low' ? 'arrow-down' : 'arrow-up'"
            :class="{
              'text-green': props.priority === 'Low',
              'text-yellow': props.priority === 'Medium',
            }"
            class="h-4 w-4"
          />
          <div
            class="font-bold"
            :class="{
              'text-green': props.priority === 'Low',
              'text-yellow': props.priority === 'Medium',
            }"
          >
            {{ props.priority }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="none absolute inset-x-0 left-1/2 w-px bg-gray-muted lg:inset-y-0 lg:block"
    />
    <div class="pl-0 lg:pl-8">
      <div class="mb-5 pt-5 font-bold lg:pt-1">{{ $t('Project Data') }}</div>

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
          <span class="text-sm text-gray-light">{{ $t('Active tasks') }}</span>
          <Assigneers :assignees="props.assignees ?? []" :max-visible="3" />
        </div>
      </div>
    </div>
  </div>
</template>
