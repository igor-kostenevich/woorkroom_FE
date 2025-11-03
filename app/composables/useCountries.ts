export function useCountries() {
  const countries = ref<{ label: string; value: string; cca2: string }[]>([]);
  const selectedDialIndex = ref<number>(0);

  const fetchCountries = async () => {
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

    const uaIndex = countries.value.findIndex((c) => c.value === '+380');
    selectedDialIndex.value = uaIndex !== -1 ? uaIndex : 0;
  };

  onMounted(fetchCountries);

  return { countries, selectedDialIndex };
}
