<template>
  <div class="flex items-center gap-5">
    <UserAvatar
      :progress="progress"
      size="lg"
      :full-name="fullName"
      :image="userImage"
    />
    <div>
      <div v-if="fullName" class="mb-1 font-bold text-dark">{{ fullName }}</div>
      <div v-if="userEmail" class="text-sm text-gray-light">
        {{ userEmail }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const UserAvatar = defineAsyncComponent(
  () => import('~/components/common/UserAvatar.vue')
);

interface IUserData {
  userImage?: string;
  fullName: string;
  userEmail?: string;
  progress?: number;
}

withDefaults(defineProps<IUserData>(), {
  fullName: '',
  userEmail: '',
  userImage: '',
});
</script>
