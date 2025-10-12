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
        <div class="mb-2 text-sm font-bold leading-relaxed text-gray">
          {{ $t('membersEmail') }}
        </div>
        <div v-for="(member, index) in membersEmail" :key="index" class="mb-5">
          <Input
            ref="inputRefs"
            v-model="member.email"
            placeholder="Email"
            @blur="onEmailBlur(member.email)"
          >
            <template v-if="validationErrors.email?.hasError" #errorMessage>
              {{ validationErrors.email?.message }}
            </template>
          </Input>
        </div>
      </div>

      <Button
        color="neutral"
        size="md"
        icon-before="plus"
        class="text-primary"
        @click="addEmployee"
      >
        {{ $t('addAnotherMember') }}
      </Button>
    </div>

    <template #footer>
      <Button @click="onApprove">
        {{ $t('approve') }}
      </Button>
    </template>
  </Tab>
</template>

<script setup lang="ts">
// TODO: NEED REFACTORING AND OPTIMIZATION
import Tab from '~/components/layout/Modal/Tab.vue';
import useModal from '~/composables/useModal';
import useValidation, {
  validators,
  helpers,
} from '~/composables/useValidation';

const Input = defineAsyncComponent(() => import('@/UIKit/Input.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

const { hideModal } = useModal();

interface Member {
  email: string;
}
const form = reactive<Member>({ email: '' });

interface IModalProps {
  data?: object;
}
defineProps<IModalProps>();

const rules = {
  email: {
    required: helpers.withMessage('Email is required', validators.required),
    email: helpers.withMessage('Invalid email', validators.email),
  },
};
const { validateField, validationErrors } = useValidation(form, rules);

const membersEmail = ref<Member[]>([{ email: '' }]);

const inputRefs = ref<any[]>([]);

const onEmailBlur = async (value: string) => {
  form.email = value;
  await validateField('email');
};

const addEmployee = async () => {
  const last = membersEmail.value.at(-1);
  const email = last?.email.trim() ?? '';
  if (!email) return;

  form.email = email;
  const ok = await validateField('email');
  if (!ok) return;

  membersEmail.value.push({ email: '' });

  await nextTick();
  const newIndex = membersEmail.value.length - 1;
  const el = inputRefs.value[newIndex];
  if (el?.focus) {
    el.focus();
  } else {
    el?.$el?.querySelector('input')?.focus();
  }
};

const onApprove = async () => {
  const last = membersEmail.value.at(-1);
  const email = last?.email.trim() ?? '';
  form.email = email;
  const ok = email.length > 0 && (await validateField('email'));
  if (!ok) return;
  await hideModal();
};
</script>
