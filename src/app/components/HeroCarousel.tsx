'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type HeroCarouselProps = {
  showDots?: boolean;
  showArrows?: boolean;
};

const images = [
  '/images/hero-inicio3.png',
  '/images/hero-inicio3.png',
  '/images/hero-inicio3.png',
];

export default function HeroCarousel({
  showDots = true,
  showArrows = true,
}: HeroCarouselProps) {
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
    pauseOnHover: false,
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
    className: 'hero-carousel',
  };

  return (
    <div className="w-full overflow-hidden relative">
      <div className="relative w-full overflow-hidden">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index} className="w-full h-[190px] sm:h-[100px] md:h-[100px] lg:h-[450px] relative mb-10">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                width={1300}
                height={500}
                className="w-full h-full object-contain"
                priority={index === 0}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}