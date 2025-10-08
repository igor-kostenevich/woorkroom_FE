<script setup lang="ts">
const UserAvatar = defineAsyncComponent(
  () => import('~/components/common/UserAvatar.vue')
);
const Input = defineAsyncComponent(() => import('~/UIKit/Input.vue'));
const BirthdayPicker = defineAsyncComponent(
  () => import('~/components/common/BirthdayPicker.vue')
);
const PageLayout = defineAsyncComponent(
  () => import('~/components/common/PageLayout.vue')
);
const Button = defineAsyncComponent(() => import('~/UIKit/Button.vue'));

const profile = reactive({
  position: '',
  company: '',
  location: '',
  dateOfBirth: new Date(2005, 6, 3),
  email: '',
  phone: '',
  telegram: '',
});

const rules = computed(() => ({
  position: {
    required: helpers.withMessage(
      $t('validation.required'),
      validators.required
    ),
    minLength: helpers.withMessage(
      $t('validation.min2chars'),
      validators.minLength(2)
    ),
  },
  company: {
    required: helpers.withMessage(
      $t('validation.required'),
      validators.required
    ),
  },
  location: {
    required: helpers.withMessage(
      $t('validation.required'),
      validators.required
    ),
  },
  dateOfBirth: {
    past: helpers.withMessage(
      $t('validation.pastDate'),
      (v: Date) => v instanceof Date && v.getTime() < Date.now()
    ),
  },
  email: {
    required: helpers.withMessage(
      $t('validation.required'),
      validators.required
    ),
    email: helpers.withMessage($t('validation.invalidEmail'), validators.email),
  },
  phone: {
    phone: helpers.withMessage(
      $t('validation.invalidPhone'),
      (v: string) => typeof v === 'string' && /^[+()\d-]{7,20}$/.test(v)
    ),
  },
  telegram: {
    tg: helpers.withMessage(
      $t('validation.invalidUsername'),
      (v: string) => !v || /^@[a-zA-Z0-9_]{5,32}$/.test(v)
    ),
  },
}));

const { validationErrors, validateForm } = useValidation(profile, rules.value);

const isEditing = ref(false);

const toggleEdit = async () => {
  if (!isEditing.value) {
    isEditing.value = true;
    return;
  }

  const isValid = await validateForm();

  if (isValid) {
    isEditing.value = false;
  }
};
</script>

<template>
  <div class="mb-7 flex justify-between">
    <h1 class="text-4xl font-bold">{{ $t('My Profile') }}</h1>
    <Button
      color="neutral"
      size="md"
      to="/profile/profile/settings"
      icon-before="settings"
      class="self-baseline px-[10px] py-2.5"
    />
  </div>
  <PageLayout>
    <template #sidebar-header>
      <div class="mb-4 flex justify-between">
        <UserAvatar
          :progress="60"
          color="primary"
          size="xl"
          full-name="Evan Yates"
        />
        <Button
          color="accent"
          size="md"
          :icon-before="isEditing ? 'checked' : 'edit'"
          class="self-baseline px-[10px] py-2.5"
          @click="toggleEdit"
        />
      </div>

      <h2 class="mb-1.5 text-[22px] font-bold">
        {{ $t('profile.name') }}
      </h2>
      <h3 class="text-sm">{{ $t('profile.position') }}</h3>
    </template>

    <template #sidebar-content>
      <h3 class="text-lg font-bold">{{ $t('profile.Main info') }}</h3>

      <div class="flex flex-col gap-4 pt-3">
        <Input
          v-model="profile.position"
          :placeholder="$t('profile.placeholders.position')"
          :disabled="!isEditing"
        >
          <template #topTextLeft>{{ $t('profile.Position') }} </template>
          <template v-if="validationErrors.position.message" #errorMessage>
            {{ validationErrors.position.message }}
          </template>
        </Input>

        <Input
          v-model="profile.company"
          :placeholder="$t('profile.placeholders.company')"
          :disabled="!isEditing"
        >
          <template #topTextLeft>{{ $t('profile.Company') }} </template>
          <template v-if="validationErrors.company.message" #errorMessage>
            {{ validationErrors.company.message }}
          </template>
        </Input>

        <Input
          v-model="profile.location"
          :placeholder="$t('profile.placeholders.location')"
          icon="location"
          :disabled="!isEditing"
        >
          <template #topTextLeft>{{ $t('profile.Location') }} </template>
          <template v-if="validationErrors.location.message" #errorMessage>
            {{ validationErrors.location.message }}
          </template>
        </Input>

        <BirthdayPicker
          v-model="profile.dateOfBirth"
          :placeholder-date="$t('profile.placeholders.birthday')"
          :disabled="!isEditing"
        >
          <template #birth> {{ $t('profile.Birthday Date') }}</template>
        </BirthdayPicker>

        <div class="pt-6">
          <h4 class="pb-3 text-lg font-bold">
            {{ $t('profile.Contact Info') }}
          </h4>
          <div class="flex flex-col gap-4">
            <Input
              v-model="profile.email"
              :placeholder="$t('profile.placeholders.email')"
              :disabled="!isEditing"
            >
              <template #topTextLeft>{{ $t('profile.Email') }} </template>
              <template v-if="validationErrors.email?.message" #errorMessage>
                {{ validationErrors.email.message }}
              </template>
            </Input>

            <Input
              v-model="profile.phone"
              :placeholder="$t('profile.placeholders.phone')"
              :disabled="!isEditing"
            >
              <template #topTextLeft
                >{{ $t('profile.Mobile Number') }}
              </template>
              <template v-if="validationErrors.phone?.message" #errorMessage>
                {{ validationErrors.phone.message }}
              </template>
            </Input>

            <Input
              v-model="profile.telegram"
              placeholder="@Evan2256"
              :disabled="!isEditing"
            >
              <template #topTextLeft>{{ $t('profile.Telegram') }} </template>
              <template v-if="validationErrors.telegram?.message" #errorMessage>
                {{ validationErrors.telegram.message }}
              </template>
            </Input>
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <NuxtPage />
    </template>
  </PageLayout>
</template>
