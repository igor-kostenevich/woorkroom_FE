<template>
  <header
    class="flex min-h-[70px] w-full items-center justify-between gap-5 rounded-3xl bg-white p-4 md:min-h-[50px] md:rounded-none md:bg-transparent md:py-0 md:pl-10 md:pr-5"
  >
    <Icon name="logo" :size="40" class="block md:hidden" />

    <div class="hidden w-full max-w-[412px] md:block">
      <Autocomplete
        v-model="selectedValues"
        :search="search"
        :get-label="(u: any) => u.title"
        :get-value="(u: any) => u.id"
        :min-chars="2"
        :debounce="250"
        icon="search"
        :placeholder="$t('Search')"
      />
    </div>

    <div class="flex items-center gap-6">
      <button type="button" class="block md:hidden" @click="toggleMobileSearch">
        <Icon name="search" :size="24" />
      </button>

      <Icon name="notifications" :size="24" class="block md:hidden" />

      <Button
        color="neutral"
        icon-before="notifications"
        class="hidden md:block"
      />

      <Popover class="hidden md:flex md:min-w-[182px]">
        <template #default>
          <div class="flex items-center">
            <UserAvatar :full-name="fullName" size="sm" />
            <span class="ml-2.5 text-nowrap">{{ fullName }}</span>
          </div>
        </template>

        <template #content>
          <ul>
            <li class="flex items-center">
              <LinkButton
                class="w-full text-left"
                to="/profile"
                icon-before="user"
                no-underline
              >
                {{ $t('Profile') }}
              </LinkButton>
            </li>
          </ul>
        </template>
      </Popover>

      <UserAvatar :full-name="fullName" size="sm" class="md:hidden" />

      <Button
        color="neutral"
        icon-before="burger-menu"
        class="!p-0 md:hidden"
        @click="toggleSidebar"
      />
    </div>
  </header>

  <div v-if="isMobileSearchOpen" class="mt-3 pb-3 md:hidden">
    <Autocomplete
      :key="mobileSearchKey"
      v-model="selectedValues"
      :search="search"
      :get-label="(u: any) => u.title"
      :get-value="(u: any) => u.id"
      :min-chars="2"
      :debounce="250"
      icon="search"
      :placeholder="$t('Search')"
      @update:model-value="onSelect"
    />
  </div>

  <div class="md:hidden">
    <div
      class="fixed inset-0 z-40 bg-black/40 transition-opacity duration-200"
      :class="isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'"
      @click="closeSidebar"
    />

    <aside
      class="fixed left-0 top-0 z-50 h-[100dvh] min-w-[270px] max-w-[320px] p-2.5 transition-transform duration-300"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div
        class="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl bg-white px-4 py-8 shadow-base"
      >
        <div class="flex items-center justify-between">
          <Icon name="logo" class="ml-1" :size="44" />

          <button class="p-2" type="button" @click="closeSidebar">
            <Icon name="close" :size="22" />
          </button>
        </div>

        <nav class="mt-8 min-h-0 flex-1 overflow-y-auto">
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

        <div class="mt-8 rounded-3xl bg-primary-opacity px-5 py-6">
          <Button icon-before="support" fullwidth>{{ $t('Support') }}</Button>
        </div>

        <LinkButton
          icon-before="logout"
          color="secondary"
          class="mt-6 inline-flex gap-4"
        >
          {{ $t('Logout') }}
        </LinkButton>
      </div>
    </aside>
  </div>
</template>

<script lang="ts" setup>
const Autocomplete = defineAsyncComponent(
  () => import('@/UIKit/Autocomplete.vue')
);
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const LinkButton = defineAsyncComponent(() => import('@/UIKit/LinkButton.vue'));
const Popover = defineAsyncComponent(() => import('@/UIKit/Popover.vue'));
const UserAvatar = defineAsyncComponent(
  () => import('@/components/common/UserAvatar.vue')
);
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));

const { isMobileSearchOpen, mobileSearchKey, onSelect } = useAutoComplete();

const route = useRoute();

type Item = { id: string | number; title: string };

const selectedValues = ref<Item | null>(null);
const fullName = ref('Evan Yates');

const isSidebarOpen = ref(false);

const toggleMobileSearch = () => {
  isMobileSearchOpen.value = !isMobileSearchOpen.value;
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  if (isSidebarOpen.value) isMobileSearchOpen.value = false;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

watch(isSidebarOpen, (val: string) => {
  document.body.style.overflow = val ? 'hidden' : '';
});

// TODO: test search
const search = async (q: string): Promise<Item[]> => {
  if (!q?.trim()) return [];
  return [{ id: 1, title: `Result for "${q}"` }];
};

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
