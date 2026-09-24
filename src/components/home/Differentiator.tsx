import Image from "next/image";

/**
 * Block: Home — Differentiator (section right after Aeon Hire)
 * Figma: node 63:88
 * Sanity fields (future):
 *   heading     (text)
 *   subheading  (text)
 *   body        (text)
 *   stats       (repeater: icon + label, x2)
 *   logosLabel  (text)
 *   logos       (image)
 *   photo       (image)
 *
 * One composition only — this section scales, it doesn't re-compose, so there
 * is no `xw:` variant and the sizes are plain unprefixed `cap-*`.
 *
 * Single column of content with the photo and globe layered behind it. Both
 * sit flush to the section's right edge and bleed past it, which is why the
 * section clips on the x axis only.
 *
 * Figma puts the column's items at five different left edges (55, 148, 164,
 * 196, 238); they're all aligned to one padding here instead.
 */
const STATS = ["15 Years", "8 Global Offices"];

export default function Differentiator() {
  return (
    <section className="relative w-full overflow-x-clip bg-white">
      <Image
        src="/images/home/differentiator-photo.webp"
        alt=""
        aria-hidden
        width={2682}
        height={1988}
        className="pointer-events-none absolute right-0 cap-w-1341"
      />
      <Image
        src="/images/home/globe.webp"
        alt=""
        aria-hidden
        width={1591}
        height={1558}
        className="pointer-events-none absolute right-0 cap-top-190 cap-w-1105"
      />

      <div className="container relative z-10 cap-px-100 cap-py-20">
        <h2 className="font-arimo font-bold text-[#1f339e] uw-text-56 uw-leading-50 uw-mt-45">
          OUR DIFFERENTIATOR: BEYOND TECH
        </h2>

        <p className="font-normal text-text-default cap-mt-74 uw-max-w-669 xw:max-w-full uw-text-32 uw-leading-54">
          Harnessing the power of meticulous data models to help people find
          their people.
        </p>

        <p className="font-light text-text-default cap-mt-50 uw-max-w-622 xw:uw-max-w-900 uw-text-26 uw-leading-38">
          Aeon Hire&rsquo;s SaaS product, included with MSH services, is
          transforming the recruitment landscape to help you find the best
          people, faster.
        </p>

        {/* arriba de 2560 el "Trusted by" se pone al lado de las stats */}
        <div className="uw-mt-60 xw:flex xw:items-center xw:cap-gap-47">
          <ul className="flex cap-gap-47">
            {STATS.map((stat) => (
              <li
                key={stat}
                className="flex items-center rounded-xl bg-[#f6f6f6] uw-h-95 uw-w-374 uw-gap-38 uw-pl-43"
              >
                <Image
                  src="/images/home/stat-icon.png"
                  alt=""
                  aria-hidden
                  width={84}
                  height={96}
                  className="h-auto shrink-0 cap-w-42"
                />
                <span className="font-extrabold text-text-default uw-text-24">
                  {stat}
                </span>
              </li>
            ))}
          </ul>

          <p className="font-light text-[#1f339e] cap-my-65 uw-text-28 xw:my-0">
            Trusted by
          </p>
        </div>

        <Image
          src="/images/home/trustedlogos.png"
          alt="Blackstone, American Express, United Healthcare and Condé Nast"
          width={2164}
          height={514}
          className="h-auto uw-w-900 xw:uw-mt-60 "
        />
      </div>
    </section>
  );
}
