<script setup lang="ts">
const Icon = defineAsyncComponent(() => import('~/UIKit/Icon.vue'));
const Button = defineAsyncComponent(() => import('~/UIKit/Button.vue'));
const Accordion = defineAsyncComponent(() => import('~/UIKit/Accordion.vue'));

const Account = markRaw(
  defineAsyncComponent(
    () => import('~/components/pages/profile/settings/Account.vue')
  )
);
const Notifications = markRaw(
  defineAsyncComponent(
    () => import('~/components/pages/profile/settings/Notifications.vue')
  )
);
const MyCompany = markRaw(
  defineAsyncComponent(
    () => import('~/components/pages/profile/settings/MyCompany.vue')
  )
);
const ConnectedApps = markRaw(
  defineAsyncComponent(
    () => import('~/components/pages/profile/settings/ConnectedApps.vue')
  )
);
const Payments = markRaw(
  defineAsyncComponent(
    () => import('~/components/pages/profile/settings/Payments.vue')
  )
);
const Confidentiality = markRaw(
  defineAsyncComponent(
    () => import('~/components/pages/profile/settings/Confidentiality.vue')
  )
);
const Safety = markRaw(
  defineAsyncComponent(
    () => import('~/components/pages/profile/settings/Safety.vue')
  )
);
const ProfileSidebar = defineAsyncComponent(
  () => import('~/components/pages/profile/ProfileSidebar.vue')
);

type SettingsPage = {
  name: string;
  component: Component;
  icon: string;
};

const settingsPages: SettingsPage[] = [
  { name: $t('settings.Account'), component: Account, icon: 'account' },
  {
    name: $t('settings.Notifications'),
    component: Notifications,
    icon: 'notifications',
  },
  { name: $t('settings.MyCompany'), component: MyCompany, icon: 'company' },
  {
    name: $t('settings.ConnectedApps'),
    component: ConnectedApps,
    icon: 'apps',
  },
  { name: $t('settings.Payments'), component: Payments, icon: 'card' },
  {
    name: $t('settings.Confidentiality'),
    component: Confidentiality,
    icon: 'lock',
  },
  { name: $t('settings.Safety'), component: Safety, icon: 'safety' },
];

const activePage = ref<(typeof settingsPages)[number]>(settingsPages[0]!);

type AccordionItem = {
  title: string;
  icon?: string;
  info: Component;
};

const settingsItems: AccordionItem[] = [
  { title: 'Account', icon: 'account', info: Account },
  { title: 'Notifications', icon: 'notifications', info: Notifications },
  { title: 'My Company', icon: 'company', info: MyCompany },
  { title: 'Connected Apps', icon: 'apps', info: ConnectedApps },
  { title: 'Payments', icon: 'card', info: Payments },
  { title: 'Confidentiality', icon: 'lock', info: Confidentiality },
  { title: 'Safety', icon: 'safety', info: Safety },
];
</script>

<template>
  <div class="mb-7 flex justify-between">
    <h1 class="text-4xl font-bold">{{ $t('My Profile') }}</h1>
    <Button
      color="neutral"
      size="md"
      to="/profile/settings"
      icon-before="settings"
      class="self-baseline px-[10px] py-2.5"
    />
  </div>
  <div class="grid gap-8 lg:[grid-template-columns:265px_1fr]">
    <ProfileSidebar />
    <main class="flex-1">
      <div>
        <div>
          <div class="mb-4 mt-6">
            <Button
              class="!text-xl !font-bold"
              to="/profile"
              icon-before="arrow-left"
              icon-color="#3F8CFF"
              color="accent"
            >
              {{ $t('settings.Settings') }}
            </Button>
          </div>

          <div class="hidden gap-8 lg:flex">
            <div
              class="-mt-1 min-h-screen min-w-[265px] rounded-3xl bg-white shadow-base"
            >
              <ul class="space-y-4 py-9 pl-5 pr-2">
                <li v-for="page in settingsPages" :key="page.name" class="pr-2">
                  <button
                    :class="[
                      'relative flex w-full items-center gap-4 rounded-xl px-2 py-3.5 text-left font-semibold transition-colors',
                      activePage.name === page.name ? 'bg-light' : 'text-gray',
                    ]"
                    @click="activePage = page"
                  >
                    <Icon
                      :name="page.icon"
                      :size="24"
                      :class="
                        activePage.name === page.name ? 'text-primary' : ''
                      "
                    />
                    {{ page.name }}

                    <span
                      v-if="activePage.name === page.name"
                      class="absolute -right-[16px] top-0 h-full w-[4px] rounded-full bg-primary"
                    />
                  </button>
                </li>
              </ul>
            </div>

            <div class="flex-auto rounded-3xl bg-white px-6 py-9 shadow-base">
              <component :is="activePage.component" />
            </div>
          </div>

          <div class="lg:hidden">
            <Accordion :items="settingsItems" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
