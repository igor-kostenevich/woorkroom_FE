<script setup lang="ts">
import { colors } from '../../config/colors';
import iconList from '../../config/icon-list.json';

const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const TaskStatus = defineAsyncComponent(
  () => import('@/pages/projects/TaskStatus.vue')
);
const VacationStatus = defineAsyncComponent(
  () => import('~/pages/vacations/VacationStatus.vue')
);

const VacationIndicator = defineAsyncComponent(
  () => import('~/pages/vacations/VacationIndicator.vue')
);
const EmployeeLvl = defineAsyncComponent(
  () => import('@/pages/employees/EmployeeLvl.vue')
);
definePageMeta({
  layout: 'components',
});

const colorList = flattenColors(colors);
const buttonSizes = ['md', 'lg'] as const;
const buttonColorVariants = ['primary', 'neutral'] as const;

function flattenColors(
  obj: Record<string, any>,
  prefix = ''
): { name: string; value: any }[] {
  return Object.entries(obj).flatMap(([key, val]) => {
    if (typeof val === 'object' && val !== null) {
      return flattenColors(val, prefix ? `${prefix}.${key}` : key);
    }
    if (key === 'DEFAULT' && prefix) {
      return [{ name: prefix, value: val }];
    }
    return [{ name: prefix ? `${prefix}.${key}` : key, value: val }];
  });
}
</script>

<template>
  <div class="">
    <h3 class="mb-10 text-4xl font-bold text-dark-default">COLORS</h3>
    <div class="grid grid-cols-8 gap-6">
      <div
        v-for="c in colorList"
        :key="c.name"
        class="flex flex-col items-center space-y-2"
      >
        <div
          class="h-16 w-16 rounded border shadow"
          :style="{ background: c.value }"
        />
        <span class="font-mono text-xs text-gray-500">{{ c.name }}</span>
        <span class="font-mono text-xs">{{ c.value }}</span>
      </div>
    </div>
  </div>
  <h3 class="mb-10 mt-32 text-4xl font-bold text-dark-default">Icons</h3>
  <div class="grid grid-cols-12 gap-6">
    <div
      v-for="(i, index) in iconList"
      :key="index"
      class="flex flex-col items-center space-y-2"
    >
      <Suspense>
        <Icon :size="48" :name="i.name" />
      </Suspense>

      <p class="text-xs text-gray-500">{{ i.name }}</p>
      <p class="font-mono text-xs" :class="{ old: i.viewbox !== '0 0 24 24' }">
        {{ i.viewbox }}
      </p>
    </div>
  </div>
  <div class="mb-20 mt-20">
    <h3 class="mb-10 text-4xl font-bold text-dark-default">BUTTONS</h3>

    <div
      v-for="color in buttonColorVariants"
      :key="color"
      class="mb-8 space-y-4 border-b pb-6"
    >
      <h4 class="text-2xl font-semibold capitalize">Color: {{ color }}</h4>

      <div
        v-for="size in buttonSizes"
        :key="size"
        class="flex flex-wrap items-center gap-4"
      >
        <Button :color="color" :size="size">Default {{ size }}</Button>

        <Button :color="color" :size="size" icon-before="plus">
          Icon Before
        </Button>

        <Button :color="color" :size="size" icon-after="plus">
          Icon After
        </Button>

        <Button :color="color" :size="size" :loading="true"> Loading</Button>

        <Button :color="color" :size="size" :disabled="true"> Disabled</Button>

        <Button :color="color" :size="size" :fullwidth="true">
          Fullwidth
        </Button>

        <Button :color="color" :size="size" icon-before="plus" />
      </div>
    </div>
  </div>
  <div class="mb-20 mt-20">
    <h3 class="mb-10 text-4xl font-bold text-dark-default">Task statuses</h3>

    <div class="flex gap-5">
      <TaskStatus status="To Do"> To Do</TaskStatus>
      <TaskStatus status="In Progress"> In Progress</TaskStatus>
      <TaskStatus status="In Review"> In Review</TaskStatus>
      <TaskStatus status="Done"> Done</TaskStatus>
    </div>
  </div>
  <div class="mb-20 mt-20">
    <h3 class="mb-10 text-4xl font-bold text-dark-default">
      Vacation statuses
    </h3>

    <div class="flex gap-5">
      <VacationStatus status="Approved"> Approved</VacationStatus>
      <VacationStatus status="Pending">In Progress</VacationStatus>
      <VacationStatus status="Progress">
        <Icon name="loading" :size="24" />
      </VacationStatus>
    </div>
  </div>

  <div class="mb-20 mt-20">
    <h3 class="mb-10 text-4xl font-bold text-dark-default">Employees’ level</h3>

    <div class="flex gap-5">
      <EmployeeLvl> Junior</EmployeeLvl>
      <EmployeeLvl> Middle</EmployeeLvl>
      <EmployeeLvl> Senior</EmployeeLvl>
    </div>
  </div>

  <div class="mb-20 mt-20">
    <h3 class="mb-10 text-4xl font-bold text-dark-default">
      Vacation Indicators
    </h3>

    <div class="flex gap-16">
      <div class="flex flex-col gap-y-5">
        <h4 class="text-lg font-medium text-gray">Sick Leave</h4>
        <VacationIndicator status="Approved" indicator="Sick Leave" />
        <VacationIndicator status="Pending" indicator="Sick Leave" />
      </div>

      <div class="flex flex-col gap-y-5">
        <h4 class="text-lg font-medium text-gray">Vacation</h4>
        <VacationIndicator status="Approved" indicator="Vacation" />
        <VacationIndicator status="Pending" indicator="Vacation" />
      </div>

      <div class="flex flex-col gap-y-5">
        <h4 class="text-lg font-medium text-gray">Work Remotely</h4>
        <VacationIndicator status="Approved" indicator="Work Remotely" />
        <VacationIndicator status="Pending" indicator="Work Remotely" />
      </div>
    </div>
  </div>
</template>
