import { useEffect, useState } from 'react'

interface PreloadState {
  /** 0–100, smoothly animated, for a progress bar. */
  progress: number
  /** True once every asset is ready (and the minimum display time has elapsed). */
  ready: boolean
}

interface Options {
  /** Minimum time the loader stays up, so it never flashes by. */
  minDuration?: number
  /** Hard cap — reveal even if an asset never finishes (e.g. an expired URL). */
  timeout?: number
}

/**
 * Preloads a set of videos (plus the web fonts) and drives a progress value
 * for the loading screen. The loader only hands off once EVERY video is ready,
 * so the whole page is buffered before it reveals.
 *
 * The reveal decision is driven by promises + timers (which fire even when the
 * tab is hidden) — NOT requestAnimationFrame, which Chromium pauses in
 * background tabs and would otherwise hang the loader. A setInterval only
 * animates the cosmetic bar.
 *
 * - Each video resolves on `canplaythrough` (buffered enough to play start to
 *   finish); an `error` still counts as done so a bad/expired URL can't trap
 *   the loader.
 * - `minDuration` stops the loader flashing on fast/cached loads.
 * - `timeout` guarantees the app always reveals, even on a slow connection.
 */
export function useAssetPreloader(
  videoUrls: string[],
  { minDuration = 1500, timeout = 20000 }: Options = {},
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

    // Each video: a throwaway element that warms the HTTP cache.
    videoUrls.forEach((url) => {
      const v = document.createElement('video')
      v.muted = true
      v.playsInline = true
      v.preload = 'auto'
      elements.push(v)
      tasks.push(
        new Promise<void>((resolve) => {
          const done = () => resolve()
          // Wait until it can play through — buffered enough to play start to
          // finish — so the whole page is ready, not just the first frame.
          v.addEventListener('canplaythrough', done, { once: true })
          v.addEventListener('error', done, { once: true })
        }),
      )
      v.src = url
      v.load()
    })

    const total = Math.max(tasks.length, 1)
    let completed = 0
    tasks.forEach((task) => void task.then(() => (completed += 1)))

    const settle = () => {
      if (settled || cancelled) return
      settled = true
      window.clearInterval(interval)
      setProgress(100)
      setReady(true)
      // The throwaway elements are left to finish (their cache is already warm)
      // and released on effect cleanup below.
    }
    const tryReveal = () => {
      if (assetsDone && minElapsed) settle()
    }

    // Cosmetic progress bar — reflects real completion, eases up over time, and
    // parks just under 100% until the last asset lands.
    const start = performance.now()
    interval = window.setInterval(() => {
      if (cancelled || settled) return
      const timePct = ((performance.now() - start) / minDuration) * 100
      const realPct = (completed / total) * 100
      // Blend time + real progress; never quite reach 100 until assetsDone.
      const pct = Math.min(assetsDone ? 100 : 95, Math.max(timePct * 0.4, realPct))
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
