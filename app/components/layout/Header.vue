<template>
  <header
    class="flex min-h-[70px] w-full items-center justify-between gap-5 rounded-3xl bg-white p-4 md:min-h-[50px] md:rounded-none md:bg-transparent md:py-0 md:pl-10 md:pr-5"
  >
    <div class="w-full max-w-[412px]">
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
      <Button
        color="neutral"
        icon-before="burger-menu"
        class="!p-0 md:hidden"
      />
      <Button color="neutral" icon-before="notifications" />
      <Popover class="hidden min-w-[182px] md:flex">
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
                >{{ $t('Profile') }}
              </LinkButton>
            </li>
          </ul>
        </template>
      </Popover>
      <UserAvatar :full-name="fullName" size="sm" class="md:hidden" />
    </div>
  </header>
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

type Item = { id: string | number; title: string }; // TESTING TYPE

const selectedValues = ref<Item | null>(null);
const fullName = ref('Evan Yates');

// TODO: test search
const search = async (q: string): Promise<Item[]> => {
  if (!q?.trim()) return [];
  return [{ id: 1, title: `Result for "${q}"` }];
};
</script>
