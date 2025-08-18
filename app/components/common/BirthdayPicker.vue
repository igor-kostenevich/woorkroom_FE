<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import Icon from '~/UIKit/Icon.vue';

const maxDate = new Date();
const minDate = new Date(1920, 0, 1);

const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  },

  placeholderDate: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const date = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
onMounted(() => {
  const icon = document.querySelector('.dp__input_icon');
  const parent = icon.parentElement;
  parent.style.cssText = `
          position: absolute;
          padding-right: 12px;
          right: 25px;
        `;
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
      :max-date="maxDate"
      :min-date="minDate"
      :teleport="false"
      :year-range="[1920, new Date().getFullYear()]"
      :prevent-min-max-navigation="true"
      :light="true"
      :format="formatDate"
      :placeholder="placeholderDate"
      class=".dp__theme_light relative"
    >
      <template #input-icon>
        <Icon name="calendar-outlined" size="20" />
      </template>
    </VueDatePicker>
  </div>
</template>

<style>
.dp__input_wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.dp--clear-btn {
  left: 0;
}

.dp__active_date {
  background: #3f8cff;
}

.dp__action_select {
  background: #3f8cff;
}

.dp__input:focus {
  border-color: #3f8cff;
  box-shadow: 1px 1px 4px rgb(63 140 255 / 26.3%);
}

.dp__input {
  font-size: 0.875rem;
  color: #7d8592;
  width: 100%;
  height: 3rem;
  border-radius: 14px;
}

.dp__input::placeholder {
  color: #7d8592;
  transform: translateX(-20px);
}

.dp__outer_menu_wrap {
  margin-left: 2px;
}
</style>
