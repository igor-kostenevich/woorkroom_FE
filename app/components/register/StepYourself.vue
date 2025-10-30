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
  { label: 'Work', value: 'work' },
  { label: 'Personal use', value: 'personal' },
  { label: 'Education', value: 'education' },
  { label: 'Team collaboration', value: 'team' },
  { label: 'Business growth', value: 'business' },
  { label: 'Other', value: 'other' },
];

const personas = [
  { label: 'Business Owner', value: 'owner' },
  { label: 'Team Lead', value: 'lead' },
  { label: 'Employee', value: 'employee' },
  { label: 'Freelancer', value: 'freelancer' },
  { label: 'Student', value: 'student' },
  { label: 'Other', value: 'other' },
];

const yesOrNo = [
  { id: '1', value: 'Yes' },
  { id: '2', value: 'No' },
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

const selectedYesNo = ref(payload.value.onboarding.extraYesNo ? 'Yes' : 'No');

watch(selectedYesNo, (val: string) => {
  payload.value.onboarding.extraYesNo = val === 'Yes';
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
          placeholder="Work"
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
          placeholder="Business Owner"
          :fullwidth="true"
        />
      </div>
    </div>

    <div class="flex items-center justify-between gap-2">
      <div class="text-sm font-bold text-gray">
        {{ $t('register.best') }}
      </div>
      <div class="flex items-center gap-4 sm:gap-9">
        <Radio
          v-for="i in yesOrNo"
          :id="i.id"
          :key="i.id"
          v-model="selectedYesNo"
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
