<script setup lang="ts">
import { useEmailList } from '~/composables/useEmailList';
import type { IRegisterPayload } from '~/types/register/registerPayload';

const LinkButton = defineAsyncComponent(() => import('@/UIKit/LinkButton.vue'));
const Input = defineAsyncComponent(() => import('@/UIKit/Input.vue'));

const payload = defineModel<IRegisterPayload>();

const rules = {
  email: {
    email: helpers.withMessage('Invalid email', validators.email),
  },
};

const { membersEmail, add, validationErrors } = useEmailList(rules);

watch(
  membersEmail,
  () => {
    payload.value.invites = membersEmail.map((m) => m.email);
  },
  { deep: true }
);

onMounted(() => {
  membersEmail.splice(
    0,
    membersEmail.length,
    ...payload.value.invites.map((email: string) => ({ email }))
  );
});
</script>

<template>
  <div class="mb-6">
    <div v-for="(member, index) in membersEmail" :key="index" class="mb-5">
      <Input
        v-model="member.email"
        :placeholder="$t('Email')"
        :error="validationErrors.email"
        :disabled="membersEmail.length - 1 > index"
      >
        <template v-if="index === 0" #topTextLeft>
          {{ $t('membersEmail') }}
        </template>

        <template
          v-if="
            validationErrors.email.message && membersEmail.length - 1 === index
          "
          #errorMessage
        >
          {{ validationErrors.email.message }}
        </template>
      </Input>
    </div>
  </div>

  <LinkButton
    class="!self-start"
    icon-before="plus"
    :disabled="membersEmail[membersEmail.length - 1].email.trim() === ''"
    @click="membersEmail[membersEmail.length - 1].email.trim() && add()"
  >
    {{ $t('addAnotherMember') }}
  </LinkButton>
</template>
