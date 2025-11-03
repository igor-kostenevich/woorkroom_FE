<script setup lang="ts">
import { useCountries } from '~/composables/useCountries';

const Input = defineAsyncComponent(() => import('~/UIKit/Input.vue'));
const Dropdown = defineAsyncComponent(() => import('~/UIKit/Dropdown.vue'));

const props = defineProps<{
  modelValue: string;
  dial: string;
  error?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue' | 'update:dial', v: string): void;
}>();

const { countries, selectedDialIndex } = useCountries();

const phoneLocal = ref<string>(props.modelValue ?? '');

watchEffect(() => {
  if (countries.value.length) {
    emit('update:dial', countries.value[selectedDialIndex.value]?.value || '');
  }
});

watch(
  phoneLocal,
  (v: string) => emit('update:modelValue', (v || '').replace(/\D/g, '')),
  { immediate: true }
);
</script>

<template>
  <div class="mb-6 w-full">
    <div class="mb-1.5 text-sm font-bold text-gray">
      {{ $t('register.Mobile Number') }}
    </div>

    <div class="flex max-h-[50px] justify-between gap-4">
      <div class="rounded-[14px] border border-gray-dark">
        <Dropdown
          v-model="selectedDialIndex"
          :options="countries"
          :hide-clear-btn="true"
          placeholder="+1"
        />
      </div>

      <Input v-model="phoneLocal" placeholder="345 567-23-56">
        <template v-if="props.error" #errorMessage>
          {{ error }}
        </template>
      </Input>
    </div>
  </div>
</template>
