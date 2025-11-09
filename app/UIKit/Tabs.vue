<template>
  <div
    class="scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-red-500 relative inline-flex flex-shrink-0 justify-between overflow-hidden overflow-x-auto scroll-smooth"
    :class="[
      theme === 'default' && 'rounded-[20px] bg-gray-accent p-1',
      size === 'md' ? 'rounded-[20px] p-1' : 'rounded-sm p-1',
      fullwidth && 'w-full max-w-full',
    ]"
  >
    <component
      :is="as"
      v-for="(item, index) in tabs"
      :key="index"
      type="button"
      class="flex flex-1 items-center justify-center gap-2 rounded-[20px] text-dark no-underline transition-colors duration-200"
      :class="[
        size === 'md' ? 'px-5 py-2.5' : 'px-2 py-1',
        modelValue === index &&
          'cursor-default bg-primary font-bold text-white',
        !(modelValue === index) &&
          !disabled &&
          !item.disabled &&
          'hover:bg-primary-opacity',
        (item.disabled || disabled) && 'pointer-events-none opacity-40',
        item.soon && 'pointer-events-none opacity-40',
      ]"
      :disabled="item.disabled || disabled || undefined"
      :to="to(item.name)"
      @click="onSelectTab(index)"
    >
      <Icon
        v-if="item.icon"
        :type="item.icon"
        :size="20"
        class="transition-opacity"
        :class="[(item.disabled || disabled) && 'opacity-40']"
      />

      <span
        class="whitespace-nowrap leading-5"
        :class="(item.disabled || disabled) && 'opacity-40'"
      >
        {{ item.title }}
      </span>

      <div
        v-if="item.soon"
        class="rounded-full bg-yellow px-1.5 py-0.5 text-[10px] leading-3"
      >
        {{ $t('Soon') }}
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
import type { ITabItem } from '~/types/components';
import { useQueryParam } from '~/composables/useQueryParams';
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

const route = useRoute();
const { removeQueryParam } = useQueryParam();

interface ITabsProps {
  modelValue: number;
  tabs: ITabItem[];
  size?: 'md';
  fullwidth?: boolean;
  theme?: 'default';
  queryName?: string | null;
  disabled?: boolean;
}

const props = withDefaults(defineProps<ITabsProps>(), {
  size: 'md',
  theme: 'default',
  fullwidth: false,
  queryName: 'tab',
  disabled: false,
});

function to(name: string | undefined | false) {
  if (name === undefined) return null;
  if (name && props.queryName)
    return { query: { ...route.query, [props.queryName]: name } };

  if (name === false) {
    const query = { ...route.query };
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    if (props.queryName) delete query[props.queryName];
    return { query };
  }
}

const as = computed(() => {
  const hasName = props.tabs.some((item: ITabItem) => item.name);
  return hasName ? resolveComponent('NuxtLink') : 'button';
});

const emit = defineEmits(['update:modelValue', 'on-click']);

function onSelectTab(index: number) {
  emit('update:modelValue', index);
  emit('on-click', index);
}

const everyTabHasName = props.tabs.every((item: ITabItem) => item.name);

if (props.queryName && route.query[props.queryName] && everyTabHasName) {
  const query = route.query[props.queryName];
  const index = props.tabs.findIndex((item: ITabItem) => item.name === query);
  onSelectTab(index);
}

onUnmounted(async () => {
  if (props.queryName && route.query?.[props.queryName]) {
    await removeQueryParam(props.queryName);
  }
});
</script>
