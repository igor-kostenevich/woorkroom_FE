<script setup lang="ts">
import Icon from '~/UIKit/Icon.vue';

const PageLayout = defineAsyncComponent(
  () => import('~/components/common/PageLayout.vue')
);
const Input = defineAsyncComponent(() => import('~/UIKit/Input.vue'));
const UserAvatar = defineAsyncComponent(
  () => import('~/components/common/UserAvatar.vue')
);
const Button = defineAsyncComponent(() => import('~/UIKit/Button.vue'));
const BirthdayPicker = defineAsyncComponent(
  () => import('~/components/common/BirthdayPicker.vue')
);

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

const inputPositon = ref('');
const inputCompany = ref('');
const inputLocation = ref('');
const inputDateOfBirth = ref(new Date(2005, 6, 3));
const inputEmail = ref('');
const inputPhone = ref('');
const inputTelegram = ref('');

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
      <div>
        <div class="relative">
          <div class="mb-4 flex justify-between">
            <UserAvatar
              class="block bg-primary stroke-primary"
              :progress="60"
              size="xl"
              full-name="Evan Yates"
            />

            <Button
              color="neutral"
              size="md"
              icon-before="edit"
              class="self-baseline px-[10px] py-2.5"
            />
          </div>

          <h2 class="mb-1.5 text-[22px] font-bold">
            {{ $t('profile.name') }}
          </h2>
          <h3 class="text-sm">{{ $t('profile.position') }}</h3>

          <div class="pt-7">
            <span
              class="absolute bottom-0 left-[-18px] right-[-24px] h-[1px] bg-gray-muted"
            />
          </div>
        </div>

        <div class="pt-7">
          <h3 class="text-lg font-bold">{{ $t('profile.Main info') }}</h3>

          <div class="flex flex-col gap-4 pt-3">
            <Input v-model="inputPositon" placeholder="UI/UX Designer" readonly>
              <template #topTextLeft>{{ String('Position') }}</template>
            </Input>

            <Input v-model="inputCompany" placeholder="Cadabra" readonly>
              <template #topTextLeft>{{ String('Company') }}</template>
            </Input>

            <Input
              v-model="inputLocation"
              placeholder="NYC, New York, USA"
              icon="location"
              readonly
            >
              <template #topTextLeft>{{ String('Location') }}</template>
            </Input>

            <BirthdayPicker
              v-model="inputDateOfBirth"
              placeholder-date="May 19, 1996"
              readonly
            >
              <template #birth>
                {{ $t('Birthday Date') }}
              </template>
            </BirthdayPicker>
          </div>

          <div class="pt-6">
            <h4 class="pb-3 text-lg font-bold">
              {{ $t('profile.Contact Info') }}
            </h4>
            <div class="flex flex-col gap-4">
              <Input
                v-model="inputEmail"
                placeholder="evanyates@gmail.com"
                readonly
              >
                <template #topTextLeft>{{ String('Email') }}</template>
              </Input>

              <Input
                v-model="inputPhone"
                placeholder="+1 675 346 23-10"
                readonly
              >
                <template #topTextLeft>{{ String('Mobile Number') }}</template>
              </Input>

              <Input v-model="inputTelegram" placeholder="Evan 2256" readonly>
                <template #topTextLeft>{{ String('Telegram') }}</template>
              </Input>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #actions>
      <div class="mt-8">
        <NuxtLink to="/profile">
          <Button
            class="!text-xl !font-bold"
            icon-before="arrow-left"
            icon-color="#3F8CFF"
            color="accent"
          >
            {{ $t('settings.Settings') }}
          </Button>
        </NuxtLink>
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
