<template>
  <span
    ref="iconRef"
    style="content-visibility: auto"
    :style="{
      color,
      width: sizeStr,
      height: sizeStr,
      minWidth: sizeStr,
      minHeight: sizeStr,
      fontSize: sizeStr,
    }"
    class="block transition-colors"
    :class="{ 'animate-spin': name === 'loading' }"
  >
    <svg
      v-if="immediate || (isVisible && !isRasterFile && !url)"
      :key="`${type}:${name}:${immediate}`"
      :viewBox="iconCache[`icon-${iconName}`]?.viewBox"
      :style="{ width: sizeStr, height: sizeStr, opacity }"
      class="block"
    >
      <use :href="`#icon-${iconName}`" />
    </svg>
  </span>
</template>

<script setup lang="ts">
import { useElementVisibility, watchDebounced } from '@vueuse/core';

import useIcons from '~/composables/useIcons';

/**
 * USAGE: @see UIKit/Bf-Icon/README.md
 */

// types
interface IProps {
  name?: string;
  size?: number;
  type?: string;
  url?: string;
  color?: string;
  immediate?: boolean;
  lazy?: boolean;
  opacity?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  url: '',
  color: '',

  size: 24,
  immediate: true, // TODO set false
  lazy: false,
  opacity: 1,
});

const { name, size, type, url, color, immediate } = toRefs(props);

const { cacheIcon, iconCache, cacheWhenVisible } = useIcons();

// internal state
const iconRef = ref<HTMLSpanElement>();
const isVisible: Ref<boolean> = useElementVisibility(iconRef);

/**
 * Icon size in px or em.
 */
const sizeStr = computed<string>(() =>
  size.value ? `${size.value}px` : '1em'
);

/**
 * Icon name without extension or prefix.
 * This is fallback for old icon component syntax.
 */
const iconName = computed<string>(() => {
  if (url.value.length) {
    return '';
  } else {
    return type.value?.replace?.(/^icon-/, '') ?? name.value ?? '';
  }
});

const isRasterFile = computed<boolean>(
  () => !!iconName.value?.match(/^.*\.(.*)/gi)?.length
);

const isCustomPath = computed<boolean>(
  () => !!url.value.length || isRasterFile.value
);

onBeforeMount(() => {
  if (isRasterFile.value) {
    return;
  }
  if (immediate.value) {
    // Cache icon immediately.
    // cacheIcon(iconName.value); // TODO: uncoment, Hydration completed but contains mismatches. ???
  } else {
    // Cache icon on appear in viewport.

    cacheWhenVisible(iconRef.value as HTMLElement, iconName.value);
  }

  watchDebounced(
    () => [iconName.value, iconRef.value, isCustomPath.value],
    ([newName, newRef, newCustomPath]) => {
      // nonBlockingFn(() => {

      if (newName && newRef && !newCustomPath) {
        if (immediate.value) {
          // Cache icon immediately.
          cacheIcon(newName as string);
        } else {
          // Cache icon on appear in viewport.
          cacheWhenVisible(newRef as HTMLSpanElement, newName as string);
        }
      }

      // });
    },
    { debounce: 100 }
  );
});
</script>
