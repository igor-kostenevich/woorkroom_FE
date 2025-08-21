<script setup lang="ts">
import Input from '~/UIKit/Input.vue';
import BirthdayPicker from '~/components/common/BirthdayPicker.vue';
import Button from '~/UIKit/Button.vue';

const inputPositon = ref('');
const inputCompany = ref('');
const inputLocation = ref('');
const inputDateOfBirth = ref(new Date(2005, 6, 3));
const inputEmail = ref('');
const inputPhone = ref('');
const inputTelegram = ref('');
</script>

<template>
  <div class="xl::gap-8 xl::max-w-5xl flex max-w-full flex-col gap-5">
    <div>
      <h3 class="text-lg font-bold">{{ $t('profile.Main info') }}</h3>

      <div class="grid grid-cols-1 gap-4 pt-3 xl:grid-cols-2 xl:gap-5">
        <Input
          v-model="inputPositon"
          :placeholder="$t('profile.placeholders.position')"
        >
          <template #topTextLeft>{{ $t('profile.Position') }}</template>
        </Input>

        <Input
          v-model="inputCompany"
          :placeholder="$t('profile.placeholders.company')"
        >
          <template #topTextLeft>{{ $t('profile.Company') }}</template>
        </Input>

        <Input
          v-model="inputLocation"
          :placeholder="$t('profile.placeholders.location')"
          icon="location"
        >
          <template #topTextLeft>{{ $t('profile.Location') }}</template>
        </Input>

        <BirthdayPicker
          v-model="inputDateOfBirth"
          :placeholder-date="$t('profile.placeholders.birthday')"
        >
          <template #birth>
            {{ $t('profile.Birthday Date') }}
          </template>
        </BirthdayPicker>
      </div>
    </div>

    <div>
      <h4 class="g:text-xl pb-3 font-bold">{{ $t('profile.Contact Info') }}</h4>

      <div class="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-5">
        <Input
          v-model="inputEmail"
          :placeholder="$t('profile.placeholders.email')"
        >
          <template #topTextLeft>{{ $t('profile.Email') }}</template>
        </Input>

        <Input
          v-model="inputPhone"
          :placeholder="$t('profile.placeholders.phone')"
        >
          <template #topTextLeft>{{ $t('profile.Mobile Number') }}</template>
        </Input>

        <Input
          v-model="inputTelegram"
          :placeholder="$t('profile.placeholders.telegram')"
        >
          <template #topTextLeft>{{ $t('profile.Telegram') }}</template>
        </Input>
      </div>
    </div>

    <Button color="primary" class="self-start lg:self-start" size="md">
      {{ $t('settings.edit') }}
    </Button>
  </div>
</template>
