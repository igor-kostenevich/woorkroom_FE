<template>
  <Tab default-tab>
    <template #header>
      <h1>{{ $t('addEmployee') }}</h1>
    </template>

    <div class="tab-content">
      <img
        src="/images/employees/woman-at-laptop.png"
        alt="Woman working on a laptop at a desk"
        class="mb-7"
      />

      <div class="mb-6">
        <div class="mb-2 text-sm font-bold leading-[171%] text-gray">
          {{ $t('membersEmail') }}
        </div>
        <div v-for="(member, index) in membersEmail" :key="index" class="mb-5">
          <Input v-model="member.email" placeholder="Email" />
        </div>
      </div>

      <Button
        color="neutral"
        size="md"
        icon-before="plus"
        class="text-primary"
        :disabled="!isLastFilled"
        @click="addEmployee"
      >
        {{ $t('addAnotherMember') }}
      </Button>
    </div>

    <template #footer>
      <Button @click="hideModal">
        {{ $t('approve') }}
      </Button>
    </template>
  </Tab>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, computed } from 'vue';
import Tab from '~/components/layout/Modal/Tab.vue';
import useModal from '~/composables/useModal';

const Input = defineAsyncComponent(() => import('@/UIKit/Input.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

const { hideModal } = useModal();

interface Member {
  email: string;
}

const membersEmail = ref<Member[]>([{ email: '' }]);

const isLastFilled = computed(() => {
  const last = membersEmail.value.at(-1);
  return !!last && last.email.trim().length > 0;
});

const addEmployee = () => {
  if (!isLastFilled.value) return;
  membersEmail.value.push({ email: '' });
};
</script>
