import Reveal from './Reveal'

interface QA {
  q: string
  a: string
}

const FAQS: QA[] = [
  {
    q: 'What is Orbis.Nft?',
    a: 'Orbis is a small collection of hand-crafted space wanderers. Each character is a 1-of-1 looping artwork minted on-chain — a digital object fixed beyond time and place.',
  },
  {
    q: 'How do I buy an NFT?',
    a: 'Open the page for the character you want, connect your wallet, and confirm the transaction. Ownership transfers instantly to your address once the mint is settled.',
  },
  {
    q: 'Which blockchain are the NFTs on?',
    a: 'All Orbis pieces live on Ethereum. Prices are listed in ETH and settle through standard ERC-721 transfers.',
  },
  {
    q: 'What do I actually own?',
    a: 'You own the token and full display rights to the artwork. The original looping video is yours to show, share, and resell on any marketplace.',
  },
  {
    q: 'Are there more drops coming?',
    a: 'Yes. New characters join the orbit over time. Follow the signal through our social channels to hear about each release first.',
  },
]

/**
 * SECTION — FAQ
 * Deep gradient backdrop with floating colour glows so the pronounced,
 * Apple-style frosted-glass cards (.glass-strong) have something rich to
 * blur. Each card is a native <details> disclosure — no JS needed.
 */
export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative w-full scroll-mt-8 overflow-hidden border-t border-white/5 bg-gradient-to-b from-[#0a0420] via-[#0c0730] to-[#0a0420]"
    >
      {/* Ambient colour glows (give the frosted glass something to refract) */}
      <div className="pointer-events-none absolute -left-24 top-0 h-[460px] w-[460px] rounded-full bg-[#b724ff]/30 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#4f46e5]/25 blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-neon/12 blur-[140px]" />

      <div className="relative mx-auto max-w-[920px] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        {/* Header */}
        <Reveal className="mb-14 flex flex-col items-center text-center lg:mb-20">
          <span className="mb-4 font-gaming text-[11px] font-semibold uppercase tracking-[0.45em] text-neon">
            Need a hand?
          </span>
          <div className="relative w-fit">
            <h2 className="font-grotesk text-[36px] uppercase leading-[1.05] text-cream sm:text-[52px] md:text-[60px] lg:text-[72px]">
              Frequently asked
            </h2>
            <span className="pointer-events-none absolute -bottom-4 right-0 -rotate-2 font-condiment text-[32px] normal-case text-neon sm:text-[44px] lg:-right-6 lg:text-[56px]">
              questions
            </span>
          </div>
        </Reveal>

        {/* Cards */}
        <div className="space-y-4">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <details className="glass-strong group rounded-[26px] transition-shadow duration-300 open:shadow-[0_30px_70px_-25px_rgba(183,36,255,0.55)]">
              <summary className="relative z-10 flex cursor-pointer list-none items-center gap-5 px-7 py-6 sm:px-9">
                <span className="font-gaming text-[13px] font-bold tracking-widest text-neon/80 sm:text-[15px]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-gaming text-[15px] font-semibold uppercase tracking-wide text-cream sm:text-[17px]">
                  {item.q}
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-cream backdrop-blur-md transition-all duration-300 group-open:rotate-45 group-open:border-neon/60 group-open:text-neon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="relative z-10 px-7 pb-7 sm:px-9 sm:pl-[4.75rem]">
                <div className="mb-5 h-px w-full bg-gradient-to-r from-white/30 via-white/10 to-transparent" />
                <p className="max-w-[680px] font-gaming text-[12px] leading-relaxed text-cream/75 sm:text-[13px]">
                  {item.a}
                </p>
              </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
