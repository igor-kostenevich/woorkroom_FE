import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', () => {
  const { get } = useApi();

  const profile = async (profile: object) => {
    return await get('auth/profile', profile);
  };

  return { profile };
});
