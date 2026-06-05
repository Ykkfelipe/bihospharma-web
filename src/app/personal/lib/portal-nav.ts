export type PortalNavItem = {
  href: string;
  label: string;
  /** Match only exact path (for home). */
  exact?: boolean;
};

export const PORTAL_NAV_MAIN: PortalNavItem[] = [
  { href: "/personal", label: "Inicio", exact: true },
  { href: "/personal/mi-perfil", label: "Mi perfil" },
  { href: "/personal/programas", label: "Programas" },
  { href: "/personal/actividades", label: "Actividades" },
];

export const PORTAL_NAV_ATTENDANCE: PortalNavItem[] = [
  { href: "/personal/reloj", label: "Reloj" },
  { href: "/personal/shifts", label: "Mis turnos" },
];

export const PORTAL_NAV_ADMIN: PortalNavItem[] = [
  { href: "/personal/admin", label: "Publicaciones", exact: true },
  { href: "/personal/admin/equipo", label: "Equipo" },
  { href: "/personal/admin/attendance", label: "Asistencia" },
  { href: "/personal/admin/actividades", label: "Actividades" },
];

export function isPortalNavActive(pathname: string, item: PortalNavItem): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
