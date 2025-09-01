<template>
  <div
    class="width-[calc(100vw-32px)] fixed left-1/2 top-1/2 flex max-h-[calc(100dvh-32px)] w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-7 overflow-hidden rounded-3xl bg-white p-14"
    :style="{
      maxWidth: hasMobileMenu
        ? 'auto'
        : (maxWidth[openedSubTabId] || 360) + 'px',
    }"
  >
    <Button
      v-if="options?.closable"
      class="absolute right-8 top-8"
      icon-before="close"
      color="neutral"
      @click="onClose"
    />

    <slot
      :open-sub-tab="openSubTab"
      :hide-sub-tab="hideSubTab"
      :opened-sub-tab-id="openedSubTabId"
    />
  </div>
</template>

<script setup lang="ts">
import useModal from '~/composables/useModal.js';
import type { IModalOptions } from '~/types/composables';
import type { IModalProvider } from '~/types/components';
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

const emit = defineEmits(['on-close', 'tab-changed']);

interface IModalProps {
  maxWidth?: number[];
  options?: IModalOptions;
  data?: Record<string, any>;
}

const { maxWidth = [340], options, data } = defineProps<IModalProps>();

const { hasMobileMenu } = useApp();
const { hideModal } = useModal();

const openedSubTabId = ref<number>(0);
const openedSubTabData = ref<Record<string, any>>({});

function openSubTab(id: number, data?: Record<string, any>) {
  openedSubTabId.value = id;
  if (data) {
    openedSubTabData.value = data;
  }
  emit('tab-changed', id);
}

function hideSubTab() {
  openedSubTabId.value = 0;
  emit('tab-changed', 0);
}

function onClose() {
  emit('on-close');

  hideModal();
}

provide<IModalProvider>('modal', {
  openedSubTabId,
  openedSubTabData,
  openSubTab,
  hideSubTab,
});

watch(
  () => data,
  (val) => {
    if (val?.tab) {
      openSubTab(val.tab);
    }
  },
  { deep: true, immediate: true }
);
</script>
