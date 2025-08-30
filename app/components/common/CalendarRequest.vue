<script setup lang="ts">
import { Calendar as VCalendar } from 'v-calendar';
import 'v-calendar/style.css';

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
</script>

<template>
  <div class="bg-white">
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
          class="rounded-lg border border-gray-dark p-3"
          :value="input.value"
        >
          {{ input.value }}
        </Radio>
      </div>

      <Segment
        v-model="selectedCalendar"
        class="mt-9"
        :options="calendarOptions"
      />
    </div>

    <div class="max-w-[488px]">
      <VCalendar
        :trim-weeks="false"
        :locale="{ masks: { weekdays: 'WWW' } }"
        transparent
        expanded
      />
    </div>
  </div>
</template>

<style>
.vc-day-content {
  font-size: 16px;
}

.vc-weeks {
  padding: 23px 30px 30px;
}

.vc-header {
  margin-top: 30px;
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
  width: 52px;
  height: 52px;
}

.is-not-in-month * {
  color: gray;
  opacity: 1 !important;
  pointer-events: inherit !important;
}

.vc-week {
  gap: 10px;
  font-family: 'Nunito Sans', sans-serif;
}

.vc-day-content:hover {
  background-color: transparent;
}
</style>
