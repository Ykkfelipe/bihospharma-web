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
    <header className="relative z-20 w-full shrink-0 border-b border-white/10 bg-[#0a2540]/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-white no-underline transition hover:text-sky-200"
        >
          <Image
            src="/logos/bihos-logo.png"
            alt=""
            width={28}
            height={28}
            className="rounded-full bg-white p-0.5 object-contain"
            aria-hidden
          />
          <span>Sitio Bihospharma</span>
        </Link>
        <nav
          className="flex flex-wrap items-center gap-1 sm:gap-0.5"
          aria-label="Secciones del sitio público"
        >
          {SITE_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white/90 no-underline transition hover:bg-white/10 hover:text-white sm:px-3 sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

/** Wrapper for login / register / forgot-password pages */
export function PortalAuthPage({ children }: { children: React.ReactNode }) {
  return (
    <main className="portal-auth-bg flex min-h-screen flex-col overflow-hidden">
      <div className="portal-orb pointer-events-none" aria-hidden />
      <PortalPublicNav />
      <div className="relative z-[1] flex flex-1 items-center justify-center px-4 py-8">
        {children}
      </div>
    </main>
  );
}
