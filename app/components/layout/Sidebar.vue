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
        class="flex h-full min-h-0 min-w-[216px] flex-col overflow-hidden rounded-3xl bg-white pb-4 pt-4 shadow-base md:pt-10"
      >
        <div class="flex items-center justify-between px-4">
          <Icon name="logo" class="ml-2 text-primary" :size="logoSize" />

          <button class="md:hidden" type="button" @click="closeSidebar">
            <Icon name="close" :size="24" />
          </button>
        </div>

        <div class="mt-10 flex h-full flex-col overflow-y-auto px-4">
          <nav class="min-h-max flex-1">
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
            class="relative mt-20 flex min-h-[168px] flex-col justify-end rounded-3xl bg-primary-opacity px-5 pb-6"
          >
            <img
              src="images/common/woman.png"
              class="absolute -top-12 h-32 w-36"
              alt="woman"
            />
            <Button icon-before="support" class="md:w-full">{{
              $t('Support')
            }}</Button>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script lang="ts" setup>
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));

const route = useRoute();
const { isSidebarOpen, closeSidebar, isMobile } = useApp();

const pages = ref([
  { name: 'Dashboard', path: '/', icon: 'dashboard' },
  { name: 'Projects', path: '/projects', icon: 'projects' },
  { name: 'Calendar', path: '/calendar', icon: 'calendar' },
  { name: 'Vacations', path: '/vacations', icon: 'vacations' },
  { name: 'Employees', path: '/employees', icon: 'employees' },
  { name: 'Messenger', path: '/messenger', icon: 'messenger' },
  { name: 'Info Portal', path: '/info-portal', icon: 'info-portal' },
]);

const logoSize = computed(() => {
  return isMobile.value ? 40 : 50;
});
</script>
