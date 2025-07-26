<script setup lang="ts">
import { colors } from '../../config/colors';

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

const colorList = flattenColors(colors);
</script>

<template>
  <div class="p-10">
    <h3 class="mb-10 text-3xl font-bold text-dark-default">COLORS</h3>
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
</template>
