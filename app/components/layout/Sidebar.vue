<template>
  <aside
    class="sticky top-[var(--aside-top)] h-[calc(100dvh_-_var(--aside-top)_-_var(--aside-bottom))]"
    style="

    --aside-top: calc(var(--header-h, 0px) + 20px);
     --aside-bottom: 24px"
  >
    <div
      class="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl bg-white px-4 py-10 shadow-base"
    >
      <Icon name="logo" class="ml-2" :size="50" />

      <nav class="mt-10 min-h-0 flex-1 overflow-y-auto">
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

      <div
        class="relative mb-12 mt-20 rounded-3xl bg-primary-opacity px-5 py-6 pt-24"
      >
        <img
          src="/images/common/woman.png"
          class="absolute -top-12 h-32 w-36"
          alt="woman"
        />
        <Button icon-before="support" fullwidth>{{ $t('Support') }}</Button>
      </div>

      <LinkButton
        icon-before="logout"
        color="secondary"
        class="inline-flex gap-4"
      >
        {{ $t('Logout') }}
      </LinkButton>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const LinkButton = defineAsyncComponent(() => import('@/UIKit/LinkButton.vue'));

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
