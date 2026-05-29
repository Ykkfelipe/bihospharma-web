import Link from 'next/link';
import Image from 'next/image';
import SocialLinks from './SocialLinks';
import { CONTACT, FOOTER_LINKS, QUICK_LINKS } from '@/lib/contactInfo';

type SiteContactSectionProps = {
  /** sidebar = nav box + contact (services); blog = watermark + two columns */
  variant?: 'sidebar' | 'blog';
  className?: string;
};

export default function SiteContactSection({
  variant = 'sidebar',
  className = '',
}: SiteContactSectionProps) {
  if (variant === 'blog') {
    return (
      <section
        className={`relative overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 ${className}`}
        aria-labelledby="contact-heading"
      >
        <div
          className="pointer-events-none absolute -bottom-8 right-0 h-64 w-64 opacity-[0.08] sm:h-80 sm:w-80"
          aria-hidden="true"
        >
          <Image
            src="/images/bihospharma-logo-banner.png"
            alt=""
            fill
            className="object-contain"
            sizes="320px"
          />
        </div>
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h2 id="contact-heading" className="mb-4 text-2xl font-extrabold text-[#1C2B4E] sm:text-3xl">
              Contacto
            </h2>
            <p className="text-base leading-relaxed text-gray-800">{CONTACT.email}</p>
            <p className="mb-4 text-base text-gray-800">{CONTACT.website}</p>
            <p className="font-bold text-gray-900">TELÉFONO</p>
            <p className="mb-4 text-base text-gray-800">{CONTACT.phone}</p>
            <p className="mb-2 font-bold text-gray-900">SÍGUENOS:</p>
            <SocialLinks iconSize={32} />
          </div>
          <div className="space-y-4 text-base leading-relaxed text-gray-800">
            {CONTACT.locations.map((loc) => (
              <div key={loc.name}>
                <p className="font-bold text-gray-900">{loc.name}</p>
                {loc.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`flex flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:flex-row lg:gap-12 ${className}`}
      aria-labelledby="contact-heading-sidebar"
    >
      <nav
        className="flex-1 rounded-2xl bg-[#48a4dc] p-6 text-white sm:p-8"
        aria-label="Enlaces rápidos"
      >
        <ul className="space-y-2 text-base font-medium leading-relaxed sm:text-lg">
          {QUICK_LINKS.map((link) => (
            <li key={link.label}>
              {link.href ? (
                <Link href={link.href} className="underline hover:no-underline">
                  {link.label}
                </Link>
              ) : (
                <span>{link.label}</span>
              )}
            </li>
          ))}
        </ul>
        <ul className="mt-6 space-y-2 text-base font-medium leading-relaxed sm:text-lg">
          {FOOTER_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="underline hover:no-underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-1">
        <h2 id="contact-heading-sidebar" className="mb-4 text-2xl font-bold text-[#1C2B4E] sm:text-3xl">
          Contacto
        </h2>
        <p className="text-base leading-relaxed text-gray-800">
          {CONTACT.email}
          <br />
          {CONTACT.website}
        </p>
        <p className="mt-4 text-base leading-relaxed text-gray-800">
          <strong>TELÉFONO</strong>
          <br />
          {CONTACT.phone}
        </p>
        {CONTACT.locations.map((loc) => (
          <p key={loc.name} className="mt-4 text-base leading-relaxed text-gray-800">
            <strong>{loc.name}</strong>
            <br />
            {loc.lines.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        ))}
        <SocialLinks className="mt-6" iconSize={32} />
      </div>
    </section>
  );
}
