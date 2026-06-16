import { SOCIALS } from '../lib/socials'
import AutoVideo from './AutoVideo'
import Reveal from './Reveal'
import { HERO_VIDEO } from '../lib/videos'

// Preloaded by the loading screen, so it's cached the moment the page reveals.
const VIDEO_URL = HERO_VIDEO

const NAV_LINKS = [
  { label: 'Homepage', href: '#homepage' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Buy NFT', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

/**
 * SECTION 1 — HERO
 * Two stacked parts: a pure-black panel holding the navbar + oversized title,
 * then the looping video below as the "second part". A gradient blends the
 * black panel into the top of the video, and a second gradient fades the
 * video into the page background below.
 */
export default function Hero() {
  return (
    <section
      id="homepage"
      className="relative w-full overflow-hidden rounded-b-[32px] bg-black"
    >
      {/* ---- PART 1 — black panel with navbar + title ---- */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1831px] flex-col px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <header className="relative z-20 flex items-center py-6 lg:py-8">
          <span className="font-grotesk text-[16px] uppercase tracking-wide text-cream">
            Orbis.Nft
          </span>

          {/* Liquid-glass navigation (desktop only) */}
          <nav className="liquid-glass absolute left-1/2 hidden -translate-x-1/2 rounded-[28px] px-[52px] py-[24px] lg:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="link-underline font-grotesk text-[13px] uppercase tracking-wide text-cream transition-colors hover:text-neon"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social buttons — desktop, stacked top-right */}
          <div className="absolute right-0 top-24 z-20 hidden flex-col gap-3 lg:flex">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="liquid-glass btn-glow flex h-14 w-14 items-center justify-center rounded-[1rem] text-cream hover:bg-white/10"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </header>

        {/* Title — centered on the black panel */}
        <div className="relative flex flex-col items-center pb-10 pt-6 text-center sm:pb-12 sm:pt-8 lg:pb-14 lg:pt-10">
          <Reveal className="relative max-w-[760px]">
            <h1 className="font-grotesk text-[30px] uppercase leading-[1.25] tracking-[0.04em] text-cream sm:text-[42px] sm:leading-[1.2] md:text-[52px] lg:text-[62px] lg:leading-[1.15]">
              Beyond earth
              <br />
              and ( its ) familiar boundaries
            </h1>

            {/* Condiment accent */}
            <span className="pointer-events-none absolute -top-3 right-0 -rotate-1 font-condiment text-[24px] normal-case text-neon opacity-90 sm:text-[32px] md:text-[40px] lg:-right-10 lg:top-4 lg:text-[48px]">
              Nft collection
            </span>
          </Reveal>

          {/* Social buttons — mobile, centered below heading */}
          <div className="mt-10 flex justify-center gap-3 lg:hidden">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="liquid-glass btn-glow flex h-14 w-14 items-center justify-center rounded-[1rem] text-cream hover:bg-white/10"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ---- PART 2 — the video ---- */}
      <div className="relative">
        {/* The source clip is an ultrawide 1470×630 (2.33:1) band. Filling a
            tall box with object-cover crops the far sides so the frame reads
            taller/squarer (instead of a thin wide strip) and the characters
            sit larger — object-center keeps all three in view. */}
        <AutoVideo
          src={VIDEO_URL}
          preload="auto"
          eager
          className="block h-[72vh] w-full object-cover object-center sm:h-[85vh] lg:h-screen"
        />

        {/* Top gradient — blends the black panel into the video */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-black via-black/70 to-transparent" />

        {/* Bottom gradient — fades the video into the page background */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent via-space/60 to-space" />
      </div>
    </section>
  )
}
