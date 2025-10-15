import { useRuntimeConfig } from '#imports';
import { useAppCookie } from '@/composables/useAppCookie';

interface FetchOptions {
  showErrorAlert?: boolean;
  auth?: boolean;
}

export function useApi() {
  const { serverUrl } = useRuntimeConfig().public;
  const { getToken } = useAppCookie();

  const api = $fetch.create({
    baseURL: serverUrl,
    async onRequest({ options }: { options: Record<string, any> }) {
      const token = getToken();

      if (token) {
        const headers = new Headers(options.headers || {});
        headers.set('Authorization', `Bearer ${token}`);
        options.headers = headers;
      }
    },
    onResponseError({ response }) {
      console.error('API Error:', response.status, response._data);
    },
  });

  const handleError = (e: any, opts?: FetchOptions) => {
    if (opts?.showErrorAlert) {
      console.error(
        'API Error Alert:',
        e?.response?._data?.message || e.message
      );
      // const { showAlert } = useAlerts()
      // showAlert({
      //   title: 'Error',
      //   message: e?.response?._data?.message || e.message,
      //   type: 'error',
      // })
    }
  };

  const get = async <T>(url: string, opts?: FetchOptions): Promise<T> => {
    try {
      return await api<T>(url, { method: 'GET' });
    } catch (e: any) {
      handleError(e, opts);
      throw e;
    }
  };

  const post = async <T>(
    url: string,
    body?: any,
    opts?: FetchOptions
  ): Promise<T> => {
    try {
      return await api<T>(url, { method: 'POST', body });
    } catch (e: any) {
      handleError(e, opts);
      throw e;
    }
  };

  const put = async <T>(
    url: string,
    body?: any,
    opts?: FetchOptions
  ): Promise<T> => {
    try {
      return await api<T>(url, { method: 'PUT', body });
    } catch (e: any) {
      handleError(e, opts);
      throw e;
    }
  };

  const patch = async <T>(
    url: string,
    body?: any,
    opts?: FetchOptions
  ): Promise<T> => {
    try {
      return await api<T>(url, { method: 'PATCH', body });
    } catch (e: any) {
      handleError(e, opts);
      throw e;
    }
  };

  const del = async <T>(url: string, opts?: FetchOptions): Promise<T> => {
    try {
      return await api<T>(url, { method: 'DELETE' });
    } catch (e: any) {
      handleError(e, opts);
      throw e;
    }
  };

  return { get, post, put, patch, delete: del };
}
