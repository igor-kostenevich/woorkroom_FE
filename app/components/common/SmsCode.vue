<script setup lang="ts">
const Input = defineAsyncComponent(() => import('~/UIKit/Input.vue'));

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const codeForSms = reactive({
  code1: '',
  code2: '',
  code3: '',
  code4: '',
});

function resetCode() {
  for (const key in codeForSms) codeForSms[key] = '';
}
defineExpose({
  resetCode,
});

watch(codeForSms, (v) => {
  emit('update:modelValue', Object.values(v).join(''));
});

const inputEls = ref<(HTMLInputElement | null)[]>([]);

function setInputRef(el: any, index: number) {
  const realInput =
    el?.$el?.querySelector?.('input') ?? el?.$el ?? (el as HTMLInputElement);
  inputEls.value[index] = realInput;
}

function handleInput(index: number, key: string, e: InputEvent) {
  const value = codeForSms[key];
  const inputType = (e as any).inputType;

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
        v-for="(value, key, index) in codeForSms"
        :key="key"
        :ref="(el) => setInputRef(el, index)"
        v-model="codeForSms[key]"
        :hide-clear-btn="true"
        maxlength="1"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        class="text-center"
        @keypress="handleKeypress"
        @input="(e) => handleInput(index, key, e)"
      />
    </div>
  </div>
</template>
