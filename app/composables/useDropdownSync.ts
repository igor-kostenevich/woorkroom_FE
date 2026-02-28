export function useDropdownSync<T extends { value: string }>(
  payloadField: Ref<string>,
  options: T[]
) {
  const selected = computed<number | ''>({
    get() {
      const index = options.findIndex(
        (opt) => opt.value === payloadField.value
      );
      return index !== -1 ? index : '';
    },
    set(val: number | string) {
      if (typeof val === 'number') {
        payloadField.value = options[val]?.value ?? '';
      } else if (typeof val === 'string') {
        payloadField.value = val;
      }
    },
  });

  onMounted(() => {
    const index = options.findIndex((opt) => opt.value === payloadField.value);
    if (index !== -1) {
      payloadField.value = options[index]?.value ?? '';
    }
  });

  return { selected };
}
