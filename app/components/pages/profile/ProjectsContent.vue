<script setup lang="ts">
const ProjectCard = defineAsyncComponent(
  () => import('~/components/common/ProjectCard.vue')
);

const assignees = [
  { id: 1, name: 'Петро Петрович', userImage: '/images/common/woman.png' },
  { id: 2, name: 'Іван Іванович', userImage: '/images/common/woman.png' },
  { id: 3, name: 'Марія Іванівна', userImage: '/images/common/woman.png' },
  { id: 4, name: 'Олег Олегович', userImage: '/images/common/woman.png' },
  { id: 5, name: 'Сергій Сергійович', userImage: '/images/common/woman.png' },
];
</script>

<template>
  <div class="flex flex-col gap-5">
    <ProjectCard
      id="PN0001265"
      title="Medical App (iOS native)"
      created-at="Created Sep 12, 2020"
      priority="Low"
      :all-tasks="34"
      :active-tasks="13"
      :assignees="assignees"
      image-url="/images/common/woman.png"
    />

    <ProjectCard
      id="PN0001265"
      title="Medical App (iOS native)"
      created-at="Created Sep 12, 2020"
      priority="Low"
      :all-tasks="34"
      :active-tasks="13"
      :assignees="assignees"
      image-url="/images/common/woman.png"
    />

    <ProjectCard
      id="PN0001265"
      title="Medical App (iOS native)"
      created-at="Created Sep 12, 2020"
      priority="Medium"
      :all-tasks="34"
      :active-tasks="13"
      :assignees="assignees"
      image-url="/images/common/woman.png"
    />
  </div>
</template>
