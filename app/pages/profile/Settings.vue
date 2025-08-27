<script setup lang="ts">
const ProfileSideBar = defineAsyncComponent(
  () => import('~/components/common/ProfileSideBar.vue')
);
const Icon = defineAsyncComponent(() => import('~/UIKit/Icon.vue'));
const PageLayout = defineAsyncComponent(
  () => import('~/components/common/PageLayout.vue')
);
const Button = defineAsyncComponent(() => import('~/UIKit/Button.vue'));

const Account = defineAsyncComponent(
  () => import('~/components/pages/profile/settings/Account.vue')
);
const Notifications = defineAsyncComponent(
  () => import('~/components/pages/profile/settings/Notifications.vue')
);
const MyCompany = defineAsyncComponent(
  () => import('~/components/pages/profile/settings/MyCompany.vue')
);
const ConnectedApps = defineAsyncComponent(
  () => import('~/components/pages/profile/settings/ConnectedApps.vue')
);
const Payments = defineAsyncComponent(
  () => import('~/components/pages/profile/settings/Payments.vue')
);
const Confidentiality = defineAsyncComponent(
  () => import('~/components/pages/profile/settings/Confidentiality.vue')
);
const Safety = defineAsyncComponent(
  () => import('~/components/pages/profile/settings/Safety.vue')
);

const settingsPages = [
  { name: 'Account', component: Account, icon: 'account' },
  { name: 'Notifications', component: Notifications, icon: 'notifications' },
  { name: 'My Company', component: MyCompany, icon: 'company' },
  { name: 'Connected Apps', component: ConnectedApps, icon: 'apps' },
  { name: 'Payments', component: Payments, icon: 'card' },
  { name: 'Confidentiality', component: Confidentiality, icon: 'lock' },
  { name: 'Safety', component: Safety, icon: 'safety' },
];

const activePage = ref<(typeof settingsPages)[number]>(settingsPages[0]);
</script>

<template>
  <PageLayout>
    <template #sidebar>
      <ProfileSideBar />
    </template>

    <template #actions>
      <div class="mt-8">
        <Button
          class="!text-xl !font-bold"
          icon-before="arrow-left"
          icon-color="#3F8CFF"
          to="/profile"
          color="accent"
        >
          {{ $t('settings.Settings') }}
        </Button>
      </div>
    </template>

    <template #content>
      <div class="flex gap-8">
        <div
          class="-mt-1 min-h-screen min-w-[265px] rounded-3xl bg-white shadow-base"
        >
          <ul class="space-y-2 py-9 pl-5 pr-2">
            <li v-for="page in settingsPages" :key="page.name">
              <button
                :class="[
                  'flex w-full items-center gap-4 rounded-xl px-2 py-2.5 text-left font-semibold transition-colors',
                  activePage.name === page.name
                    ? 'bg-primary-opacity text-primary'
                    : 'text-gray',
                ]"
                @click="activePage = page"
              >
                <Icon :name="page.icon" :size="24" />
                {{ page.name }}
              </button>
            </li>
          </ul>
        </div>

        <div class="flex-auto rounded-3xl bg-white px-6 py-9 shadow-base">
          <component :is="activePage.component" />
        </div>
      </div>
    </template>
  </PageLayout>
</template>
