<template>
  <div>
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
        <button
          type="button"
          class="block md:hidden"
          @click="toggleMobileSearch"
        >
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
  </div>
</template>

<script lang="ts" setup>
import { useScrollLock } from '@vueuse/core';
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
const { isMobileSearchOpen, isSidebarOpen, toggleSidebar, toggleMobileSearch } =
  useApp();

type Item = { id: string | number; title: string };

const selectedValues = ref<Item | null>(null);
const fullName = ref('Evan Yates');

const mobileSearchKey = ref(0);

const onSelect = <T,>(val: T | null) => {
  if (!val) return;
  isMobileSearchOpen.value = false;
  mobileSearchKey.value += 1;
};

const isScrollLocked = ref();
onMounted(() => {
  isScrollLocked.value = useScrollLock(document.body);
});

watchEffect(() => {
  if (!isScrollLocked.value) return;
  isScrollLocked.value.value = isSidebarOpen.value;
});

// TODO: test search
const search = async (q: string): Promise<Item[]> => {
  if (!q?.trim()) return [];
  return [{ id: 1, title: `Result for "${q}"` }];
};
</script>
