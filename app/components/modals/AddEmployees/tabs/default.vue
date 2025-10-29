<template>
  <Tab default-tab>
    <template #header>
      <h1>{{ $t('addEmployee') }}</h1>
    </template>
    <div class="tab-content">
      <img
        src="/images/employees/woman-at-laptop.png"
        :alt="$t('Woman working on a laptop at a desk')"
        class="mb-7 hidden md:inline"
      />
      <div class="mb-6">
        <div v-for="(member, index) in membersEmail" :key="index" class="mb-5">
          <Input
            ref="inputsRefs"
            v-model="member.email"
            :placeholder="$t('Email')"
            :disabled="membersEmail.length - 1 > index"
          >
            <template v-if="index === 0" #topTextLeft>{{
              $t('membersEmail')
            }}</template>
            <template
              v-if="
                validationErrors.email.message &&
                membersEmail.length - 1 === index
              "
              #errorMessage
            >
              {{ validationErrors.email.message }}
            </template>
          </Input>
        </div>
      </div>
      <LinkButton
        :disabled="membersEmail[membersEmail.length - 1].email === ''"
        icon-before="plus"
        @click="addEmployee"
      >
        {{ $t('addAnotherMember') }}
      </LinkButton>
    </div>

    <template #footer>
      <Button class="ml-auto" @click="onApprove">
        {{ $t('approve') }}
      </Button>
    </template>
  </Tab>
</template>

<script setup lang="ts">
import Tab from '~/components/layout/Modal/Tab.vue';
const Input = defineAsyncComponent(() => import('@/UIKit/Input.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const LinkButton = defineAsyncComponent(() => import('@/UIKit/LinkButton.vue'));

const { hideModal } = useModal();

const rules = {
  email: {
    required: helpers.withMessage(
      $t('validation.required'),
      validators.required
    ),
    email: helpers.withMessage($t('validation.invalidEmail'), validators.email),
  },
};

const { inputsRefs, membersEmail, validationErrors, add, approve } =
  useEmailList(rules);

const addEmployee = add;
const onApprove = () => approve(hideModal);
</script>
