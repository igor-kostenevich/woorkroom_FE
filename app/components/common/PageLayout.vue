<script setup lang="ts">
const sidebarEl = useTemplateRef<HTMLElement>('sidebarEl');
const sidebarMaxH = ref<number>(0);

const BOTTOM_GAP = 8;

const updateSidebarMaxH = () => {
  if (!sidebarEl.value) return;
  const rect = sidebarEl.value.getBoundingClientRect();

  sidebarMaxH.value = Math.max(0, window.innerHeight - rect.top - BOTTOM_GAP);
};

const onScroll = () => updateSidebarMaxH();
const onResize = () => updateSidebarMaxH();

onMounted(() => {
  updateSidebarMaxH();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onResize);
});
</script>

<template>
  <div>
    <h1 class="mb-7 text-4xl font-bold">{{ $t('My Profile') }}</h1>

    <div class="relative flex gap-5 pt-5">
      <div
        ref="sidebarEl"
        class="sticky top-2 w-[265px] overflow-auto rounded-3xl bg-white py-[26px] pl-[18px] pr-[24px] shadow-base"
        :style="{ maxHeight: `${sidebarMaxH}px` }"
      >
        <slot name="sidebar" />
      </div>

      <div class="flex-1">
        <div class="mb-6">
          <slot name="actions" />
        </div>
        <div>
          <slot name="content" />
        </div>
      </div>
    </div>
  </div>
</template>
