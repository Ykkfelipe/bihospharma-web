import Link from 'next/link';

const SITE_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Nosotros' },
  { href: '/services', label: 'Servicios' },
  { href: '/contact', label: 'Contacto' },
] as const;

export function PortalPublicNav() {
  return (
    <nav
      className="portal-public-nav"
      aria-label="Volver al sitio público de Bihospharma"
    >
      <Link href="/" className="portal-public-nav-back">
        ← Volver al sitio
      </Link>
      <div className="portal-public-nav-links">
        {SITE_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className="portal-public-nav-link">
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
