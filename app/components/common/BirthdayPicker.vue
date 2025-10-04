<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import { useFormatters } from '@/composables/useFormatters';

const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

const MAX_DATE = new Date();
const MIN_DATE = new Date(1920, 0, 1);

const props = defineProps({
  modelValue: Date,
  placeholder: String,
  disabled: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const date = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const { formatDate } = useFormatters('en-US');
</script>
<template>
  <div class="flex flex-col gap-2">
    <span v-if="$slots.birth" class="text-sm font-bold leading-6 text-gray">
      <slot name="birth" />
    </span>
    <VueDatePicker
      v-model="date"
      :enable-time-picker="false"
      :max-date="MAX_DATE"
      :min-date="MIN_DATE"
      :teleport="false"
      :year-range="[1920, new Date().getFullYear()]"
      :prevent-min-max-navigation="true"
      :light="true"
      :format="formatDate"
      :disabled="disabled"
      :placeholder="placeholder"
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
