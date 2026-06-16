import { useMemo } from 'react'

/**
 * Full-screen fixed starfield overlay (replaces the old film-grain texture).
 * Several layers of twinkling stars built from a single tiny box + a long
 * box-shadow list, a layer of softly-coloured stars, and a few nebula glows.
 * Uses `screen` blend so stars only brighten — they glow over dark areas and
 * fade over bright video. Never intercepts pointer events.
 */
const FIELD = 2400

const STAR_TINTS = [
  '#ffffff',
  '#cfe3ff', // pale blue
  '#e7d4ff', // lavender
  '#bfff8f', // soft neon
  '#ffd9ec', // pink
]

/** A box-shadow list of `count` stars, all one colour. */
function starShadows(count: number, color = '#ffffff') {
  const parts: string[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * FIELD)
    const y = Math.floor(Math.random() * FIELD)
    parts.push(`${x}px ${y}px ${color}`)
  }
  return parts.join(', ')
}

/** A box-shadow list where each star picks a random tint from the palette. */
function coloredShadows(count: number) {
  const parts: string[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * FIELD)
    const y = Math.floor(Math.random() * FIELD)
    const color = STAR_TINTS[Math.floor(Math.random() * STAR_TINTS.length)]
    parts.push(`${x}px ${y}px ${color}`)
  }
  return parts.join(', ')
}

export default function Starfield() {
  // Generated once — stable across re-renders.
  const tiny = useMemo(() => starShadows(420), [])
  const small = useMemo(() => starShadows(220), [])
  const medium = useMemo(() => starShadows(110), [])
  const large = useMemo(() => starShadows(40), [])
  const colored = useMemo(() => coloredShadows(70), [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    >
      {/* Nebula glows */}
      <div className="absolute -left-40 top-[12%] h-[540px] w-[540px] rounded-full bg-[#7c3aed]/25 blur-[150px]" />
      <div className="absolute -right-32 top-[52%] h-[500px] w-[500px] rounded-full bg-[#b724ff]/20 blur-[150px]" />
      <div className="absolute left-1/3 top-[86%] h-[440px] w-[440px] rounded-full bg-[#1e90ff]/15 blur-[150px]" />

      {/* Dense faint dust */}
      <div
        className="absolute left-0 top-0 h-px w-px rounded-full opacity-70"
        style={{ boxShadow: tiny, animation: 'twinkle 6s ease-in-out infinite' }}
      />
      {/* Small stars */}
      <div
        className="absolute left-0 top-0 h-px w-px rounded-full"
        style={{
          boxShadow: small,
          animation: 'twinkle 4s ease-in-out infinite 0.4s',
        }}
      />
      {/* Medium stars */}
      <div
        className="absolute left-0 top-0 h-[2px] w-[2px] rounded-full"
        style={{
          boxShadow: medium,
          filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.5))',
          animation: 'twinkle 7s ease-in-out infinite 1s',
        }}
      />
      {/* Large glowing stars */}
      <div
        className="absolute left-0 top-0 h-[3px] w-[3px] rounded-full"
        style={{
          boxShadow: large,
          filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))',
          animation: 'twinkle 9s ease-in-out infinite 0.5s',
        }}
      />
      {/* Coloured accent stars */}
      <div
        className="absolute left-0 top-0 h-[2px] w-[2px] rounded-full"
        style={{
          boxShadow: colored,
          filter: 'drop-shadow(0 0 5px rgba(180,120,255,0.6))',
          animation: 'twinkle 5.5s ease-in-out infinite 2s',
        }}
      />
    </div>
  )
}
