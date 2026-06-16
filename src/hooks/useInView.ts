import { useEffect, useRef, useState } from 'react'

interface Options {
  /** Fire once then stop observing (default true). */
  once?: boolean
  threshold?: number
  rootMargin?: string
}

/**
 * Lightweight IntersectionObserver hook — returns a ref to attach and a
 * boolean for whether the element is in view. Used for scroll-reveal
 * animations and for play/pausing videos.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  once = true,
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
}: Options = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No IntersectionObserver (very old browsers / SSR) → show immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, threshold, rootMargin])

  return { ref, inView }
}
