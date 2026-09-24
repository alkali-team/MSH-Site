import Image from "next/image";

/**
 * Block: Home — Intro (section right after the Header)
 * Figma: node 28:64 (Rectangle 660, 1920x890)
 * Sanity fields (future):
 *   heading      (text)
 *   subheading   (text)
 *   cta          (link: label + url)
 *   collage      (image)
 *   footnote     (text)
 *
 * The moon/orb graphic that bleeds over this section's bottom edge belongs to
 * the NEXT section — it lives there with a negative top offset, so it paints
 * over this one. Keep this section's overflow visible.
 */
export default function Intro() {
  return (
    <section className="relative w-full bg-white">
      {/* decorative blur pills, cropped at the frame edges by design */}
      <div className="container relative z-10 flex flex-col items-center text-center text-text-default">
        <div className="flex flex-col items-center">
        <h1 className="font-extrabold uw-text-42 uw-leading-54">
          Scale Your Team With High Quality, Vetted Professionals
        </h1>

        <p className="font-normal cap-mt-38 cap-max-w-801 uw-text-24 uw-leading-32">
          Companies work with us to quickly staff teams of 20 to 1,000. Build
          your sustainable team with great people who fit your unique culture.
        </p>

        <a
          href="#"
          className="cta-arrow cap-mt-47"
        >
          Get a Consultation
        </a>
        </div>

        <div className="relative w-full -uw-top-50">
          <Image
            src="/images/home/blur-left.png"
            alt=""
            aria-hidden
            width={76}
            height={274}
            className="absolute top-1/2 -translate-y-1/2 cap-left-60 uw-w-38"
          />
          <Image
            src="/images/home/msh landcscape designs.webp"
            alt="MSH professionals"
            width={2721}
            height={1026}
            priority
            className="h-auto m-auto uw-w-1434"
          />
          <Image
            src="/images/home/blur-right.png"
            alt=""
            aria-hidden
            width={76}
            height={274}
            className="absolute top-1/2  -translate-y-1/2 cap-right-60 uw-w-38"
          />
        </div>

        <p className="font-light uw-max-w-494 uw-text-24 uw-leading-26 relative -uw-top-150">
          We place technology and talent at the intersection of every critical
          business function.
        </p>
      </div>
    </section>
  );
}
