<script setup lang="ts">
const Input = defineAsyncComponent(() => import('~/UIKit/Input.vue'));
const Dropdown = defineAsyncComponent(() => import('~/UIKit/Dropdown.vue'));
const { useDropdownSync } = useAuth();

const payload = defineModel<any>();

const businessDirections = [
  { label: 'IT and Programming', value: 'it' },
  { label: 'Marketing and Advertising', value: 'marketing' },
  { label: 'Design and Creative', value: 'design' },
  { label: 'Education and Training', value: 'education' },
  { label: 'Finance and Accounting', value: 'finance' },
];

const teamSizes = [
  { label: 'Only me', value: '1' },
  { label: '2 - 5', value: '2-5' },
  { label: '6 - 10', value: '6-10' },
  { label: '11 - 20', value: '11-20' },
  { label: '21 - 40', value: '21-40' },
  { label: '41 - 50', value: '41-50' },
  { label: '51 - 100', value: '51-100' },
  { label: '101 - 500', value: '101-500' },
];

const { selected: selectedDirection } = useDropdownSync(
  computed({
    get: () => payload.value.company.direction,
    set: (v: string) => (payload.value.company.direction = v),
  }),
  businessDirections
);

const selectedTeam = ref(payload.value.company.teamSize || '1');

watch(selectedTeam, (team: string) => {
  payload.value.company.teamSize = team;
});
</script>

<template>
  <div>
    <div class="mb-6">
      <Input
        v-model="payload.company.name"
        :placeholder="$t('register.Company Name')"
      >
        <template #topTextLeft>{{
          $t('register.Your Companys Name')
        }}</template>
      </Input>
    </div>

    <div class="mb-6">
      <div class="mb-2 text-sm font-bold text-gray">
        {{ $t('register.direction') }}
      </div>
      <div class="w-full rounded-[14px] border border-gray-dark">
        <Dropdown
          v-model="selectedDirection"
          :options="businessDirections"
          :placeholder="$t('register.it')"
          :fullwidth="true"
        />
      </div>
    </div>
    <div class="mb-6">
      <div class="mb-2 text-sm font-bold text-gray">
        {{ $t('register.team') }}
      </div>

      <div class="grid grid-cols-3 gap-4 sm:grid-cols-4">
        <div
          v-for="size in teamSizes"
          :key="size.value"
          :class="[
            'flex min-w-[89px] cursor-pointer select-none items-center justify-center rounded-xl border py-3 text-sm font-medium transition',
            selectedTeam === size.value
              ? 'border-primary bg-primary text-white'
              : 'border-gray-dark text-gray hover:border-primary/50',
          ]"
          @click="
            selectedTeam = size.value;
            payload.company.teamSize = size.value;
          "
        >
          {{ size.label }}
        </div>
      </div>
    </div>
  </div>
</template>
