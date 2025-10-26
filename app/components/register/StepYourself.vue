<script setup lang="ts">
const Dropdown = defineAsyncComponent(() => import('~/UIKit/Dropdown.vue'));
const Radio = defineAsyncComponent(() => import('~/UIKit/Radio.vue'));

const selectedPurpose = ref('');
const selectedPersona = ref('');
const selectedYesNo = ref('Yes');

const payload = defineModel<any>();

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

watchEffect(() => {
  const purposeOption = purposes[selectedPurpose.value];
  const personaOption = personas[selectedPersona.value];

  payload.value.onboarding.purpose = purposeOption?.value || '';
  payload.value.onboarding.persona = personaOption?.value || '';
  payload.value.onboarding.extraYesNo = selectedYesNo.value;
});
</script>

<template>
  <div class="">
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
