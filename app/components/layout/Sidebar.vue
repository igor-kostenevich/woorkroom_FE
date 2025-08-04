<template>
  <aside class="flex min-w-[200px] flex-col rounded-3xl bg-white px-4 py-10">
    <Icon name="logo" class="ml-2" :size="50" />
    <nav class="mt-10 flex-1">
      <ul class="space-y-4">
        <li v-for="page in pages" :key="page.name">
          <NuxtLink
            :to="page.path"
            :class="[
              'flex items-center gap-4 rounded-xl px-2 py-2.5 font-semibold transition-colors',
              route.path === page.path
                ? 'bg-primary-opacity text-primary'
                : 'text-gray',
            ]"
          >
            <Icon :name="page.icon" :size="24" />
            {{ $t(page.name) }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="relative mt-20 rounded-3xl bg-primary-opacity px-5 py-6 pt-24">
      <img
        src="/images/common/woman.png"
        class="absolute -top-12 h-32 w-36"
        alt="woman"
      />
      <Button icon-before="support" fullwidth> Support </Button>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

const route = useRoute();

const pages = ref([
  { name: 'Dashboard', path: '/', icon: 'dashboard' },
  { name: 'Projects', path: '/projects', icon: 'projects' },
  { name: 'Calendar', path: '/calendar', icon: 'calendar' },
  { name: 'Vacations', path: '/vacations', icon: 'vacations' },
  { name: 'Employees', path: '/employees', icon: 'employees' },
  { name: 'Messenger', path: '/messenger', icon: 'messenger' },
  { name: 'Info Portal', path: '/info-portal', icon: 'info-portal' },
]);
</script>
