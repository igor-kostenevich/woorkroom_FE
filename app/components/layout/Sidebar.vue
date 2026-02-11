<template>
  <div>
    <div
      class="fixed inset-0 z-40 bg-primary-overlay transition-opacity duration-200 md:hidden"
      :class="isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'"
      @click="closeSidebar"
    />
    <aside
      class="fixed top-[var(--aside-top)] z-50 h-[calc(100dvh_-_var(--aside-top)_-_var(--aside-bottom))] duration-300 md:static"
      :style="{
        '--aside-top': `calc(var(--header-h, 0px) + 20px)`,
        '--aside-bottom': '24px',
      }"
      :class="isSidebarOpen ? 'translate-x' : 'max-md:-translate-x-[110%]'"
    >
      <div
        class="flex h-full min-h-0 min-w-[216px] flex-col overflow-hidden rounded-3xl bg-white px-4 py-4 shadow-base md:py-10"
      >
        <div class="flex items-center justify-between">
          <Icon name="logo" class="ml-1" :size="sidebarLogoSize" />

          <button class="p-2 md:hidden" type="button" @click="closeSidebar">
            <Icon name="close" :size="22" />
          </button>
        </div>

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
                @click="closeSidebar"
              >
                <Icon :name="page.icon" :size="24" />
                {{ $t(page.name) }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div
          class="relative mb-12 mt-20 rounded-3xl bg-none md:bg-primary-opacity md:px-5 md:py-6 md:pt-24"
        >
          <img
            src="images/common/woman.png"
            class="absolute -top-12 hidden h-32 w-36 md:inline"
            alt="woman"
          />
          <Button icon-before="support" class="md:w-full">{{
            $t('Support')
          }}</Button>
        </div>

        <LinkButton
          icon-before="logout"
          color="secondary"
          class="inline-flex gap-4 !self-start"
        >
          {{ $t('Logout') }}
        </LinkButton>
      </div>
    </aside>
  </div>
</template>

<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';

const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const LinkButton = defineAsyncComponent(() => import('@/UIKit/LinkButton.vue'));

const route = useRoute();
const { isSidebarOpen, closeSidebar } = useApp();

const { width } = useWindowSize();

const sidebarLogoSize = ref(40);

onMounted(() => {
  sidebarLogoSize.value = width.value < 768 ? 40 : 50;
});

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
