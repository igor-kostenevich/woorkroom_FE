<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import Icon from '@/UIKit/Icon.vue';
import { useFormatters } from '@/composables/useFormatters';

const MIN_BIRTH_YEAR = 1920;
const MIN_DATE = new Date(MIN_BIRTH_YEAR, 0, 1);

const props = withDefaults(
  defineProps<{
    modelValue?: Date | null;
    placeholder?: string;
    placeholderDate?: string;
    disabled?: boolean;
  }>(),
  { disabled: false }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date | null): void;
}>();

const { locale } = useI18n();
const formatDate = (d: Date) =>
  useFormatters(locale.value as Intl.LocalesArgument).formatDate(d);

const maxDate = computed(() => new Date());
const yearRange = computed<[number, number]>(() => [
  MIN_BIRTH_YEAR,
  new Date().getFullYear(),
]);

const date = computed({
  get: () => props.modelValue ?? null,
  set: (val: Date | null) => emit('update:modelValue', val),
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <span
      v-if="$slots.label"
      :class="{ 'pointer-events-none opacity-40': disabled }"
      class="text-sm font-bold leading-6 text-gray"
    >
      <slot name="label" />
    </span>
    <VueDatePicker
      v-model="date"
      :enable-time-picker="false"
      :max-date="maxDate"
      :min-date="MIN_DATE"
      :year-range="yearRange"
      :prevent-min-max-navigation="true"
      :light="true"
      :format="formatDate"
      :placeholder="placeholder ?? placeholderDate"
      :class="[
        disabled
          ? 'pointer-events-none border-gray-secondary opacity-40'
          : 'border-gray-dark transition-colors hover:border-gray',
      ]"
      class="dp__theme_light relative"
    >
      <template #input-icon>
        <Icon name="calendar-outlined" :size="24" />
      </template>
    </VueDatePicker>
  </div>
</template>

<style>
@import '@/assets/styles/BirthdayPicker.css';
</style>
