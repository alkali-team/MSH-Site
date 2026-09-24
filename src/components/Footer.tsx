import Image from "next/image";

/**
 * Block: Footer
 * Figma: node 85:391 (Work Smarter) / node 85:409 (newsletter + legal)
 * Sanity fields (future):
 *   headline   (text)
 *   tagline    (text)
 *   newsletter (heading + body + placeholder)
 *   social     (repeater: network + url)
 *
 * Built up one <section> at a time as the frames come in.
 */
const BLUE = "#233eba";

/**
 * Figma flattens all four link columns into one bitmap (node 86:411), so the
 * labels are transcribed from it rather than exported — a footer's links have
 * to be real anchors. Sizes and the #a0a1c4 lavender were measured off that
 * same export: headings 34px, items 28/38 with a 17px gap between them.
 */
const LINK_COLUMNS = [
  {
    title: "Company",
    links: [
      "About",
      "Leadership",
      "Results",
      "Insights",
      "Locations",
      "Aeon - Hiring Experience Platform",
    ],
  },
  {
    title: "Specialty",
    links: [
      "MSH Healthcare",
      "Technology",
      "Private Equity & VC",
      "Professional Sports",
      "Program Managers",
      "Product Managers",
      "Banking and Finance",
      "Consumer Packaged Goods",
      "Quick Service Restaurants",
      "Data Centers",
      "Renewable Energy",
      "Oil & Gas",
    ],
  },
  {
    title: "Talent",
    links: [
      "Enterprise RPO",
      "Packaged Talent Solutions",
      "Talent Intelligence",
      "Direct Hire",
      "Executive Search",
      "On Demand Staff Augmentation",
      "Proactive IT Support & Help Desk Staffing",
      "Salesforce Staffing Firm",
      "ServiceNow Recruiting",
      "Data Engineering Recruitment",
      "AI Engineer Staffing",
      "SaaS Sales Recruitment",
      "HR Role Staffing",
      "CIO Recruitment",
      "Data Center Executive Search",
      "Renewable Energy Executive Search",
      "Hire Ruby On Rails Developers",
    ],
  },
  {
    title: "Technology",
    links: [
      "SAP Consulting Services",
      "Offshore IT Outsourcing",
      "Nearshore IT Staffing",
      "Digital Commerce Transformation",
      "Enterprise Software Testing",
      "Business Intelligence Consulting",
      "Enterprise IT/Technology Consulting",
      "Enterprise Application Consulting",
      "Digital Transformation Managed Services",
      "Cloud Transformation",
      "DevOps Managed Services",
      "Enterprise Data Management",
      "ServiceNow Consulting",
      "Salesforce Implementation",
    ],
  },
];

const SOCIAL = [
  {
    name: "LinkedIn",
    glyph: (
      <>
        <circle cx="4.1" cy="4.4" r="2.6" />
        <rect x="2" y="9" width="4.2" height="12" rx="0.3" />
        <path d="M9.5 9h4v1.7c.6-1.1 2-2 3.8-2 3 0 4.7 1.9 4.7 5.4V21h-4.2v-6.2c0-1.6-.6-2.6-2-2.6-1.2 0-1.9.8-2.2 1.6-.1.3-.1.7-.1 1.1V21H9.5V9z" />
      </>
    ),
  },
  {
    name: "Instagram",
    glyph: (
      <>
        <rect
          x="2.5"
          y="2.5"
          width="19"
          height="19"
          rx="5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="17.6" cy="6.4" r="1.4" />
      </>
    ),
  },
  {
    name: "Facebook",
    glyph: (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
        <path
          d="M15.5 12.4h-2.2V21h-3.2v-8.6H8.5V9.6h1.6V8c0-1.9 1.1-3 3.2-3h2.3v2.8h-1.5c-.5 0-.8.3-.8.8v2h2.4l-.2 2.8z"
          fill={BLUE}
        />
      </>
    ),
  },
  {
    name: "Twitter",
    glyph: (
      <path d="M23 4.9c-.8.4-1.7.7-2.6.8 1-.6 1.7-1.5 2-2.6-.9.5-1.9.9-2.9 1.1a4.6 4.6 0 0 0-7.9 4.2A13 13 0 0 1 2.2 3.6a4.6 4.6 0 0 0 1.4 6.1c-.7 0-1.4-.2-2-.6v.1c0 2.2 1.6 4.1 3.7 4.5-.7.2-1.4.2-2 .1a4.6 4.6 0 0 0 4.3 3.2A9.2 9.2 0 0 1 1 18.9a13 13 0 0 0 7 2.1c8.4 0 13-7 13-13v-.6c.9-.6 1.7-1.4 2.3-2.3z" />
    ),
  },
  {
    name: "YouTube",
    glyph: (
      <>
        <rect x="1.8" y="5" width="20.4" height="14" rx="4" />
        <path d="M10 8.6l6.2 3.4-6.2 3.4z" fill={BLUE} />
      </>
    ),
  },
  {
    name: "Podcast",
    glyph: (
      <>
        <rect x="9" y="2.5" width="6" height="11" rx="3" />
        <path
          d="M6.2 11.2v.9a5.8 5.8 0 0 0 11.6 0v-.9M12 17.9v3.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="w-full">
      {/* ---------- Work Smarter ---------- */}
      <section className="w-full bg-white ">
        <div className="container flex items-center justify-between uw-px-100 uw-py-100">
          <h2 className="font-arimo font-bold text-primary-navy uw-text-56 uw-leading-64">
            Work Smarter,
            <br />
            Build Farther.
          </h2>

          <div className="flex items-center uw-gap-75">
            <p className="text-right font-normal text-text-default uw-text-28 uw-leading-38">
              Trusted partners building talent
              <br />
              communities, powered by our own technology.
            </p>
            <Image
              src="/images/nav/logo.png"
              alt="MSH — Powered by Aeon"
              width={561}
              height={315}
              className="h-auto shrink-0 uw-w-208"
            />
          </div>
        </div>
      </section>

      {/* ---------- Newsletter + legal ---------- */}
      <section className="w-full bg-[#101059] text-white uw-pt-125 uw-pb-115">
        <div className="container uw-px-100">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-extrabold uw-text-38 uw-leading-52">
                Worth Opening
              </h2>
              <p className="font-normal uw-mt-38 uw-max-w-736 uw-text-26 uw-leading-36">
                The only newsletter with industry insights for the best in
                proven people-practices <em>and</em> with the pulse on emerging
                tech.
              </p>
            </div>

            <form className="flex shrink-0 items-center rounded-full bg-white uw-mt-73 uw-h-99 uw-w-610 uw-pl-65 uw-pr-40">
              <label className="sr-only" htmlFor="footer-email">
                Enter your company email
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your company email"
                className="min-w-0 flex-1 bg-transparent font-normal text-text-default italic outline-none uw-text-24 uw-leading-33"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid shrink-0 cursor-pointer place-items-center rounded-full bg-black transition-opacity hover:opacity-80 uw-h-60 uw-w-85"
              >
                <svg
                  viewBox="0 0 43 19"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="h-auto uw-w-43"
                >
                  <path d="M1 9.5h40M33 2l8 7.5-8 7.5" />
                </svg>
              </button>
            </form>
          </div>

          {/* Figma insets this rule and the two rows under it by different
              amounts on each side; they all sit on the section gutter here. */}
          <div className="w-full rounded-full bg-white uw-mt-158 uw-h-2" />

          <p className="text-right font-normal text-[#aaacc9] uw-mt-39 uw-text-24">
            &copy; 2026 MSH. All Rights Reserved
          </p>

          <ul className="flex uw-mt-32 uw-gap-27">
            {SOCIAL.map((s) => (
              <li key={s.name}>
                <a
                  href="#"
                  aria-label={s.name}
                  className="block transition-opacity hover:opacity-80"
                >
                  <svg
                    viewBox="0 0 40 40"
                    aria-hidden
                    className="h-auto uw-w-57"
                  >
                    <circle cx="20" cy="20" r="20" fill={BLUE} />
                    {/* the glyphs are authored in a 24x24 box, inset to sit
                        inside the circle */}
                    <g
                      fill="#fff"
                      color="#fff"
                      transform="translate(8.8 8.8) scale(0.933)"
                    >
                      {s.glyph}
                    </g>
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Site links ---------- */}
      <section className="w-full bg-[#101059] text-[#a0a1c4] uw-pb-100">
        <div className="container grid grid-cols-4 items-start uw-px-100 uw-gap-x-40">
          {LINK_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-extrabold uw-text-34 uw-leading-46">
                {col.title}
              </h3>
              <ul className="flex flex-col uw-mt-26 uw-gap-17">
                {col.links.map((label) => (
                  <li key={label}>
                    <a
                      href="#"
                      className="transition-colors hover:text-white uw-text-28 uw-leading-38"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </footer>
  );
}
