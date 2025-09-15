<template>
  <Tab default-tab>
    <!-- 🟢This slot is optional -->
    <template #header>
      <h1>{{ $t('profile.Add Request') }}</h1>
    </template>

    <div class="tab-content">
      <CalendarRequest
        ref="calendarRef"
        :show-text-area="showTextArea"
        @submit="handleSubmit"
      />
    </div>

    <!-- 🟢This slot is optional -->
    <template #footer>
      <Button
        color="accent"
        size="md"
        icon-before="comment"
        class="self-baseline px-[10px] py-2.5"
        @click="showTextArea = !showTextArea"
      />

      <Button @click="submitForm">
        {{ $t('calendar.Send Request') }}
      </Button>
    </template>
  </Tab>
</template>

<script setup lang="ts">
import Tab from '~/components/layout/Modal/Tab.vue';
import useModal from '~/composables/useModal';
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const CalendarRequest = defineAsyncComponent(
  () => import('~/components/common/CalendarRequest.vue')
);

interface IModalProps {
  data?: any;
}
const { data } = defineProps<IModalProps>();
console.warn('modal data', data);

const { hideModal } = useModal();
const lastPayload = ref(null);

const showTextArea = ref(false);

function handleSubmit(payload: any) {
  lastPayload.value = payload;
}

const calendarRef = ref<any>(null);

function submitForm() {
  if (!calendarRef.value) return;

  const ok = calendarRef.value.onSubmit();
  if (!ok) {
    console.warn('Validation failed,');
    return;
  }
  console.warn(lastPayload.value);
  hideModal();
}
</script>
