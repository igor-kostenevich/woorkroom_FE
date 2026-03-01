<script setup lang="ts">
const Input = defineAsyncComponent(() => import('~/UIKit/Input.vue'));

const CODE_KEYS = ['code1', 'code2', 'code3', 'code4'] as const;
type CodeKey = (typeof CODE_KEYS)[number];

type InputRefEl = { $el?: HTMLElement } | HTMLInputElement | null;

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const codeForSms = reactive<Record<CodeKey, string>>({
  code1: '',
  code2: '',
  code3: '',
  code4: '',
});

function resetCode() {
  CODE_KEYS.forEach((key) => (codeForSms[key] = ''));
}
defineExpose({
  resetCode,
});

watch(codeForSms, (v: Record<CodeKey, string>) => {
  emit('update:modelValue', CODE_KEYS.map((key) => v[key]).join(''));
});

const inputEls = ref<(HTMLInputElement | null)[]>([]);

function setInputRef(el: InputRefEl, index: number) {
  if (!el) {
    inputEls.value[index] = null;
    return;
  }
  const realInput =
    '$el' in el ? (el.$el?.querySelector?.('input') ?? el.$el ?? null) : el;
  inputEls.value[index] = realInput as HTMLInputElement | null;
}

function getInputRefSetter(index: number) {
  return (el: InputRefEl) => setInputRef(el, index);
}

function handleInput(index: number, key: CodeKey, e: InputEvent) {
  const value = codeForSms[key];
  const inputType = e.inputType;

  if (
    value.length === 1 &&
    index < inputEls.value.length - 1 &&
    inputType !== 'deleteContentBackward'
  ) {
    inputEls.value[index + 1]?.focus();
  }

  if (value === '' && inputType === 'deleteContentBackward' && index > 0) {
    inputEls.value[index - 1]?.focus();
  }
}

function handleKeypress(e: KeyboardEvent) {
  if (!/[0-9]/.test(e.key)) e.preventDefault();
}
</script>

<template>
  <div class="mb-9">
    <div class="mb-1.5 text-sm font-bold text-gray">
      {{ $t('register.Code from SMS') }}
    </div>

    <div class="flex max-w-[277px] gap-4">
      <Input
        v-for="(key, index) in CODE_KEYS"
        :key="key"
        :ref="getInputRefSetter(index)"
        v-model="codeForSms[key]"
        :hide-clear-btn="true"
        maxlength="1"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        class="text-center"
        @keypress="handleKeypress"
        @input="handleInput(index, key, $event)"
      />
    </div>
  </div>
</template>
