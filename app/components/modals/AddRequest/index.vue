<template>
  <!-- 🟢If there is only one tab, specify an array with a single value [360] -->
  <Modal :max-width="[608, 600]">
    <template #default="{ openedSubTabId }">
      <!-- Default tab-->
      <Default v-if="openedSubTabId === 0" :data="data" />

      <!-- 🟢If you don't use tabs, you can delete this code -->
      <!-- Other tabs-->
      <Tab1 v-if="openedSubTabId === 1" :data="data" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '~/components/layout/Modal/Modal.vue';
import Default from './tabs/default.vue';
import Tab1 from './tabs/tab1.vue';

interface IModalProps {
  data?: object;
}

// Modal data
const { data } = defineProps<IModalProps>();
</script>
