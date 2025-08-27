<script setup lang="ts">
import type { IAssignee } from '~/types/components/Assignee';

const UserAvatar = defineAsyncComponent(
  () => import('@/components/common/UserAvatar.vue')
);

const props = defineProps<{
  assignees: IAssignee[];
  maxVisible?: number;
}>();

const max = props.maxVisible ?? 3;
</script>

<template>
  <div class="flex items-start">
    <div
      v-for="user in props.assignees.slice(0, max)"
      :key="user.id"
      class="-ml-[2px] first:ml-0"
    >
      <UserAvatar
        size="sm"
        :full-name="user.name"
        :image="user.avatarUrl"
        class="ring-2 ring-white"
      />
    </div>

    <div v-if="assignees.length > max">
      <div
        class="h-6 min-w-6 rounded-full bg-primary p-1 text-center text-xs text-white"
      >
        +{{ assignees.length - max }}
      </div>
    </div>
  </div>
</template>
