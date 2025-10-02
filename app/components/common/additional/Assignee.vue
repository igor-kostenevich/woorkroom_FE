<template>
  <div>
    <div v-if="showLabel" class="mb-1 text-sm text-gray-light">
      {{ $t('additional.assignees') }}
    </div>
    <div class="flex items-center -space-x-1">
      <UserAvatar
        v-for="userAvatar in visibleUsers"
        :key="userAvatar.id"
        size="sm"
        :full-name="userAvatar.fullName"
        :image="userAvatar.userImage"
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
import type { IAssigneeData } from '~/types/components/assignee';

const UserAvatar = defineAsyncComponent(
  () => import('~/components/common/UserAvatar.vue')
);

const props = withDefaults(defineProps<IAssigneeData>(), {
  showLabel: true,
  userAvatarData: () => [],
  max: 3,
});

// TODO: Improve types
const visibleUsers = computed<any[]>(() =>
  props.userAvatarData.slice(0, props.max)
);

// TODO: Improve types
const restUsers = computed<number>(() =>
  Math.max(0, props.userAvatarData.length - props.max)
);
</script>
