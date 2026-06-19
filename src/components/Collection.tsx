import { Link } from 'react-router-dom'
import { NFTS } from '../lib/nfts'
import AutoVideo from './AutoVideo'
import Reveal from './Reveal'

/**
 * SECTION 3 — NFT COLLECTION GRID
 * Solid #010828 background. A two-part header ("Collection of Space objects"
 * + a "SEE ALL CREATORS" button) above a responsive grid of liquid-glass
 * NFT cards, each with a square looping video and a rarity-score overlay.
 */
export default function Collection() {
  return (
    <section id="gallery" className="w-full bg-space">
      <div className="mx-auto max-w-[1831px] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        {/* Header row */}
        <Reveal className="mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:mb-16">
          {/* Heading */}
          <h2 className="font-grotesk text-[32px] uppercase leading-[1.05] text-cream sm:text-[44px] md:text-[52px] lg:text-[60px]">
            <span className="block">Collection of</span>
            <span className="ml-12 block sm:ml-24 lg:ml-32">
              <span className="font-condiment normal-case text-neon">Space</span>{' '}
              objects
            </span>
          </h2>

          {/* "SEE ALL CREATORS" button */}
          <a
            href="#gallery"
            className="group flex flex-col items-start sm:items-end"
          >
            <span className="flex items-start gap-2">
              <span className="font-grotesk text-[32px] uppercase leading-[0.8] text-cream sm:text-[44px] md:text-[52px] lg:text-[60px]">
                See
              </span>
              <span className="flex flex-col font-grotesk text-[20px] uppercase leading-[0.95] text-cream sm:text-[28px] md:text-[32px] lg:text-[36px]">
                <span>All</span>
                <span>Creators</span>
              </span>
            </span>
            <span className="mt-3 h-[6px] w-full origin-left bg-neon transition-transform duration-300 group-hover:scale-x-110 md:h-[8px] lg:h-[10px]" />
          </a>
        </Reveal>

        {/* Card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {NFTS.map((card, i) => (
            <Reveal key={card.id} delay={i * 100}>
              <Link
                to={`/nft/${card.slug}`}
                aria-label={`View ${card.name}`}
                className="liquid-glass btn-glow group block rounded-[32px] p-[18px] hover:bg-white/10"
              >
                <div className="relative w-full overflow-hidden rounded-[24px] pb-[100%]">
                  <AutoVideo
                    src={card.video}
                    poster={card.poster}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Name + rarity overlay bar */}
                <div className="liquid-glass absolute inset-x-3 bottom-3 flex items-center justify-between rounded-[20px] px-5 py-4">
                  <div className="leading-tight">
                    <div className="font-grotesk text-[20px] uppercase leading-none text-cream">
                      {card.name}
                    </div>
                    <div className="mt-1 font-gaming text-[11px] uppercase text-cream/60">
                      Rarity {card.score}
                    </div>
                  </div>

                  <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] text-white shadow-lg shadow-purple-500/50 transition-transform group-hover:scale-110"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
