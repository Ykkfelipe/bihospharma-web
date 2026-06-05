"use client";

import Link from "next/link";

const QUICK_LINKS = [
  {
    href: "/personal/programas",
    label: "Programas",
    desc: "Mantisweb, QB Médica y más",
    color: "#0f4c8a",
    bg: "#e0f2fe",
  },
  {
    href: "/personal/actividades",
    label: "Actividades",
    desc: "Registro diario por área",
    color: "#7c3aed",
    bg: "#ede9fe",
  },
  {
    href: "/personal/reloj",
    label: "Reloj",
    desc: "Entrada y salida del turno",
    color: "#059669",
    bg: "#d1fae5",
  },
  {
    href: "/personal/mi-perfil",
    label: "Mi perfil",
    desc: "Su espacio personal",
    color: "#c2410c",
    bg: "#ffedd5",
  },
];

export function PortalQuickLinks() {
  return (
    <section className="portal-quick-links" aria-label="Accesos rápidos">
      <h2 className="portal-quick-links-title">Accesos rápidos</h2>
      <div className="portal-quick-links-grid">
        {QUICK_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className="portal-quick-link-card">
            <span
              className="portal-quick-link-icon"
              style={{ background: item.bg, color: item.color }}
              aria-hidden
            >
              {item.label.charAt(0)}
            </span>
            <span className="portal-quick-link-text">
              <span className="portal-quick-link-label">{item.label}</span>
              <span className="portal-quick-link-desc">{item.desc}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
