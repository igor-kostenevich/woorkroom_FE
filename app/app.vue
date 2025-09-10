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

  <client-only>
    <ModalsContainer v-if="showModalsContainer" />
  </client-only>
</template>

<script lang="ts" setup>
const IconSymbols = defineAsyncComponent(
  () => import('@/UIKit/IconSymbols.vue')
);

const ModalsContainer = defineAsyncComponent(
  () => import('~/components/layout/ModalsContainer.vue')
);

const { initApp, parseUserAgent, isAppFullyLoaded } = useApp();
const { openModalByQuery, openedModals } = useModal();

const showModalsContainer = ref(false);

watch(
  () => isAppFullyLoaded.value,
  async (isAppFullyLoaded) => {
    if (isAppFullyLoaded) {
      void start();
    }
  }
);

// Show when the user is logged in
// watch(
//     () => userStore.isLogged,
//     (isLogged, lastLogged) => {
//         if (isLogged && !lastLogged) {
//             openModalAfterAuth();
//         }
//     }
// );

onMounted(() => {
  initApp();

  const unwatchOpenedModals = watch(
    () => openedModals.value,
    (openedModals) => {
      if (openedModals.length) {
        showModalsContainer.value = true;
        unwatchOpenedModals();
      }
    },
    { deep: true, immediate: true }
  );
});

async function start() {
  // 🟢Load and init socket
  // void initSocket();

  // 🟢Opens a modal if a query parameter "modal" exists
  openModalByQuery();
}

/**
 * Retrieves device information from the user agent.
 * Runs once on the server only.
 */
parseUserAgent();
</script>
