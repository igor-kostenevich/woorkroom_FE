<script setup lang="ts">
const PageLayout = defineAsyncComponent(
  () => import('~/components/common/PageLayout.vue')
);
const Segment = defineAsyncComponent(() => import('~/UIKit/Segment.vue'));
const Input = defineAsyncComponent(() => import('~/UIKit/Input.vue'));
const UserAvatar = defineAsyncComponent(
  () => import('~/components/common/UserAvatar.vue')
);
const Button = defineAsyncComponent(() => import('~/UIKit/Button.vue'));
const BirthdayPicker = defineAsyncComponent(
  () => import('~/components/common/BirthdayPicker.vue')
);

const ProjectsContent = defineAsyncComponent(
  () => import('~/pages/profile/profile-content/ProjectsContent.vue')
);
const TeamContent = defineAsyncComponent(
  () => import('~/pages/profile/profile-content/TeamContent.vue')
);
const VacationsContent = defineAsyncComponent(
  () => import('~/pages/profile/profile-content/VacationsContent.vue')
);
const segmentsOptions = reactive([
  {
    id: 0,
    label: 'Projects',
    comp: 'ProjectsContent',
  },
  {
    id: 1,
    label: 'Team',
    comp: 'TeamContent',
  },
  {
    id: 2,
    label: 'My vacations',
    comp: 'VacationsContent',
  },
]);

const selectedSegment = ref(0);
const componentsMap = {
  ProjectsContent,
  TeamContent,
  VacationsContent,
} as const;

const currentComponent = computed(
  () =>
    componentsMap[
      segmentsOptions[selectedSegment.value]!.comp as keyof typeof componentsMap
    ]
);

const inputPositon = ref('');
const inputCompany = ref('');
const inputLocation = ref('');
const inputDateOfBirth = ref(new Date(2005, 6, 3));
const inputEmail = ref('');
const inputPhone = ref('');
const inputTelegram = ref('');
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
              class="self-baseline"
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
            <Input v-model="inputPositon" placeholder="UI/UX Designer">
              <template #topTextLeft>{{ String('Position') }}</template>
            </Input>
            <Input v-model="inputCompany" placeholder="Cadabra">
              <template #topTextLeft>{{ String('Company') }}</template>
            </Input>

            <Input
              v-model="inputLocation"
              placeholder="NYC, New York, USA"
              icon="location"
            >
              <template #topTextLeft>{{ String('Location') }}</template>
            </Input>

            <BirthdayPicker
              v-model="inputDateOfBirth"
              placeholder-date="May 19, 1996"
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
              <Input v-model="inputEmail" placeholder="evanyates@gmail.com">
                <template #topTextLeft>{{ String('Email') }}</template>
              </Input>

              <Input v-model="inputPhone" placeholder="+1 675 346 23-10">
                <template #topTextLeft>{{ String('Mobile Number') }}</template>
              </Input>
              <Input v-model="inputTelegram" placeholder="Evan 2256">
                <template #topTextLeft>{{ String('Telegram') }}</template>
              </Input>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #actions>
      <div class="flex flex-col items-center justify-between gap-2 lg:flex-row">
        <Segment
          v-model="selectedSegment"
          class="max-w-md"
          :options="segmentsOptions"
        />

        <Button
          v-if="currentComponent === VacationsContent"
          color="primary"
          size="md"
          icon-before="plus"
        >
          {{ $t('profile.Add Request') }}
        </Button>
      </div>
    </template>

    <template #content>
      <component :is="currentComponent" />
    </template>
  </PageLayout>
</template>
