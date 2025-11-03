<script setup lang="ts">
const Dropdown = defineAsyncComponent(() => import('~/UIKit/Dropdown.vue'));
const Radio = defineAsyncComponent(() => import('~/UIKit/Radio.vue'));
const Input = defineAsyncComponent(() => import('~/UIKit/Input.vue'));

const { useDropdownSync } = useAuth();
const payload = defineModel<any>();

const props = defineProps<{
  validationErrors?: Record<string, { message?: string }>;
}>();

const purposes = [
  { label: $t('register.purpose.work'), value: 'work' },
  { label: $t('register.purpose.personal'), value: 'personal' },
  { label: $t('register.purpose.education'), value: 'education' },
  { label: $t('register.purpose.team'), value: 'team' },
  { label: $t('register.purpose.business'), value: 'business' },
  { label: $t('register.purpose.other'), value: 'other' },
];

const personas = [
  { label: $t('register.persona.owner'), value: 'owner' },
  { label: $t('register.persona.lead'), value: 'lead' },
  { label: $t('register.persona.employee'), value: 'employee' },
  { label: $t('register.persona.freelancer'), value: 'freelancer' },
  { label: $t('register.persona.student'), value: 'student' },
  { label: $t('register.persona.other'), value: 'other' },
];

const confirmationOptions = [
  { id: '1', value: $t('register.yes') },
  { id: '2', value: $t('register.no') },
];

const { selected: selectedPurpose } = useDropdownSync(
  computed({
    get: () => payload.value.onboarding.purpose,
    set: (v: string) => (payload.value.onboarding.purpose = v),
  }),
  purposes
);

const { selected: selectedPersona } = useDropdownSync(
  computed({
    get: () => payload.value.onboarding.persona,
    set: (v: string) => (payload.value.onboarding.persona = v),
  }),
  personas
);

const selectedConfirmation = ref(
  payload.value.onboarding.extraYesNo ? $t('register.yes') : $t('register.no')
);

watch(selectedConfirmation, (val: string) => {
  payload.value.onboarding.extraYesNo = val === $t('register.yes');
});
</script>

<template>
  <div>
    <div class="mb-6">
      <Input v-model="payload.firstName" :placeholder="$t('register.name')">
        <template #topTextLeft>{{ $t('register.typeName') }}</template>

        <template
          v-if="props.validationErrors?.firstName?.message"
          #errorMessage
        >
          {{ props.validationErrors.firstName.message }}
        </template>
      </Input>
    </div>

    <div class="mb-6">
      <div class="mb-2 text-sm font-bold text-gray">
        {{ $t('register.service') }}
      </div>
      <div class="w-full rounded-[14px] border border-gray-dark">
        <Dropdown
          v-model="selectedPurpose"
          :options="purposes"
          :placeholder="$t('register.purpose.work')"
          :fullwidth="true"
        />
      </div>
    </div>

    <div class="mb-6">
      <div class="mb-2 text-sm font-bold text-gray">
        {{ $t('register.best') }}
      </div>
      <div class="w-full rounded-[14px] border border-gray-dark">
        <Dropdown
          v-model="selectedPersona"
          :options="personas"
          :placeholder="$t('register.persona.owner')"
          :fullwidth="true"
        />
      </div>
    </div>

    <div class="flex items-center justify-between gap-2">
      <div class="text-sm font-bold text-gray">
        {{ $t('register.confirmQuestion') }}
      </div>
      <div class="flex items-center gap-4 sm:gap-9">
        <Radio
          v-for="i in confirmationOptions"
          :id="i.id"
          :key="i.id"
          v-model="selectedConfirmation"
          name="radio-choice"
          :value="i.value"
          class="flex items-center gap-2"
        >
          {{ i.value }}
        </Radio>
      </div>
    </div>
  </div>
</template>
