"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { signOutWithAttendance, signOutPortal } from "../lib/attendance-client";
import {
  PORTAL_NAV_ADMIN,
  PORTAL_NAV_ATTENDANCE,
  PORTAL_NAV_MAIN,
  isPortalNavActive,
} from "../lib/portal-nav";

function getInitials(name?: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function SidebarLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`portal-sidebar-link${active ? " portal-sidebar-link--active" : ""}`}
    >
      {label}
    </Link>
  );
}

function NavSection({
  label,
  items,
  pathname,
  onNavigate,
}: {
  label: string;
  items: { href: string; label: string; exact?: boolean }[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="portal-sidebar-section">
      <p className="portal-sidebar-section-label">{label}</p>
      {items.map((item) => (
        <SidebarLink
          key={item.href}
          href={item.href}
          label={item.label}
          active={isPortalNavActive(pathname, item)}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

export function PortalShell({
  children,
  title,
  fullHeight,
}: {
  children: React.ReactNode;
  title?: string;
  fullHeight?: boolean;
}) {
  const pathname = usePathname() ?? "";
  const { data: session } = useSession();
  const role = session?.user?.role;
  const userName = session?.user?.name ?? session?.user?.email ?? "";
  const roleLabel = role === "admin" ? "Administrador" : "Colaborador";
  const [navOpen, setNavOpen] = useState(false);
  const [endingShift, setEndingShift] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleEndShift = async () => {
    setEndingShift(true);
    try {
      await signOutWithAttendance("/personal/login");
    } finally {
      setEndingShift(false);
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOutPortal("/personal/login");
    } finally {
      setSigningOut(false);
    }
  };

  const closeNav = () => setNavOpen(false);
  const toggleNav = () => setNavOpen((open) => !open);

  useEffect(() => {
    if (!navOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeNav();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navOpen]);

  return (
    <div className={`portal-shell${fullHeight ? " portal-shell--full" : ""}${navOpen ? " portal-shell--nav-open" : ""}`}>
      <header className={`portal-mobile-bar${fullHeight ? " portal-mobile-bar--dark" : ""}`}>
        <button
          type="button"
          className="portal-shell-menu-btn"
          onClick={toggleNav}
          aria-expanded={navOpen}
          aria-label={navOpen ? "Cerrar menú" : "Abrir menú del portal"}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {navOpen ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
        <Link href="/personal" className="portal-mobile-brand" onClick={closeNav}>
          <Image
            src="/logos/bihos-logo.png"
            alt="Bihospharma"
            width={36}
            height={36}
            className="portal-shell-logo"
          />
          <span>{title || "Portal corporativo"}</span>
        </Link>
        <Link href="/personal/mi-perfil" className="portal-mobile-avatar" onClick={closeNav}>
          <span className="portal-avatar" aria-hidden>
            {getInitials(session?.user?.name)}
          </span>
        </Link>
      </header>

      <div className="portal-shell-layout">
        {navOpen && (
          <button
            type="button"
            className="portal-sidebar-backdrop"
            aria-label="Cerrar menú"
            onClick={closeNav}
          />
        )}

        <aside className={`portal-sidebar${navOpen ? " portal-sidebar--open" : ""}`} aria-hidden={!navOpen}>
          <div className="portal-sidebar-brand">
            <Link href="/personal" className="portal-shell-brand" onClick={closeNav}>
              <Image
                src="/logos/bihos-logo.png"
                alt="Bihospharma"
                width={44}
                height={44}
                className="portal-shell-logo"
                priority
              />
              <span className="portal-shell-brand-text">
                <span className="portal-shell-brand-title">{title || "Portal corporativo"}</span>
                <span className="portal-shell-brand-sub">Bihospharma S.A.S</span>
              </span>
            </Link>
            <button
              type="button"
              className="portal-sidebar-close"
              onClick={closeNav}
              aria-label="Cerrar menú"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <Link href="/personal/mi-perfil" className="portal-sidebar-profile" onClick={closeNav}>
            <span className="portal-avatar portal-avatar--lg" aria-hidden>
              {getInitials(session?.user?.name)}
            </span>
            <span className="portal-sidebar-profile-text">
              <span className="portal-sidebar-profile-name">{userName || "Mi perfil"}</span>
              <span className="portal-sidebar-profile-role">{roleLabel}</span>
            </span>
          </Link>

          <nav className="portal-sidebar-nav" aria-label="Navegación del portal">
            <NavSection label="Principal" items={PORTAL_NAV_MAIN} pathname={pathname} onNavigate={closeNav} />
            <NavSection
              label="Asistencia"
              items={PORTAL_NAV_ATTENDANCE}
              pathname={pathname}
              onNavigate={closeNav}
            />
            {role === "admin" && (
              <NavSection
                label="Administración"
                items={PORTAL_NAV_ADMIN}
                pathname={pathname}
                onNavigate={closeNav}
              />
            )}
          </nav>

          <div className="portal-sidebar-footer">
            <Link href="/" className="portal-sidebar-action portal-sidebar-action--link" onClick={closeNav}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              Sitio institucional
            </Link>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              disabled={signingOut || endingShift}
              className="portal-sidebar-action portal-sidebar-action--signout"
            >
              {signingOut ? "Cerrando…" : "Cerrar sesión"}
            </button>
            <button
              type="button"
              onClick={() => void handleEndShift()}
              disabled={endingShift || signingOut}
              className="portal-sidebar-action portal-sidebar-action--end"
            >
              {endingShift ? "Guardando…" : "Terminar turno"}
            </button>
          </div>
        </aside>

        <div className="portal-main">
          <div className="portal-shell-body">{children}</div>

          {!fullHeight && (
            <footer className="portal-footer">
              © {new Date().getFullYear()} Bihospharma S.A.S · Portal corporativo · Todos los
              derechos reservados
            </footer>
          )}
        </div>
      </div>
    </div>
  );
}

export function AdminPortalShell({
  children,
  heading,
  lead,
}: {
  children: React.ReactNode;
  heading: string;
  lead?: string;
}) {
  const pathname = usePathname() ?? "";

  return (
    <PortalShell title="Administración">
      <div className="portal-page portal-page--wide">
        <div className="portal-page-hero">
          <p className="portal-page-eyebrow">Panel de administración</p>
          <h1 className="portal-page-title">{heading}</h1>
          {lead && <p className="portal-page-lead">{lead}</p>}
        </div>
        <nav className="portal-admin-tabs" aria-label="Secciones de administración">
          {PORTAL_NAV_ADMIN.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`portal-admin-tab${isPortalNavActive(pathname, item) ? " portal-admin-tab--active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </PortalShell>
  );
}
