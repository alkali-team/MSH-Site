import Image from "next/image";

/**
 * Block: Home — Distinguished Approach (section right after Why MSH)
 * Figma: node 74:177 (1920 frame) / node 74:156 (3840 frame)
 * Sanity fields (future):
 *   heading   (text)
 *   blocks    (repeater: title + body, x3)
 *   footnote  (text)
 *   monitor   (image)
 *   cards     (image)
 *
 * Two compositions, not one scaled up:
 *   < 2560px   one block on top, two side by side under it
 *   >= 2560px  the three blocks in a single row
 * The italic footnote is only drawn in the 3840 frame, but it ships at both
 * sizes — the 1920 frame leaves an empty 151px band at the bottom of the
 * panel exactly where it belongs, so its absence there is an oversight.
 *
 * The panel gradient is CSS, not the exported image. It is a plain linear
 * ramp — sampled the export at 0/10/20/…/100% and every stop matched a
 * straight interpolation between the two ends, with no vertical variation.
 *
 * The two screenshots overlap the panel and bleed past the right edge, so
 * they are absolute on the panel wrapper and the section clips on x. Their
 * PNGs include the drop shadow, which is why the monitor is drawn wider than
 * its Figma box (785 for a 683 box) and sits at a negative offset — that is
 * the shadow, not a nudge.
 */
const BLOCKS = [
  {
    title: "Hiring from MSH expertise",
    body: "Te hiring platform MSH recruiters have used internally for years to identify quality talent faster, backed by comprehensive data that strengthens every hiring decision.",
  },
  {
    title: "Reimagined with deeper insights",
    body: "Give teams access to predictive fit scoring, technical qualification, real-time funnel metrics, bias mitigation, and interview feedback tools to create a more collaborative hiring process.",
  },
  {
    title: "No more ‘gut-feel’ hiring",
    body: "Combine resume insights with feedback from every interview stage to reduce bias, improve hiring effectiveness, and make data-driven decisions with confidence.",
  },
];

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="xw:flex-1">
      <h3 className="font-normal uw-text-28 uw-leading-38">{title}</h3>
      {/* indented past its own title below xw:, flush with it at xw: */}
      <p className="font-light uw-mt-36 uw-ml-28 uw-max-w-432 uw-text-22 uw-leading-28 xw:ml-0 xw:max-w-none">
        {body}
      </p>
    </div>
  );
}

export default function Distinguished() {
  return (
    <section className="relative w-full overflow-x-clip bg-white uw-pt-150 uw-pb-52">
      <Image
        src="/images/home/distinguished-wash.webp"
        alt=""
        aria-hidden
        width={1341}
        height={2133}
        className="pointer-events-none absolute -uw-top-15 uw-left-1368 uw-w-670 max-w-none"
      />

      <div className="container relative z-10 uw-px-100">
        <div className="flex items-center uw-gap-35 uw-pl-64">
          <Image
            src="/images/home/distinguished-sparkle.png"
            alt=""
            aria-hidden
            width={137}
            height={137}
            className="h-auto shrink-0 uw-w-69"
          />
          <h2 className="font-arimo font-bold text-text-default uw-text-42 uw-leading-48">
            Distinguished Approach
          </h2>
        </div>

        {/* @container so the cqw below resolve against this wrapper. Without it
            they silently fall back to the viewport, which is wider, and both
            screenshots drift right and grow. */}
        <div className="relative uw-mt-96 xw:@container">
          <div className="rounded-xl bg-[linear-gradient(to_right,#b9389a,#1a2688)] text-white w-[94%] uw-pt-105 uw-pb-87 uw-pl-112 xw:pr-[500px]">
            <div className="flex flex-col uw-gap-71 xw:flex-row xw:gap-[150px]">
              <Block {...BLOCKS[0]} />
              {/* at xw: this wrapper flattens so its two blocks join the row */}
              <div className="flex uw-gap-118 xw:contents">
                <Block {...BLOCKS[1]} />
                <Block {...BLOCKS[2]} />
              </div>
            </div>

            {/* Only drawn in the 3840 frame — the 1920 one just leaves the gap
                where it would go. Shown at both sizes on purpose; the values
                below 2560 are the 3840 ones halved, like the rest of this file. */}
            <p className="font-arimo italic uw-mt-40 uw-text-18 uw-leading-24">
              Aeon Hire is the technology layer behind MSH&rsquo;s modern hiring
              approach, bringing data-driven insights to every step of the
              decision-making process.
            </p>
          </div>

          <Image
            src="/images/home/distinguished-monitor.webp"
            alt="The Aeon Hire platform during a candidate interview"
            width={1570}
            height={1088}
            className="pointer-events-none absolute -uw-top-234 uw-left-764 uw-w-785 max-w-none xw:top-[-14.5cqw] xw:left-[70cqw] xw:w-[29.02cqw]"
          />
          <Image
            src="/images/home/distinguished-cards.webp"
            alt="Candidate scorecard with strengths and areas to follow up"
            width={1562}
            height={1490}
            className="pointer-events-none absolute uw-top-17 uw-left-1096 uw-w-781 max-w-none xw:top-[-5.2cqw] xw:left-[80cqw] xw:w-[28.88cqw]"
          />
        </div>
      </div>
    </section>
  );
}
