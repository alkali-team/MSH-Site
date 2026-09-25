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
 * Three independent "expands on click" pieces
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
          className="h-auto mob-w-187 lg:uw-w-187"
          priority
        />

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-label="Open menu"
          className="cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3c70fd"
            strokeWidth={2.5}
            strokeLinecap="round"
            aria-hidden
            className="mob-w-57 lg:uw-w-57"
          >
            <line x1="2" y1="6" x2="12" y2="6" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="18" x2="17" y2="18" />
          </svg>
        </button>

        {menuOpen && (
          <nav className="absolute left-1/2 w-[90%] -translate-x-1/2 mob-top-20 origin-right rounded-3xl bg-white px-6 py-8 shadow-[20px_25px_100px_16px_rgba(0,0,0,0.45)] lg:left-auto lg:w-[80%] lg:translate-x-0 lg:cap-top-50 lg:uw-right-50 lg:uw-rounded-60 lg:uw-py-69 lg:uw-pl-93 lg:uw-pr-60">
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:uw-gap-173">
              <ul className="flex w-full flex-col gap-6 lg:gap-8 lg:w-[90%] lg:flex-row lg:justify-between">
                {NAV.map((item) => {
                  const hasChildren = "children" in item;
                  const isOpen =
                    item.label === "Solutions" ? solutionsOpen : hiringOpen;
                  const setOpen =
                    item.label === "Solutions" ? setSolutionsOpen : setHiringOpen;
                  const toggle = () => setOpen((v) => !v);

                  return (
                    <li key={item.label}>
                      {hasChildren ? (
                        <button
                          type="button"
                          onClick={toggle}
                          aria-expanded={isOpen}
                          className="cursor-pointer font-extrabold text-[#3c70fd] mob-text-32 mob-leading-54 lg:uw-text-35 lg:uw-leading-54"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <a
                          href={item.href}
                          className="font-extrabold text-[#3c70fd] mob-text-32 mob-leading-54 lg:uw-text-35 lg:uw-leading-54"
                        >
                          {item.label}
                        </a>
                      )}

                      {hasChildren && (
                        <div
                          className="grid transition-[grid-template-rows] duration-300 ease-out"
                          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                        >
                          <ul className="flex flex-col gap-3 overflow-hidden pt-3 lg:block lg:gap-0 lg:pt-0 lg:uw-mt-9">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <a
                                  href={child.href}
                                  className="block font-extrabold text-text-default mob-text-28 mob-leading-45 lg:uw-text-28 lg:uw-leading-45"
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
                className="absolute left-[calc(100%-60px)] mob-top-32 shrink-0 cursor-pointer lg:left-auto lg:uw-right-60 lg:uw-top-30"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3c70fd"
                  strokeWidth={2}
                  strokeLinecap="round"
                  aria-hidden
                  className="mob-w-45 lg:uw-w-45"
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
