<script setup lang="ts">
import { DatePicker as VDatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const TimeDuration = defineAsyncComponent(() => import('./RequestTime.vue'));

const Icon = defineAsyncComponent(() => import('~/UIKit/Icon.vue'));
const Radio = defineAsyncComponent(() => import('~/UIKit/Radio.vue'));
const Segment = defineAsyncComponent(() => import('~/UIKit/Segment.vue'));
const TextArea = defineAsyncComponent(() => import('~/UIKit/Textarea.vue'));

defineProps<{
  showTextArea: boolean;
}>();

const requestTypes = reactive([
  { id: '1', value: 'Vacation' },
  { id: '2', value: 'Sick Leave' },
  { id: '3', value: 'Work remotely' },
]);

const selectedRequestType = ref('Vacation');
const selectedCalendarMode = ref(0);
const commentText = ref('');

const calendarOptions = reactive([
  { id: 0, label: 'Days' },
  { id: 1, label: 'Hours' },
]);

const route = useRoute();
const showTime = computed(() => route.query.tabCalendar === '1');

const vacationRange = {
  start: new Date(2025, 8, 16),
  end: new Date(2025, 8, 19),
};

const {
  range,
  daysCount,
  rangesOverlap,
  validateAndPreparePayload,
} = useVacationCalendar(vacationRange);

const emit = defineEmits<{
  (e: 'submit', payload: any): void;
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
  } catch (err) {
    console.error(err);
    return false;
  }
}

defineExpose({ onSubmit });

watch(
  range,
  async (val: any) => {
    if (!val?.start) return;

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
      <h3 class="pb-2 text-sm font-bold text-gray">
        {{ $t('calendar.Request Type') }}
      </h3>

      <div class="flex flex-col gap-6 pt-1.5 sm:flex-row sm:pt-0 lg:gap-5">
        <Radio
          v-for="input in requestTypes"
          :id="input.id"
          :key="input.id"
          v-model="selectedRequestType"
          name="radio-picker"
          class="rounded-lg border-0 sm:border sm:p-3 lg:border-gray-dark"
          :value="input.value"
        >
          {{ input.value }}
        </Radio>
      </div>

      <div class="flex justify-center">
        <Segment
          v-model="selectedCalendarMode"
          class="mt-9 flex-[1_1_auto]"
          :options="calendarOptions"
          query-key="tabCalendar"
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
            {{ String(`You have ${daysCount} days of Vacation left`) }}
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
      placeholder="Add your comment"
    />
  </div>
</template>

<style >

.vc-day-content {
  @apply text-base;
}

.is-not-in-month * {
  color: gray;
  opacity: 1 !important;
  pointer-events: inherit !important;
}

.vc-weeks {
  @apply p-[23px_30px_30px] flex flex-col gap-2;
}

.vc-header {
  @apply mt-[30px] grid items-center justify-center gap-x-[110px];

  grid-template-columns: [prev] auto [title] auto [next] auto !important;
}

.vc-weekdays {
  @apply gap-[10px] mb-4;
}

.vc-weekday {
  @apply bg-[#f4f9fd] font-semibold rounded-[7px];
}

.vc-day {
  @apply h-[52px];
}

.vc-week {
  @apply font-nunito-sans;
}

.vc-day-content.vc-blue {
  @apply bg-blue rounded-[14px] h-[52px] w-[52px] text-white;
}

.vc-highlight {
  @apply h-[52px] bg-blue;
}

@media (width <= 640px) {
  .vc-highlight vc-highlight-bg-solid {
    @apply bg-none border-0 h-auto;
  }

  .vc-header {
    @apply mt-[10px] flex gap-[170px] mb-[20px];
  }

  .vc-title {
    @apply hidden;
  }

  .vc-day-content.vc-blue {
    @apply h-auto w-auto;
  }

  .vc-day {
    @apply h-auto w-auto;
  }

  .vc-weeks {
    @apply p-0;
  }

  .vc-pane {
    min-width: auto;
  }

  .mb-6.vc-container.vc-monthly.vc-blue.vc-light.vc-expanded.vc-bordered {
    @apply border-0;
  }
}

.vc-red {
  @apply bg-red !important;
}

.vc-weeks .vc-week:last-child .vc-day.is-not-in-month:nth-child(n+8) {
  @apply hidden;
}

.vc-day.is-not-in-month * {
  @apply text-gray-400;
}

.vc-day:focus,
.vc-day-content:focus,
.vc-focus .vc-day-content {
  @apply outline-none shadow-none;
}

.vc-highlight-bg-outline {
  @apply border-0;
}
</style>
