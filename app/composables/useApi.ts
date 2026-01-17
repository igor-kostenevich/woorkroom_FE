import { useRuntimeConfig } from '#imports';
import { useAppCookie } from '@/composables/useAppCookie';

interface FetchOptions {
  showErrorAlert?: boolean;
  auth?: boolean;
}

export function useApi() {
  const { serverUrl } = useRuntimeConfig().public;

  const api: any = $fetch.create({
    baseURL: serverUrl,
    credentials: 'include',
    async onRequest({ options }) {
      const { token } = useAppCookie();

      if (!token.value) return;

      const normalized = normalizeHeaders(options.headers);

      options.headers = {
        ...normalized,
        authorization: `Bearer ${token.value}`,
      };
    },

    async onResponseError({ request, response, options }) {
      if (response.status !== 401) {
        throw response;
      }

      const { logout, refreshAccessToken } = useAuth();

      if ((options as any)._retry) {
        await logout();
        throw response;
      }

      try {
        await refreshAccessToken();
        (options as any)._retry = true;

        return api(request, options);
      } catch (err) {
        await logout();
        throw err;
      }
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

  function normalizeHeaders(headers?: HeadersInit): Record<string, string> {
    const result: Record<string, string> = {};

    if (!headers) return result;

    if (headers instanceof Headers) {
      headers.forEach((value, key) => {
        result[key.toLowerCase()] = value;
      });
      return result;
    }

    if (Array.isArray(headers)) {
      for (const [key, value] of headers) {
        result[key.toLowerCase()] = value;
      }
      return result;
    }

    for (const key in headers) {
      result[key.toLowerCase()] = headers[key];
    }

    return result;
  }

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
