<script setup lang="ts">
import type { TeamMemberCard } from '~/types/profile/teamMemberCard';

const UserAvatar = defineAsyncComponent(
  () => import('~/components/common/UserAvatar.vue')
);
const EmployeeLvl = defineAsyncComponent(
  () => import('~/components/pages/employees/EmployeeLvl.vue')
);

const props = defineProps<TeamMemberCard>();
</script>

<template>
  <div class="flex flex-col items-center rounded-3xl bg-white py-5 shadow-base">
    <UserAvatar
      color="primary"
      :progress="50"
      size="lg"
      :full-name="props.name"
    />

    <div class="mt-4 font-bold">
      {{ props.name }}
    </div>

    <div class="mb-2 text-sm">{{ props.position }}</div>

    <EmployeeLvl :lvl="1" />
  </div>
</template>
