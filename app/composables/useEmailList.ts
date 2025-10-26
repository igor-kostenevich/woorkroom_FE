export function useEmailList(rules: any) {
  const inputsRefs = ref([]);
  const membersEmail = reactive([{ email: '' }]);

  const form = computed(
    () => membersEmail[membersEmail.length - 1] ?? { email: '' }
  );

  const { validationErrors, validateField } = useValidation(form, rules);

  const inputFocus = () => {
    const last = inputsRefs.value[membersEmail.length - 1];
    if (last?.focus) last.focus();
    else last?.$el?.querySelector?.('input')?.focus();
  };

  const add = async () => {
    const isValid = await validateField('email');
    if (isValid) membersEmail.push({ email: '' });
    await nextTick();
    inputFocus();
  };

  const approve = async (callback: () => void) => {
    const isValid = await validateField('email');
    if (isValid) return callback();
    await nextTick();
    inputFocus();
  };

  return {
    inputsRefs,
    membersEmail,
    validationErrors,
    add,
    approve,
    inputFocus,
  };
}
