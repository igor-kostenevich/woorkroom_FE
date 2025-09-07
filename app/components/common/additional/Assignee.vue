<template>
  <div>
    <div v-if="label" class="mb-2 text-sm text-gray-light">
      {{ $t('additional.assignees') }}
    </div>
    <div class="flex -space-x-1">
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
        class="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white"
        :aria-label="`+${restUsers}`"
      >
        +{{ restUsers }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const UserAvatar = defineAsyncComponent(
  () => import('~/components/common/UserAvatar.vue')
);

interface IUserData {
  id: string;
  userImage?: string;
  fullName: string;
}
interface IAssigneeData {
  showLabel?: boolean;
  label?: string;
  userAvatarData?: IUserData[];
  max?: number;
}

const props = withDefaults(defineProps<IAssigneeData>(), {
  showLabel: false,
  label: 'additional.priority',
  userAvatarData: () => [],
  max: 3,
});

const visibleUsers = computed<IUserData[]>(() =>
  props.userAvatarData.slice(0, props.max)
);
const restUsers = computed<number>(() =>
  Math.max(0, props.userAvatarData.length - props.max)
);
</script>
