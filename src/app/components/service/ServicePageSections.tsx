import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import PageHero from '../PageHero';
import SiteContactSection from '../SiteContactSection';
import { CONTACT } from '@/lib/contactInfo';

/** Hero + watermark intro + body sections + contact — shared look for all service pages */

export function ServicePageHero({
  title,
  image,
  imageAlt,
  heightClass,
  titleClassName,
}: {
  title: ReactNode;
  image: string;
  imageAlt: string;
  heightClass?: string;
  titleClassName?: string;
}) {
  return (
    <PageHero
      src={image}
      alt={imageAlt}
      title={title}
      heightClass={
        heightClass ?? 'h-[50vh] min-h-[300px] sm:min-h-[360px] md:min-h-[400px]'
      }
      overlayClass="bg-gradient-to-b from-[#1C2B4E]/70 via-[#1C2B4E]/35 to-[#1C2B4E]/70"
      titleClassName={
        titleClassName ??
        'relative z-10 px-4 text-center text-3xl font-black tracking-[0.2em] text-white drop-shadow-lg sm:text-4xl md:text-5xl'
      }
    />
  );
}

/** Intro paragraph with Bihospharma logo watermark (same as original pages) */
export function ServiceWatermarkIntro({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative bg-white px-4 py-10 sm:px-6 sm:py-12">
      <div className="relative mx-auto max-w-4xl overflow-hidden text-center">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <Image
            src="/images/bihospharma-logo-banner.png"
            alt=""
            width={420}
            height={210}
            className="max-h-full w-auto object-contain opacity-[0.12] sm:opacity-[0.15]"
            priority
          />
        </div>
        <div className="relative z-10 text-base font-medium leading-relaxed text-gray-800 sm:text-lg sm:leading-8">
          {children}
        </div>
      </div>
    </section>
  );
}

/** Image left, text right — classic service layout */
export function ServiceSplitBlock({
  image,
  imageAlt,
  title,
  children,
  imageOnRight = false,
}: {
  image: string;
  imageAlt: string;
  title: string;
  children: React.ReactNode;
  imageOnRight?: boolean;
}) {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
      <div
        className={`mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-12 ${
          imageOnRight ? 'md:[&>div:first-child]:order-2' : ''
        }`}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-100">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-extrabold text-[#48a4dc] sm:text-3xl">{title}</h2>
          <div className="text-base leading-relaxed text-gray-800 sm:text-lg sm:leading-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function ServiceListColumn({
  title,
  intro,
  items,
}: {
  title: ReactNode;
  intro?: string;
  items: string[];
}) {
  return (
    <div className="text-left">
      <h3 className="mb-4 text-xl font-extrabold text-[#1C2B4E] sm:text-2xl">{title}</h3>
      {intro && <p className="mb-4 text-base leading-relaxed text-gray-800 sm:text-lg">{intro}</p>}
      <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-gray-800 sm:text-lg">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/** Light blue band with two columns of lists */
export function ServiceInfoBand({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-[#e8f4fc] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-12">{children}</div>
    </section>
  );
}

/** Full-width image CTA with quote + agenda button */
export function ServiceCtaBanner({
  image,
  quote,
  whatsappMessage = 'Hola, quiero agendar una cita',
  tagline,
  showButton = true,
}: {
  image: string;
  quote: string;
  whatsappMessage?: string;
  tagline?: ReactNode;
  showButton?: boolean;
}) {
  const waUrl = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <section className="relative min-h-[360px] w-full overflow-hidden sm:min-h-[400px]">
        <Image src={image} alt="" fill sizes="100vw" quality={85} className="object-cover" aria-hidden />
        <div className="absolute inset-0 bg-[#1C2B4E]/55" aria-hidden />
        <div className="relative z-10 mx-auto flex min-h-[360px] max-w-3xl flex-col items-center justify-center px-4 py-14 text-center text-white sm:min-h-[400px]">
          <p className={`text-lg leading-relaxed sm:text-xl ${showButton ? 'mb-8' : ''}`}>{quote}</p>
          {showButton && (
            <Link
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#48a4dc] px-8 py-3 text-base font-bold text-white shadow-lg transition hover:bg-[#3a8fc4]"
            >
              AGENDA TU CITA
            </Link>
          )}
        </div>
      </section>
      {tagline != null && <ServiceTagline>{tagline}</ServiceTagline>}
    </>
  );
}

/** Left: Servicios + image; right: heading + body (Medicina Interna, Reumatología) */
export function ServiceServicesPanel({
  image,
  imageAlt,
  title,
  children,
}: {
  image: string;
  imageAlt: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto grid max-w-6xl items-start gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <h2 className="mb-4 text-2xl font-extrabold text-[#1C2B4E] sm:text-3xl">Servicios</h2>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-100">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-extrabold text-[#48a4dc] sm:text-3xl">{title}</h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-800 sm:text-lg sm:leading-8">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Text left, Servicios + image right (Nutrición) */
export function ServiceSplitWithServicesImage({
  image,
  imageAlt,
  title,
  children,
}: {
  image: string;
  imageAlt: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <h2 className="mb-4 text-2xl font-extrabold text-[#48a4dc] sm:text-3xl">{title}</h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-800 sm:text-lg sm:leading-8">
            {children}
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-xl font-bold text-[#1C2B4E]">Servicios</h3>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-100">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export type ServiceLaboralFeature = {
  image: string;
  imageAlt: string;
  label: ReactNode;
};

/** Circular icon rows (Medicina Laboral) */
export function ServiceLaboralFeatures({
  title,
  features,
}: {
  title: string;
  features: ServiceLaboralFeature[];
}) {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-100 md:order-1">
          <Image
            src="/images/laboral-2.png"
            alt="Medicina Laboral"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
            className="object-cover"
          />
        </div>
        <div className="md:order-2">
          <h2 className="mb-6 text-2xl font-extrabold text-[#48a4dc] sm:text-3xl">{title}</h2>
          <ul className="space-y-5">
            {features.map((f) => (
              <li key={f.imageAlt} className="flex items-center gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-8 border-[#48a4dc]/40 bg-[#e8f4fc]">
                  <Image src={f.image} alt={f.imageAlt} fill className="object-cover" sizes="96px" quality={85} />
                </div>
                <div className="text-lg font-extrabold leading-snug text-[#48a4dc] sm:text-xl">{f.label}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ServiceTagline({ children }: { children: ReactNode }) {
  return (
    <section className="bg-slate-100 px-4 py-6 text-center sm:py-7">
      <p className="mx-auto max-w-3xl text-base font-medium text-gray-800 sm:text-lg">{children}</p>
    </section>
  );
}

export function ServicePageFooter() {
  return <SiteContactSection />;
}
