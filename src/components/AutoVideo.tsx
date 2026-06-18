import { useEffect, useRef, useState } from 'react'
import type Hls from 'hls.js'
import { resolveVideoSource } from '../lib/videos'

/**
 * Start playback, but only if the element is on screen right now — so a clip
 * that was attached while off-screen (within the lazy margin) doesn't play
 * until it actually scrolls into view. Needed because the source is attached
 * asynchronously (after the size probe / hls.js load), by which point the
 * `autoplay` attribute and the visibility observer's initial pass have already
 * run against an empty element.
 */
function playIfVisible(el: HTMLVideoElement | null) {
  if (!el) return
  const r = el.getBoundingClientRect()
  if (r.bottom > 0 && r.top < window.innerHeight) el.play().catch(() => {})
}

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
  /**
   * First-frame image, shown instantly while the clip streams in (and as the
   * placeholder for off-screen, not-yet-loaded clips). Pass a small/optimized
   * URL — e.g. an ImageKit `ik-thumbnail.jpg`.
   */
  poster?: string
  /**
   * Auto-pick adaptive HLS vs progressive MP4 by file size (default true).
   * Only affects ImageKit `.mp4` sources; others always play progressively.
   * Set false to force progressive — e.g. the preloaded hero.
   */
  adaptive?: boolean
  /** Override the byte threshold above which a clip streams via HLS. */
  adaptiveThreshold?: number
}

/**
 * Looping, muted background video that:
 *  1. Lazy-loads — the source is only attached once the element nears the
 *     viewport (unless `eager`), so off-screen clips cost nothing up front.
 *  2. Auto-chooses its delivery: a tiny `HEAD` request reads the file size, and
 *     ImageKit clips over the threshold stream via adaptive HLS (loading
 *     `hls.js` on demand for non-Safari browsers); smaller clips and other
 *     hosts play as progressive MP4. See `resolveVideoSource`.
 *  3. Reloads correctly when `src` changes (fixes the stale-video bug when
 *     navigating between NFT pages).
 *  4. Only plays while on screen, pausing offscreen to save CPU / battery.
 */
export default function AutoVideo({
  src,
  className,
  preload = 'metadata',
  eager = false,
  poster,
  adaptive = true,
  adaptiveThreshold,
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

  // Attach the right source once active: progressive MP4 or adaptive HLS.
  useEffect(() => {
    if (!active) return
    const v = ref.current
    if (!v) return

    let destroyed = false
    let hls: Hls | null = null

    void resolveVideoSource(src, {
      adaptive,
      threshold: adaptiveThreshold,
    }).then(async (resolved) => {
      const el = ref.current
      if (destroyed || !el) return

      // Non-Safari browsers can't play HLS natively — drive it with hls.js,
      // imported on demand so it never ships to pages that only use MP4.
      if (resolved.type === 'hls' && !el.canPlayType('application/vnd.apple.mpegurl')) {
        const { default: HlsCtor } = await import('hls.js')
        if (destroyed || !ref.current) return
        if (HlsCtor.isSupported()) {
          hls = new HlsCtor()
          hls.on(HlsCtor.Events.MANIFEST_PARSED, () => playIfVisible(ref.current))
          hls.loadSource(resolved.src)
          hls.attachMedia(ref.current)
          return
        }
        el.src = src // No MSE — last-resort progressive MP4.
      } else {
        el.src = resolved.src // progressive MP4, or native HLS (Safari).
      }
      el.load()
      playIfVisible(el)
    })

    return () => {
      destroyed = true
      if (hls) hls.destroy()
    }
  }, [active, src, adaptive, adaptiveThreshold])

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
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload={active ? preload : 'none'}
    />
  )
}
