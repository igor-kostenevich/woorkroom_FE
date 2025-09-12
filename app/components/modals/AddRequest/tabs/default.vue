<template>
  <Tab default-tab>
    <!-- 🟢This slot is optional -->
    <template #header>
      <h1>{{ $t('profile.Add Request') }}</h1>
    </template>

    <div class="tab-content">
      <CalendarRequest :show-text-area="showTextArea" />
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

      <Button @click="hideModal">
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
const showTextArea = ref(false);
</script>
