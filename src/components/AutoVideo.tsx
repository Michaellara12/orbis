import { useEffect, useRef, useState } from 'react'

interface AutoVideoProps {
  src: string
  className?: string
  /** 'auto' for above-the-fold heroes, 'metadata' (default) for the rest. */
  preload?: 'auto' | 'metadata' | 'none'
  /**
   * Load immediately instead of waiting until the element nears the viewport.
   * Use for the above-the-fold hero only — everything else stays lazy so the
   * page never fetches a dozen videos at once.
   */
  eager?: boolean
}

/**
 * Looping, muted background video that:
 *  1. Lazy-loads — the source is only attached once the element nears the
 *     viewport (unless `eager`), so off-screen clips cost nothing up front.
 *  2. Reloads correctly when `src` changes (fixes the stale-video bug when
 *     navigating between NFT pages — a bare <source> swap never reloads).
 *  3. Only plays while on screen, pausing offscreen to save CPU / battery
 *     and avoid decoding many videos at once.
 */
export default function AutoVideo({
  src,
  className,
  preload = 'metadata',
  eager = false,
}: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  // Lazy gate: only attach the source once the element is on/near screen.
  const [active, setActive] = useState(eager)

  // Activate when the element approaches the viewport (skipped if eager).
  useEffect(() => {
    if (active) return
    const v = ref.current
    if (!v) return
    if (typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      // Start fetching a bit before the clip scrolls into view.
      { rootMargin: '400px' },
    )
    observer.observe(v)
    return () => observer.disconnect()
  }, [active])

  // Reload the element whenever the (active) source changes.
  useEffect(() => {
    const v = ref.current
    if (v && active) v.load()
  }, [src, active])

  // Play only while visible.
  useEffect(() => {
    if (!active) return
    const v = ref.current
    if (!v) return
    if (typeof IntersectionObserver === 'undefined') {
      v.play().catch(() => {})
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {})
        } else {
          v.pause()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(v)
    return () => observer.disconnect()
  }, [active])

  return (
    <video
      ref={ref}
      className={className}
      src={active ? src : undefined}
      autoPlay
      loop
      muted
      playsInline
      preload={active ? preload : 'none'}
    />
  )
}
