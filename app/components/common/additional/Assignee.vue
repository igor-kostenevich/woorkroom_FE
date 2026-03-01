<template>
  <div>
    <div v-if="showLabel" class="mb-1 text-sm text-gray-light">
      {{ $t('additional.assignees') }}
    </div>
    <div class="flex items-center -space-x-1">
      <UserAvatar
        v-for="user in visibleUsers"
        :key="user.id"
        size="sm"
        :full-name="user.fullName"
        :image="user.userImage"
        class="rounded-full border-2 border-white"
      />
      <div
        v-if="restUsers > 0"
        class="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white"
        :aria-label="`+${restUsers}`"
      >
        +{{ restUsers }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserAvatar from '~/components/common/UserAvatar.vue';
import type { IAssigneeData } from '~/types/shared/assignee';

const props = withDefaults(defineProps<IAssigneeData>(), {
  showLabel: true,
  assignees: () => [],
  max: 3,
});

const visibleUsers = computed(() => props.assignees.slice(0, props.max));

const restUsers = computed(() =>
  Math.max(0, props.assignees.length - props.max)
);
</script>
