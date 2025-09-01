<template>
  <Tab>
    <!-- 🔴This slot is required -->
    <template #header>
      <h1>{{ String('Tab') }}</h1>
    </template>

    <div class="tab-content">
      <p>{{ String('Lorem') }}</p>

      <p>{{ String('passed data:') }} {{ openedSubTabData.data }}</p>

      <Button @click="hideSubTab">
        {{ String('Back to default tab') }}
      </Button>
    </div>

    <!-- 🟢This slot is optional -->
    <template #footer>
      <Button fullwidth @click="hideSubTab">
        {{ String('Hide this Tab') }}
      </Button>
      <Button color="primary" fullwidth @click="hideModal">
        {{ String('Close') }}
      </Button>
    </template>
  </Tab>
</template>

<script setup lang="ts">
import useModal from '~/composables/useModal';
import Tab from '~/components/layout/Modal/Tab.vue';
import type { IModalProvider } from '~/types/components';
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

interface IModalProps {
  data?: any;
}
const { data } = defineProps<IModalProps>();
console.warn('modal data', data);

// openedSubTabId, openedSubTabData, openSubTab, hideSubTab
const { hideSubTab, openedSubTabData } = inject('modal') as IModalProvider;

const { hideModal } = useModal();
</script>
