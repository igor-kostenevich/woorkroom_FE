export default function defineRouteMiddleware(to: any) {
  const { getToken } = useAppCookie();
  const token =
    getToken() || (import.meta.client ? sessionStorage.getItem('token') : null);

  if (
    !token &&
    !['/auth/login', '/auth/register', '/auth/forgot'].includes(to.path)
  ) {
    return navigateTo('/auth/login');
  }
}
