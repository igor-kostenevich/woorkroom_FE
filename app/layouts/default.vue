<template>
  <div class="flex flex-1 p-5">
    <Sidebar hydrate-on-idle />
    <main id="js-content" class="flex flex-1 flex-col overflow-x-auto">
      <Header hydrate-on-idle />
      <div class="h-full pt-8 md:pl-10 md:pr-5 md:pt-12">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/layout/Header.vue';
import Sidebar from '~/components/layout/Sidebar.vue';
</script>
