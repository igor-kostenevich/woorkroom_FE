<template>
  <div
    class="relative w-full"
    :class="{
      'pointer-events-none opacity-40': disabled,
      'text-red': $slots.errorMessage,
    }"
  >
    <div
      v-if="$slots.topTextLeft || $slots.topTextRight"
      class="mb-1.5 flex items-center justify-between gap-2 px-1.5"
    >
      <span
        v-if="$slots.topTextLeft"
        class="text-sm font-bold leading-6 text-gray"
      >
        <slot name="topTextLeft" />
      </span>
      <span
        v-if="$slots.topTextRight"
        class="text-sm font-bold leading-6 text-gray"
      >
        <slot name="topTextRight" />
      </span>
    </div>

    <div
      class="relative flex h-12 w-full items-center rounded-[14px] border border-gray-dark transition-colors"
      :class="{
        'border-red': $slots.errorMessage,
        'border-gray-secondary': disabled,
        'border-primary shadow-primary-light':
          isFocused && !$slots.errorMessage && !disabled,
      }"
    >
      <input
        ref="input"
        v-model="value"
        v-bind="$attrs"
        class="h-full w-full rounded-[14px] border-none px-4 pr-20 text-sm leading-6 placeholder-gray outline-none"
        :class="[
          {
            'text-gray': !isFocused && !$slots.errorMessage,
            'text-dark': isFocused && !$slots.errorMessage && !disabled,
          },
        ]"
        :type="computedType"
        :required="required"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :name="'input-' + value"
        :maxlength="maxlength"
        :pattern="pattern"
        :title="title"
        @click="selectAll"
        @focusin="(e: FocusEvent) => emit('focusin', e)"
        @focusout="(e: FocusEvent) => emit('focusout', e)"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />

      <div
        class="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2.5"
      >
        <button
          v-if="value && !hideClearBtn && !disabled && !readonly"
          type="button"
          class="text-gray transition-colors hover:text-black"
          @click.stop="onClear"
        >
          <Icon type="close" :size="20" />
        </button>

        <Icon
          v-if="icon"
          class="pointer-events-none text-gray"
          :type="icon"
          :size="20"
        />

        <button
          v-if="type === 'password'"
          type="button"
          class="text-gray transition-colors hover:text-black"
          @click="passwordRevealed = !passwordRevealed"
        >
          <Icon :type="passwordRevealed ? 'view' : 'view'" :size="20" />
        </button>
      </div>

      <!-- <SlotButton v-if="$slots.default" /> -->
    </div>

    <span
      v-if="$slots.errorMessage"
      class="ml-4 mt-1 block text-xs font-semibold leading-[18px] text-red"
    >
      <slot name="errorMessage" />
    </span>
  </div>
</template>

<script setup lang="ts">
import type { DirectiveNumber } from '~/directives/directive-number';
import type { TInputType } from '@/types/components/input';

const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

defineOptions({ inheritAttrs: false });

let DirectiveNumber: DirectiveNumber;

interface IInputProps {
  modelValue: any;
  placeholder?: string;
  type?: TInputType;
  icon?: string | null;
  coin?: string | null;
  maxlength?: number;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  hideClearBtn?: boolean;
  pattern?: string;
  title?: string;

  minus?: boolean; // for directive v-number
  point?: boolean; // for directive v-number
  min?: number; // for directive v-number
  max?: number; // for directive v-number
  allowStartZero?: boolean; // for directive v-number
}

const props = withDefaults(defineProps<IInputProps>(), {
  type: 'text',
  required: false,
  readonly: false,
  disabled: false,
  hideClearBtn: false,

  minus: false,
  point: false,
  min: -10000000000000000000,
  max: 10000000000000000000,
  allowStartZero: false,
});

const emit = defineEmits([
  'update:modelValue',
  'focusin',
  'focusout',
  'on-clear',
]);

const observer = ref();
const input = useTemplateRef<HTMLInputElement>('input');
const value = defineModel<string | number>({ default: '' });
const isFocused = ref<boolean>(false);

const passwordRevealed = ref<boolean>(false);
const computedType = computed<TInputType>(() => {
  switch (props.type) {
    case 'password':
      return passwordRevealed.value ? 'text' : 'password';
    case 'number':
      return 'text';
    default:
      return props.type;
  }
});

/**
 * Override the button props passed through the slot
 */

// const slots = useSlots();

// const SlotButton = defineComponent({
//   render: () => {
//       const data = slots.default?.()[0];

//       if (data) {
//           data.props = {
//               ...data.props,
//               color: 'primary',
//               disabled: props.disabled,
//               size: 'sm',
//           };
//       }

//       return data;
//   },
// });

const selectAll = () => {
  input.value?.select();
};

function onClear() {
  emit('update:modelValue', '');
  emit('on-clear');
}

function handleFocus() {
  input.value?.focus();

  nextTick(() => {
    input.value?.click();
  });
}

async function prepareDirective() {
  // Load directive
  DirectiveNumber = await import('~/directives/directive-number').then(
    (m) => m.default
  );

  // Apply directive
  DirectiveNumber.mounted(input.value!, {
    value: {
      min: props.min,
      max: props.max,
      allowStartZero: props.allowStartZero,
    },
    modifiers: { point: props.point, minus: props.minus },
  });
}

onMounted(async () => {
  if (props.type === 'number' && input.value) {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            prepareDirective();

            observer.value.unobserve(input.value);
          }
        });
      },
      { threshold: 0 }
    );

    observer.value.observe(input.value);
  }
});

onBeforeUnmount(() => {
  if (DirectiveNumber && input.value) {
    // Destroy directive
    DirectiveNumber.beforeUnmount(input.value);
  }

  if (observer.value && input.value) {
    observer.value.unobserve(input.value);
  }
});

defineExpose({ handleFocus });
</script>
