import type { ReactNode } from 'react';
import Image from 'next/image';
import PageHero from './PageHero';
import WhatsAppCTA from './WhatsAppCTA';
import SiteContactSection from './SiteContactSection';
import { ArticleJsonLd } from './JsonLd';

type BlogPostLayoutProps = {
  title: string;
  heroImage: string;
  heroAlt: string;
  description: string;
  slug: string;
  heroTitle?: ReactNode;
  showWhatsApp?: boolean;
  heightClass?: string;
  overlayClass?: string;
  titleClassName?: string;
  children: React.ReactNode;
};

export default function BlogPostLayout({
  title,
  heroImage,
  heroAlt,
  description,
  slug,
  heroTitle,
  showWhatsApp = true,
  heightClass,
  overlayClass,
  titleClassName,
  children,
}: BlogPostLayoutProps) {
  return (
    <>
      <PageHero
        src={heroImage}
        alt={heroAlt}
        title={heroTitle ?? title}
        heightClass={heightClass ?? 'h-[45vh] min-h-[260px] sm:min-h-[340px] md:min-h-[420px]'}
        overlayClass={overlayClass}
        titleClassName={titleClassName}
      />
      <article className="prose-content">{children}</article>
      {showWhatsApp && <WhatsAppCTA />}
      <SiteContactSection variant="blog" />
      <ArticleJsonLd title={title} description={description} path={slug} image={heroImage} />
    </>
  );
}

/** Standard section wrappers for blog body content */
export function BlogSection({
  children,
  variant = 'white',
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'white' | 'gray' | 'blue';
  className?: string;
}) {
  const bg =
    variant === 'gray' ? 'bg-slate-100' : variant === 'blue' ? 'bg-[#48a4dc]/10' : 'bg-white';
  return (
    <section className={`${bg} px-4 py-10 sm:px-6 sm:py-12 ${className}`}>
      <div className="mx-auto max-w-4xl">{children}</div>
    </section>
  );
}

export function BlogHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-xl font-extrabold text-[#48a4dc] sm:text-2xl md:text-3xl">{children}</h2>
  );
}

export function BlogParagraph({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`mb-4 text-base leading-relaxed text-gray-800 sm:text-lg ${className}`}>{children}</p>;
}

export function BlogList({ items, className = '' }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul className={`mb-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-gray-800 sm:text-lg ${className}`}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function BlogImage({
  src,
  alt,
  priority = false,
  width = 800,
  height = 500,
  className = '',
}: {
  src: string;
  alt: string;
  priority?: boolean;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <div className={`my-6 overflow-hidden rounded-2xl shadow-lg ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 800px"
        quality={85}
        priority={priority}
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

/** Blue band with closing message before WhatsApp CTA */
export function BlogCtaBand({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-[#48a4dc] px-4 py-8 sm:px-6">
      <p className="mx-auto max-w-4xl text-center text-base font-extrabold leading-relaxed text-white sm:text-lg">
        {children}
      </p>
    </section>
  );
}

/** Two-column text + image row */
export function BlogSplitRow({
  children,
  image,
  imageAlt,
  imageOnRight = true,
}: {
  children: React.ReactNode;
  image: string;
  imageAlt: string;
  imageOnRight?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-8 ${imageOnRight ? '' : 'flex-row-reverse'}`}
    >
      <div className="min-w-[280px] flex-1">{children}</div>
      <div className="min-w-[280px] flex-1">
        <BlogImage src={image} alt={imageAlt} className="my-0" />
      </div>
    </div>
  );
}
