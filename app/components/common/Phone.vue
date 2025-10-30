<script setup lang="ts">
const Input = defineAsyncComponent(() => import('~/UIKit/Input.vue'));
const Dropdown = defineAsyncComponent(() => import('~/UIKit/Dropdown.vue'));

type Country = { label: string; value: string; cca2: string };

const props = defineProps<{
  modelValue: string;
  dial: string;
  error?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue' | 'update:dial', v: string): void;
}>();

const countries = ref<Country[]>([]);
const selectedDialIndex = ref<number>(0);
const phoneLocal = ref<string>(props.modelValue ?? '');

onMounted(async () => {
  const res = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,cca2,idd'
  );
  const data = await res.json();

  countries.value = data
    .filter((item: any) => item?.idd?.root)
    .map((item: any) => {
      const dial = `${item.idd.root}${item.idd.suffixes?.[0] || ''}`;
      return { label: `(${dial})`, value: dial, cca2: item.cca2 };
    });

  const uaIndex = countries.value.findIndex((c: Country) => c.value === '+380');
  selectedDialIndex.value = uaIndex !== -1 ? uaIndex : 0;

  emit('update:dial', countries.value[selectedDialIndex.value]?.value || '');
});

watch(
  phoneLocal,
  (v: string) => emit('update:modelValue', (v || '').replace(/\D/g, '')),
  { immediate: true }
);
</script>

<template>
  <div class="mb-6 w-full">
    <div class="mb-1.5 text-sm font-bold text-gray">
      {{ $t('register.Mobile Number') }}
    </div>

    <div class="flex max-h-[50px] justify-between gap-4">
      <div class="rounded-[14px] border border-gray-dark">
        <Dropdown
          v-model="selectedDialIndex"
          :options="countries"
          :hide-clear-btn="true"
          placeholder="+1"
        />
      </div>

      <Input v-model="phoneLocal" placeholder="345 567-23-56">
        <template v-if="props.error" #errorMessage>
          {{ error }}
        </template>
      </Input>
    </div>
  </div>
</template>
