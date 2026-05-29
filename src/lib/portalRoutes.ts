/** Routes that use the portal auth layout (no marketing navbar). */
export const PORTAL_AUTH_PATHS = [
  '/personal/login',
  '/personal/register',
  '/personal/forgot-password',
  '/personal/reset-password',
] as const;

export function isPortalAuthPath(pathname: string): boolean {
  return PORTAL_AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function isPortalAppPath(pathname: string): boolean {
  return pathname.startsWith('/personal') || pathname.startsWith('/admin');
}
