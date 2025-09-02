<template>
  <div class="flex justify-between pr-7">
    <div
      class="mr-[var(--mr)] flex items-center gap-5"
      :style="{ '--mr': `${spacing}px` }"
    >
      <UserAvatar
        class="bg-primary stroke-primary"
        size="lg"
        :full-name="props.data.fullName"
        :image="props.data.image"
      />
      <div>
        <div class="mb-2 font-bold text-dark">
          {{ props.data.fullName }}
        </div>
        <div class="text-gray-light">
          {{ props.data.email }}
        </div>
      </div>
    </div>
    <div class="flex gap-24">
      <div class="grid grid-cols-[auto_auto_auto] items-center gap-[84px]">
        <div>
          <div class="mb-2 text-sm text-gray-light">
            {{ $t('entityCard.vacations') }}
          </div>
          <div class="capitalize text-dark">
            {{ props.data.vacations }}
          </div>
        </div>
        <div>
          <div class="mb-2 text-sm text-gray-light">
            {{ $t('entityCard.sickLeave') }}
          </div>
          <div class="capitalize text-dark">
            {{ props.data.sickLeave }}
          </div>
        </div>
        <div>
          <div class="mb-2 text-sm text-gray-light">
            {{ $t('entityCard.workRemotely') }}
          </div>
          <div class="capitalize text-dark">
            {{ props.data.workRemotely }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IEmployeeStatsCard } from '~/types/projects/entityCard';

const UserAvatar = defineAsyncComponent(
  () => import('@/components/common/UserAvatar.vue')
);

const props = defineProps<{
  data: IEmployeeStatsCard;
  spacing?: number;
}>();
</script>
