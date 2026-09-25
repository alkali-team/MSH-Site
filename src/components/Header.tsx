"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Block: Header / Nav
 * Figma: node 22:58 (logo + hamburger icon, closed state) / node 121:31 (the
 * pill the hamburger reveals — supersedes the earlier node 117:30, which was
 * missing the 4th link and the close icon)
 * Sanity fields (future): logo (image), navItems (array of
 *   { label, href, children?: { label, href }[] })
 *
 * Three independent "expands on click" pieces:
 *   - the hamburger opens the pill. It stays exactly where it is and doesn't
 *     hide, swap, or get covered when open — the X is its own button living
 *     INSIDE the pill's top-right corner (confirmed against 121:31: the X's
 *     x-position sits inside the card's own right edge, not out at the
 *     hamburger's position in the header row).
 *   - "Solutions" toggles "By Industry" under it — blue, italic
 *   - "Hiring" toggles its own three items — black, not italic, a visually
 *     different kind of sub-item than Solutions' single blue one
 *
 * The pill auto-sizes with its content (flex-col + padding) rather than a
 * fixed height, because Figma only gives two snapshots — nothing open, and
 * BOTH submenus open together — and with two independent toggles there are
 * two more combinations (only one open) it never shows.
 *
 * Logo/icon row keeps justify-between (logo pinned left, icon pinned right)
 * — the pill is absolutely positioned, not a third flex child, so opening it
 * can't push the icon inward. Anchored 231px past the logo (331px in the
 * 1920 frame, minus the 100px gutter).
 *
 * top-0 (not a hand-picked uw-top-*): the pill's own top padding + half its
 * first line-height already comes out to ~96px, almost exactly the header
 * row's own vertical center (43px top padding + half the logo's ~105px
 * height ≈ 95.5px) — so sitting flush with the header's top edge is what
 * puts the pill's link row at the row's center, not an offset from it.
 * uw-right-100: same gutter the row itself uses, so the pill's right edge
 * lands exactly on the hamburger's right edge without a separate magic
 * number to keep in sync. The X still finds that edge on its own via
 * ml-auto inside the pill's row — only the pill's outer box is pinned.
 */
const NAV = [
  { label: "About", href: "#" },
  {
    label: "Solutions",
    href: "#",
    children: [{ label: "By Industry", href: "#" }],
  },
  { label: "Case Studies", href: "#" },
  {
    label: "Hiring",
    href: "#",
    children: [
      { label: "Resources", href: "#" },
      { label: "Blog & Media", href: "#" },
      { label: "Employment", href: "#" },
    ],
  },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [hiringOpen, setHiringOpen] = useState(false);

  return (
    <header className="relative z-50 w-full bg-white">
      <div className="container flex items-center justify-between uw-px-100 cap-pt-50 cap-pb-20">
        <Image
          src="/images/nav/logo.png"
          alt="MSH — Powered by Aeon"
          width={561}
          height={315}
          className="h-auto uw-w-187"
          priority
        />

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-label="Open menu"
          className="cursor-pointer"
        >
          <Image
            src="/images/nav/msh landcscape.svg"
            alt=""
            aria-hidden
            width={561}
            height={315}
            className="h-auto uw-w-57"
          />
        </button>

        {menuOpen && (
          <nav className="absolute w-[80%] origin-right cap-top-50 uw-right-50 bg-white uw-rounded-60 shadow-[20px_25px_100px_16px_rgba(0,0,0,0.45)] uw-py-69 uw-pl-93 uw-pr-60 animate-[menu-open_500ms_ease-out]">
            <div className="flex items-start uw-gap-173 animate-[menu-content-in_250ms_ease-out_250ms_both]">
              <ul className="flex w-[90%] justify-between">
                {NAV.map((item) => {
                  const hasChildren = "children" in item;
                  const isOpen =
                    item.label === "Solutions" ? solutionsOpen : hiringOpen;
                  const setOpen =
                    item.label === "Solutions" ? setSolutionsOpen : setHiringOpen;

                  return (
                    <li
                      key={item.label}
                      onMouseEnter={
                        hasChildren ? () => setOpen(true) : undefined
                      }
                      onMouseLeave={
                        hasChildren ? () => setOpen(false) : undefined
                      }
                    >
                      {hasChildren ? (
                        <span
                          aria-expanded={isOpen}
                          className="font-extrabold text-[#3c70fd] uw-text-35 uw-leading-54"
                        >
                          {item.label}
                        </span>
                      ) : (
                        <a
                          href={item.href}
                          className="font-extrabold text-[#3c70fd] uw-text-35 uw-leading-54"
                        >
                          {item.label}
                        </a>
                      )}

                      {hasChildren && (
                        <div
                          className="grid transition-[grid-template-rows] duration-300 ease-out"
                          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                        >
                          <ul className="overflow-hidden uw-mt-9">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <a
                                  href={child.href}
                                  className={
                                    item.label === "Solutions"
                                      ? "font-extrabold italic text-text-default uw-text-29 uw-leading-45"
                                      : "block font-extrabold text-text-default uw-text-28 uw-leading-45"
                                  }
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setSolutionsOpen(false);
                  setHiringOpen(false);
                }}
                aria-label="Close menu"
                className="absolute uw-right-60 uw-top-30 shrink-0 cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3c70fd"
                  strokeWidth={2}
                  strokeLinecap="round"
                  aria-hidden
                  className="uw-w-45"
                >
                  <line x1="4" y1="4" x2="20" y2="20" />
                  <line x1="20" y1="4" x2="4" y2="20" />
                </svg>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
