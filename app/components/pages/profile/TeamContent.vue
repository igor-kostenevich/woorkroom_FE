<script setup lang="ts">
const team = defineAsyncComponent(
  () => import('~/components/common/userCard.vue')
);
</script>

<template>
  <div class="grid gap-7 lg:grid-cols-2 xl:grid-cols-4">
    <team
      v-for="n in 7"
      :key="n"
      level="Junior"
      name="Randy Delgado"
      position="UI/UX Designer"
    />
  </div>
</template>
