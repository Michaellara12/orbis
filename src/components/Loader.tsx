import { useEffect, useMemo } from 'react'

interface LoaderProps {
  /** 0–100 progress from the asset preloader. */
  progress: number
  /** True once assets are ready — triggers the fade-out. */
  done: boolean
}

/**
 * Space-themed loading screen: an orbiting-planet animation, the Orbis
 * wordmark with a cursive accent, and a live progress bar fed by the asset
 * preloader. Fades out (and is unmounted by App) once assets are ready.
 */
export default function Loader({ progress, done }: LoaderProps) {
  // Lock body scroll while the loader is up.
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  // A sparse twinkling starfield, generated once.
  const stars = useMemo(() => {
    const parts: string[] = []
    for (let i = 0; i < 110; i++) {
      const x = Math.floor(Math.random() * 1500)
      const y = Math.floor(Math.random() * 1000)
      const a = (0.35 + Math.random() * 0.65).toFixed(2)
      parts.push(`${x}px ${y}px rgba(255,255,255,${a})`)
    }
    return parts.join(', ')
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 ease-out ${
        done ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{
        background:
          'radial-gradient(120% 120% at 50% 38%, #0a1645 0%, #03082a 45%, #010828 100%)',
      }}
    >
      {/* Nebula glows */}
      <div className="pointer-events-none absolute -left-32 top-[16%] h-[420px] w-[420px] rounded-full bg-[#7c3aed]/25 blur-[140px]" />
      <div className="pointer-events-none absolute -right-24 bottom-[12%] h-[380px] w-[380px] rounded-full bg-[#b724ff]/20 blur-[140px]" />

      {/* Twinkling starfield */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-px w-px rounded-full"
        style={{ boxShadow: stars, animation: 'twinkle 5s ease-in-out infinite' }}
      />

      {/* Orbit system */}
      <div className="relative h-36 w-36 sm:h-44 sm:w-44">
        {/* Faint static guide ring */}
        <div className="absolute inset-0 rounded-full border border-white/10" />

        {/* Core planet */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="h-9 w-9 rounded-full bg-neon sm:h-11 sm:w-11"
            style={{
              boxShadow:
                '0 0 45px 8px rgba(111,255,0,0.65), inset 0 0 14px rgba(255,255,255,0.55)',
              animation: 'loader-pulse 2.4s ease-in-out infinite',
            }}
          />
        </div>

        {/* Outer orbit + satellite */}
        <div
          className="absolute inset-0 rounded-full border border-white/15"
          style={{ animation: 'orbit-spin 3.6s linear infinite' }}
        >
          <span
            className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream"
            style={{ boxShadow: '0 0 14px 2px rgba(239,244,255,0.9)' }}
          />
        </div>

        {/* Inner orbit + satellite (counter-rotating) */}
        <div
          className="absolute inset-[22px] rounded-full border border-white/10"
          style={{ animation: 'orbit-spin 2.4s linear infinite reverse' }}
        >
          <span
            className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b724ff]"
            style={{ boxShadow: '0 0 12px 2px rgba(183,36,255,0.9)' }}
          />
        </div>
      </div>

      {/* Wordmark */}
      <div className="relative mt-14">
        <h1 className="font-grotesk text-[30px] uppercase tracking-[0.18em] text-cream sm:text-[40px]">
          Orbis.Nft
        </h1>
        <span className="pointer-events-none absolute -right-2 -top-5 -rotate-6 font-condiment text-[20px] normal-case text-neon sm:-right-4 sm:text-[26px]">
          loading
        </span>
      </div>

      {/* Progress */}
      <div className="mt-9 w-[230px] sm:w-[300px]">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-neon"
            style={{
              width: `${progress}%`,
              boxShadow: '0 0 12px rgba(111,255,0,0.85)',
              transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between font-gaming text-[10px] uppercase tracking-[0.35em] text-cream/55">
          <span>Entering orbit</span>
          <span className="text-neon">{progress}%</span>
        </div>
      </div>
    </div>
  )
}
