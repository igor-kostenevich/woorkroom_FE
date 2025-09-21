<template>
  <div
    class="flex flex-col gap-6 rounded-3xl bg-white p-5 shadow-sm md:min-w-max md:flex-row md:gap-7 md:px-7 md:py-5"
  >
    <div
      class="flex items-center justify-between gap-4 max-md:border-b max-md:border-b-gray-accent max-md:pb-6"
    >
      <component
        :is="firstItem.componentName"
        v-if="firstItem"
        v-bind="firstItem.data"
        class="flex-initial md:[margin-right:var(--gap)]"
        :style="{ '--gap': gap + 'px' }"
      />
      <Button
        v-if="isButton"
        color="neutral"
        size="md"
        icon-before="more"
        class="block md:hidden"
      />
    </div>
    <div
      class="grid grid-cols-[1fr_1fr] gap-5 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:flex-1 md:justify-between md:gap-8 md:[grid-template-columns:repeat(var(--cols),minmax(165px,1fr))]"
      :style="{ '--cols': String(props.cardData.length - 1) }"
    >
      <component
        :is="item.componentName"
        v-for="(item, index) in restCardData"
        :key="index"
        v-bind="item.data"
      />
    </div>
    <Button
      v-if="isButton"
      color="neutral"
      size="md"
      icon-before="more"
      class="hidden md:block"
    />
  </div>
</template>

<script setup lang="ts">
import type { IUserCardData } from '@/types/components/user-card';
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

const props = withDefaults(defineProps<IUserCardData>(), {
  gap: 100,
  isButton: false,
});

const firstItem = computed(() => props.cardData[0] ?? null);
const restCardData = computed(() => props.cardData.slice(1));
</script>
