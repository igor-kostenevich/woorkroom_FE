<template>
  <component
    :is="as"
    :class="[
      'inline-flex gap-2 self-center',
      ...colorClasses,
      {
        'border-b-2 border-transparent': !noUnderline,
      },
    ]"
    v-bind="linkAttrs"
  >
    <Icon v-if="iconBefore" class="" :name="iconBefore" />

    <span class="font-semibold">
      <slot />
    </span>

    <Icon v-if="iconAfter" class="" :name="iconAfter" />
  </component>
</template>

<script lang="ts" setup>
import type { ILinkButtonProps } from '~/types/components';

const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

defineOptions({
  name: 'LinkButton',
  inheritAttrs: false,
});

const attrs = useAttrs();

const props = withDefaults(defineProps<ILinkButtonProps>(), {
  external: false,
  color: 'primary',
  iconAfter: '',
  iconBefore: '',
  noUnderline: false,
});

const colorMap = {
  primary: {
    text: 'text-primary',
    hoverText: 'hover:text-primary',
    activeText: 'active:text-primary-pressed',
    hoverBorder: 'hover:border-primary',
    activeBorder: 'active:border-primary-pressed',
  },
  secondary: {
    text: 'text-gray',
    hoverText: 'hover:text-gray',
    activeText: 'active:text-gray-pressed',
    hoverBorder: 'hover:border-gray',
    activeBorder: 'active:border-gray-pressed',
  },
};

const colorClasses = computed(() => {
  const color = colorMap[props.color] ?? colorMap.primary;

  return [
    color.text,
    color.hoverText,
    color.activeText,
    color.hoverBorder,
    color.activeBorder,
  ];
});

const linkAttrs = computed(() => {
  const { to, external } = props;
  const defaultClasses = [attrs.class];

  if (to && !external) {
    // Nuxt Link
    return { class: [...defaultClasses], to: to };
  } else {
    // External Link
    return {
      class: [...defaultClasses],
      target: '_blank',
      href: to,
      rel: 'noopener noreferrer nofollow',
      onClick: attrs?.onClick as (e: MouseEvent) => void,
    };
  }
});

const as = computed(() => {
  if (props?.to && !props?.external) return resolveComponent('NuxtLink');
  if (props?.external) return 'a';

  return 'button';
});
</script>
