<template>
  <IconSymbols />

  <div class="flex min-h-screen flex-col bg-light p-5">
    <div class="flex flex-1 flex-col">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>

  <div id="teleports" class="relative z-[600]" />
</template>

<script lang="ts" setup>
const IconSymbols = defineAsyncComponent(
  () => import('@/UIKit/IconSymbols.vue')
);

const { initApp, parseUserAgent } = useApp();

onMounted(() => {
  initApp();
});

/**
 * Retrieves device information from the user agent.
 * Runs once on the server only.
 */
parseUserAgent();
</script>
