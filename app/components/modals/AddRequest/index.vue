<template>
  <Modal :max-width="[608]">
    <template #default="{ openedSubTabId }">
      <Default v-if="openedSubTabId === 0" :data="data" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '~/components/layout/Modal/Modal.vue';
import Default from './tabs/default.vue';

interface IModalProps {
  data?: object;
}

const { data } = defineProps<IModalProps>();
</script>
