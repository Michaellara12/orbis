import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { NFTS, getNft, type NftTrait } from '../lib/nfts'
import { SOCIALS } from '../lib/socials'
import { useInView } from '../hooks/useInView'
import AutoVideo from '../components/AutoVideo'
import Reveal from '../components/Reveal'
import { NFT_SECTION_VIDEO, NFT_SECTION_POSTER } from '../lib/videos'

/** A single attribute, shown as an open row whose rarity bar fills in on view. */
function TraitRow({ trait }: { trait: NftTrait }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className="border-t border-white/10 py-5">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-gaming text-[11px] uppercase tracking-wide text-cream/50">
          {trait.label}
        </span>
        <span className="font-gaming text-[11px] uppercase text-neon">
          {trait.rarity}% have this
        </span>
      </div>
      <div className="mt-1 font-grotesk text-[22px] uppercase text-cream">
        {trait.value}
      </div>
      <div className="mt-3 h-[5px] w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="bar-fill h-full rounded-full bg-gradient-to-r from-[#b724ff] to-neon"
          style={{ width: inView ? `${100 - trait.rarity}%` : 0 }}
        />
      </div>
    </div>
  )
}

/**
 * Dedicated page for a single NFT — `/nft/:slug`.
 * Card-light, editorial layout: a big looping hero, the story, attributes,
 * an atmospheric video band, a claim CTA, and prev/next navigation.
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
          className="link-underline flex items-center gap-2 font-gaming text-[12px] uppercase tracking-wide text-cream"
        >
          <ArrowLeft size={16} className="text-neon" />
          Collection
        </Link>
      </header>

      {/* ---- HERO ---- */}
      <section className="relative mx-auto max-w-[1400px] px-6 pb-16 pt-6 sm:px-10 lg:px-16 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Video — clean rounded frame, no card chrome */}
          <Reveal className="lg:sticky lg:top-8 lg:self-start">
            <div
              className="relative w-full overflow-hidden rounded-[24px] pb-[100%]"
              style={{ boxShadow: `0 40px 120px -30px ${nft.accent}66` }}
            >
              <AutoVideo
                src={nft.video}
                preload="auto"
                eager
                className="absolute inset-0 h-full w-full object-cover"
              />
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

            {/* Price — open block, divider instead of a card */}
            <Reveal delay={120}>
              <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-8">
                <div>
                  <div className="font-gaming text-[11px] uppercase tracking-wide text-cream/50">
                    Current price
                  </div>
                  <div className="font-grotesk text-[44px] uppercase leading-none text-cream sm:text-[56px]">
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
            </Reveal>

            {/* Quick stats — open columns, no cards */}
            <Reveal delay={180}>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-8 sm:grid-cols-4">
                {nft.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-gaming text-[10px] uppercase tracking-wide text-cream/50">
                      {s.label}
                    </div>
                    <div className="mt-1 font-grotesk text-[16px] uppercase text-cream">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- THE STORY ---- */}
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

      {/* ---- ATTRIBUTES (right below the story) ---- */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-20">
            <Reveal>
              <div className="relative h-fit w-fit">
                <h2 className="font-grotesk text-[32px] uppercase leading-[1] text-cream sm:text-[40px]">
                  Attributes
                </h2>
                <span className="pointer-events-none absolute -bottom-3 right-0 -rotate-2 font-condiment text-[26px] normal-case text-neon sm:text-[34px]">
                  traits
                </span>
              </div>
            </Reveal>
            <div className="max-w-[760px]">
              {nft.traits.map((trait, i) => (
                <Reveal key={trait.label} delay={i * 70}>
                  <TraitRow trait={trait} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- FLOATING ATMOSPHERE ---- */}
      <section className="relative w-full overflow-hidden border-t border-white/5">
        <AutoVideo
          src={NFT_SECTION_VIDEO}
          poster={NFT_SECTION_POSTER}
          className="block h-[58vh] w-full object-cover object-center sm:h-[68vh]"
        />

        {/* Scrims blend the band into the page above and below */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-space to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent to-space" />

        {/* Accent wash tinted to the NFT */}
        <div
          className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
          style={{
            background: `radial-gradient(60% 60% at 50% 50%, ${nft.accent}, transparent 70%)`,
          }}
        />

        {/* Caption */}
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <Reveal className="relative">
            <h2 className="font-grotesk text-[28px] uppercase leading-[1.1] text-cream drop-shadow-[0_2px_24px_rgba(1,8,40,0.85)] sm:text-[40px] lg:text-[52px]">
              Always in motion
            </h2>
            <span className="pointer-events-none absolute -bottom-4 right-0 -rotate-2 font-condiment text-[24px] normal-case text-neon sm:text-[32px]">
              in orbit
            </span>
          </Reveal>
        </div>
      </section>

      {/* ---- PREV / NEXT — plain links, no cards ---- */}
      <section className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-10 sm:px-10 lg:px-16">
          <Link to={`/nft/${prev.slug}`} className="group flex items-center gap-3">
            <ArrowLeft
              size={18}
              className="shrink-0 text-neon transition-transform group-hover:-translate-x-1"
            />
            <span className="min-w-0">
              <span className="block font-gaming text-[10px] uppercase tracking-wide text-cream/50">
                Previous
              </span>
              <span className="block font-grotesk text-[22px] uppercase text-cream transition-colors group-hover:text-neon">
                {prev.name}
              </span>
            </span>
          </Link>
          <Link
            to={`/nft/${next.slug}`}
            className="group flex items-center gap-3 text-right"
          >
            <span className="min-w-0">
              <span className="block font-gaming text-[10px] uppercase tracking-wide text-cream/50">
                Next
              </span>
              <span className="block font-grotesk text-[22px] uppercase text-cream transition-colors group-hover:text-neon">
                {next.name}
              </span>
            </span>
            <ArrowRight
              size={18}
              className="shrink-0 text-neon transition-transform group-hover:translate-x-1"
            />
          </Link>
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
