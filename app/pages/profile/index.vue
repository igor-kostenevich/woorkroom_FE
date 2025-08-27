<script setup lang="ts">
import ProfileSideBar from '~/components/common/ProfileSideBar.vue';
const PageLayout = defineAsyncComponent(
  () => import('~/components/common/PageLayout.vue')
);
const Segment = defineAsyncComponent(() => import('~/UIKit/Segment.vue'));
const Button = defineAsyncComponent(() => import('~/UIKit/Button.vue'));

const ProjectsContent = defineAsyncComponent(
  () => import('~/components/pages/profile/ProjectsContent.vue')
);
const TeamContent = defineAsyncComponent(
  () => import('~/components/pages/profile/TeamContent.vue')
);
const VacationsContent = defineAsyncComponent(
  () => import('~/components/pages/profile/VacationsContent.vue')
);

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

const selectedSegment = ref(0);
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
  <PageLayout>
    <template #sidebar>
      <ProfileSideBar />
    </template>

    <template #actions>
      <div class="flex flex-col items-center justify-between gap-2 lg:flex-row">
        <Segment
          v-model="selectedSegment"
          class="max-w-md"
          :options="segmentsOptions"
        />

        <Button
          v-if="currentComponent === VacationsContent"
          color="primary"
          size="md"
          icon-before="plus"
        >
          {{ $t('profile.Add Request') }}
        </Button>
      </div>
    </template>

    <template #content>
      <component :is="currentComponent" />
    </template>
  </PageLayout>
</template>
