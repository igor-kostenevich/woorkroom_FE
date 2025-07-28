<script setup lang="ts">
import { ref } from 'vue';
import Icon from './Icon.vue';

const checked = ref(false);
</script>

<template>
  <label for="check" class="relative flex cursor-pointer items-center">
    <input id="check" v-model="checked" type="checkbox" class="peer sr-only" />
    <div
      class="flex h-6 w-6 items-center justify-center rounded border-2 border-dark-default bg-white transition-colors"
    >
      <Icon
        name="checked"
        class="transition-transform duration-200"
        :class="checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
      />
    </div>
    <div class="ml-4 h-6 w-6 object-cover">
      <slot name="photo" />
    </div>
    <div class="ml-2">
      <slot name="name" />
    </div>
  </label>
</template>
