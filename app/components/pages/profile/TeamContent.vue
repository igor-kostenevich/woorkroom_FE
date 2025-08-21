<script setup lang="ts">
import TeamMemberCard from '~/components/common/TeamMemberCard.vue';
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-8">
    <TeamMemberCard
      v-for="n in 7"
      :key="n"
      level="Junior"
      name="Randy Delgado"
      position="UI/UX Designer"
    />
  </div>
</template>
