import Image from 'next/image';
import PageHero from './PageHero';
import WhatsAppCTA from './WhatsAppCTA';
import SiteContactSection from './SiteContactSection';

type ServicePageLayoutProps = {
  title: string;
  heroImage: string;
  heroAlt: string;
  intro?: string;
  showWhatsApp?: boolean;
  children?: React.ReactNode;
};

export default function ServicePageLayout({
  title,
  heroImage,
  heroAlt,
  intro,
  showWhatsApp = true,
  children,
}: ServicePageLayoutProps) {
  return (
    <>
      <PageHero
        src={heroImage}
        alt={heroAlt}
        title={title}
        heightClass="h-[45vh] min-h-[280px] sm:min-h-[340px] md:min-h-[400px]"
      />

      {intro && (
        <section className="relative bg-white px-4 py-10 sm:px-6 sm:py-12">
          <div className="relative mx-auto max-w-4xl overflow-hidden text-center">
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30"
              aria-hidden="true"
            >
              <Image
                src="/images/bihospharma-logo-banner.png"
                alt=""
                width={400}
                height={200}
                className="object-contain"
              />
            </div>
            <p className="relative z-10 text-base leading-relaxed text-gray-800 sm:text-lg md:text-xl">
              {intro}
            </p>
          </div>
        </section>
      )}

      {children && <div>{children}</div>}

      {showWhatsApp && <WhatsAppCTA />}
      <SiteContactSection />
    </>
  );
}

export function ServiceSection({
  children,
  variant = 'white',
}: {
  children: React.ReactNode;
  variant?: 'white' | 'gray';
}) {
  const bg = variant === 'gray' ? 'bg-slate-100' : 'bg-white';
  return (
    <section className={`${bg} px-4 py-10 sm:px-6 sm:py-12`}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}
