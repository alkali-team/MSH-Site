import Image from "next/image";

/**
 * Block: Header / Nav
 * Figma: node 22:58 (Group 325)
 * Sanity fields (future): logo (image), navItems (array of { label, href })
 *
 * Static for now — logo + menu button only. Expand-on-click nav behavior
 * comes in a follow-up pass.
 */
export default function Header() {
  return (
    <header className="relative z-50 w-full bg-white">
      <div className="container flex items-center justify-between lg:px-[100px] lg:pt-[43px] lg:pb-5 uw:cap-px-100 uw:cap-pt-43">
        <Image
          src="/images/nav/logo.png"
          alt="MSH — Powered by Aeon"
          width={561}
          height={315}
          className="h-auto lg:w-[187px] uw:uw-w-187"
          priority
        />

        <Image
           src="/images/nav/msh landcscape.svg"
          alt="Icon"
          width={561}
          height={315}
          className="h-auto lg:w-[57px] uw:uw-w-57"
        >
        </Image>
      </div>
    </header>
  );
}
