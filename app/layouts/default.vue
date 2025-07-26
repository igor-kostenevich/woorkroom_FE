<template>
  <div class="flex flex-1">
    <Sidebar />
    <main class="flex flex-1 flex-col">
      <Header />
      <div class="h-full px-10 py-12">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/layout/Header.vue';
import Sidebar from '~/components/layout/Sidebar.vue';
</script>
