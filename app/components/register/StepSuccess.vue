<script setup lang="ts">
const Button = defineAsyncComponent(() => import('@/UIKit/Button.vue'));
const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <div>
    <img
      src="/images/common/man.png"
      class="mb-8 w-full lg:mb-[60] lg:max-w-[500px]"
      alt="man image"
    />

    <div class="flex flex-col items-center gap-6">
      <div class="text-center text-[26px] font-bold">
        {{ $t('register.done') }}
      </div>

      <Button icon-after="arrow-right" @click="goHome">
        {{ $t('register.start') }}
      </Button>
    </div>
  </div>
</template>
