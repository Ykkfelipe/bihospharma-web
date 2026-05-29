import Link from 'next/link';
import Image from 'next/image';
import SocialLinks from './SocialLinks';
import { CONTACT, FOOTER_LINKS, QUICK_LINKS } from '@/lib/contactInfo';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-[#1C2B4E] text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link href="/" className="inline-block">
            <Image
              src="/logos/bihos-logo.png"
              alt="Bihospharma"
              width={80}
              height={80}
              className="rounded-lg bg-white p-1"
            />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-blue-100">
            Soluciones integrales en salud. Atención ambulatoria de calidad en Yopal y Bogotá.
          </p>
          <SocialLinks variant="dark" className="mt-4" iconSize={18} />
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#79C3EA]">
            Servicios
          </h3>
          <ul className="space-y-2 text-sm text-blue-100">
            {QUICK_LINKS.filter((l) => l.href).map((link) => (
              <li key={link.href}>
                <Link href={link.href!} className="hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className="hover:text-white hover:underline">
                Ver todos los servicios
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#79C3EA]">
            Empresa
          </h3>
          <ul className="space-y-2 text-sm text-blue-100">
            <li>
              <Link href="/about" className="hover:text-white hover:underline">
                Nosotros
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white hover:underline">
                Blog
              </Link>
            </li>
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="hover:text-white hover:underline">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#79C3EA]">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm text-blue-100">
            <li>{CONTACT.email}</li>
            <li>{CONTACT.phone}</li>
            {CONTACT.locations.map((loc) => (
              <li key={loc.name}>
                <span className="font-semibold text-white">{loc.name}</span>
                <br />
                {loc.lines.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#152038] px-4 py-6 text-center sm:px-6">
        <div className="mb-4 flex justify-center">
          <Image
            src="/logos/vigilado-supersalud.png"
            alt="Vigilado Supersalud"
            width={140}
            height={70}
            className="rounded-md opacity-90"
          />
        </div>
        <div className="text-sm text-blue-200">
          <a
            href="/TRATAMIENTO%20%20Y%20PROTECCION%20DE%20DATOS.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:underline"
          >
            Política Protección de datos
          </a>
          {' · '}
          <a
            href="/TRATAMIENTO%20%20Y%20PROTECCION%20DE%20DATOS.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:underline"
          >
            Formato tratamiento de datos
          </a>
        </div>
        <p className="mt-2 text-xs text-blue-300/80">
          © {new Date().getFullYear()} Bihospharma IPS. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
