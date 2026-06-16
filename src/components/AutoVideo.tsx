import { useEffect, useRef } from 'react'

interface AutoVideoProps {
  src: string
  className?: string
  /** 'auto' for above-the-fold heroes, 'metadata' (default) for the rest. */
  preload?: 'auto' | 'metadata' | 'none'
}

/**
 * Looping, muted background video that:
 *  1. Reloads correctly when `src` changes (fixes the stale-video bug when
 *     navigating between NFT pages — a bare <source> swap never reloads).
 *  2. Only plays while on screen, pausing offscreen to save CPU / battery
 *     and avoid decoding many videos at once.
 */
export default function AutoVideo({
  src,
  className,
  preload = 'metadata',
}: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  // Reload the element whenever the source changes.
  useEffect(() => {
    const v = ref.current
    if (v) v.load()
  }, [src])

  // Play only while visible.
  useEffect(() => {
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
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload={preload}
    />
  )
}
