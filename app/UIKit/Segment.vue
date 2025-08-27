<template>
  <div
    class="grid rounded-3xl bg-gray-accent p-1 [grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
    :style="{ '--cols': String(props.options.length) }"
    role="tablist"
  >
    <button
      v-for="tabOption in props.options"
      :key="tabOption.id"
      type="button"
      class="rounded-3xl px-3 py-2 text-sm text-dark transition-colors duration-100 sm:px-4 sm:text-base"
      role="tab"
      :class="
        props.modelValue === tabOption.id
          ? 'bg-primary text-white'
          : 'bg-transparent'
      "
      @click="setSelectedLabel(tabOption.id)"
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
  queryKey: string;
}>();

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const queryVal = route.query[props.queryKey] as string | undefined;

  const found = props.options.find(
    (opt) => String(opt.id) === String(queryVal)
  );
  if (found) {
    emit('update:modelValue', found.id);
  } else {
    const defaults = props.options[0]!;
    emit('update:modelValue', defaults.id);

    router.replace({
      query: {
        ...route.query,
        [props.queryKey]: String(defaults.id),
      },
    });
  }
});

watch(
  () => route.query[props.queryKey] as string | undefined,
  (id) => {
    if (id !== null && id !== String(props.modelValue))
      emit('update:modelValue', Number(id));
  }
);

function setSelectedLabel(id: number) {
  router.replace({
    query: { ...route.query, [props.queryKey]: String(id) },
  });

  emit('update:modelValue', id);
}
</script>
