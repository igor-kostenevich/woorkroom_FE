<template>
  <Tab default-tab>
    <template #header>
      <h1>{{ $t('addEmployee') }}</h1>
    </template>
    <div class="tab-content">
      <img
        src="/images/employees/woman-at-laptop.png"
        alt="Woman working on a laptop at a desk"
        class="mb-7 hidden md:inline"
      />
      <div class="mb-6">
        <div class="mb-2 text-sm font-bold leading-relaxed text-gray">
          {{ $t('membersEmail') }}
        </div>
        <div v-for="(member, index) in membersEmail" :key="index" class="mb-5">
          <Input
            ref="inputsRefs"
            v-model="member.email"
            :placeholder="$t('Email')"
            :disabled="membersEmail.length - 1 > index"
          >
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

      <Button
        color="neutral"
        size="md"
        icon-before="plus"
        class="text-primary"
        :disabled="membersEmail[membersEmail.length - 1].email === ''"
        @click="addEmployee"
      >
        {{ $t('addAnotherMember') }}
      </Button>
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

const inputsRefs = ref([]);
const membersEmail = reactive([{ email: '' }]);
const form = computed(
  () => membersEmail[membersEmail.length - 1] ?? { email: '' }
);
const { validationErrors, validateField } = useValidation(form, rules);

const inputFocus = () => {
  const last = inputsRefs.value[membersEmail.length - 1];
  if (last?.focus) last.focus();
  else last?.$el?.querySelector?.('input')?.focus();
};

const addEmployee = async () => {
  const isValid = await validateField('email');
  if (isValid) membersEmail.push({ email: '' });
  await nextTick();
  inputFocus();
};

const onApprove = async () => {
  const isValid = await validateField('email');
  if (isValid) await hideModal();
  if (!isValid) {
    await nextTick();
    inputFocus();
  }
};
</script>
