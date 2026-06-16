import { SOCIALS } from '../lib/socials'
import Reveal from './Reveal'

/**
 * SECTION — CONTACT
 * A liquid-glass panel with a short pitch, social links, and a simple
 * message form. The form is front-end only (no backend) — submitting just
 * resets it; wire it to a real endpoint when one exists.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full scroll-mt-8 border-t border-white/5 bg-space"
    >
      <div className="mx-auto max-w-[1100px] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <Reveal className="glass-strong overflow-hidden rounded-[32px] p-8 sm:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — pitch + socials */}
            <div>
              <div className="relative w-fit">
                <h2 className="font-grotesk text-[32px] uppercase leading-[1.05] text-cream sm:text-[44px] md:text-[52px] lg:text-[60px]">
                  Get in
                  <br />
                  touch
                </h2>
                <span className="pointer-events-none absolute -bottom-2 right-0 -rotate-2 font-condiment text-[28px] normal-case text-neon mix-blend-exclusion sm:text-[38px] lg:-right-6 lg:text-[48px]">
                  say hi
                </span>
              </div>

              <p className="mt-8 max-w-[380px] font-gaming text-[13px] uppercase leading-relaxed text-cream/70 sm:text-[14px]">
                Questions about a drop, a collaboration, or where the signal
                leads next? Send a message and we&apos;ll find you across the
                void.
              </p>

              <div className="mt-10 flex gap-3">
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

            {/* Right — message form */}
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault()
                e.currentTarget.reset()
              }}
            >
              <label className="flex flex-col gap-2">
                <span className="font-gaming text-[11px] uppercase tracking-wide text-cream/60">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="rounded-[14px] border border-white/10 bg-white/5 px-4 py-3 font-gaming text-[14px] text-cream placeholder:text-cream/30 focus:border-neon focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-gaming text-[11px] uppercase tracking-wide text-cream/60">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@orbit.space"
                  className="rounded-[14px] border border-white/10 bg-white/5 px-4 py-3 font-gaming text-[14px] text-cream placeholder:text-cream/30 focus:border-neon focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-gaming text-[11px] uppercase tracking-wide text-cream/60">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us what you're looking for…"
                  className="resize-none rounded-[14px] border border-white/10 bg-white/5 px-4 py-3 font-gaming text-[14px] text-cream placeholder:text-cream/30 focus:border-neon focus:outline-none"
                />
              </label>

              <button
                type="submit"
                className="btn-glow mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] px-8 py-4 font-grotesk text-[14px] uppercase tracking-wide text-white shadow-lg shadow-purple-500/40"
              >
                Send message
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
