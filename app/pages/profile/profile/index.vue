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
  },
  {
    id: 1,
    label: 'Team',
  },
  {
    id: 2,
    label: 'My vacations',
  },
]);

const selectedSegment = ref(2);

const componentsMap = computed(() => {
  return {
    0: ProjectsContent,
    1: TeamContent,
    2: VacationsContent,
  };
});

const currentComponent = computed(
  () => componentsMap.value[selectedSegment.value]
);
</script>

<template>
  <div
    class="mb-6 flex flex-col items-center justify-between gap-2 lg:flex-row"
  >
    <div class="block self-baseline lg:hidden">
      <Dropdown
        v-if="currentComponent === ProjectsContent"
        v-model="ddIndexDefault"
        :options="ddOptions"
        label-field="label"
        placeholder="Chose Projects"
      />
    </div>
    <Segment
      v-model="selectedSegment"
      class="flex-[0_1_43%]"
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

    <div v-if="currentComponent === ProjectsContent" class="hidden lg:block">
      <Dropdown
        v-model="ddIndexDefault"
        :options="ddOptions"
        label-field="label"
        placeholder="Chose Projects"
      />
    </div>
  </div>

  <KeepAlive>
    <component :is="currentComponent" />
  </KeepAlive>
</template>
