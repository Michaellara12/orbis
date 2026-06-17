import { SOCIALS } from '../lib/socials'
import AutoVideo from './AutoVideo'
import Reveal from './Reveal'
import { CTA_VIDEO } from '../lib/videos'

// Edit this clip in src/lib/videos.ts (single source of truth, also preloaded).
const VIDEO_URL = CTA_VIDEO

/**
 * SECTION 4 — CTA / FINAL
 * Full-width video shown at its native aspect ratio (w-full h-auto, NOT
 * object-cover). A right-aligned Anton call-to-action with a Condiment
 * "Go beyond" accent overlays the video, and a vertical liquid-glass
 * social menu is anchored bottom-left.
 */
export default function CTA() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Full-width video at native aspect ratio */}
      <AutoVideo src={VIDEO_URL} className="block h-auto w-full" />

      {/* Call-to-action text overlay */}
      <div className="absolute inset-0">
        <div className="mx-auto flex h-full max-w-[1831px] flex-col items-end justify-center px-6 text-right sm:px-10 lg:px-16 lg:pl-[15%] lg:pr-[20%]">
          <Reveal className="relative">
            <span className="pointer-events-none absolute -top-3 left-0 -rotate-3 font-condiment text-[17px] normal-case text-neon mix-blend-exclusion sm:-top-6 sm:text-[34px] md:text-[50px] lg:-top-12 lg:text-[68px]">
              Go beyond
            </span>
            <h2 className="font-grotesk text-[16px] uppercase leading-[1.1] text-cream sm:text-[30px] md:text-[44px] lg:text-[60px]">
              <span className="mb-4 block sm:mb-6 md:mb-8 lg:mb-12">Join us.</span>
              <span className="block">Reveal what&apos;s hidden.</span>
              <span className="block">Define what&apos;s next.</span>
              <span className="block">Follow the signal.</span>
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Vertical social menu — bottom-left */}
      <div className="liquid-glass absolute bottom-[12%] left-[8%] z-20 flex flex-col overflow-hidden rounded-[0.5rem] sm:rounded-[0.75rem] md:bottom-[16%] lg:bottom-[20%] lg:rounded-[1.25rem]">
        {SOCIALS.map(({ Icon, label, href }, i) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className={`flex h-[14vw] w-[14vw] items-center justify-center text-cream transition-colors hover:bg-white/10 sm:h-[4.5rem] sm:w-[14.375rem] md:h-[3.5rem] md:w-[10.78125rem] lg:h-[5.5rem] lg:w-[16.77rem] ${
              i < SOCIALS.length - 1 ? 'border-b border-white/10' : ''
            }`}
          >
            <Icon className="h-5 w-5 lg:h-7 lg:w-7" />
          </a>
        ))}
      </div>
    </section>
  )
}
