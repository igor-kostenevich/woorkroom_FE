<template>
  <div class="inline-block rounded-3xl bg-gray-accentLight p-1">
    <button
      v-for="tabOption in props.options"
      :key="tabOption.id"
      class="w-28 rounded-3xl px-5 py-2 text-dark"
      :class="
        route.query.tab === tabOption.label
          ? 'bg-primary text-white'
          : 'bg-gray-accentLight'
      "
      @click="setSelectedLabel(tabOption.label, tabOption.id)"
    >
      {{ tabOption.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);
interface Tab {
  id: number;
  label: string;
}
const props = defineProps<{
  modelValue: number;
  options: Tab[];
}>();

const route = useRoute();
const router = useRouter();
const selected = computed(() => props.options[props.modelValue]);

onMounted(() => {
  if (selected.value && !route.query.tab) {
    router.push({
      query: {
        tab: selected.value.label,
      },
    });
  }
});
function setSelectedLabel(label: string, index: number) {
  router.push({
    query: {
      tab: label,
    },
  });
  emit('update:modelValue', index);
}
</script>
