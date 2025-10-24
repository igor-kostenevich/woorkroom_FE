<script setup lang="ts">
const Button = defineAsyncComponent(() => import('~/UIKit/Button.vue'));
const Dropdown = defineAsyncComponent(() => import('~/UIKit/Dropdown.vue'));
const Tabs = defineAsyncComponent(() => import('~/UIKit/Tabs.vue'));

const ProjectsContent = defineAsyncComponent(
  () => import('~/components/pages/profile/ProjectsContent.vue')
);
const TeamContent = defineAsyncComponent(
  () => import('~/components/pages/profile/TeamContent.vue')
);
const VacationsContent = defineAsyncComponent(
  () => import('~/components/pages/profile/VacationsContent.vue')
);
const ProfileSidebar = defineAsyncComponent(
  () => import('~/components/pages/profile/ProfileSidebar.vue')
);
const { showModal } = useModal();

const selectedProject = ref<number | null>(0);
const projectOption = [
  { label: 'Current Projects' },
  { label: 'Archived Projects' },
  { label: 'Completed Projects' },
  { label: 'Closed Projects' },
];

const activeTab = ref(0);

const tabsOption = ref([
  { title: 'Projects' },
  { title: 'Team' },
  { title: 'My vacations' },
]);

const componentsMap = computed(() => {
  return {
    0: ProjectsContent,
    1: TeamContent,
    2: VacationsContent,
  };
});

const currentComponent = computed(() => componentsMap.value[+activeTab.value]);
</script>

<template>
  <div class="mb-7 flex justify-between">
    <h1 class="text-4xl font-bold">{{ $t('My Profile') }}</h1>
    <Button
      color="neutral"
      size="md"
      to="/profile/settings"
      icon-before="settings"
      class="self-baseline px-[10px] py-2.5"
    />
  </div>
  <div class="grid gap-8 lg:[grid-template-columns:265px_1fr]">
    <ProfileSidebar />
    <main class="flex-1">
      <div>
        <div
          class="mb-6 flex flex-col items-center justify-between gap-2 lg:flex-row"
        >
          <div class="block self-baseline lg:hidden">
            <Dropdown
              v-if="currentComponent === ProjectsContent"
              v-model="selectedProject"
              :options="projectOption"
              :placeholder="$t('profile.placeholders.current projects')"
            />
          </div>

          <Tabs v-model="activeTab" :tabs="tabsOption" class="flex-[0_1_43%]" />

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

          <div
            v-if="currentComponent === ProjectsContent"
            class="hidden lg:block"
          >
            <Dropdown
              v-model="selectedProject"
              :options="projectOption"
              label-field="label"
              :placeholder="$t('profile.placeholders.current projects')"
              hide-clear-btn
            />
          </div>
        </div>

        <KeepAlive>
          <component :is="currentComponent" />
        </KeepAlive>
      </div>
    </main>
  </div>
</template>
