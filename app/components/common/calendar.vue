<script setup lang="ts">
import { DatePicker as VDatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const TimeDuration = defineAsyncComponent(() => import('./RequestTime.vue'));
const Icon = defineAsyncComponent(() => import('~/UIKit/Icon.vue'));
const Radio = defineAsyncComponent(() => import('~/UIKit/Radio.vue'));
const Tabs = defineAsyncComponent(() => import('~/UIKit/Tabs.vue'));
const TextArea = defineAsyncComponent(() => import('~/UIKit/Textarea.vue'));

defineProps<{
  showTextArea: boolean;
}>();

const requestTypes = reactive([
  { id: '1', value: $t('indicator.vacation') },
  { id: '2', value: $t('indicator.sick') },
  { id: '3', value: $t('indicator.remote') },
]);

const selectedRequestType = ref('Vacation');
const selectedCalendarMode = ref(0);
const commentText = ref('');

const calendarOptions = reactive([
  { title: $t('calendar.Days') },
  { title: $t('calendar.Hours') },
]);

const showTime = computed(() => selectedCalendarMode.value === 1);

const vacationRange = {
  start: new Date(2025, 8, 16),
  end: new Date(2025, 8, 19),
};

const { range, daysCount, rangesOverlap, validateAndPreparePayload } =
  useVacationCalendar(vacationRange);

const emit = defineEmits<{
  (e: 'submit', payload: any): void;
  (e: 'validity', isValid: boolean): void;
}>();

function onSubmit() {
  try {
    const payload = validateAndPreparePayload({
      requestType: selectedRequestType.value,
      calendarType: selectedCalendarMode.value,
      showTime: showTime.value,
      startTime: startTime.value,
      endTime: endTime.value,
      comment: commentText.value,
    });

    emit('submit', payload);
    return true;
  } catch {
    return false;
  }
}

defineExpose({ onSubmit });

watch(
  range,
  async (val: any) => {
    emit('validity', !!val?.start);
    if (!val?.start) return;
    // TODO: need refactor
    const start = val.start;
    const end = val.end ?? val.start;

    const hasOverlap = rangesOverlap({ start, end }, vacationRange);

    await nextTick();
    document
      .querySelectorAll('.vc-red')
      .forEach((el) => el.classList.remove('vc-red'));

    if (hasOverlap) {
      const targets = document.querySelectorAll(
        '.vc-day-content.vc-blue, .vc-highlight'
      );
      targets.forEach((el) => el.classList.add('vc-red'));
    }
  },
  { deep: true }
);

const startTime = ref('5:00');
const endTime = ref('10:00');

const highlightAttributes = ref([
  {
    key: 'vacation',
    dates: vacationRange,
    popover: { placement: 'top-start' },
  },
]);
</script>

<template>
  <div class="bg-white">
    <div class="mb-7">
      <h3 class="mb-2 text-sm font-bold text-gray">
        {{ $t('calendar.Request Type') }}
      </h3>

      <div
        class="flex flex-col justify-between gap-6 pt-1.5 sm:flex-row sm:pt-0 lg:gap-5"
      >
        <Radio
          v-for="input in requestTypes"
          :id="input.id"
          :key="input.id"
          v-model="selectedRequestType"
          name="radio-picker"
          class="rounded-lg border-0 sm:border sm:px-4 sm:py-3 lg:border-gray-dark"
          :value="input.value"
        >
          {{ input.value }}
        </Radio>
      </div>

      <div class="flex justify-center">
        <Tabs
          v-model="selectedCalendarMode"
          :tabs="calendarOptions"
          class="mt-9 flex-[1_1_auto]"
        />
      </div>
    </div>

    <div class="max-w-full sm:max-w-[488px]">
      <VDatePicker
        v-model="range"
        is-range
        :popover="false"
        :locale="{ masks: { weekdays: 'WWW' } }"
        mode="date"
        class="mb-6"
        :attributes="highlightAttributes"
        trim-weeks
        expanded
      >
        <template #header-prev-button>
          <Icon name="arrow-left" class="text-primary" />
        </template>

        <template #header-next-button>
          <Icon name="arrow-right" class="text-primary" />
        </template>

        <template #day-popover>
          <div class="px-2 py-2 text-sm text-red">
            {{ $t('vacation.daysLeft', { count: daysCount }) }}
          </div>
        </template>
      </VDatePicker>
    </div>

    <div v-if="showTime" class="mb-5">
      <TimeDuration
        v-model:start="startTime"
        v-model:end="endTime"
        :label="$t('calendar.Work Period')"
      />
    </div>
    <TextArea
      v-if="showTextArea"
      v-model="commentText"
      :placeholder="$t('calendar.addComment')"
    />
  </div>
</template>

<style>
@import 'assets/styles/calendar.pcss';
</style>
