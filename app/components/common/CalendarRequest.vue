<script setup lang="ts">
import { DatePicker as VDatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import Button from '~/UIKit/Button.vue';

const Icon = defineAsyncComponent(() => import('~/UIKit/Icon.vue'));
const Radio = defineAsyncComponent(() => import('~/UIKit/Radio.vue'));
const Segment = defineAsyncComponent(() => import('~/UIKit/Segment.vue'));

const requestType = reactive([
  { id: '1', value: 'Vacation' },
  { id: '2', value: 'Sick Leave' },
  { id: '3', value: 'Work remotely' },
]);

const selected = ref('item1');
const selectedCalendar = ref(0);

const calendarOptions = reactive([
  { id: 0, label: 'Days' },
  { id: 1, label: 'Hours' },
]);

const range = ref<{ start: Date | null; end: Date | null } | null>();

// Styling for the selected range (start / middle / end)
const selectAttribute = computed(() => ({
  highlight: {
    start: { contentClass: 'text-white bg-red rounded-l-md' },
    base: { contentClass: ' bg-red' },
    end: { contentClass: 'text-white  bg-red rounded-r-md' },
  },
}));
</script>

<template>
  <div class="max-w-[488px] bg-white">
    <div class="mb-7">
      <h2 class="pb-7 text-xl font-bold">{{ $t('calendar.Add Request') }}</h2>

      <h3 class="pb-2 text-sm font-bold text-gray">
        {{ $t('calendar.Request Type') }}
      </h3>

      <div class="flex gap-5">
        <Radio
          v-for="input in requestType"
          :id="input.id"
          :key="input.id"
          v-model="selected"
          name="radio-picker"
          class="rounded-lg border border-gray-dark p-3"
          :value="input.value"
        >
          {{ input.value }}
        </Radio>
      </div>

      <div class="flex justify-center">
        <Segment
          v-model="selectedCalendar"
          class="mt-9 flex-[1_1_auto]"
          :options="calendarOptions"
        />
      </div>
    </div>

    <VDatePicker
      v-model="range"
      is-range
      :popover="false"
      :locale="{ masks: { weekdays: 'WWW' } }"
      mode="date"
      :select-attribute="selectAttribute"
    >
      <template #header-prev-button>
        <Icon name="arrow-left" class="text-primary" />
      </template>

      <template #header-next-button>
        <Icon name="arrow-right" class="text-primary" />
      </template>
    </VDatePicker>

    <div class="mt-7 flex justify-between">
      <div class="rounded-xl bg-light p-2.5">
        <Icon name="comment" />
      </div>
      <Button>{{ $t('calendar.Send Request') }}</Button>
    </div>
  </div>
</template>

<style>
.vc-day-content {
  font-size: 16px;
}

.vc-weeks {
  padding: 23px 30px 30px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vc-header {
  margin-top: 30px;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: [prev] auto [title] auto [next] auto !important;
  column-gap: 110px;
}

.vc-weekdays {
  gap: 10px;
  margin-bottom: 16px;
}

.vc-weekday {
  background: #f4f9fd;
  font-weight: 600;
  border-radius: 7px;
}

.vc-day {
  height: 52px;
}

.is-not-in-month * {
  color: gray;
  opacity: 1 !important;
  pointer-events: inherit !important;
}

.vc-week {
  font-family: 'Nunito Sans', sans-serif;
}

.vc-day-content.vc-blue {
  background: #15c0e6;
  border-radius: 14px !important;
  height: 52px;
  width: 52px;
  color: white !important;
}

.vc-highlight {
  height: 52px;
  background: #15c0e6;
}
</style>
