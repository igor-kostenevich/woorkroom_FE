<template>
  <Teleport to="#teleports">
    <TransitionGroup
      appear
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-for="(modal, index) in openedModals"
        :key="modal.name"
        class="fixed inset-0 flex items-center justify-center bg-primary-overlay"
        :style="{ zIndex: index * 2 }"
        @click.self="close(index)"
      >
        <span class="animate-pulse text-neutral-500 opacity-0"
          >{{ String('loading') }}...</span
        >
      </div>
    </TransitionGroup>

    <TransitionGroup v-bind="isMobile ? animMobile : animDesktop">
      <template v-for="(modal, index) in openedModals" :key="modal.name">
        <component
          :is="modals[modal.name as ModalName]"
          :data="modal.data"
          :options="modal.options"
          :style="{ zIndex: index * 2 + 1 }"
        />
      </template>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
import { useScrollLock } from '@vueuse/core';
import useModal from '@/composables/useModal';

const { isMobile } = useApp();
const route = useRoute();
const isLocked = useScrollLock(document?.body);
const { openedModals, hideModal } = useModal();

type ModalName = keyof typeof modals;

// Modals list
const modals = {
  Example: defineAsyncComponent(() => import('../modals/Example/index.vue')),
};

watch(
  () => openedModals.value,
  (val) => {
    isLocked.value = !!val.length;
  },
  { deep: true, immediate: true }
);

watch(
  () => route.path,
  (newPath, oldPath) => {
    const closeWhenRouteChanges = openedModals.value.some(
      (m) => m.options.closeWhenRouteChanges
    );
    if (
      openedModals.value.length &&
      newPath !== oldPath &&
      closeWhenRouteChanges
    ) {
      hideModal(true);
    }
  }
);

function close(index: number) {
  if (openedModals.value[index]?.options.closable) hideModal();
}

const animDesktop = {
  enterActiveClass: 'transition duration-300 ease-out',
  enterFromClass: 'opacity-0 scale-95',
  enterToClass: 'opacity-100 scale-100',
  leaveActiveClass: 'transition duration-300 ease-in',
  leaveFromClass: 'opacity-100 scale-100',
  leaveToClass: 'opacity-0 scale-95',
};

const animMobile = {
  enterActiveClass: 'transition duration-300 ease-out',
  enterFromClass: 'opacity-0 translate-y-2.5',
  enterToClass: 'opacity-100 translate-y-0',
  leaveActiveClass: 'transition duration-300 ease-in',
  leaveFromClass: 'opacity-100 translate-y-0',
  leaveToClass: 'opacity-0 translate-y-2.5',
};
</script>
