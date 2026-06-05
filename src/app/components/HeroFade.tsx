'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

const SLIDES = [
  { src: '/images/Banner-2026.png', alt: 'Bihospharma — Banner 2026' },
  { src: '/images/junio2-2026.png', alt: 'Bihospharma — Junio 2026' },
  { src: '/images/3.png', alt: 'Bihospharma — Servicios de salud' },
] as const;

const INTERVAL_MS = 5000;

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === 'left' ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

export default function HeroFade() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActive((index + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => goTo(active + 1), INTERVAL_MS);
    return () => clearInterval(id);
  }, [active, paused, goTo]);

  return (
    <section
      className="relative z-0 w-full overflow-hidden bg-[#eef4fa]"
      aria-label="Carrusel principal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[2/1] w-full sm:aspect-[3.17/1] sm:min-h-[220px]">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === active ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={index !== active}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? 'high' : 'low'}
              loading={index === 0 ? 'eager' : 'lazy'}
              quality={80}
              sizes="100vw"
              className="object-cover object-top sm:object-contain sm:object-center"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => goTo(active - 1)}
        className="hero-fade-arrow hero-fade-arrow--prev"
        aria-label="Slide anterior"
      >
        <ChevronIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={() => goTo(active + 1)}
        className="hero-fade-arrow hero-fade-arrow--next"
        aria-label="Slide siguiente"
      >
        <ChevronIcon direction="right" />
      </button>

      <div className="hero-fade-dots" role="tablist" aria-label="Slides del carrusel">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            onClick={() => goTo(index)}
            className={`hero-fade-dot${index === active ? ' hero-fade-dot--active' : ''}`}
            aria-label={`Ir al slide ${index + 1}`}
            aria-selected={index === active}
          />
        ))}
      </div>
    </section>
  );
}
