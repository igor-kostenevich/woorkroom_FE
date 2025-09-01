<template>
  <div
    v-if="$slots.header"
    class="relative flex shrink-0 flex-col"
    :class="{ 'pl-12': !defaultTab }"
  >
    <button
      v-if="!defaultTab"
      :disabled="readonly"
      class="transfrom absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 rotate-180 items-center justify-center text-gray transition-colors hover:text-gray-pressed disabled:pointer-events-none"
      @click="onBackButtonClick"
    >
      <Icon :size="36" name="chevron-right" />
    </button>

    <div class="text-[22px] font-bold text-dark">
      <slot name="header" />
    </div>
  </div>

  <!-- 🟠Modal window with an additional block on the left with an image -->
  <!-- 🟠Shows only on desktop -->
  <div v-if="$slots.intro && !isMobile" class="flex">
    <div class="flex-1">
      <slot name="intro" />
    </div>

    <div class="w-[356px] overflow-y-auto overflow-x-hidden">
      <slot />
    </div>
  </div>

  <!-- Default modal -->
  <div
    v-else
    ref="modalTabBodyRef"
    class="min-h-24 overflow-y-auto overflow-x-hidden overscroll-contain pr-2"
  >
    <slot :modal-tab-body-ref="modalTabBodyRef" />
  </div>

  <div v-if="$slots.footer" class="flex items-center justify-end gap-4">
    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
import type { IModalProvider } from '~/types/components';

const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

const modalTabBodyRef = useTemplateRef('modalTabBodyRef');

const emit = defineEmits(['on-btn-back-click']);

const { isMobile } = useApp();

defineProps<{
  defaultTab?: boolean;
  intro?: boolean;
  tabToOpen?: number;
  readonly?: boolean;
  background?: string;
}>();

const { hideSubTab, openedSubTabId } = inject('modal') as IModalProvider;

const onBackButtonClick = () => {
  if (openedSubTabId) {
    hideSubTab();
  }

  emit('on-btn-back-click');
};
</script>
