<script setup lang="ts">
const Segment = defineAsyncComponent(() => import('~/UIKit/Segment.vue'));
const Button = defineAsyncComponent(() => import('~/UIKit/Button.vue'));
const Dropdown = defineAsyncComponent(() => import('~/UIKit/Dropdown.vue'));
const ProjectsContent = defineAsyncComponent(
  () => import('~/components/pages/profile/ProjectsContent.vue')
);
const TeamContent = defineAsyncComponent(
  () => import('~/components/pages/profile/TeamContent.vue')
);
const VacationsContent = defineAsyncComponent(
  () => import('~/components/pages/profile/VacationsContent.vue')
);

const { showModal } = useModal();

const ddIndexDefault = ref<number | null>(null);
const ddOptions = [
  { label: 'Current Projects', code: 'Current Projects' },
  { label: 'Archived Projects', code: 'Archived Projects' },
  { label: 'Completed Projects', code: 'Completed Projects' },
  { label: 'Closed Projects', code: 'Closed Projects' },
];
const segmentsOptions = reactive([
  {
    id: 0,
    label: 'Projects',
    comp: 'ProjectsContent',
  },
  {
    id: 1,
    label: 'Team',
    comp: 'TeamContent',
  },
  {
    id: 2,
    label: 'My vacations',
    comp: 'VacationsContent',
  },
]);

const selectedSegment = ref(2);
const componentsMap = {
  ProjectsContent,
  TeamContent,
  VacationsContent,
} as const;

const currentComponent = computed(
  () =>
    componentsMap[
      segmentsOptions[selectedSegment.value]!.comp as keyof typeof componentsMap
    ]
);
</script>

<template>
  <div
    class="mb-6 flex flex-col items-center justify-between gap-2 lg:flex-row"
  >
    <Segment
      v-model="selectedSegment"
      class="max-w-md"
      :options="segmentsOptions"
      query-key="tabNavigation"
    />

    <Button
      v-if="currentComponent === VacationsContent"
      color="primary"
      size="md"
      icon-before="plus"
      @click="
        showModal({
          name: 'AddRequest',
          data: { tab: 0 },
        })
      "
    >
      {{ $t('profile.Add Request') }}
    </Button>

    <Dropdown
      v-if="currentComponent === ProjectsContent"
      v-model="ddIndexDefault"
      :options="ddOptions"
      label-field="label"
      placeholder="Chose Projects"
    />
  </div>

  <component :is="currentComponent" />
</template>
