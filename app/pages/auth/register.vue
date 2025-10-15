<script setup lang="ts">
const Icon = defineAsyncComponent(() => import('~/UIKit/Icon.vue'));

definePageMeta({ layout: 'auth' });

type Step = { key: string; label: string; state: 'current' | 'idle' };

const steps: Step[] = [
  { key: 'phone', label: 'Valid your phone', state: 'current' },
  { key: 'about-you', label: 'Tell about yourself', state: 'idle' },
  { key: 'company', label: 'Tell about your company', state: 'idle' },
  { key: 'invite', label: 'Invite Team Members', state: 'idle' },
];
</script>

<template>
  <aside
    class="inline-flex h-full min-h-[calc(100vh-40px)] rounded-3xl bg-primary"
  >
    <div class="px-10 pt-[60px]">
      <Icon name="white-logo" :size="50" class="mb-[60px]" />
      <div class="mb-12 text-4xl font-bold text-white">
        {{ $t('Get started') }}
      </div>

      <ul class="space-y-9">
        <li
          v-for="(s, i) in steps"
          :key="s.key"
          class="relative flex items-center gap-6"
        >
          <div class="relative flex flex-col items-center">
            <span
              :class="[
                'box-border inline-block h-6 w-6 rounded-full border-2',
                s.state === 'current'
                  ? 'border-white bg-white/30'
                  : 'border-white/60',
              ]"
            />

            <span
              v-if="i < steps.length - 1"
              :class="[
                'absolute left-1/2 top-7 h-[26px] w-[2px] -translate-x-1/2',
                s.state === 'current' ? 'bg-white' : 'bg-white/50',
              ]"
            />
          </div>

          <p
            :class="[
              'text-lg font-semibold text-white',
              s.state === 'current' ? '' : 'opacity-50',
            ]"
          >
            {{ $t(s.label) }}
          </p>
        </li>
      </ul>
    </div>
  </aside>
</template>
