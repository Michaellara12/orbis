import { SOCIALS } from '../lib/socials'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4'

const NAV_LINKS = ['Homepage', 'Gallery', 'Buy NFT', 'FAQ', 'Contact']

/**
 * SECTION 1 — HERO (full viewport)
 * Full-bleed looping video, liquid-glass navbar, oversized Anton heading
 * with a Condiment accent, and stacked social buttons.
 */
export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden rounded-b-[32px]">
      {/* Full-bleed background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1831px] flex-col px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <header className="relative z-20 flex items-center py-6 lg:py-8">
          <span className="font-grotesk text-[16px] uppercase tracking-wide text-cream">
            Orbis.Nft
          </span>

          {/* Liquid-glass navigation (desktop only) */}
          <nav className="liquid-glass absolute left-1/2 hidden -translate-x-1/2 rounded-[28px] px-[52px] py-[24px] lg:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-grotesk text-[13px] uppercase tracking-wide text-cream transition-colors hover:text-neon"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* Social buttons — desktop, stacked top-right */}
        <div className="absolute right-6 top-28 z-20 hidden flex-col gap-3 sm:right-10 lg:right-16 lg:flex">
          {SOCIALS.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="liquid-glass flex h-14 w-14 items-center justify-center rounded-[1rem] text-cream transition-colors hover:bg-white/10"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Hero heading */}
        <div className="relative flex flex-1 flex-col justify-end pb-16 lg:pb-24">
          <div className="relative max-w-[780px] lg:ml-32">
            <h1 className="font-grotesk text-[40px] uppercase leading-[1.05] text-cream sm:text-[60px] sm:leading-[1] md:text-[75px] lg:text-[90px]">
              Beyond earth
              <br />
              and ( its ) familiar boundaries
            </h1>

            {/* Condiment accent */}
            <span className="pointer-events-none absolute -top-3 right-0 -rotate-1 font-condiment text-[24px] normal-case text-neon opacity-90 mix-blend-exclusion sm:text-[32px] md:text-[40px] lg:-right-10 lg:top-4 lg:text-[48px]">
              Nft collection
            </span>
          </div>

          {/* Social buttons — mobile, centered below heading */}
          <div className="mt-10 flex justify-center gap-3 lg:hidden">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="liquid-glass flex h-14 w-14 items-center justify-center rounded-[1rem] text-cream transition-colors hover:bg-white/10"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
