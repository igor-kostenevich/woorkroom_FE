<script setup lang="ts">
import type { TeamMemberCard } from '~/types/profile/TeamMemberCard';
import UserAvatar from '~/components/common/UserAvatar.vue';
import EmployeeLvl from '~/components/pages/employees/EmployeeLvl.vue';

const props = defineProps<TeamMemberCard>();
</script>

<template>
  <div class="flex flex-col items-center rounded-3xl bg-white py-4 shadow-base">
    <UserAvatar
      class="block bg-primary stroke-primary"
      :progress="50"
      size="lg"
      :full-name="props.name"
    />

    <div class="mt-4 font-bold">
      {{ props.name }}
    </div>

    <div class="mb-2 text-sm">{{ props.position }}</div>

    <div>
      <EmployeeLvl :lvl="1" />
    </div>
  </div>
</template>
