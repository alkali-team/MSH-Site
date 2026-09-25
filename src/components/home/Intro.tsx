"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

const COLLAGE = [1, 2, 3, 4, 5, 6, 7];

const PER_VIEW = 7;
const GAP = 0;
const SLIDE_WIDTH = (1434 - (PER_VIEW - 1) * GAP) / PER_VIEW;
const EDGE_SOFTEN = 1;
const HALF_ROW = ((PER_VIEW - 1) / 2) * (1 + GAP / SLIDE_WIDTH) * EDGE_SOFTEN;

const COVERFLOW = {
  rotate: 50,
  depth: 80,
  scale: 1.35,
  stretch: -15, 
  modifier: (offset: number) => {
    const a = Math.abs(offset);

    let mag = 0;
    if (a <= HALF_ROW) {
      mag = (a / HALF_ROW) * 0.95;
    } else {
      const extra = a - HALF_ROW;
      mag = Math.max(0, 0.95 - extra);
    }

    const dynamicSpread = 1 + a * 0.06;
    const finalMag = mag * dynamicSpread;

    return offset < 0 ? -finalMag : finalMag;
  },
  slideShadows: false,
};

export default function Intro() {
  return (
    <section className="relative w-full bg-white">
      <div className="container relative z-10 flex flex-col items-center text-center text-text-default">
        <div className="flex flex-col items-center">
          <h1 className="font-extrabold uw-text-42 uw-leading-54">
            Scale Your Team With High Quality, Vetted Professionals
          </h1>

          <p className="font-normal cap-mt-38 cap-max-w-801 uw-text-24 uw-leading-32">
            Companies work with us to quickly staff teams of 20 to 1,000. Build
            your sustainable team with great people who fit your unique culture.
          </p>

          <a href="#" className="cta-arrow cap-mt-47">
            Get a Consultation
          </a>
        </div>

        <div className="relative w-full uw-py-100">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(49.5% 61.6% at 50% 50%, rgba(40,110,230,0.55) 0%, rgba(40,110,230,0) 70%)",
            }}
          />
          <Image
            src="/images/home/blur-left.png"
            alt=""
            aria-hidden
            width={76}
            height={274}
            className="absolute top-1/2 z-20 -translate-y-1/2 cap-left-60 uw-w-38"
          />

          {/* Slider Images */}
          <div className="m-auto uw-w-1434">
            <Swiper
              className="overflow-x-clip! overflow-y-visible!"
              modules={[Autoplay, EffectCoverflow]}
              slidesPerView={PER_VIEW}
              spaceBetween={GAP}
              loop
              speed={700}
              autoplay={{ delay: 1000, disableOnInteraction: false }}
              centeredSlides
              effect="coverflow"
              coverflowEffect={COVERFLOW}
            >
              {[...COLLAGE, ...COLLAGE].map((n, i) => (
                <SwiperSlide key={i}>
                  <div className="uw-px-20 xw:uw-px-27 w-full h-full">
                    <Image
                      src={`/images/home/collage/portrait-${n}.png`}
                      alt=""
                      aria-hidden
                      width={806}
                      height={1044}
                      priority={n <= 4}
                      className="h-auto w-full rounded-lg"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <Image
            src="/images/home/blur-right.png"
            alt=""
            aria-hidden
            width={76}
            height={274}
            className="absolute top-1/2 z-20 -translate-y-1/2 cap-right-60 uw-w-38"
          />
        </div>

        <p className="font-light uw-max-w-494 uw-text-24 uw-leading-26 relative -uw-top-50">
          We place technology and talent at the intersection of every critical
          business function.
        </p>
      </div>
    </section>
  );
}