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
  { label: $t('register.purposes.work'), value: 'work' },
  { label: $t('register.purposes.personal'), value: 'personal' },
  { label: $t('register.purposes.education'), value: 'education' },
  { label: $t('register.purposes.team'), value: 'team' },
  { label: $t('register.purposes.business'), value: 'business' },
  { label: $t('register.purposes.other'), value: 'other' },
];

const personas = [
  { label: $t('register.personas.owner'), value: 'owner' },
  { label: $t('register.personas.lead'), value: 'lead' },
  { label: $t('register.personas.employee'), value: 'employee' },
  { label: $t('register.personas.freelancer'), value: 'freelancer' },
  { label: $t('register.personas.student'), value: 'student' },
  { label: $t('register.personas.other'), value: 'other' },
];

const confirmationOptions = [
  { id: '1', label: $t('register.yes'), value: 'yes' },
  { id: '2', label: $t('register.no'), value: 'no' },
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
  payload.value.onboarding.extraYesNo ? 'yes' : 'no'
);

watch(selectedConfirmation, (val: string) => {
  payload.value.onboarding.extraYesNo = val === 'yes';
});
</script>

<template>
  <div>
    <div class="mb-6">
      <Input v-model="payload.firstName" :placeholder="$t('register.name')">
        <template #topTextLeft>{{ $t('register.type name') }}</template>

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
          :placeholder="$t('register.purposes.work')"
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
          :placeholder="$t('register.personas.owner')"
          :fullwidth="true"
        />
      </div>
    </div>

    <div class="flex items-center justify-between gap-2">
      <div class="text-sm font-bold text-gray">
        {{ $t('register.confirmation') }}
      </div>
      <div class="flex items-center gap-4 sm:gap-9">
        <Radio
          v-for="option in confirmationOptions"
          :id="option.id"
          :key="option.id"
          v-model="selectedConfirmation"
          name="radio-choice"
          :value="option.value"
          class="flex items-center gap-2"
        >
          {{ option.label }}
        </Radio>
      </div>
    </div>
  </div>
</template>
