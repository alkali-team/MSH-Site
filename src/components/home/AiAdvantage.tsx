import Image from "next/image";

/**
 * Block: Home — AI Advantage (section right after Intro)
 * Figma: node 39:101 (1920 frame) / node 42:119 (3840 frame)
 * Sanity fields (future):
 *   heading        (rich text — "faster" is italic)
 *   image          (image)
 *   leftHeading    (rich text — "not" / "reliance" italic)
 *   leftBody       (text)
 *   rightHeading   (rich text — "advantage" italic)
 *   rightBody      (text)
 *
 * Two compositions, not one scaled up:
 *   < 2560px   heading centred on top, card below   (1920 frame, cap-* scaling)
 *   >= 2560px  heading in a left column, card right (3840 frame, static px)
 * Above 2560 the sizes are fixed — no vw scaling — so they are plain arbitrary
 * values straight out of the 3840 frame.
 *
 * The orb at the top right (`moon.png`) has a negative top offset on purpose:
 * it belongs to this section but bleeds up over the Intro above. Neither
 * section may use overflow-hidden or it gets clipped.
 */
export default function AiAdvantage() {
  return (
    <section className="relative w-full bg-white cap-pt-100 xw:pt-0">
      <div className="container relative z-10 flex flex-col items-center uw-px-100 xw:flex-row 
      xw:items-start xw:gap-16 xw:pb-10 xw:pt-20">
        {/*
          The orbs are flex siblings of the heading, not absolute on the
          section — that's what stops them overlapping it when the heading
          reflows. `relative` + a negative top only shifts them visually, it
          doesn't move the row. Offsets are measured from the heading's top
          rather than the section's, so they survive any change to section
          padding.
        */}
        <div className="flex w-full flex-col items-start justify-center cap-gap-21 lg:flex-row xw:@container xw:relative xw:block xw:w-[17.44%] xw:shrink-0">
          <Image
            src="/images/home/orb-left.png"
            alt=""
            aria-hidden
            width={331}
            height={302}
            className="pointer-events-none relative shrink-0 -cap-top-75 mob-w-100 lg:cap-w-165 xw:absolute xw:top-[-7.00cqw] xw:left-[0.65cqw] xw:w-[35.18cqw]"
          />

          <h2 className="text-center font-extrabold text-primary-navy mob-max-w-1022 mob-text-36 mob-leading-40 lg:cap-max-w-1022 lg:uw-text-42 lg:uw-leading-50 xw:shrink-0 xw:text-right xw:max-w-full xw:text-[8.96cqw] xw:leading-[10.59cqw] xw:mt-[46.74cqw]">
            Today&rsquo;s experienced recruiters use advanced systems to find
            better people, <em>faster</em>.
          </h2>

          {/* these two overlap each other by design, so they need their own box */}
          <div className="hidden pointer-events-none relative shrink-0 -cap-top-213 cap-w-297 lg:block xw:absolute xw:top-[88.93cqw] xw:left-[11.40cqw] xw:w-[95.11cqw]">
            <Image
              src="/images/home/moon.png"
              alt=""
              aria-hidden
              width={424}
              height={455}
              className="absolute top-0 cap-left-85 cap-w-212 xw:top-0 xw:left-[27.36cqw] xw:w-[67.75cqw]"
            />
            <Image
              src="/images/home/orb-right-small.png"
              alt=""
              aria-hidden
              width={271}
              height={235}
              className="absolute left-0 cap-top-194 cap-w-135 xw:top-[62.05cqw] xw:left-0 xw:w-[43.32cqw]"
            />
          </div>
        </div>

        <div className="@container relative w-full mob-mt-50 lg:cap-mt-71 xw:mt-0 xw:flex-1">
          <Image
            src="/images/home/ai-card.webp"
            alt="MSH recruiter using AI-assisted hiring technology"
            width={3446}
            height={1488}
            className="h-auto w-full rounded-[0.64cqw]"
          />

          <div className="absolute inset-0 flex justify-between text-white">
            {/* Mobile: both taglines sit at the top, side by side. The body
                paragraphs move out of the card entirely below (own block,
                own section) — the card is too short on mobile to hold both
                a tagline and body copy per side like the desktop frame does. */}
            <div className="self-start text-left pt-[5.46cqw] pl-[5.57cqw] mt-[24cqw] lg:mt-0">
              <p className="font-arimo font-bold max-w-[24.03cqw] text-[3.25cqw] leading-[3.73cqw]">
                AI is <em>not</em> their <em>reliance</em>.
              </p>
              <p className="hidden font-normal mt-[5.23cqw] max-w-[25.19cqw] text-[1.27cqw] leading-[1.74cqw] lg:block">
                MSH is an established executive recruiting firm delivering
                deeper talent qualification before the first interview.
              </p>
            </div>

            <div className="flex flex-col items-start self-start text-left pt-[5.46cqw] pr-[5.57cqw] lg:items-end lg:self-end lg:pt-0 lg:pr-[3.71cqw] lg:pb-[2.90cqw] lg:text-right">
              <p className="font-arimo font-bold max-w-[22.23cqw] text-[3.25cqw] leading-[3.73cqw]">
                It&rsquo;s their <em>advantage</em>.
              </p>
              <p className="hidden font-light mt-[5.23cqw] max-w-[19.33cqw] text-[1.27cqw] leading-[1.39cqw] lg:block">
                We leverage 15 years of recruiting expertise with intelligent
                hiring technology to help organizations hire based on evidence,
                not instinct.
              </p>
            </div>
          </div>

          <Image
            src="/images/home/sparkle.png"
            alt=""
            aria-hidden
            width={218}
            height={222}
            className="pointer-events-none absolute top-[33.26cqw] right-[3.54cqw] w-[6.33cqw] lg:right-auto lg:left-[3.54cqw]"
          />
        </div>

        {/* Mobile only: the two body paragraphs the card overlay holds on
            desktop, as normal stacked copy below the card instead. */}
        <div className="flex w-full flex-col gap-8 mt-8 lg:hidden">
          <div className="ml-5 flex gap-6">
            <span className="mt-1 w-2 shrink-0 self-stretch rounded-full bg-[#3C70FD]" />
            <p className="mob-text-20 text-primary-blue mob-leading-28">
              MSH is an established executive recruiting firm delivering
              deeper talent qualification before the first interview.
            </p>
          </div>

          <div className="relative  ml-5">
            <p className=" text-text-default font-bold mob-text-24 mob-leading-32">
              <span
                aria-hidden
                className="float-right h-45 w-61.5 [shape-outside:polygon(74%_16%,0_100%,63%_100%)]"
              />
              We leverage 15 years of recruiting expertise with intelligent
              hiring technology to help organizations hire based on evidence,
              not instinct.
            </p>
            <div className="">
              <Image
                src="/images/home/two-balls.png"
                alt=""
                aria-hidden
                width={424}
                height={455}
                className="absolute mob-top-10 right-0 mob-w-200"
              />
            </div> 
          </div>
        </div>
      </div>
    </section>
  );
}
