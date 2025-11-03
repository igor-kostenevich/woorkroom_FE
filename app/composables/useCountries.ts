import type { Country, CountryResponse } from '~/types/components/country';

export const useCountries = () => {
  const { data, error } = useFetch<CountryResponse[]>(
    'https://restcountries.com/v3.1/all?fields=name,cca2,idd'
  );

  const countries = computed<Country[]>(() => {
    if (!data.value) return [];
    return data.value
      .filter((item: CountryResponse) => item.idd?.root)
      .map((item: CountryResponse) => {
        const dial = `${item.idd!.root}${item.idd!.suffixes?.[0] || ''}`;
        return { label: `(${dial})`, value: dial, cca2: item.cca2 };
      });
  });

  return { countries, error };
};
