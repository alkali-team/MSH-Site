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
      <div className="container flex items-center justify-between uw-px-100 cap-pt-43 cap-pb-20">
        <Image
          src="/images/nav/logo.png"
          alt="MSH — Powered by Aeon"
          width={561}
          height={315}
          className="h-auto uw-w-187"
          priority
        />

        <Image
           src="/images/nav/msh landcscape.svg"
          alt="Icon"
          width={561}
          height={315}
          className="h-auto uw-w-57"
        >
        </Image>
      </div>
    </header>
  );
}
