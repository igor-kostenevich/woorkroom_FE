<template>
  <div class="flex">
    <div
      class="flex items-center gap-5"
      :style="{ marginRight: props.gap + 'px' }"
    >
      <UserAvatar
        size="lg"
        :full-name="props.data.fullName"
        :image="props.data.image"
      />
      <div>
        <div class="mb-2 font-bold text-dark">{{ props.data.fullName }}</div>
        <div class="text-sm text-gray-light">{{ props.data.email }}</div>
      </div>
    </div>
    <div class="flex flex-1 justify-between gap-7">
      <div class="flex flex-1 justify-between gap-y-8">
        <div class="flex-1">
          <div class="mb-2 text-sm text-gray-light">
            {{ $t('employeesCards.employeeOverviewCard.gender') }}
          </div>
          <div class="text-dark first-letter:uppercase">
            {{ props.data.gender }}
          </div>
        </div>
        <div class="flex-1">
          <div class="mb-2 text-sm text-gray-light">
            {{ $t('employeesCards.employeeOverviewCard.birthday') }}
          </div>
          <div class="text-dark first-letter:uppercase">
            {{ props.data.birthday }}
          </div>
        </div>
        <div class="flex-1">
          <div class="mb-2 text-sm text-gray-light">
            {{ $t('employeesCards.employeeOverviewCard.fullAge') }}
          </div>
          <div class="text-dark first-letter:uppercase">
            {{ props.data.age }}
          </div>
        </div>
        <div class="flex-1">
          <div class="mb-2 text-sm text-gray-light">
            {{ $t('employeesCards.employeeOverviewCard.position') }}
          </div>
          <div class="text-dark first-letter:uppercase">
            {{ props.data.position }}
            <EmployeeLvl :lvl="2" class="ml-1" />
          </div>
        </div>
      </div>
      <div v-if="props.data.details">
        <Button color="neutral" size="md" icon-before="more" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IEmployeeProfile } from '~/types/components/employee-cards';
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const UserAvatar = defineAsyncComponent(
  () => import('~/components/common/UserAvatar.vue')
);
const EmployeeLvl = defineAsyncComponent(
  () => import('~/components/pages/employees/EmployeeLvl.vue')
);

const props = defineProps<{
  data: IEmployeeProfile;
  gap: number;
}>();
</script>
