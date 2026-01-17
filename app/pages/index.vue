<template>
  <h1 class="text-4xl font-bold text-dark">{{ String('Dashboard') }}</h1>
  <button @click="test">{{ String('dgwrg') }}</button>
  <button @click="refreshAccessToken">
    {{ String('refreshAccessToken') }}
  </button>
</template>
<script setup lang="ts">
import useAuth from '@/composables/useAuth';
const { test, refreshAccessToken } = useAuth();
</script>
