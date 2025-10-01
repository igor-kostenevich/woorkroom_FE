<template>
  <h1 class="text-4xl font-bold text-dark">{{ String('Employees') }}</h1>

  <EntityCardTable
    :first-column-width="360"
    :cards-data="testCardData"
    :show-action-button="true"
  />
</template>
<script setup lang="ts">
const Text = defineAsyncComponent(
  () => import('~/components/common/additional/Text.vue')
);
const Position = defineAsyncComponent(
  () => import('~/components/common/additional/Position.vue')
);
const UserInfo = defineAsyncComponent(
  () => import('~/components/common/additional/UserInfo.vue')
);
const EntityCardTable = defineAsyncComponent(
  () => import('~/components/projects/EntityCardTable.vue')
);
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
</script>
