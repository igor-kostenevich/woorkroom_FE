<script setup lang="ts">
import { colors } from '../../config/colors';
import iconList from '../../config/icon-list.json';

const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const Checkbox = defineAsyncComponent(() => import('@/UIKit/CheckBox.vue'));
definePageMeta({
  layout: 'components',
});

const colorList = flattenColors(colors);
const buttonSizes = ['md', 'lg'] as const;
const buttonColorVariants = ['primary', 'neutral'] as const;

function flattenColors(
  obj: Record<string, any>,
  prefix = ''
): { name: string; value: any }[] {
  return Object.entries(obj).flatMap(([key, val]) => {
    if (typeof val === 'object' && val !== null) {
      return flattenColors(val, prefix ? `${prefix}.${key}` : key);
    }
    if (key === 'DEFAULT' && prefix) {
      return [{ name: prefix, value: val }];
    }
    return [{ name: prefix ? `${prefix}.${key}` : key, value: val }];
  });
}
</script>

<template>
  <div class="">
    <h3 class="mb-10 text-4xl font-bold text-dark-default">COLORS</h3>
    <div class="grid grid-cols-8 gap-6">
      <div
        v-for="c in colorList"
        :key="c.name"
        class="flex flex-col items-center space-y-2"
      >
        <div
          class="h-16 w-16 rounded border shadow"
          :style="{ background: c.value }"
        />
        <span class="font-mono text-xs text-gray-500">{{ c.name }}</span>
        <span class="font-mono text-xs">{{ c.value }}</span>
      </div>
    </div>
  </div>
  <h3 class="mb-10 mt-32 text-4xl font-bold text-dark-default">Icons</h3>
  <div class="grid grid-cols-12 gap-6">
    <div
      v-for="(i, index) in iconList"
      :key="index"
      class="flex flex-col items-center space-y-2"
    >
      <Suspense>
        <Icon :size="48" :name="i.name" />
      </Suspense>

      <p class="text-xs text-gray-500">{{ i.name }}</p>
      <p class="font-mono text-xs" :class="{ old: i.viewbox !== '0 0 24 24' }">
        {{ i.viewbox }}
      </p>
    </div>
  </div>
  <div class="mb-24 mt-32">
    <h3 class="mb-10 text-4xl font-bold text-dark-default">BUTTONS</h3>

    <div
      v-for="color in buttonColorVariants"
      :key="color"
      class="mb-8 space-y-4 border-b pb-6"
    >
      <h4 class="text-2xl font-semibold capitalize">Color: {{ color }}</h4>

      <div
        v-for="size in buttonSizes"
        :key="size"
        class="flex flex-wrap items-center gap-4"
      >
        <Button :color="color" :size="size">Default {{ size }}</Button>

        <Button :color="color" :size="size" icon-before="plus">
          Icon Before
        </Button>

        <Button :color="color" :size="size" icon-after="plus">
          Icon After
        </Button>

        <Button :color="color" :size="size" :loading="true"> Loading </Button>

        <Button :color="color" :size="size" :disabled="true"> Disabled </Button>

        <Button :color="color" :size="size" :fullwidth="true">
          Fullwidth
        </Button>

        <Button :color="color" :size="size" icon-before="plus" />
      </div>
    </div>
  </div>

  <div class="mb-24 mt-32">
    <h3 class="mb-10 text-4xl font-bold text-dark-default">Checkbox</h3>

    <Checkbox />
  </div>
</template>
