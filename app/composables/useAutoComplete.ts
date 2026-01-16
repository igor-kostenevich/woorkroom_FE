export const useAutoComplete = () => {
  const isMobileSearchOpen = ref(false);
  const mobileSearchKey = ref(0);

  const onSelect = <T>(val: T | null) => {
    if (!val) return;
    isMobileSearchOpen.value = false;
    mobileSearchKey.value += 1;
  };

  return {
    isMobileSearchOpen,
    mobileSearchKey,
    onSelect,
  };
};
