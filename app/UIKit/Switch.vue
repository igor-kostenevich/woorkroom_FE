<template>
  <label for="check" class="relative inline-block h-8 w-14 cursor-pointer">
    <input id="check" type="checkbox" class="peer sr-only" />
    <div
      class="absolute inset-0 rounded-full bg-gray-opacity transition peer-checked:bg-primary"
    />
    <span
      class="absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-all duration-300 peer-checked:left-7"
    />
  </label>
</template>

<script setup lang="ts"></script>
