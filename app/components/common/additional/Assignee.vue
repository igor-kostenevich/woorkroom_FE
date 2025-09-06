<template>
  <div>
    <div v-if="label" class="mb-2 text-sm text-gray-light">
      {{ $t('additional.priority') }}
    </div>
    <div class="flex">
      <UserAvatar
        v-for="(userAvatar, index) in newListWithUsers"
        :key="userAvatar.id"
        size="sm"
        :full-name="userAvatar.fullName"
        :image="userAvatar.userImage"
        :class="[
          'rounded-full border-2 border-white',
          index === 1 ? '-translate-x-1' : '',
          index === 2 ? '-translate-x-2' : '',
          index === 3 ? '-translate-x-3' : '',
        ]"
      />
      <div
        v-if="userAvatarData.length > 4"
        class="flex h-6 w-6 -translate-x-4 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white"
      >
        +{{ numAssignees }}
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
  label: boolean;
  userAvatarData: IUserData[];
}
const props = defineProps<IAssigneeData>();

const numAssignees = computed(() => props.userAvatarData.length - 3);
const newListWithUsers = computed(() =>
  props.userAvatarData.length > 4
    ? props.userAvatarData.slice(0, 3)
    : props.userAvatarData
);
</script>
