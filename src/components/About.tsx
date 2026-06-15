const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4'

const DESCRIPTION =
  'A digital object fixed beyond time and place. An exploration of distance, form, and silence in space'

/** Faint, decorative repeats of the description (opacity-10). */
const DECO_CLASS =
  'max-w-[266px] font-mono text-[14px] uppercase leading-relaxed text-[#010828] opacity-10 sm:text-[15px] lg:text-[16px] lg:text-cream'

/**
 * SECTION 2 — ABOUT / INTRO (full viewport)
 * Full-bleed video. Top row pairs the "Hello! I'm orbis" heading (with a
 * Condiment "Orbis" overlay) against a short monospace description.
 * Bottom row scatters faint decorative repeats of that description.
 */
export default function About() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
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

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1831px] flex-col justify-between px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        {/* Top row */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="relative w-fit">
            <h2 className="font-grotesk text-[32px] uppercase leading-[1] text-cream sm:text-[44px] md:text-[52px] lg:text-[60px]">
              Hello!
              <br />
              I&apos;m orbis
            </h2>
            <span className="pointer-events-none absolute -bottom-4 right-0 -rotate-2 font-condiment text-[36px] normal-case text-neon mix-blend-exclusion sm:text-[48px] md:text-[58px] lg:-right-6 lg:text-[68px]">
              Orbis
            </span>
          </div>

          <p className="max-w-[266px] font-mono text-[14px] uppercase leading-relaxed text-cream sm:text-[15px] lg:text-[16px]">
            {DESCRIPTION}
          </p>
        </div>

        {/* Bottom row — faint decorative repeats */}
        <div className="flex justify-between">
          <div className="space-y-4">
            <p className={DECO_CLASS}>{DESCRIPTION}</p>
            <p className={DECO_CLASS}>{DESCRIPTION}</p>
          </div>
          <div className="hidden space-y-4 lg:block">
            <p className={DECO_CLASS}>{DESCRIPTION}</p>
            <p className={DECO_CLASS}>{DESCRIPTION}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
