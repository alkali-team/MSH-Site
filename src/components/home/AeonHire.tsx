import Image from "next/image";

/**
 * Block: Home — Aeon Hire (section right after AI Advantage)
 * Figma: node 43:218 (1920 frame) / node 43:238 (3840 frame)
 * Sanity fields (future):
 *   heading     (rich text — second line is italic)
 *   body        (text)
 *   cta         (link: label + url)
 *   image       (image)
 *   features    (repeater: title + body, x3)
 *
 * Two compositions:
 *   < 2560px   image bleeding off the left, text block on the right,
 *              features in a full-width horizontal bar underneath
 *   >= 2560px  text block left, image centred, features in a tall card
 *              on the right with the three stacked
 *
 * The text block and the features card are both `@container`, so everything
 * inside them is sized in `cqw` (% of that block's own width) rather than the
 * viewport. Each block therefore stays internally correct at any width, and
 * only needs an `xw:` override where the 3840 frame genuinely re-composes it
 * — not merely where it changes size.
 */
export default function AeonHire() {
  return (
    <section className="relative w-full overflow-x-clip bg-white">
      <div className="container flex flex-col cap-py-80 cap-px-100 xw:flex-row xw:items-center xw:justify-between xw:px-[5.44%] xw:py-[2.6%]">
        {/*
          Image left, text right, vertically centred. The artwork is wider than
          its own column (max-w-none defeats the preflight img rule) so the glow
          can spill past the text — that's what lets the two sit side by side in
          flex even though they overlap in the Figma frame.
        */}
        <div className="flex w-full items-center xw:contents">
          <figure className="relative min-w-0 flex-1 -cap-mt-80 xw:order-2 xw:flex xw:justify-end">
            <Image
              src="/images/home/aeon-hire.png"
              alt="A hand holding the Aeon Hire platform"
              width={4094}
              height={2582}
              className="h-auto w-[118.95%] max-w-none shrink-0"
            />
            <span className="absolute right-0 bottom-0 inline-flex">
              <Image
                src="/images/home/cta-sparkle.png"
                alt=""
                aria-hidden
                width={166}
                height={154}
                className="h-auto cap-w-83"
              />
            </span>
          </figure>

          {/* headline + body + cta */}
          <div className="@container shrink-0 text-right cap-w-707 xw:order-1  xw:w-[26%] xw:text-left">
            <h2 className="font-arimo text-text-default text-[6.79cqw] leading-[9.05cqw] xw:text-[9.37cqw] xw:leading-[12.48cqw]">
              <span className="font-bold">More time for people.</span>
              <br />
              <em>Less time on process.</em>
            </h2>

            <p className="ml-auto font-normal text-text-default mt-[9.62cqw] max-w-[75.67%] text-[3.58cqw] leading-[5.09cqw] xw:mr-auto xw:ml-0 xw:mt-[14.72cqw] xw:max-w-[76.31%] xw:text-[4.77cqw] xw:leading-[6.74cqw]">
              MSH combines recruiter expertise with Aeon Hire, our proprietary
              hiring platform built to support faster, more informed talent
              decisions.
            </p>

            <a
              href="#"
              className="cta-arrow ml-auto mt-[11.60cqw] xw:ml-0 xw:mt-[24.28cqw]"
            >
              Explore solutions by industry.
            </a>
          </div>
        </div>

        {/* three features: a horizontal bar below, a stacked card on the right */}
        <div className="@container flex w-full justify-between rounded-xl bg-[#f6f6f6] cap-mt-95 cap-p-79 xw:order-3 xw:mt-0 xw:w-[36.32%] xw:flex-col xw:gap-[3.125vw] xw:p-[2.2%]">
          <div className="max-w-[28%] xw:max-w-none">
            <h3 className="font-extrabold text-text-default text-[1.97cqw] leading-[2.12cqw] xw:text-[5.25cqw] xw:leading-[5.68cqw]">
              PREDICTIVE FIT SCORING
            </h3>
            <p className="font-light text-text-default mt-[2.12cqw] text-[1.46cqw] leading-[2.12cqw] xw:mt-[4.39cqw] xw:text-[3.88cqw] xw:leading-[5.68cqw]">
              Identify stronger candidate matches before final interviews.
            </p>
          </div>

          <div className="max-w-[28%] xw:max-w-none">
            <h3 className="font-extrabold text-text-default text-[1.97cqw] leading-[2.12cqw] xw:text-[5.25cqw] xw:leading-[5.68cqw]">
              TECHNICAL QUALIFICATION
            </h3>
            <p className="font-light text-text-default mt-[2.12cqw] text-[1.46cqw] leading-[2.12cqw] xw:mt-[4.39cqw] xw:text-[3.88cqw] xw:leading-[5.68cqw]">
              Verify technical skills early with structured assessments and
              deeper candidate evaluation.
            </p>
          </div>

          <div className="max-w-[28%] xw:max-w-none">
            <h3 className="font-extrabold text-text-default text-[1.97cqw] leading-[2.12cqw] xw:text-[5.25cqw] xw:leading-[5.68cqw]">
              REAL-TIME HIRING INSIGHTS
            </h3>
            <p className="font-light text-text-default mt-[2.12cqw] text-[1.46cqw] leading-[2.12cqw] xw:mt-[4.39cqw] xw:text-[3.88cqw] xw:leading-[5.68cqw]">
              See interview feedback, candidate progress, and hiring bottlenecks
              as they happen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
