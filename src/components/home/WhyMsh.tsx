import Image from "next/image";

/**
 * Block: Home — Why MSH (section right after Differentiator)
 * Figma: node 63:131
 * Sanity fields (future):
 *   heading      (text)
 *   eyebrow      (text)
 *   body         (text)
 *   cards        (repeater: icon + title, x3)
 *   panelBody    (rich text, two paragraphs)
 *   footnote     (text)
 *
 * One composition — scales, doesn't re-compose, so no `xw:` variant.
 *
 * The blue panel runs past the right edge of the frame in Figma (1968 against
 * 1920). That overflow isn't doing anything, so it's pinned flush instead.
 *
 * The background is a CSS gradient (`.whymsh-bg`), not the exported image —
 * see globals.css for where its colours came from.
 */
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

export default function WhyMsh() {
  return (
    <section className="whymsh-bg relative w-full overflow-x-clip">
      <div className="container relative z-10 uw-py-100 uw-pl-100">
        <div className="flex items-start uw-gap-85">
          <div>
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
              We believe better hiring comes from combining innovation with
              genuine human connection.
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
          <div className="flex flex-col rounded-xl bg-[#1c2e8d] text-white uw-w-637 uw-py-90 uw-px-85">
            <p className="font-normal uw-max-w-424 uw-text-32 uw-leading-54">
              Move beyond the ATS with data-backed insights that combine resume
              analysis with interview feedback to improve hiring effectiveness
              and candidate experience.
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
              <Image
                src="/images/home/panel-next.png"
                alt=""
                aria-hidden
                width={300}
                height={237}
                className="h-auto uw-w-100"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
