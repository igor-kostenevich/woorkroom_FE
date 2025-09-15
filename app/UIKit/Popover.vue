<template>
  <div>
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        class="group inline-flex w-full items-center justify-between rounded-[14px] border bg-white px-4 py-3 font-bold outline-none"
        :class="{ 'border-primary shadow-primary-light': open }"
      >
        <div>
          <slot />
        </div>
        <Icon name="chevron-down" aria-hidden="true" class="ml-3" />
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute left-1/2 z-10 mt-3 w-full -translate-x-1/2 transform overflow-hidden rounded-[14px] px-4 shadow-lg sm:px-0 lg:max-w-3xl"
        >
          <div class="bg-white px-4 py-5">
            <slot name="content" />
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
const Icon = defineAsyncComponent(() => import('@/UIKit/Icon.vue'));
</script>
