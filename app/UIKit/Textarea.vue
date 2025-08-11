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
      class="relative flex w-full rounded-[14px] border bg-gray-100 transition-colors"
      :class="{
        'border-red': $slots.errorMessage,
        'border-gray-secondary': disabled,
        'border-primary shadow-primary-light':
          isFocused && !$slots.errorMessage && !disabled,
      }"
    >
      <textarea
        v-bind="$attrs"
        :id="textareaId"
        ref="textarea"
        v-model="value"
        class="min-h-[120px] w-full resize-none rounded-[14px] border-none px-4 py-3 text-sm leading-6 placeholder-gray outline-none"
        :class="[
          {
            'text-gray': !isFocused && !$slots.errorMessage,
            'text-dark': isFocused && !$slots.errorMessage && !disabled,
          },
        ]"
        :required="required"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :title="title"
        :name="name"
        :aria-invalid="Boolean($slots.errorMessage)"
        :aria-describedby="errorId"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @focusin="(e: FocusEvent) => emit('focusin', e)"
        @focusout="(e: FocusEvent) => emit('focusout', e)"
      />

      <button
        v-if="value && !hideClearBtn && !disabled && !readonly"
        type="button"
        class="absolute right-4 top-3 text-gray transition-colors hover:text-black"
        aria-label="Clear textarea"
        @click.stop="onClear"
      >
        <Icon name="close" :size="20" />
      </button>
    </div>

    <div class="flex items-center justify-between">
      <span
        v-if="$slots.errorMessage"
        :id="errorId"
        class="ml-4 mt-1 block text-xs font-semibold leading-[18px] text-red"
      >
        <slot name="errorMessage" />
      </span>

      <span
        v-if="showCounter && typeof maxlength === 'number'"
        class="ml-auto mr-4 mt-1 block text-[11px] leading-[16px] text-gray"
      >
        {{ (value || '').length }} / {{ maxlength }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const generatedId = useId();
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
defineOptions({ inheritAttrs: false });

interface ITextareaProps {
  modelValue: string;
  placeholder?: string;
  maxlength?: number;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  hideClearBtn?: boolean;
  id?: string;
  title?: string;
  name?: string;
  showCounter?: boolean;
}

const props = withDefaults(defineProps<ITextareaProps>(), {
  required: false,
  readonly: false,
  disabled: false,
  hideClearBtn: false,
  showCounter: false,
});

const emit = defineEmits([
  'update:modelValue',
  'focusin',
  'focusout',
  'on-clear',
]);

const textarea = useTemplateRef<HTMLTextAreaElement>('textarea');
const textareaId = computed(() => props.id || `textarea-${generatedId}`);
const value = defineModel<string>({ default: '' });
const isFocused = ref(false);
const errorId = computed(() => `${textareaId.value}-error`);

function onClear() {
  emit('update:modelValue', '');
  emit('on-clear');
}

defineExpose({ focus: () => textarea.value?.focus() });
</script>
