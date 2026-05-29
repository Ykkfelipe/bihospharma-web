"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { isPortalAppPath, isPortalAuthPath } from "@/lib/portalRoutes";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Nosotros" },
  { href: "/services", label: "Nuestros Servicios" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contacto" },
] as const;

const FINANCIAL_LINKS = [
  { href: "/estados-financieros-2025", label: "Estados Financieros 2025" },
  { href: "/estados-financieros-2024", label: "Estados Financieros 2024" },
  { href: "/estados-financieros-2023", label: "Estados Financieros 2023" },
  { href: "/estados-financieros-2022", label: "Estados Financieros 2022" },
] as const;

const PQRS_LABEL = "PQRSF";
const PQRS_TITLE = "Petición, Queja, Reclamo, Sugerencia o Felicitación";

const linkClass =
  "rounded-md px-2 py-1 text-[#1C2B4E] transition hover:bg-blue-50 hover:text-[#48a4dc] hover:underline";

export default function Navbar() {
  const pathname = usePathname() ?? "";
  const onPortalApp = isPortalAppPath(pathname) && !isPortalAuthPath(pathname);
  const portalHref = onPortalApp ? "/personal" : "/personal/login";
  const portalLabel = onPortalApp ? "Mi portal" : "Acceso Corporativo";

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSustainabilityMenu, setShowSustainabilityMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  const sustainabilityRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => setMounted(true), []);

  const updateMenuPosition = () => {
    const el = sustainabilityRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMenuPos({ top: rect.bottom + 4, left: rect.left });
  };

  const openDropdown = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    updateMenuPosition();
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  useLayoutEffect(() => {
    if (!dropdownOpen) return;
    updateMenuPosition();
    const onUpdate = () => updateMenuPosition();
    window.addEventListener("scroll", onUpdate, true);
    window.addEventListener("resize", onUpdate);
    return () => {
      window.removeEventListener("scroll", onUpdate, true);
      window.removeEventListener("resize", onUpdate);
    };
  }, [dropdownOpen]);

  const closeMobile = () => setIsOpen(false);

  const financialDropdown =
    mounted &&
    dropdownOpen &&
    createPortal(
      <div
        className="fixed z-[9999] w-60 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-2xl"
        style={{ top: menuPos.top, left: menuPos.left }}
        onMouseEnter={openDropdown}
        onMouseLeave={handleMouseLeave}
        role="menu"
      >
        {FINANCIAL_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            role="menuitem"
            className="block px-4 py-2.5 text-sm text-[#1C2B4E] hover:bg-blue-50"
          >
            {label}
          </Link>
        ))}
      </div>,
      document.body
    );

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between md:h-28">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logos/bihos-logo.png"
              alt="Bihospharma Logo"
              width={88}
              height={88}
              priority
              className="h-16 w-16 object-contain md:h-[88px] md:w-[88px]"
            />
          </Link>

          <div className="hidden items-center gap-1 md:flex lg:gap-2">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass}>
                {label}
              </Link>
            ))}
            <div
              ref={sustainabilityRef}
              onMouseEnter={openDropdown}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/estados-financieros-2025" className={linkClass}>
                Gestión y Sostenibilidad
              </Link>
            </div>
            <Link href="/pqrs" className={linkClass} title={PQRS_TITLE}>
              {PQRS_LABEL}
            </Link>
            <Link href={portalHref} prefetch={false} className={linkClass}>
              {portalLabel}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[#1C2B4E] hover:bg-gray-100 md:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {financialDropdown}

      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-5 pt-2 md:hidden">
          <div className="space-y-0.5">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMobile}
                className="block min-h-[44px] rounded-lg px-3 py-2.5 text-[#1C2B4E] hover:bg-blue-50"
              >
                {label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setShowSustainabilityMenu(!showSustainabilityMenu)}
              className="block w-full min-h-[44px] rounded-lg px-3 py-2.5 text-left text-[#1C2B4E] hover:bg-blue-50"
            >
              Gestión y Sostenibilidad
            </button>
            {showSustainabilityMenu &&
              FINANCIAL_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMobile}
                  className="block min-h-[44px] rounded-lg py-2 pl-6 pr-3 text-sm text-gray-700 hover:bg-blue-50"
                >
                  {label}
                </Link>
              ))}
            <Link
              href="/pqrs"
              onClick={closeMobile}
              className="block min-h-[44px] rounded-lg px-3 py-2.5 text-[#1C2B4E] hover:bg-blue-50"
              title={PQRS_TITLE}
            >
              {PQRS_LABEL}
            </Link>
            <Link
              href={portalHref}
              prefetch={false}
              onClick={closeMobile}
              className="block min-h-[44px] rounded-lg px-3 py-2.5 text-[#1C2B4E] hover:bg-blue-50"
            >
              {portalLabel}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
