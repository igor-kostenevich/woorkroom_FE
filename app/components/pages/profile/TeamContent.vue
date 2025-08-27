<script setup lang="ts">
import TeamMemberCard from '~/components/common/TeamMemberCard.vue';
</script>

<template>
  <div class="grid gap-7 lg:grid-cols-2 xl:grid-cols-4">
    <TeamMemberCard
      v-for="n in 7"
      :key="n"
      level="Junior"
      name="Randy Delgado"
      position="UI/UX Designer"
    />
  </div>
</template>
