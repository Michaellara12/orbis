interface NftCard {
  id: number
  video: string
  score: string
}

const CARDS: NftCard[] = [
  {
    id: 1,
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4',
    score: '8.7/10',
  },
  {
    id: 2,
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4',
    score: '9/10',
  },
  {
    id: 3,
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4',
    score: '8.2/10',
  },
]

/**
 * SECTION 3 — NFT COLLECTION GRID
 * Solid #010828 background. A two-part header ("Collection of Space objects"
 * + a "SEE ALL CREATORS" button) above a responsive grid of liquid-glass
 * NFT cards, each with a square looping video and a rarity-score overlay.
 */
export default function Collection() {
  return (
    <section className="w-full bg-space">
      <div className="mx-auto max-w-[1831px] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        {/* Header row */}
        <div className="mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:mb-16">
          {/* Heading */}
          <h2 className="font-grotesk text-[32px] uppercase leading-[1.05] text-cream sm:text-[44px] md:text-[52px] lg:text-[60px]">
            <span className="block">Collection of</span>
            <span className="ml-12 block sm:ml-24 lg:ml-32">
              <span className="font-condiment normal-case text-neon">Space</span>{' '}
              objects
            </span>
          </h2>

          {/* "SEE ALL CREATORS" button */}
          <button className="flex flex-col items-start sm:items-end">
            <span className="flex items-start gap-2">
              <span className="font-grotesk text-[32px] uppercase leading-[0.8] text-cream sm:text-[44px] md:text-[52px] lg:text-[60px]">
                See
              </span>
              <span className="flex flex-col font-grotesk text-[20px] uppercase leading-[0.95] text-cream sm:text-[28px] md:text-[32px] lg:text-[36px]">
                <span>All</span>
                <span>Creators</span>
              </span>
            </span>
            <span className="mt-3 h-[6px] w-full bg-neon md:h-[8px] lg:h-[10px]" />
          </button>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.id}
              className="liquid-glass rounded-[32px] p-[18px] transition-colors hover:bg-white/10"
            >
              <div className="relative w-full overflow-hidden rounded-[24px] pb-[100%]">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={card.video} type="video/mp4" />
                </video>

                {/* Rarity-score overlay bar */}
                <div className="liquid-glass absolute inset-x-3 bottom-3 flex items-center justify-between rounded-[20px] px-5 py-4">
                  <div className="leading-tight">
                    <div className="font-mono text-[11px] uppercase text-cream/70">
                      Rarity Score:
                    </div>
                    <div className="font-mono text-[16px] text-cream">
                      {card.score}
                    </div>
                  </div>

                  <button
                    aria-label="View NFT"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] text-white shadow-lg shadow-purple-500/50 transition-transform hover:scale-110"
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
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
