import AutoVideo from './AutoVideo'
import Reveal from './Reveal'

const VIDEO_URL =
  'https://dnznrvs05pmza.cloudfront.net/seedance_2/cgt-20260616133424-mzsm8/Static_camera__characters_moving_happily_and_celebrating_they_are_in_a_loop.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZGI3ZTc5YmZjMzY5YzYxZSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MTY5OTAwN30.U0mU0esjdVwIgThUxYaMgVCB6ghN2BuJCscYZ3SWBbI'

const DESCRIPTION =
  'A digital object fixed beyond time and place. An exploration of distance, form, and silence in space'

/**
 * SECTION 2 — ABOUT / INTRO (full viewport)
 * Full-bleed video with a subtle dark scrim for legibility. The "Hello! I'm
 * orbis" heading (with a Condiment "Orbis" overlay) sits opposite a short
 * description, both vertically centered.
 */
export default function About() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Full-bleed background video */}
      <AutoVideo
        src={VIDEO_URL}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Subtle scrim so the white text stays readable over the video */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-space/50 via-transparent to-space/50" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1831px] flex-col justify-end px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <Reveal className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="relative w-fit">
            <h2 className="font-grotesk text-[32px] uppercase leading-[1] text-cream drop-shadow-[0_2px_24px_rgba(1,8,40,0.7)] sm:text-[44px] md:text-[52px] lg:text-[60px]">
              Hello!
              <br />
              I&apos;m orbis
            </h2>
            <span className="pointer-events-none absolute -bottom-4 right-0 -rotate-2 font-condiment text-[36px] normal-case text-neon mix-blend-exclusion sm:text-[48px] md:text-[58px] lg:-right-6 lg:text-[68px]">
              Orbis
            </span>
          </div>

          <p className="max-w-[300px] font-gaming text-[14px] uppercase leading-relaxed text-cream drop-shadow-[0_2px_16px_rgba(1,8,40,0.9)] sm:text-[15px] lg:text-[16px]">
            {DESCRIPTION}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
