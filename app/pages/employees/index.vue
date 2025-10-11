<script setup lang="ts">
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const EntityCardTable = defineAsyncComponent(
  () => import('~/components/projects/EntityCardTable.vue')
);
const EmployeesCard = defineAsyncComponent(
  () => import('~/components/projects/EmployeeCard.vue')
);

const Text = defineAsyncComponent(
  () => import('~/components/common/additional/Text.vue')
);
const Position = defineAsyncComponent(
  () => import('~/components/common/additional/Position.vue')
);
const UserInfo = defineAsyncComponent(
  () => import('~/components/common/additional/UserInfo.vue')
);

const Segment = defineAsyncComponent(() => import('@/UIKit/Segment.vue'));

const testCardData = [
  [
    {
      componentName: UserInfo,
      data: {
        userImage: '/images/common/woman.png',
        fullName: 'Oscar Holloway',
        userEmail: 'evanyates@gmail.com',
      },
    },
    {
      componentName: Text,
      data: {
        label: 'additional.gender',
        text: 'Male',
      },
    },
    {
      componentName: Text,
      data: {
        label: 'additional.birthday',
        text: 'Apr 12, 1995',
      },
    },
    {
      componentName: Text,
      data: {
        label: 'additional.age',
        text: '25',
      },
    },
    {
      componentName: Position,
      data: {
        positionName: 'UI/UX Designer',
        positionLevel: 2,
      },
    },
  ],
  [
    {
      componentName: UserInfo,
      data: {
        userImage: '/images/common/woman.png',
        fullName: 'Oscar Holl owayqwdqw dqwdqwdqwd qwdqwdqwdq',
        userEmail: 'evanyates@gm.com',
      },
    },
    {
      componentName: Text,
      data: {
        label: 'additional.gender',
        text: 'Maqwdqw dqwdqwdle',
      },
    },
    {
      componentName: Text,
      data: {
        label: 'additional.birthday',
        text: 'Apr 1 qwdqcqw qwdq2, 1995',
      },
    },
    {
      componentName: Text,
      data: {
        label: 'additional.age',
        text: ' qwqwdqwdqd 25',
      },
    },
    {
      componentName: Position,
      data: {
        positionName: 'UI/UX Desiqee mqefqef  qefq qef fqefqefqe fqgner',
        positionLevel: 1,
      },
    },
  ],
  [
    {
      componentName: UserInfo,
      data: {
        userImage: '/images/common/woman.png',
        fullName: 'Oscar Ho wefwef lloway',
        userEmail: 'evany ates@ wefwefw gmail.com',
      },
    },
    {
      componentName: Text,
      data: {
        label: 'additional.gender',
        text: 'Ma qwdqd le',
      },
    },
    {
      componentName: Text,
      data: {
        label: 'additional.birthday',
        text: 'Apr 12qwd dqwdqwd , 1995',
      },
    },
    {
      componentName: Text,
      data: {
        label: 'additional.age',
        text: '25 qwdqwd edq ',
      },
    },
    {
      componentName: Position,
      data: {
        positionName: 'UI/UXq qwd  Designer',
        positionLevel: 2,
      },
    },
  ],
  [
    {
      componentName: UserInfo,
      data: {
        userImage: '/images/common/woman.png',
        fullName: ' wefwef lloway',
        userEmail: 'evanyaail.com',
      },
    },
    {
      componentName: Text,
      data: {
        label: 'additional.gender',
        text: 'Male ',
      },
    },
    {
      componentName: Text,
      data: {
        label: 'additional.birthday',
        text: 'Apr 1 1995',
      },
    },
    {
      componentName: Text,
      data: {
        label: 'additional.age',
        text: '25 q ',
      },
    },
    {
      componentName: Position,
      data: {
        positionName: 'UDesigner',
        positionLevel: 3,
      },
    },
  ],
];
const employeesCardData = [
  {
    isBusy: false,
    progress: 70,
    userImage: '/images/common/woman.png',
    fullName: 'Shawn Stone',
    positionName: 'UI/UX Designer',
    positionLevel: 2,
    backlogTasksCount: 0,
    tasksInProgressCount: 16,
    tasksInReviewCount: 6,
  },
  {
    isBusy: false,
    progress: 85,
    userImage: '/images/common/woman.png',
    fullName: 'Randy Delgado',
    positionName: 'UI/UX Designer',
    positionLevel: 1,
    backlogTasksCount: 1,
    tasksInProgressCount: 20,
    tasksInReviewCount: 2,
  },
  {
    isBusy: false,
    progress: 90,
    userImage: '/images/common/woman.png',
    fullName: 'Emily Tyler',
    positionName: 'Copywriter',
    positionLevel: 2,
    backlogTasksCount: 0,
    tasksInProgressCount: 20,
    tasksInReviewCount: 2,
  },
  {
    isBusy: false,
    progress: 80,
    userImage: '/images/common/woman.png',
    fullName: 'Louis Castro',
    positionName: 'Copywriter',
    positionLevel: 3,
    backlogTasksCount: 1,
    tasksInProgressCount: 20,
    tasksInReviewCount: 2,
  },
  {
    isBusy: false,
    progress: 60,
    userImage: '/images/common/woman.png',
    fullName: 'Millie Harvey',
    positionName: 'Android Developer',
    positionLevel: 1,
    backlogTasksCount: 1,
    tasksInProgressCount: 14,
    tasksInReviewCount: 3,
  },
  {
    isBusy: true,
    progress: 40,
    userImage: '/images/common/woman.png',
    fullName: 'Ethel Weber',
    positionName: 'Copywriter',
    positionLevel: 1,
    backlogTasksCount: 0,
    tasksInProgressCount: 8,
    tasksInReviewCount: 6,
  },
  {
    isBusy: false,
    progress: 95,
    userImage: '/images/common/woman.png',
    fullName: 'Charlie Palmer',
    positionName: 'Copywriter',
    positionLevel: 3,
    backlogTasksCount: 1,
    tasksInProgressCount: 20,
    tasksInReviewCount: 2,
  },
  {
    isBusy: true,
    progress: 30,
    userImage: '/images/common/woman.png',
    fullName: 'Pearl Sims',
    positionName: 'Project Manager',
    positionLevel: 2,
    backlogTasksCount: 0,
    tasksInProgressCount: 4,
    tasksInReviewCount: 6,
  },
];

const employeesNum = computed(() => testCardData.length);

const selectedSegment = ref(0);
const segmentsOptions = ref([
  {
    id: 0,
    label: 'List',
  },
  {
    id: 1,
    label: 'Activity',
  },
]);

const { showModal } = useModal();
</script>

<template>
  <div
    class="mb-4 flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
  >
    <h1 class="text-4xl font-bold text-dark">
      {{ $t('Employees', { count: employeesNum }) }}
    </h1>
    <Segment
      v-model="selectedSegment"
      class="min-w-52 flex-1 md:max-w-80"
      :options="segmentsOptions"
      query-key="tabList"
    />
    <div class="flex gap-6">
      <Button
        color="neutral"
        size="md"
        icon-before="filter"
        class="hidden md:flex"
      />
      <Button
        color="primary"
        size="md"
        icon-before="plus"
        class="hidden xl:flex"
        @click="
          showModal({
            name: 'AddEmployees',
            data: { tab: 0 },
          })
        "
      >
        {{ $t('addEmployee') }}
      </Button>
      <Button
        size="md"
        icon-before="plus"
        class="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full xl:hidden"
      />
    </div>
  </div>
  <div>
    <EntityCardTable
      v-if="selectedSegment === 0"
      :first-column-width="360"
      :cards-data="testCardData"
      :show-action-button="true"
    />
    <div
      v-else
      class="grid grid-cols-[repeat(auto-fit,minmax(265px,1fr))] gap-7"
    >
      <EmployeesCard
        v-for="(element, index) in employeesCardData"
        :key="index"
        :data="element"
      />
    </div>
  </div>
</template>
