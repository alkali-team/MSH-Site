"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

const COLLAGE = [1, 2, 3, 4, 5, 6, 7];

const PER_VIEW_MOBILE = 3;
const PER_VIEW_DESKTOP = 7;
const GAP = 0;
const EDGE_SOFTEN = 1;

/**
 * Same inverse-coverflow math for both breakpoints, just re-centred on
 * whichever slide count is showing — mobile isn't the desktop row with
 * slides trimmed off, it's its own 3-slide arc so the edge slides still
 * hit full tilt/scale instead of reading as barely-turned neighbours.
 * GAP is 0, so the old SLIDE_WIDTH-based ratio in HALF_ROW always reduced
 * to 1 and did nothing — dropped rather than carried forward unused.
 */
function makeCoverflow(
  perView: number,
  { rotate = 50, scale = 1.35 } = {},
) {
  const halfRow = ((perView - 1) / 2) * EDGE_SOFTEN;

  return {
    rotate,
    depth: 80,
    scale,
    stretch: -15,
    modifier: (offset: number) => {
      const a = Math.abs(offset);

      let mag = 0;
      if (a <= halfRow) {
        mag = (a / halfRow) * 0.95;
      } else {
        const extra = a - halfRow;
        mag = Math.max(0, 0.95 - extra);
      }

      const dynamicSpread = 1 + a * 0.06;
      const finalMag = mag * dynamicSpread;

      return offset < 0 ? -finalMag : finalMag;
    },
    slideShadows: false,
  };
}

const COVERFLOW_MOBILE = makeCoverflow(PER_VIEW_MOBILE, {
  rotate: 40,
  scale: 1.2,
});
const COVERFLOW_DESKTOP = makeCoverflow(PER_VIEW_DESKTOP);

export default function Intro() {
  return (
    <section className="relative w-full bg-white">
      <div className="container relative z-10 flex flex-col items-center text-center text-text-default uw-px-100">
        <div className="flex flex-col items-center">
          <h1 className="font-extrabold mob-text-42 mob-leading-54 lg:uw-text-42 lg:uw-leading-54 mt-5 lg:mt-0">
            Scale Your Team With High Quality, Vetted Professionals
          </h1>

          <p className="font-normal mob-mt-38 mob-max-w-801 mob-text-24 mob-leading-32 lg:cap-mt-38 lg:cap-max-w-801 lg:uw-text-24 lg:uw-leading-32">
            Companies work with us to quickly staff teams of 20 to 1,000. Build
            your sustainable team with great people who fit your unique culture.
          </p>

          <a href="#" className="cta-arrow mob-mt-40 lg:cap-mt-47 mob-mb-40 lg:mb-0">
            Get a Consultation
          </a>
        </div>

        <div className="relative w-full mob-py-80 lg:uw-py-100">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(49.5% 61.6% at 50% 50%, rgba(40,110,230,0.55) 0%, rgba(40,110,230,0) 70%)",
            }}
          />
          <Image
            src="/images/home/mobile-blurtop.png"
            alt=""
            aria-hidden
            width={382}
            height={39}
            unoptimized
            className="absolute left-1/2 top-0 z-20 mob-h-14 mob-w-200 -translate-x-1/2 lg:hidden"
          />

          <Image
            src="/images/home/blur-left.png"
            alt=""
            aria-hidden
            width={76}
            height={274}
            className="absolute top-1/2 z-20 hidden -translate-y-1/2 lg:block lg:cap-left-60 lg:uw-w-38"
          />

          {/* Slider Images */}
          <div className="m-auto w-full lg:uw-w-1434">
            <Swiper
              className="overflow-x-clip! overflow-y-visible!"
              modules={[Autoplay, EffectCoverflow]}
              slidesPerView={PER_VIEW_MOBILE}
              spaceBetween={GAP}
              loop
              speed={700}
              autoplay={{ delay: 1000, disableOnInteraction: false }}
              centeredSlides
              effect="coverflow"
              coverflowEffect={COVERFLOW_MOBILE}
              breakpoints={{
                1024: {
                  slidesPerView: PER_VIEW_DESKTOP,
                  coverflowEffect: COVERFLOW_DESKTOP,
                },
              }}
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
            src="/images/home/mobile-blurbottom.png"
            alt=""
            aria-hidden
            width={382}
            height={39}
            unoptimized
            className="absolute left-1/2 bottom-0 z-20 mob-h-14 mob-w-200  -translate-x-1/2 lg:hidden"
          />

          <Image
            src="/images/home/blur-right.png"
            alt=""
            aria-hidden
            width={76}
            height={274}
            className="absolute top-1/2 z-20 hidden -translate-y-1/2 lg:block lg:cap-right-60 lg:uw-w-38"
          />
        </div>

        <p className="font-light relative py-12.5 mob-max-w-494 mob-text-20 mob-leading-26 lg:py-0 lg:uw-max-w-494 lg:uw-text-24 lg:uw-leading-26 lg:-uw-top-50">
          We place technology and talent at the intersection of every critical
          business function.
        </p>
      </div>
    </section>
  );
}