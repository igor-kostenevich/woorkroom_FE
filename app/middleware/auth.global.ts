export default function defineRouteMiddleware(to: any) {
  const { getToken } = useAppCookie();
  const token = getToken();

  if (
    !token &&
    !['/auth/login', '/auth/register', '/auth/forgot'].includes(to.path)
  ) {
    return navigateTo('/auth/login');
  }
}
