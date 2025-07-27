<template>
  <svg id="sprite" xmlns="http://www.w3.org/2000/svg" style="display: none">
    <symbol
      v-for="[name, { svg }] in cachedIcons"
      :id="name"
      :key="name"
      v-html="svg"
    />
  </svg>
</template>

<script lang="ts" setup>
import useIcons from '~/composables/useIcons';

const { cachedIcons } = useIcons();
</script>
