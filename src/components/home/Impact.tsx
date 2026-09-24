import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Block: Home — The MSH Impact (section right after Distinguished Approach)
 * Figma: node 81:210 (1920 frame) / node 81:250 (3840 frame)
 * Sanity fields (future):
 *   heading  (text)
 *   intro    (text — 3840 only)
 *   photo    (image)
 *   stats    (repeater: value + label, x6)
 *   cta      (link: label + url)
 *
 */
type Stat = { value: string; label: ReactNode };

const INTRO =
  "Modern hiring requires more than workflows. Lasting results require deeper insight and experienced candidate matching.";

const STATS = {
  years: { value: "15+ Years", label: "Building Teams" },
  hours: { value: "72 Hours", label: "Average Shortlist Delivery" },
  hires: {
    value: "500+ Hires",
    label: (
      <>
        Average Across{" "}
        <em className="font-extrabold">18&nbsp;Markets</em>
      </>
    ),
  },
  faster: { value: "+35% Faster", label: "Time-to-Fill" },
  lower: { value: "-12% Lower", label: "Agency Costs" },
  client: { value: "100% Client", label: "Satisfaction" },
} satisfies Record<string, Stat>;

type StatKey = keyof typeof STATS;

/* Reading order differs: 2x3 down the columns at 1920, and at 3840 the two
   stats that share row one with the text block have to come first. */
const ORDER_NARROW: StatKey[] = [
  "years",
  "hours",
  "hires",
  "faster",
  "lower",
  "client",
];
const ORDER_WIDE: StatKey[] = [
  "faster",
  "lower",
  "years",
  "hires",
  "hours",
  "client",
];

/**
 * The frames differ in two things only: how far the divider sits below the
 * label, and how wide the label may run before it wraps. The cap goes on the
 * label alone — putting it on the cell would wrap the values too, and
 * "+35% Faster" is wider at 3840 than the label is allowed to be.
 */
function StatCell({
  stat,
  dividerGap,
  labelMax,
}: {
  stat: Stat;
  dividerGap: string;
  labelMax: string;
}) {
  return (
    <div>
      <p className="font-extrabold text-text-default uw-text-42 uw-leading-57">
        {stat.value}
      </p>
      <p
        className={`font-normal text-text-default uw-text-28 uw-leading-38 ${labelMax}`}
      >
        {stat.label}
      </p>
      <span
        className={`block rounded-full bg-[#3c70fd] uw-h-7 uw-w-166 ${dividerGap}`}
      />
    </div>
  );
}

function Blurs({
  right,
  bottom,
}: {
  right: string;
  bottom: string;
}) {
  return (
    <>
      <Image
        src="/images/home/impact-blur-right.webp"
        alt=""
        aria-hidden
        width={1341}
        height={2133}
        className={`pointer-events-none absolute max-w-none ${right}`}
      />
      {/* runs past the bottom of the section on purpose — see the note above */}
      <Image
        src="/images/home/impact-blur-bottom.webp"
        alt=""
        aria-hidden
        width={1397}
        height={2160}
        className={`pointer-events-none absolute max-w-none ${bottom}`}
      />
    </>
  );
}

export default function Impact() {
  return (
    <>
      {/* ---------- 1920 frame ---------- */}
      <section className="relative w-full overflow-x-clip bg-white uw-pt-56 uw-pb-130 xw:hidden">
        <Blurs
          right="uw-top-5 uw-left-1551 uw-w-670"
          bottom="uw-top-540 -uw-left-394 uw-w-698"
        />

        <div className="container relative z-10 uw-px-100">
          {/* Figma starts this block at x=204 in a 1920 frame; centring it
              inside the standard 100px gutter lands at 230, which is the same
              thing without a second gutter value to maintain. */}
          <div className="mx-auto flex w-fit items-start uw-gap-164">
            <div>
              <Image
                src="/images/home/impact-photo.webp"
                alt="An MSH consultant"
                width={1126}
                height={1336}
                className="h-auto rounded-xl uw-w-563"
              />
              <h2 className="font-arimo font-bold text-[#3862d3] uw-mt-79 uw-text-56 uw-leading-50">
                THE MSH IMPACT
              </h2>
              {/* half the 3840 values — the 1920 frame got this paragraph
                  later, and 25/27 is what it measures there. */}
              <p className="font-light italic text-text-default uw-mt-55 uw-max-w-548 uw-text-25 uw-leading-27">
                {INTRO}
              </p>
            </div>

            {/* the stats start lower than the photo in the frame */}
            <div className="uw-mt-111">
              <div className="grid grid-cols-2 uw-gap-x-14 uw-gap-y-66">
                {ORDER_NARROW.map((key) => (
                  <StatCell
                    key={key}
                    stat={STATS[key]}
                    dividerGap="uw-mt-50"
                    labelMax="uw-max-w-359"
                  />
                ))}
              </div>

              <a href="#" className="cta-arrow uw-mt-64">
                Speak with a trusted advisor.
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 3840 frame ---------- */}
      <section className="relative hidden w-full overflow-x-clip bg-white uw-pt-109 uw-pb-100 xw:block">
        <Blurs
          right="-uw-top-146 uw-left-1784 uw-w-624"
          bottom="uw-top-66 -uw-left-246 uw-w-542"
        />

        <div className="container relative z-10 uw-px-100">
          <div className="flex items-start uw-gap-106">
            <div className="shrink-0 uw-w-453">
              <a href="#" className="cta-arrow">
                Speak with a trusted advisor.
              </a>
              <Image
                src="/images/home/impact-photo.webp"
                alt="An MSH consultant"
                width={1126}
                height={1336}
                className="h-auto rounded-xl uw-mt-49 uw-w-417"
              />
            </div>

            {/* the text block spans the first two cells of row one, so the
                first two stats land beside it and the last four form row two */}
            <div className="grid flex-1 grid-cols-4 items-start uw-mt-39 uw-gap-y-103">
              <div className="col-span-2 uw-max-w-609">
                <h2 className="font-arimo font-bold text-[#3862d3] uw-text-65 uw-leading-58">
                  THE MSH IMPACT
                </h2>
                <p className="font-light italic text-text-default uw-mt-62 uw-text-28 uw-leading-30">
                  {INTRO}
                </p>
              </div>

              {ORDER_WIDE.map((key) => (
                <StatCell
                  key={key}
                  stat={STATS[key]}
                  dividerGap="uw-mt-50"
                  labelMax="uw-max-w-269"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
