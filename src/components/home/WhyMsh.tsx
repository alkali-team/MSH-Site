"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Block: Home — Why MSH (section right after Differentiator)
 * Figma: node 63:131 (default state) / node 130:153 (Aeon Hire Advantage state)
 * Sanity fields (future):
 *   heading      (text)
 *   eyebrow      (text)
 *   body         (text)
 *   cards        (repeater: icon + title, x3)
 *   panelBody    (rich text, two paragraphs)
 *   advantage    (heading + subhead + intro card + repeater: number + title +
 *                 headline + body, x4)
 *   footnote     (text)
 *
 * One composition — scales, doesn't re-compose, so no `xw:` variant.
 *
 * The blue panel runs past the right edge of the frame in Figma (1968 against
 * 1920). That overflow isn't doing anything, so it's pinned flush instead.
 *
 * The background is a CSS gradient (`.whymsh-bg`), not the exported image —
 * see globals.css for where its colours came from.
 *
 * The small blue panel's arrow swaps the whole row for a second, wider panel
 * (the "Aeon Hire Advantage" breakdown) instead of navigating anywhere.
 * Both panels stay mounted, stacked in the same CSS grid cell (col/row-
 * start-1) rather than one replacing the other — the row's height is always
 * the taller of the two, so toggling never resizes the section and the page
 * doesn't jump. Only opacity (default panel) and opacity+translate (the
 * Advantage panel) transition between the two states.
 */
const ADVANTAGE_ITEMS = [
  {
    num: "01",
    title: "Discover",
    headline: "Find beyond the resume.",
    body: "Surface qualified talent through intelligent matching. Identify stronger candidate alignment with data-driven insights.",
  },
  {
    num: "02",
    title: "Evaluate",
    headline: "Understand true candidate potential.",
    body: "Go beyond keywords to understand candidate potential. Evaluate technical ability through structured assessments and predictive fit scoring.",
  },
  {
    num: "03",
    title: "Collaborate",
    headline: "Align every decision maker.",
    body: "Bring hiring teams together with centralized feedback. Create visibility into candidate progress throughout the process.",
  },
  {
    num: "04",
    title: "Optimize",
    headline: "Improve every hire over time.",
    body: "Move beyond surface-level qualifications. Aeon Hire evaluates candidate alignment to uncover who is most likely to succeed in the role.",
  },
] as const;

function Card({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="flex flex-col items-start rounded-xl bg-[#f6f6f6]/30 uw-h-238 uw-w-536 uw-gap-40 uw-pt-62 uw-pl-80">
      <Image
        src={`/images/home/${icon}`}
        alt=""
        aria-hidden
        width={112}
        height={114}
        className="h-auto uw-w-56"
      />
      <h3 className="font-arimo font-bold text-text-default uw-text-32 uw-leading-26">
        {title}
      </h3>
    </div>
  );
}

function AdvantageItem({
  item,
}: {
  item: (typeof ADVANTAGE_ITEMS)[number];
}) {
  return (
    <div>
      <p className="font-extrabold uw-text-23 uw-leading-29">{item.num}</p>
      <p className="font-extrabold italic uw-mt-4 uw-text-22 uw-leading-29">
        {item.title}
      </p>
      <p className="font-normal uw-mt-8 uw-text-22 uw-leading-29">
        {item.headline}
      </p>
      <p className="font-normal text-white/80 uw-mt-8 uw-max-w-330 uw-text-14 uw-leading-22">
        {item.body}
      </p>
    </div>
  );
}

function AdvantagePanel({
  open,
  onBack,
}: {
  open: boolean;
  onBack: () => void;
}) {
  return (
    <div
      className={`col-start-1 row-start-1 uw-mr-100 transition-all duration-500 ease-out ${
        open
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-full opacity-0"
      }`}
    >
      <div className="relative flex rounded-xl bg-[#1c2e8d] text-white shadow-[15px_16px_80px_3px_rgba(30,30,30,0.6)] uw-gap-60 uw-py-80 uw-pl-95 uw-pr-90">
        {/* left: heading + intro card */}
        <div className="flex min-w-0 flex-[1.3] flex-col">
          <h3 className="font-arimo font-bold uw-text-36 uw-leading-42">
            The Technology Layer Behind Better Hiring
          </h3>
          <p className="font-extrabold uw-mt-16 uw-text-23 uw-leading-29">
            Where human expertise meets intelligent hiring technology.
          </p>

          <div className="rounded-xl bg-white text-text-default uw-mt-32 uw-max-w-420 uw-px-32 uw-py-32">
            <p className="font-normal uw-text-19 uw-leading-28">
              Most hiring technology helps teams manage candidates. Aeon Hire
              helps teams <span className="font-bold">understand them.</span>
            </p>
            <p className="font-normal uw-mt-20 uw-text-19 uw-leading-28">
              Aeon Hire combines proprietary data models, structured
              evaluation, and real-time hiring insights to help organizations
              identify the right people with greater confidence.
            </p>
          </div>
        </div>

        {/* middle: Aeon Hire Advantage heading + items 01/02 */}
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="font-normal uw-text-32 uw-leading-40">
            The Aeon Hire Advantage
          </p>
          <p className="font-normal text-white/80 italic uw-mt-8 uw-text-16 uw-leading-22">
            A modern hiring ecosystem designed around better decisions.
          </p>

          <div className="flex flex-col uw-mt-40 uw-gap-32">
            <AdvantageItem item={ADVANTAGE_ITEMS[0]} />
            <AdvantageItem item={ADVANTAGE_ITEMS[1]} />
          </div>
        </div>

        {/* right: items 03/04, spread to match the middle column's height */}
        <div className="flex min-w-0 flex-1 flex-col justify-between uw-py-8">
          <AdvantageItem item={ADVANTAGE_ITEMS[2]} />
          <AdvantageItem item={ADVANTAGE_ITEMS[3]} />
        </div>

        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="absolute grid cursor-pointer place-items-center rounded-full bg-white transition-colors hover:bg-[#f6f6f6]/77 uw-bottom-40 uw-right-40 uw-h-56 uw-w-56"
        >
          <svg
            viewBox="0 0 12 21"
            fill="none"
            stroke="#1a2b8b"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="w-auto -scale-x-100 uw-h-21"
          >
            <polyline points="1.5,1.5 10.5,10.5 1.5,19.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function WhyMsh() {
  const [advantageOpen, setAdvantageOpen] = useState(false);

  return (
    <section className="whymsh-bg relative w-full overflow-x-clip">
      <div className="container relative z-10 uw-py-100 uw-pl-100">
        {/* grid, not a conditional swap: both panels stay mounted, stacked in
            the same cell (col/row-start-1), so the row's height is always the
            taller of the two — switching never changes the section's height
            and the page doesn't jump. Only opacity/translate toggle. */}
        <div className="grid">
          <div
            className={`col-start-1 row-start-1 flex items-start uw-gap-85 transition-opacity duration-300 ${
              advantageOpen ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            {/* grow: absorbe el sobrante para que el panel quede al raz de la
              derecha. El contenido crece 1.8x pero el viewport 2x, asi que
              arriba de 1920 siempre sobra ancho que alguien tiene que comerse. */}
            <div className="grow">
              {/* 2x2: texto y avatares arriba, dos tarjetas abajo que se alinean solas */}
              <div className="grid w-fit grid-cols-2 items-start uw-gap-x-29 uw-gap-y-52">
                <div className="flex flex-col">
                  <h2 className="font-arimo font-bold text-text-default uw-text-42 uw-leading-48">
                    Why MSH
                  </h2>

                  <p className="font-normal text-[#1f339e] uw-mt-13 uw-text-28 uw-leading-38">
                    How we hire.
                  </p>

                  <Image
                    src="/images/home/whymshstars.png"
                    alt=""
                    aria-hidden
                    width={392}
                    height={112}
                    className="h-auto uw-mt-33 uw-w-196"
                  />

                  <p className="font-light text-text-default uw-mt-26 uw-max-w-360 uw-text-24 uw-leading-38">
                    We believe better hiring comes from combining innovation
                    with genuine human connection.
                  </p>
                </div>

                <div className="flex flex-col">
                  <Image
                    src="/images/home/whymsh-avatars.webp"
                    alt=""
                    aria-hidden
                    width={848}
                    height={214}
                    className="h-auto uw-w-424"
                  />
                  <div className="uw-mt-47">
                    <Card title="Real-Time Insights." icon="icon-insights.png" />
                  </div>
                </div>

                <Card title="People-first recruiting." icon="icon-people.png" />
                <Card title="Bias mitigation." icon="icon-bias.png" />
              </div>

              <p className="font-normal text-text-default uw-mt-93 cap-text-36 cap-leading-49">
                Love the hires you make at the speed your team needs.
              </p>
            </div>
            <div className="flex flex-col rounded-l-xl bg-[#1c2e8d] text-white uw-w-637 uw-py-90 uw-px-85">
              <p className="font-normal uw-max-w-424 uw-text-32 uw-leading-54">
                Move beyond the ATS with data-backed insights that combine
                resume analysis with interview feedback to improve hiring
                effectiveness and candidate experience.
              </p>
              <p className="font-normal uw-mt-63 uw-max-w-379 uw-text-32 uw-leading-54">
                It&rsquo;s about turning hiring data into better decisions.
              </p>

              <div className="flex items-center justify-between uw-mt-100">
                <Image
                  src="/images/home/panel-dots.png"
                  alt=""
                  aria-hidden
                  width={290}
                  height={105}
                  className="h-auto uw-w-96"
                />
                <button
                  type="button"
                  onClick={() => setAdvantageOpen(true)}
                  aria-label="Show the Aeon Hire Advantage"
                  className="grid cursor-pointer place-items-center rounded-full bg-white transition-colors hover:bg-[#f6f6f6]/77 uw-h-56 uw-w-56"
                >
                  <svg
                    viewBox="0 0 12 21"
                    fill="none"
                    stroke="#1a2b8b"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="w-auto uw-h-21"
                  >
                    <polyline points="1.5,1.5 10.5,10.5 1.5,19.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <AdvantagePanel
            open={advantageOpen}
            onBack={() => setAdvantageOpen(false)}
          />
        </div>
      </div>
    </section>
  );
}
