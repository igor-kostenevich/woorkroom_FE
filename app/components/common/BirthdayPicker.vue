<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

const MAX_DATE = new Date();
const MIN_DATE = new Date(1920, 0, 1);

const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  },

  placeholder: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const date = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const formatDate = (d) => {
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};
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
      :disabled="readonly"
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
