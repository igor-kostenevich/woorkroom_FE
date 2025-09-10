<script setup lang="ts">
import { DatePicker as VDatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const Input = defineAsyncComponent(() => import('@/UIKit/Input.vue'));
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

const route = useRoute();
const showTime = computed(() => route.query.tabCalendar === '1');

const startTime = ref('');
const endTime = ref('');



const vacationRange = { start: new Date(2025, 8, 16), end: new Date(2025, 8, 19) };
const attrs = ref([
  {
    key: 'vacation',
    highlight: { color: 'red', fillMode: 'outline', class: 'vacation-highlight' },
    content: { class: 'vacation-no-blue' },

    dates: vacationRange,
    popover: {
      label: 'You have 3 days of Vacation left',
      visibility: 'hover',
    },
  },
]);
</script>

<template>
  <div class="max-w-[488px] bg-white">
    <div class="mb-7">
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
          query-key="tabCalendar"
        />
      </div>
    </div>

    <VDatePicker
      v-model="range"
      is-range
      :popover="false"
      :locale="{ masks: { weekdays: 'WWW' } }"
      mode="date"
      class="mb-6"
      :attributes="attrs"
      :trim-weeks="true"
    >
      <template #header-prev-button>
        <Icon name="arrow-left" class="text-primary" />
      </template>

      <template #header-next-button>
        <Icon name="arrow-right" class="text-primary" />
      </template>
    </VDatePicker>

    <div v-if="showTime">
      <div class="mb-6 flex gap-x-7">
        <Input v-model="startTime" placeholder="9:00 AM" icon="time-outlined">
          <template #topTextLeft>{{ $t('calendar.From') }}</template>
        </Input>
        <Input v-model="endTime" placeholder="1:00 PM" icon="time-outlined">
          <template #topTextLeft>{{ $t('calendar.To') }}</template>
        </Input>
      </div>

      <div
        class="flex items-center justify-between rounded-xl bg-light px-7 py-4"
      >
        <div class="text-lg font-bold">
          {{ $t('calendar.Time for Vacation') }}
        </div>
        <div class="text-3xl font-bold text-blue">
          {{ $t('calendar.time') }}
        </div>
      </div>
      {{ range }}
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

.vc-weeks .vc-week:last-child .vc-day.is-not-in-month:nth-child(n + 8) {
  display: none;
}

.vc-day.is-not-in-month * {
  color: #9aa3af;
}

.vacation-highlight {
  background: transparent !important;
}

/* Prevent blue selection only for days inside the 'vacation' attribute */
.vacation-no-blue.vc-blue {
  background: transparent !important;
  color: inherit !important;
}

</style>
