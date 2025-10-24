import { createSharedComposable } from '@vueuse/core';

const state = reactive<{ queries: string[] }>({ queries: [] });

export const useQueryParam = createSharedComposable(() => {
  const route = useRoute();
  const router = useRouter();

  const removeQueryParam = async (key: string) => {
    state.queries.push(key);

    await router.replace({
      query: Object.fromEntries(
        Object.entries(route.query).filter(
          ([key]) => !state.queries.includes(key)
        )
      ),
    });
  };

  const setQueryParam = async (
    key: string,
    value: string | number | boolean
  ) => {
    const route = useRoute();

    if (route.query[key] === String(value)) return;
    await router.replace({
      query: { ...route.query, [key]: String(value) },
    });
  };

  watch(
    () => route.query,
    (query: Record<string, any>) => {
      state.queries = state.queries.filter(
        (queryKey: string) => query?.[queryKey]
      );
    },
    { deep: true }
  );

  return { removeQueryParam, setQueryParam };
});
