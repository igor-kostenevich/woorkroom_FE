<template>
  <div class="flex">
    <div :style="{ marginRight: gap + 'px' }">
      <div class="mb-2 text-sm text-gray-light">
        {{ $t('employeesCards.requestCard.requestType') }}
      </div>
      <VacationIndicator
        status="approved"
        :indicator="props.data.requestType"
        class="text-dark"
      />
    </div>
    <div class="flex flex-1 items-center justify-between gap-7">
      <div class="flex-1">
        <div class="mb-2 text-sm text-gray-light">
          {{ $t('employeesCards.requestCard.duration') }}
        </div>
        <div class="text-dark first-letter:uppercase">
          {{ props.data.duration }}
        </div>
      </div>
      <div class="flex-1">
        <div class="mb-2 text-sm text-gray-light">
          {{ $t('employeesCards.requestCard.startDay') }}
        </div>
        <div class="text-dark first-letter:uppercase">
          {{ props.data.startDay }}
        </div>
      </div>
      <div class="flex-1">
        <div class="mb-2 text-sm text-gray-light">
          {{ $t('employeesCards.requestCard.endDay') }}
        </div>
        <div class="text-dark first-letter:uppercase">
          {{ props.data.endDay }}
        </div>
      </div>
      <VacationStatus :status="props.data.status" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IRequest } from '~/types/components/employee-cards';
const VacationIndicator = defineAsyncComponent(
  () => import('~/components/pages/vacations/VacationIndicator.vue')
);
const VacationStatus = defineAsyncComponent(
  () => import('~/components/pages/vacations/VacationStatus.vue')
);

const props = defineProps<{
  data: IRequest;
  gap: number;
}>();
</script>
