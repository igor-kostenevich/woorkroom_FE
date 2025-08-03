<template>
  <div class="inline-block rounded-3xl bg-gray-secondary p-1">
    <button
      v-for="tabOption in props.tabs"
      :key="tabOption.id"
      class="rounded-3xl px-11 py-2 text-dark"
      :class="
        route.query.tab === tabOption.label
          ? 'bg-primary text-white'
          : 'bg-gray-secondary'
      "
      @click="setSelectedLabel(tabOption.label)"
    >
      {{ tabOption.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface tab {
  id: number;
  label: string;
}
const props = defineProps<{
  modelValue: number;
  tabs: tab[];
}>();

const route = useRoute();
const router = useRouter();
const selected = props.tabs[props.modelValue];
const emit = defineEmits(['update:modelValue']);
if (selected) {
  router.push({
    query: {
      tab: selected.label,
    },
  });
}
function setSelectedLabel(tab: string) {
  router.push({ query: { tab } });
  const selected = props.tabs.find((t) => t.label === tab);

  if (selected) {
    emit('update:modelValue', selected.id);
  }
}
</script>
