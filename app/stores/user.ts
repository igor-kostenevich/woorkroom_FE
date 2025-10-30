import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const { post } = useApi();
  const requestPhoneOtp = async (phone: string) => {
    await post('/auth/phone/request', { phone });
  };

  const verifyPhoneOtp = async (phone: string, code: string) => {
    return await post('/auth/phone/verify', { phone, code });
  };

  const register = async (payload: any) => {
    return await post('/auth/register', payload);
  };

  return {
    requestPhoneOtp,
    verifyPhoneOtp,
    register,
  };
});
