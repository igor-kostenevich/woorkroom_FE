<template>
  <div
    class="grid max-w-md rounded-3xl bg-gray-accent p-1 [grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
    :style="{ '--cols': String(props.options.length) }"
    role="tablist"
  >
    <button
      v-for="tabOption in props.options"
      :key="tabOption.id"
      class="rounded-3xl px-5 py-2 text-dark transition-colors duration-100"
      role="tab"
      :class="
        route.query.tab === tabOption.label
          ? 'bg-primary text-white'
          : 'bg-transparent'
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
