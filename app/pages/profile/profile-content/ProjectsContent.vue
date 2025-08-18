<script setup lang="ts">
import ProjectCard from '~/components/common/ProjectCard.vue';

const assignees = [
  { id: 1, name: 'Петро Петрович', avatarUrl: '/images/common/woman.png' },
  { id: 2, name: 'Іван Іванович', avatarUrl: '/images/common/woman.png' },
  { id: 3, name: 'Марія Іванівна', avatarUrl: '/images/common/woman.png' },
  { id: 4, name: 'Олег Олегович', avatarUrl: '/images/common/woman.png' },
  { id: 5, name: 'Сергій Сергійович', avatarUrl: '/images/common/woman.png' },
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
