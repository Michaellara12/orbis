import { useEffect, useState } from 'react'

interface PreloadState {
  /** 0–100, smoothly animated, for a progress bar. */
  progress: number
  /** True once assets are ready (and the minimum display time has elapsed). */
  ready: boolean
}

interface Options {
  /** Minimum time the loader stays up, so it never flashes by. */
  minDuration?: number
  /** Hard cap — reveal even if an asset never loads (e.g. an expired URL). */
  timeout?: number
}

/**
 * Preloads a set of videos (plus the web fonts) and drives a progress value
 * for the loading screen.
 *
 * The reveal decision is driven by promises + timers (which fire even when the
 * tab is hidden) — NOT requestAnimationFrame, which Chromium pauses in
 * background tabs and would otherwise hang the loader. A setInterval only
 * animates the cosmetic bar.
 *
 * - Each video resolves on its first buffered frame; an `error` still counts
 *   as done so a bad URL can't trap the loader.
 * - `minDuration` stops the loader flashing on fast/cached loads.
 * - `timeout` guarantees the app always reveals.
 */
export function useAssetPreloader(
  videoUrls: string[],
  { minDuration = 1500, timeout = 12000 }: Options = {},
): PreloadState {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    let settled = false
    let assetsDone = false
    let minElapsed = false
    let interval = 0
    const elements: HTMLVideoElement[] = []
    const tasks: Promise<void>[] = []

    // Fonts — so headings don't restyle/pop in after the reveal.
    if (typeof document !== 'undefined' && 'fonts' in document) {
      tasks.push(document.fonts.ready.then(() => undefined))
    }

    // Each video: a throwaway element that just warms the HTTP cache.
    videoUrls.forEach((url) => {
      const v = document.createElement('video')
      v.muted = true
      v.playsInline = true
      v.preload = 'auto'
      elements.push(v)
      tasks.push(
        new Promise<void>((resolve) => {
          const done = () => resolve()
          v.addEventListener('loadeddata', done, { once: true })
          v.addEventListener('canplaythrough', done, { once: true })
          v.addEventListener('error', done, { once: true })
        }),
      )
      v.src = url
      v.load()
    })

    const settle = () => {
      if (settled || cancelled) return
      settled = true
      window.clearInterval(interval)
      setProgress(100)
      setReady(true)
      // NOTE: the throwaway elements are intentionally left to finish buffering
      // so the cache is fully warmed and the real <video> is a clean cache hit
      // (aborting here would cut the download short and force a re-fetch). They
      // are released on effect cleanup below.
    }
    const tryReveal = () => {
      if (assetsDone && minElapsed) settle()
    }

    // Cosmetic progress bar — eases toward 100, parks at 92% until assets land.
    const start = performance.now()
    interval = window.setInterval(() => {
      if (cancelled || settled) return
      const timePct = ((performance.now() - start) / minDuration) * 100
      const pct = Math.min(assetsDone ? 100 : 92, Math.max(0, timePct))
      setProgress(Math.round(Math.min(100, pct)))
    }, 60)

    // Reveal triggers (all fire regardless of tab visibility).
    void Promise.all(tasks).then(() => {
      assetsDone = true
      tryReveal()
    })
    const minTimer = window.setTimeout(() => {
      minElapsed = true
      tryReveal()
    }, minDuration)
    const hardTimer = window.setTimeout(() => {
      assetsDone = true
      minElapsed = true
      tryReveal()
    }, timeout)

    return () => {
      cancelled = true
      window.clearInterval(interval)
      window.clearTimeout(minTimer)
      window.clearTimeout(hardTimer)
      elements.forEach((v) => v.removeAttribute('src'))
    }
  }, [videoUrls, minDuration, timeout])

  return { progress, ready }
}
