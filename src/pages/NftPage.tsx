import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { NFTS, getNft, type NftTrait } from '../lib/nfts'
import { SOCIALS } from '../lib/socials'
import { useInView } from '../hooks/useInView'
import AutoVideo from '../components/AutoVideo'
import Reveal from '../components/Reveal'

/** A single attribute card whose rarity bar fills in when scrolled into view. */
function TraitCard({ trait }: { trait: NftTrait }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className="glass-strong rounded-[20px] px-6 py-5">
      <div className="flex items-center justify-between">
        <span className="font-gaming text-[11px] uppercase tracking-wide text-cream/50">
          {trait.label}
        </span>
        <span className="font-gaming text-[11px] uppercase text-neon">
          {trait.rarity}% have this
        </span>
      </div>
      <div className="mt-2 font-grotesk text-[22px] uppercase text-cream">
        {trait.value}
      </div>
      <div className="mt-4 h-[6px] w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="bar-fill h-full rounded-full bg-gradient-to-r from-[#b724ff] to-neon"
          style={{ width: inView ? `${100 - trait.rarity}%` : 0 }}
        />
      </div>
    </div>
  )
}

/**
 * Dedicated, long-form page for a single NFT — `/nft/:slug`.
 * Big looping hero, lore, rarity-weighted traits, on-chain stats, a
 * provenance timeline, prev/next navigation, and the rest of the collection.
 */
export default function NftPage() {
  const { slug } = useParams()
  const nft = getNft(slug)

  if (!nft) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="font-grotesk text-[40px] uppercase text-cream">
          NFT not found
        </h1>
        <Link
          to="/"
          className="font-gaming text-[13px] uppercase tracking-wide text-neon hover:underline"
        >
          ← Back to collection
        </Link>
      </div>
    )
  }

  const index = NFTS.findIndex((n) => n.slug === nft.slug)
  const prev = NFTS[(index - 1 + NFTS.length) % NFTS.length]
  const next = NFTS[(index + 1) % NFTS.length]
  const others = NFTS.filter((n) => n.slug !== nft.slug)

  return (
    <div className="relative w-full">
      {/* Accent wash bleeding down from the top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] opacity-30 blur-[120px]"
        style={{
          background: `radial-gradient(60% 60% at 50% 0%, ${nft.accent}, transparent 70%)`,
        }}
      />

      {/* Top bar */}
      <header className="relative z-30 mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 sm:px-10 lg:px-16 lg:py-8">
        <Link
          to="/"
          className="link-underline font-grotesk text-[16px] uppercase tracking-wide text-cream"
        >
          Orbis.Nft
        </Link>
        <Link
          to="/"
          className="liquid-glass btn-glow flex items-center gap-2 rounded-full px-5 py-3 font-gaming text-[12px] uppercase tracking-wide text-cream"
        >
          <ArrowLeft size={16} />
          Collection
        </Link>
      </header>

      {/* ---- HERO ---- */}
      <section className="relative mx-auto max-w-[1400px] px-6 pb-16 pt-6 sm:px-10 lg:px-16 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Video */}
          <Reveal className="lg:sticky lg:top-8 lg:self-start">
            <div
              className="glass-strong rounded-[32px] p-[18px]"
              style={{ boxShadow: `0 40px 120px -30px ${nft.accent}55` }}
            >
              <div className="relative w-full overflow-hidden rounded-[24px] pb-[100%]">
                <AutoVideo
                  src={nft.video}
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* Summary */}
          <div className="flex flex-col">
            <Reveal delay={60}>
              <span
                className="font-gaming text-[12px] font-semibold uppercase tracking-[0.3em]"
                style={{ color: nft.accent }}
              >
                NFT #{String(nft.id).padStart(3, '0')} · {nft.edition}
              </span>

              <h1 className="mt-4 font-grotesk text-[64px] uppercase leading-[0.95] text-cream sm:text-[88px] lg:text-[110px]">
                {nft.name}
              </h1>
              <p className="mt-4 max-w-[460px] font-gaming text-[14px] uppercase leading-relaxed text-cream/70">
                {nft.tagline}
              </p>
            </Reveal>

            {/* Price card */}
            <Reveal delay={120}>
              <div className="glass-strong mt-10 rounded-[24px] p-6 sm:p-8">
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <div className="font-gaming text-[11px] uppercase tracking-wide text-cream/50">
                      Current price
                    </div>
                    <div className="font-grotesk text-[40px] uppercase leading-none text-cream sm:text-[52px]">
                      {nft.price}
                    </div>
                    <div className="mt-2 font-gaming text-[11px] uppercase text-cream/50">
                      Last sale {nft.lastSale} · Rarity {nft.score}
                    </div>
                  </div>
                  <a
                    href="#claim"
                    className="btn-glow inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] px-9 py-4 font-grotesk text-[15px] uppercase tracking-wide text-white shadow-lg shadow-purple-500/40"
                  >
                    Buy now
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Quick stats */}
            <Reveal delay={180}>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {nft.stats.map((s) => (
                  <div key={s.label} className="glass-strong rounded-[16px] px-4 py-3">
                    <div className="font-gaming text-[10px] uppercase tracking-wide text-cream/50">
                      {s.label}
                    </div>
                    <div className="mt-1 font-grotesk text-[15px] uppercase text-cream">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- LORE ---- */}
      <section className="border-t border-white/5 bg-gradient-to-b from-transparent to-[#0a0420]/60">
        <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-20">
            <Reveal>
              <div className="relative h-fit w-fit">
                <h2 className="font-grotesk text-[32px] uppercase leading-[1] text-cream sm:text-[40px]">
                  The story
                </h2>
                <span className="pointer-events-none absolute -bottom-3 right-0 -rotate-2 font-condiment text-[26px] normal-case text-neon sm:text-[34px]">
                  lore
                </span>
              </div>
            </Reveal>
            <div className="max-w-[760px] space-y-6">
              {nft.lore.map((paragraph, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p className="font-gaming text-[14px] leading-[1.9] text-cream/75 sm:text-[15px]">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- TRAITS ---- */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <Reveal>
            <h2 className="mb-10 font-grotesk text-[32px] uppercase leading-[1] text-cream sm:text-[40px]">
              Attributes
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {nft.traits.map((trait, i) => (
              <Reveal key={trait.label} delay={i * 70}>
                <TraitCard trait={trait} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- PROVENANCE ---- */}
      <section className="border-t border-white/5 bg-gradient-to-b from-transparent to-[#0a0420]/60">
        <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <Reveal>
            <h2 className="mb-10 font-grotesk text-[32px] uppercase leading-[1] text-cream sm:text-[40px]">
              Provenance
            </h2>
          </Reveal>
          <ol className="relative ml-3 border-l border-white/10">
            {nft.timeline.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <li className="mb-8 pl-8 last:mb-0">
                  <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-neon shadow-[0_0_12px_rgba(111,255,0,0.7)]" />
                  <div className="font-gaming text-[11px] uppercase tracking-wide text-neon">
                    {t.date}
                  </div>
                  <div className="mt-1 font-gaming text-[14px] uppercase text-cream/80">
                    {t.event}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- CLAIM CTA ---- */}
      <section id="claim" className="scroll-mt-8 border-t border-white/5">
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
          <Reveal>
            <div className="glass-strong relative overflow-hidden rounded-[32px] p-10 text-center sm:p-16">
              <div
                className="pointer-events-none absolute inset-0 opacity-40 blur-[120px]"
                style={{ background: nft.accent }}
              />
              <div className="relative">
                <h2 className="font-grotesk text-[36px] uppercase leading-[1.05] text-cream sm:text-[52px]">
                  Claim {nft.name}
                </h2>
                <p className="mx-auto mt-4 max-w-[420px] font-gaming text-[13px] uppercase leading-relaxed text-cream/70">
                  Connect your wallet to make {nft.name} a permanent part of
                  your orbit.
                </p>
                <a
                  href="#claim"
                  className="btn-glow mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] px-10 py-4 font-grotesk text-[15px] uppercase tracking-wide text-white shadow-lg shadow-purple-500/40"
                >
                  Buy for {nft.price}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- PREV / NEXT ---- */}
      <section className="border-t border-white/5">
        <div className="mx-auto grid max-w-[1400px] gap-4 px-6 py-10 sm:grid-cols-2 sm:px-10 lg:px-16">
          <Link
            to={`/nft/${prev.slug}`}
            className="glass-strong btn-glow flex items-center gap-3 rounded-[20px] px-6 py-5"
          >
            <ArrowLeft size={18} className="shrink-0 text-neon" />
            <span className="min-w-0">
              <span className="block font-gaming text-[10px] uppercase tracking-wide text-cream/50">
                Previous
              </span>
              <span className="block font-grotesk text-[22px] uppercase text-cream">
                {prev.name}
              </span>
            </span>
          </Link>
          <Link
            to={`/nft/${next.slug}`}
            className="glass-strong btn-glow flex items-center justify-end gap-3 rounded-[20px] px-6 py-5 text-right"
          >
            <span className="min-w-0">
              <span className="block font-gaming text-[10px] uppercase tracking-wide text-cream/50">
                Next
              </span>
              <span className="block font-grotesk text-[22px] uppercase text-cream">
                {next.name}
              </span>
            </span>
            <ArrowRight size={18} className="shrink-0 text-neon" />
          </Link>
        </div>
      </section>

      {/* ---- MORE FROM THE COLLECTION ---- */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <Reveal>
            <h2 className="mb-10 font-grotesk text-[32px] uppercase leading-[1] text-cream sm:text-[40px]">
              More from the orbit
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 80}>
                <Link
                  to={`/nft/${other.slug}`}
                  className="glass-strong group flex items-center gap-5 rounded-[24px] p-4 transition-colors hover:bg-white/[0.06]"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[16px]">
                    <AutoVideo
                      src={other.video}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-grotesk text-[28px] uppercase leading-none text-cream">
                      {other.name}
                    </div>
                    <div className="mt-1 truncate font-gaming text-[11px] uppercase text-cream/50">
                      {other.tagline}
                    </div>
                  </div>
                  <div className="font-grotesk text-[18px] uppercase text-neon">
                    {other.price}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row sm:px-10 lg:px-16">
          <Link
            to="/"
            className="link-underline font-grotesk text-[16px] uppercase tracking-wide text-cream"
          >
            Orbis.Nft
          </Link>
          <div className="flex gap-3">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="liquid-glass btn-glow flex h-12 w-12 items-center justify-center rounded-[1rem] text-cream"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
