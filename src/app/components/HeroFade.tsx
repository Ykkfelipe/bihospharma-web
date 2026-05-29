'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

const SLIDES = [
  { src: '/images/Banner-2026.png', alt: 'Bihospharma — Banner 2026' },
  { src: '/images/abril-2026.png', alt: 'Bihospharma — Abril 2026' },
  { src: '/images/3.png', alt: 'Bihospharma — Servicios de salud' },
] as const;

const INTERVAL_MS = 5000;

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
      className="relative z-0 w-full overflow-hidden bg-white"
      aria-label="Carrusel principal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[2.1/1] w-full sm:aspect-[3.17/1] sm:min-h-[220px]">
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
              className="object-contain object-center"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => goTo(active - 1)}
        className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#1C2B4E]/35 text-white backdrop-blur-sm transition hover:bg-[#1C2B4E]/55 sm:left-4 sm:h-11 sm:w-11"
        aria-label="Slide anterior"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => goTo(active + 1)}
        className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#1C2B4E]/35 text-white backdrop-blur-sm transition hover:bg-[#1C2B4E]/55 sm:right-4 sm:h-11 sm:w-11"
        aria-label="Slide siguiente"
      >
        ›
      </button>

      <div className="absolute bottom-2.5 left-0 right-0 z-20 flex justify-center gap-2 sm:bottom-3">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(index)}
            className={`h-2 w-2 rounded-full transition sm:h-2.5 sm:w-2.5 ${
              index === active
                ? 'scale-110 bg-[#48a4dc]'
                : 'bg-[#1C2B4E]/25 hover:bg-[#1C2B4E]/40'
            }`}
            aria-label={`Ir al slide ${index + 1}`}
            aria-current={index === active ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
}
