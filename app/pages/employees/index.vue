<script setup lang="ts">
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const Table = defineAsyncComponent(
  () => import('~/components/pages/projects/Table.vue')
);
const EmployeesCard = defineAsyncComponent(
  () => import('~/components/pages/projects/EmployeeCard.vue')
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
const Tabs = defineAsyncComponent(() => import('@/UIKit/Tabs.vue'));

const { t } = useI18n();

const employeeTableColumns = [
  { key: 'user', component: UserInfo },
  { key: 'gender', component: Text },
  { key: 'birthday', component: Text },
  { key: 'age', component: Text },
  { key: 'position', component: Position },
];

const employeeTableRows = [
  {
    user: {
      userImage: '/images/common/woman.png',
      fullName: 'Oscar Holloway',
      userEmail: 'evanyates@gmail.com',
    },
    gender: { label: t('additional.gender'), text: 'Male' },
    birthday: { label: t('additional.birthday'), text: 'Apr 12, 1995' },
    age: { label: t('additional.age'), text: '25' },
    position: { positionName: 'UI/UX Designer', positionLevel: 2 },
  },
  {
    user: {
      userImage: '/images/common/woman.png',
      fullName: 'Oscar Holl owayqwdqw dqwdqwdqwd qwdqwdqwdq',
      userEmail: 'evanyates@gm.com',
    },
    gender: { label: t('additional.gender'), text: 'Maqwdqw dqwdqwdle' },
    birthday: {
      label: t('additional.birthday'),
      text: 'Apr 1 qwdqcqw qwdq2, 1995',
    },
    age: { label: t('additional.age'), text: ' qwqwdqwdqd 25' },
    position: {
      positionName: 'UI/UX Desiqee mqefqef  qefq qef fqefqefqe fqgner',
      positionLevel: 1,
    },
  },
  {
    user: {
      userImage: '/images/common/woman.png',
      fullName: 'Oscar Ho wefwef lloway',
      userEmail: 'evany ates@ wefwefw gmail.com',
    },
    gender: { label: t('additional.gender'), text: 'Ma qwdqd le' },
    birthday: {
      label: t('additional.birthday'),
      text: 'Apr 12qwd dqwdqwd , 1995',
    },
    age: { label: t('additional.age'), text: '25 qwdqwd edq ' },
    position: { positionName: 'UI/UXq qwd  Designer', positionLevel: 2 },
  },
  {
    user: {
      userImage: '/images/common/woman.png',
      fullName: ' wefwef lloway',
      userEmail: 'evanyaail.com',
    },
    gender: { label: t('additional.gender'), text: 'Male ' },
    birthday: { label: t('additional.birthday'), text: 'Apr 1 1995' },
    age: { label: t('additional.age'), text: '25 q ' },
    position: { positionName: 'UDesigner', positionLevel: 3 },
  },
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

const employeesCount = computed(() => employeeTableRows.length);

const activeTab = ref(0);
const tabOptions = ref([{ title: 'List' }, { title: 'Activity' }]);

const { showModal } = useModal();
</script>

<template>
  <div
    class="mb-7 flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
  >
    <h1 class="text-4xl font-bold text-dark">
      {{ $t('Employees count', { count: employeesCount }) }}
    </h1>
    <Tabs v-model="activeTab" :tabs="tabOptions" class="w-full max-w-[310px]" />
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
    <Table
      v-if="activeTab === 0"
      :columns="employeeTableColumns"
      :rows="employeeTableRows"
      :first-column-width="360"
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
