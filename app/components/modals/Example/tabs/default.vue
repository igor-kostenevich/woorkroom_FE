<template>
  <Tab default-tab>
    <!-- 🟢This slot is optional -->
    <template #header>
      <h1>{{ String('Header') }}</h1>
    </template>

    <div class="tab-content">
      <p>{{ data?.testData }}</p>

      <p class="mb-2">
        {{
          String(
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsa inventore tempora laborum cumque eos tenetur error fugiat sequi ducimus eaque, perferendis similique fuga, rerum dignissimos harum nesciunt soluta natus.'
          )
        }}
      </p>
      <p class="mb-2">
        {{
          String(
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsa inventore tempora laborum cumque eos tenetur error fugiat sequi ducimus eaque, perferendis similique fuga, rerum dignissimos harum nesciunt soluta natus.'
          )
        }}
      </p>
      <p class="mb-2">
        {{
          String(
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsa inventore tempora laborum cumque eos tenetur error fugiat sequi ducimus eaque, perferendis similique fuga, rerum dignissimos harum nesciunt soluta natus.'
          )
        }}
      </p>
      <p class="mb-2">
        {{
          String(
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsa inventore tempora laborum cumque eos tenetur error fugiat sequi ducimus eaque, perferendis similique fuga, rerum dignissimos harum nesciunt soluta natus.'
          )
        }}
      </p>
      <p class="mb-2">
        {{
          String(
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsa inventore tempora laborum cumque eos tenetur error fugiat sequi ducimus eaque, perferendis similique fuga, rerum dignissimos harum nesciunt soluta natus.'
          )
        }}
      </p>
      <p class="mb-2">
        {{
          String(
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsa inventore tempora laborum cumque eos tenetur error fugiat sequi ducimus eaque, perferendis similique fuga, rerum dignissimos harum nesciunt soluta natus.'
          )
        }}
      </p>

      <Button @click="openSubTab(1, { data: 1 })">
        {{ String('Open tab') }}
      </Button>
    </div>

    <!-- 🟢This slot is optional -->
    <template #footer>
      <Button color="neutral" @click="hideModal">{{ String('Cancel') }}</Button>
      <Button @click="hideModal">
        {{ String('Ok') }}
      </Button>
    </template>
  </Tab>
</template>

<script setup lang="ts">
import Tab from '~/components/layout/Modal/Tab.vue';
import useModal from '~/composables/useModal';
import type { IModalProvider } from '~/types/components';

const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

interface IModalProps {
  data?: any;
}
const { data } = defineProps<IModalProps>();
console.warn('modal data', data);

const { hideModal } = useModal();

// openedSubTabId, openedSubTabData, openSubTab, hideSubTab
const { openSubTab } = inject('modal') as IModalProvider;
</script>
