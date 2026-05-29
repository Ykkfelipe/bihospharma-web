import Image from 'next/image';
import type { ReactNode } from 'react';

type PageHeroProps = {
  src: string;
  alt: string;
  title: ReactNode;
  /** Shorter hero on mobile; defaults to 40vh min 220px */
  heightClass?: string;
  priority?: boolean;
  /** Optional darker overlay for light text */
  overlayClass?: string;
  titleClassName?: string;
};

export default function PageHero({
  src,
  alt,
  title,
  heightClass = 'h-[40vh] min-h-[220px] sm:min-h-[280px] md:min-h-[320px]',
  priority = true,
  overlayClass = 'bg-black/40',
  titleClassName = 'relative z-10 px-4 text-center text-3xl font-black tracking-wide text-white drop-shadow-lg sm:text-4xl md:text-5xl',
}: PageHeroProps) {
  return (
    <section
      className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        quality={80}
        className="object-cover"
      />
      <div className={`absolute inset-0 ${overlayClass}`} aria-hidden="true" />
      <h1 className={titleClassName}>{title}</h1>
    </section>
  );
}
