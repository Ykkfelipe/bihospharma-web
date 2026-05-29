import Link from 'next/link';
import Image from 'next/image';

const SITE_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Nosotros' },
  { href: '/services', label: 'Servicios' },
  { href: '/contact', label: 'Contacto' },
] as const;

export function PortalPublicNav() {
  return (
    <header className="portal-auth-topbar">
      <div className="portal-auth-topbar-inner">
        <Link href="/" className="portal-auth-topbar-brand">
          <Image
            src="/logos/bihos-logo.png"
            alt=""
            width={28}
            height={28}
            className="portal-auth-topbar-logo"
            aria-hidden
          />
          <span>Sitio Bihospharma</span>
        </Link>
        <nav className="portal-auth-topbar-nav" aria-label="Secciones del sitio público">
          {SITE_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="portal-auth-topbar-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
