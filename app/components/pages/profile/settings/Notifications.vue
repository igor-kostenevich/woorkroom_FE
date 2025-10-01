<script setup lang="ts">
const Switch = defineAsyncComponent(() => import('@/UIKit/Switch.vue'));
const Checkbox = defineAsyncComponent(() => import('@/UIKit/CheckBox.vue'));

const switches = reactive([
  {
    title: 'settings.Issue Activity',
    text: 'settings.SendMailText',
    model: ref(true),
  },
  {
    title: 'settings.Tracking Activity',
    text: 'settings.TrackedTask',
    model: ref(false),
  },
  {
    title: 'settings.New Comments',
    text: 'settings.SendComments',
    model: ref(false),
  },
]);

const isChecked = ref(true);
</script>

<template>
  <div>
    <div class="flex flex-col gap-4">
      <div
        v-for="(item, index) in switches"
        :key="index"
        class="flex items-center justify-between rounded-2xl bg-light px-5 py-4"
      >
        <div>
          <div class="text-lg font-bold">{{ $t(item.title) }}</div>
          <div class="text-sm text-gray">{{ $t(item.text) }}</div>
        </div>

        <Switch v-model="item.model" />
      </div>
    </div>

    <Checkbox id="send" v-model="isChecked" class="mt-7">
      <span class="text-dark">{{ $t('settings.send') }}</span>
    </Checkbox>
  </div>
</template>
