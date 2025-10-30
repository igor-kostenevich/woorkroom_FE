<template>
  <component :is="as" v-bind="buttonAttrs" ref="btn-ref">
    <Icon v-if="loading" class="animate-spin" :size="24" name="loading" />
    <Icon
      v-if="iconBefore"
      :type="iconBefore"
      :size="iconSize"
      :color="iconColor"
    />

    <span v-if="slots.default">
      <slot />
    </span>

    <Icon
      v-if="iconAfter && slots.default"
      :type="iconAfter"
      :size="iconSize"
      :color="iconColor"
    />
  </component>
</template>

<script lang="ts" setup>
import type { TButtonColor, TButtonSize } from '~/types/components';
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();
const slots = useSlots();

type TButtonProps = {
  type?: 'button' | 'submit';
  to?: string | object;
  disabled?: boolean;
  external?: boolean;
  size?: TButtonSize;
  color?: TButtonColor;
  loading?: boolean;
  iconBefore?: string;
  iconAfter?: string;
  fullwidth?: boolean;
  iconSize?: number;
  iconColor?: string;
  rel?: 'noopener' | 'noreferrer' | 'nofollow';
};
const props = withDefaults(defineProps<TButtonProps>(), {
  type: 'button',
  size: 'md',
  color: 'primary',
  external: false,

  iconSize: 24,
  disabled: false,
  loading: false,
  fullwidth: false,
});

const as = computed(() => {
  return props.to ? resolveComponent('NuxtLink') : 'button';
});

interface IButtonAttrs {
  style?: unknown;
  class: unknown;
  to?: string | object;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
}

// 🟢 For access to <Button ref="btn" /> by ref
const btn = useTemplateRef('btn-ref');
defineExpose({
  btn,
});

const buttonAttrs = computed<IButtonAttrs>(() => {
  const baseAttrs: IButtonAttrs = {
    disabled: props.disabled,
    style: attrs?.style,
    class: [
      attrs.class,
      'inline-flex items-center justify-center font-bold transition-colors duration-200 disabled:cursor-not-allowed rounded-[14px] border border-transparent gap-2',

      // size
      props.size === 'md' && slots.default && 'text-base px-5 py-3',
      props.size === 'lg' && slots.default && 'text-lg px-12 py-4',

      // color (feel free to adjust to your palette)
      props.color === 'primary' &&
        'bg-primary text-white hover:bg-primary-hover active:bg-primary-pressed shadow-primary disabled:shadow-none disabled:bg-gray-secondary',
      props.color === 'neutral' &&
        'bg-white hover:bg-[rgba(63,140,255,0.06)] text-dark active:border active:border-primary font-semibold disabled:text-gray-light disabled:bg-gray-opacity disabled:border-transparent',
      props.color === 'accent' &&
        'bg-light hover:bg-[rgba(63,140,255,0.06)] text-dark active:border active:border-primary font-semibold disabled:text-gray-light disabled:bg-gray-opacity disabled:border-transparent',
      // loading state
      props.loading && 'opacity-50 pointer-events-none',
      !slots.default &&
        props.size === 'md' &&
        props.color !== 'neutral' &&
        'px-4 py-2.5',
      !slots.default && props.size === 'lg' && 'px-5 py-2.5',
      !slots.default && props.color === 'neutral' && 'p-3',

      // fullwidth
      props.fullwidth && 'w-full',
    ],
    onClick: attrs?.onClick as (e: MouseEvent) => void,
  };

  if (props.to) {
    baseAttrs.to = props.to;
    if (props.external) baseAttrs.target = '_blank';
    if (props.rel) baseAttrs.rel = props.rel;
  } else {
    baseAttrs.type = props.type;
  }
  return baseAttrs;
});
</script>
