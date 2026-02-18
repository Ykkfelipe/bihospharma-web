'use client';

import { useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';


type HeroCarouselProps = {
  showDots?: boolean;
  showArrows?: boolean;
};

const images = [
  '/images/Banner-1-updatedd.png',
  '/images/Banner-2-updated.png',
  '/images/3.png',
];

type SlickArrowProps = { className?: string; style?: React.CSSProperties; onClick?: () => void };

// Custom Arrow Components for accessibility (44x44px minimum touch target)
function NextArrow(props: SlickArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        zIndex: 1,
        right: '25px', // Positioning adjustment
        cursor: 'pointer',
      }}
      onClick={onClick}
      role="button"
      aria-label="Next Slide"
    />
  );
}

function PrevArrow(props: SlickArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        zIndex: 1,
        left: '25px', // Positioning adjustment
        cursor: 'pointer',
      }}
      onClick={onClick}
      role="button"
      aria-label="Previous Slide"
    />
  );
}

export default function HeroCarousel({
  showDots = true,
  showArrows = true,
}: HeroCarouselProps) {
  const sliderRef = useRef<Slider>(null);

  // JavaScript event listener to PAUSE auto-rotation on mouseenter
  const handleMouseEnter = () => {
    sliderRef.current?.slickPause();
  };

  // JavaScript event listener to RESUME auto-rotation on mouseleave
  const handleMouseLeave = () => {
    sliderRef.current?.slickPlay();
  };

  const settings = {
    dots: showDots,
    arrows: showArrows,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    pauseOnHover: false, // Disabled built-in to use custom event listeners
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          position: 'relative',
          marginTop: '-90px',
          marginBottom: '16px',
        }}
      >
        <ul
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '6px',
            padding: 0,
            margin: 0,
            listStyle: 'none',
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    className: 'hero-carousel', // Ensure custom CSS class is applied
  };

  return (
    <div
      className="w-full overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full overflow-hidden">
        <Slider ref={sliderRef} {...settings}>
          {images.map((src, index) => (
            <div
              key={index}
              className="w-full aspect-[3.17/1] relative mb-10"
            >
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                width={1300}
                height={500}
                className="w-full h-full object-contain"
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                quality={80}
                sizes="100vw"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}