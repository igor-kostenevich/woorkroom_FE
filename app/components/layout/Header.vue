<template>
  <div>
    <header
      class="flex min-h-[70px] w-full items-center justify-between gap-5 rounded-3xl bg-white p-4 md:min-h-[50px] md:rounded-none md:bg-transparent md:py-0 md:pl-10 md:pr-5"
    >
      <Icon name="logo" :size="40" class="block text-primary md:hidden" />

      <div class="w-full max-w-[412px]">
        <!-- TODO: EGOR - make this component mobile friendly -->
        <!-- Компонент не має зміщувати контент сторінки при відкритті -->
        <!-- Можеш зробит окремий компонент для хедера, в папці components/layout який буде юзати цей автокомпліт -->
        <Autocomplete
          v-model="selectedValues"
          :search="search"
          :get-label="getItemLabel"
          :get-value="getItemValue"
          :min-chars="2"
          :debounce="250"
          icon="search"
          :placeholder="$t('Search')"
        />
      </div>

      <div class="flex items-center gap-4 md:gap-6">
        <!-- TODO: EGOR - remove after refactoring -->
        <!-- <button
          type="button"
          class="block md:hidden"
          @click="toggleMobileSearch"
        >
          <Icon name="search" :size="24" />
        </button> -->

        <Button
          color="neutral"
          :size="isMobile ? 'sm' : 'md'"
          icon-before="notifications"
        />

        <!-- TODO: EGOR - make this component mobile friendly (as in design) -->
        <Popover class="md:min-w-[182px]">
          <template #default>
            <div class="flex items-center">
              <UserAvatar :full-name="fullName" size="sm" />
              <span class="ml-2.5 text-nowrap">{{ fullName }}</span>
            </div>
          </template>

          <template #content>
            <ul>
              <li class="flex flex-col gap-4">
                <LinkButton
                  class="w-full text-left"
                  to="/profile"
                  icon-before="user"
                  no-underline
                >
                  {{ $t('Profile') }}
                </LinkButton>

                <LinkButton
                  class="w-full text-left"
                  icon-before="logout"
                  color="red"
                  no-underline
                  @click="logout()"
                >
                  {{ $t('Logout') }}
                </LinkButton>
              </li>
            </ul>
          </template>
        </Popover>

        <Button
          color="neutral"
          size="sm"
          icon-before="burger-menu"
          class="md:hidden"
          @click="toggleSidebar"
        />
      </div>
    </header>
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
const { isSidebarOpen, toggleSidebar, isMobile } = useApp();

type AutocompleteItem = {
  id: string | number;
  title: string;
};

type ScrollLockRef = ReturnType<typeof useScrollLock>;

const { logout } = useAuth();

const selectedValues = ref<AutocompleteItem | null>(null);
const fullName = ref('Evan Yates');

const getItemLabel = (item: AutocompleteItem): string => item.title;
const getItemValue = (item: AutocompleteItem): AutocompleteItem['id'] =>
  item.id;

const scrollLock = shallowRef<ScrollLockRef>();

onMounted(() => {
  scrollLock.value = useScrollLock(document.body);
});

watch(
  isSidebarOpen,
  (isOpen: boolean) => {
    if (!scrollLock.value) return;
    scrollLock.value.value = isOpen;
  },
  { immediate: true }
);

// TODO: test search
const search = async (query: string): Promise<AutocompleteItem[]> => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  return [{ id: 1, title: `Result for "${trimmedQuery}"` }];
};
</script>
