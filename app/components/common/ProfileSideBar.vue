<script setup lang="ts">
const Input = defineAsyncComponent(() => import('~/UIKit/Input.vue'));
const UserAvatar = defineAsyncComponent(
  () => import('~/components/common/UserAvatar.vue')
);
const Button = defineAsyncComponent(() => import('~/UIKit/Button.vue'));
const BirthdayPicker = defineAsyncComponent(
  () => import('~/components/common/BirthdayPicker.vue')
);

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
    required: helpers.withMessage('Required', validators.required),
    minLength: helpers.withMessage('≥ 2 chars', validators.minLength(2)),
  },
  company: {
    required: helpers.withMessage('Required', validators.required),
  },
  location: {
    required: helpers.withMessage('Required', validators.required),
  },
  dateOfBirth: {
    past: helpers.withMessage(
      'Date must be in the past',
      (v: Date) => v instanceof Date && v.getTime() < Date.now()
    ),
  },
  email: {
    required: helpers.withMessage('Requred', validators.required),
    email: helpers.withMessage('Invalid email', validators.email),
  },
  phone: {
    phone: helpers.withMessage(
      'Invalid phone',
      (v: string) => typeof v === 'string' && /^[+()\d-]{7,20}$/.test(v)
    ),
  },
  telegram: {
    tg: helpers.withMessage(
      'Invalid username',
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
  <div>
    <div class="mb-4 flex justify-between">
      <UserAvatar
        class="block bg-primary stroke-primary"
        :progress="60"
        size="xl"
        full-name="Evan Yates"
      />
      <Button
        color="accent"
        size="md"
        icon-before="edit"
        class="self-baseline px-[10px] py-2.5"
        @click="toggleEdit"
      />
    </div>

    <div class="flex flex-col gap-4 pt-3">
      <Input
        v-model="profile.position"
        placeholder="UI/UX Designer"
        :readonly="!isEditing"
      >
        <template #topTextLeft>{{
          $t('profile.placeholders.position')
        }}</template>
        <template v-if="validationErrors.position.message" #errorMessage>
          {{ validationErrors.position.message }}
        </template>
      </Input>

      <Input
        v-model="profile.company"
        placeholder="Cadabra"
        :readonly="!isEditing"
      >
        <template #topTextLeft>{{
          $t('profile.placeholders.company')
        }}</template>
        <template v-if="validationErrors.company.message" #errorMessage>
          {{ validationErrors.company.message }}
        </template>
      </Input>

      <Input
        v-model="profile.location"
        placeholder="NYC, New York, USA"
        icon="location"
        :readonly="!isEditing"
      >
        <template #topTextLeft>{{
          $t('profile.placeholders.location')
        }}</template>
        <template v-if="validationErrors.location.message" #errorMessage>
          {{ validationErrors.location.message }}
        </template>
      </Input>

      <BirthdayPicker
        v-model="profile.dateOfBirth"
        placeholder-date="May 19, 1996"
        :readonly="!isEditing"
      >
        <template #birth>{{ $t('Birthday Date') }}</template>
        <template v-if="validationErrors.dateOfBirth.message">
          {{ validationErrors.dateOfBirth.message }}
        </template>
      </BirthdayPicker>

      <div class="pt-6">
        <h4 class="pb-3 text-lg font-bold">{{ $t('profile.Contact Info') }}</h4>
        <div class="flex flex-col gap-4">
          <Input
            v-model="profile.email"
            placeholder="evanyates@gmail.com"
            :readonly="!isEditing"
          >
            <template #topTextLeft>{{
              $t('profile.placeholders.email')
            }}</template>
            <template v-if="validationErrors.email?.message" #errorMessage>
              {{ validationErrors.email.message }}
            </template>
          </Input>

          <Input
            v-model="profile.phone"
            placeholder="+1 675 346 23-10"
            :readonly="!isEditing"
          >
            <template #topTextLeft>{{
              $t('profile.placeholders.phone')
            }}</template>
            <template v-if="validationErrors.phone?.message" #errorMessage>
              {{ validationErrors.phone.message }}
            </template>
          </Input>

          <Input
            v-model="profile.telegram"
            placeholder="@Evan2256"
            :readonly="!isEditing"
          >
            <template #topTextLeft>{{
              $t('profile.placeholders.telegram')
            }}</template>
            <template v-if="validationErrors.telegram?.message" #errorMessage>
              {{ validationErrors.telegram.message }}
            </template>
          </Input>
        </div>
      </div>
    </div>
  </div>
</template>
