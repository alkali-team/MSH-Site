"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";

/**
 * Block: Home — Testimonials (section right after The MSH Impact)
 * Figma: node 81:273 (1920 frame) / node 81:370 (3840 frame)
 * Sanity fields (future):
 *   eyebrow      (text)          — "See what MSH can do for you."
 *   testimonials (repeater: quote + aside + name + role + photo)
 *
 * Two compositions written as two <section>s, the same split as `Impact.tsx`.
 * It is not just presentation: the card is 1648px wide in the 1920 frame and
 * 1602px in the 3840 one — near-identical in pixels while the frame doubles,
 * so it goes from 86% of the width to 42%. Type scales at everything from
 * 1.36x to 1.96x with no pattern. `uw-*` alone cannot express that.
 *
 */
type Testimonial = {
  /** The stat line or the client label — whatever is not the quote. */
  aside: ReactNode;
  quote: string;
  name: string;
  role: string;
  photo: string;
  photoWidth: number;
  photoHeight: number;
  /**
   * 3840 only. Jenn's card leads with the quote and follows with the stat;
   * Stefano's leads with the label and follows with the quote. Both frames
   * lead with the aside below 2560, so only the wide layout needs this.
   */
  wideLeadsWithQuote: boolean;
};

/* Both portraits are flush crops of the same proportion, so one set of
   classes covers them; only the intrinsic file size differs. The exports come
   out square and unshadowed, so the corner and the two shadow layers are
   Figma's, rebuilt in CSS. */
const PHOTO_FX =
  "rounded-xl shadow-[0_4px_4px_rgba(0,0,0,0.25),-20px_36px_64px_rgba(0,0,0,0.18)]";
const PHOTO_NARROW = `-uw-top-94 uw-left-924 uw-w-590 ${PHOTO_FX}`;
const PHOTO_WIDE = `-uw-top-99 uw-left-471 uw-w-429 ${PHOTO_FX}`;

const TESTIMONIALS: Testimonial[] = [
  {
    aside: (
      <>
        Jenn hired <strong className="font-extrabold">800 people</strong> in
        three years to scale her healthcare team.
      </>
    ),
    quote: "“MSH has been an integral part of that growth.”",
    name: "Jenn Crenshaw",
    role: "Former Chief People Officer at Fast-Growing Healthcare Startup",
    photo: "/images/home/testimonial-jenn.png",
    photoWidth: 590,
    photoHeight: 615,
    wideLeadsWithQuote: true,
  },
  {
    aside: "Aeon Hire Client",
    quote:
      "“Aeon Hire made our hiring process faster and smarter, and this trait was particularly obvious during the last year. We hired a number of new roles in our company, and thanks to Aeon Hire’s features, this was an easy and satisfying process.”",
    name: "Stefano De Angelis",
    role: "Founder & CEO of De Angelis & Associates",
    photo: "/images/home/testimonial-stefano.webp",
    photoWidth: 1546,
    photoHeight: 1612,
    wideLeadsWithQuote: false,
  },
];

const CARD_BG = "bg-[linear-gradient(to_right,#203aad,#1a2a8a)]";

/**
 * Figma ships both arrows as one flat PNG, with the left one already tinted —
 * that tint is the hover state, not a second colour, so they are drawn here
 * instead: 56px circles, white at rest and #f6f6f6 at 77% on hover, which is
 * exactly what the export's alpha measures.
 */
function NavButton({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      className="grid cursor-pointer place-items-center rounded-full bg-white transition-colors hover:bg-[#f6f6f6]/[0.77] uw-h-56 uw-w-56"
    >
      <svg
        viewBox="0 0 12 21"
        fill="none"
        stroke="#1a2b8b"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={`w-auto uw-h-21 ${dir === "prev" ? "-scale-x-100" : ""}`}
      >
        <polyline points="1.5,1.5 10.5,10.5 1.5,19.5" />
      </svg>
    </button>
  );
}

function Eyebrow({ pad }: { pad: string }) {
  return (
    <div className={`flex items-center uw-gap-22 ${pad}`}>
      <p className="font-light italic text-text-default uw-text-22 uw-leading-26">
        See what MSH can do for you.
      </p>
      <Image
        src="/images/home/testimonialarrow.png"
        alt=""
        aria-hidden
        width={274}
        height={116}
        className="h-auto shrink-0 uw-w-60"
      />
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];
  const step = (d: number) =>
    setActive((i) => (i + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <>
      {/* ---------- 1920 frame: one card, arrows switch it ---------- */}
      <section className="relative w-full overflow-x-clip uw-pb-50 xw:hidden">
        <Image
          src="/images/home/testimonial-wash-blue.webp"
          alt=""
          aria-hidden
          width={575}
          height={445}
          className="pointer-events-none absolute -uw-top-350 uw-left-194 uw-w-1726 max-w-none"
        />
        <Image
          src="/images/home/testimonial-wash-lilac.webp"
          alt=""
          aria-hidden
          width={570}
          height={276}
          className="pointer-events-none absolute -uw-top-120 uw-left-451 uw-w-2280 max-w-none"
        />

        <div className="container relative z-10 uw-px-100">
          <Eyebrow pad="uw-pl-121" />

          <div className="relative mx-auto uw-mt-64 uw-w-1648">
            <div
              className={`flex flex-col rounded-xl text-white shadow-[15px_16px_80px_3px_rgba(30,30,30,0.6)] uw-h-785 uw-pt-123 uw-pb-115 uw-pl-140 ${CARD_BG}`}
            >
              <p className="font-light uw-max-w-426 uw-text-26 uw-leading-38">
                {t.aside}
              </p>
              <p
                className="font-normal uw-mt-127 uw-max-w-635 uw-text-28 uw-leading-36"
              >
                {t.quote}
              </p>
              <div className="mt-auto">
                <p className="font-extrabold uw-text-38 uw-leading-52">
                  {t.name}
                </p>
                <p className="font-normal italic uw-mt-9 uw-text-26 uw-leading-36">
                  {t.role}
                </p>
              </div>
            </div>

            <Image
              src={t.photo}
              alt={t.name}
              width={t.photoWidth}
              height={t.photoHeight}
              className={`pointer-events-none absolute max-w-none ${PHOTO_NARROW}`}
            />
            <Image
              src="/images/home/testimonial-dots.png"
              alt=""
              aria-hidden
              width={272}
              height={98}
              className="pointer-events-none absolute uw-top-425 uw-left-1336 uw-w-136"
            />


            <div className="absolute flex uw-top-664 uw-left-1444 uw-gap-13">
              <NavButton dir="prev" onClick={() => step(-1)} />
              <NavButton dir="next" onClick={() => step(1)} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 3840 frame: both cards, no arrows ---------- */}
      <section className="relative hidden w-full overflow-x-clip uw-pt-75 uw-pb-69 xw:block">
        <div className="container relative z-10 uw-px-100">
          <Eyebrow pad="" />

          <div className="flex uw-mt-52 uw-gap-64">
            {TESTIMONIALS.map((item) => (
              <div key={item.name} className="relative flex-1">
                <div
                  className={`flex flex-col rounded-xl text-white shadow-[21px_22px_109px_4px_rgba(30,30,30,0.6)] uw-h-529 uw-pt-78 uw-pb-54 uw-pl-80 uw-pr-53 ${CARD_BG}`}
                >
                  {item.wideLeadsWithQuote ? (
                    <>
                      <p className="font-normal uw-max-w-393 uw-text-32 uw-leading-43">
                        {item.quote}
                      </p>
                      <p
                        className="font-light uw-mt-65 uw-max-w-313 uw-text-21 uw-leading-29"
                      >
                        {item.aside}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-normal uw-max-w-393 uw-text-32 uw-leading-43">
                        {item.aside}
                      </p>
                      <p
                        className="font-light uw-mt-33 uw-max-w-313 uw-text-21 uw-leading-29"
                      >
                        {item.quote}
                      </p>
                    </>
                  )}

                  <div className="mt-auto text-right">
                    <p className="font-extrabold uw-text-29 uw-leading-39">
                      {item.name}
                    </p>
                    <p className="font-normal italic uw-mt-3 uw-text-20 uw-leading-27">
                      {item.role}
                    </p>
                  </div>
                </div>

                <Image
                  src={item.photo}
                  alt={item.name}
                  width={item.photoWidth}
                  height={item.photoHeight}
                  className={`pointer-events-none absolute max-w-none ${PHOTO_WIDE}`}
                />
                <Image
                  src="/images/home/testimonial-dots.png"
                  alt=""
                  aria-hidden
                  width={272}
                  height={98}
                  className="pointer-events-none absolute uw-top-283 uw-left-822 uw-w-99"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
