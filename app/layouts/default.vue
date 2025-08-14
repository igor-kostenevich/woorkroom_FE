<template>
  <div class="flex flex-1">
    <Sidebar hydrate-on-idle />
    <main class="flex flex-1 flex-col">
      <Header hydrate-on-idle />
      <div class="h-full px-10 pt-12">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/layout/Header.vue';
import Sidebar from '~/components/layout/Sidebar.vue';
</script>
