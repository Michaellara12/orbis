/**
 * Centralised video sources.
 *
 * The home hero, the home "about" section, and the floating clip used on every
 * NFT profile are served straight from ImageKit's CDN — globally cached and far
 * faster than the previous Firebase / expiring-CloudFront links.
 *
 * The source clips are already small and well-compressed (~1112×834, under
 * ~1 MB each), so we serve them as-is: ImageKit's on-the-fly `tr` transforms
 * re-encode and actually *inflate* these particular files (the hero jumps from
 * ~0.7 MB to ~3.4 MB at w-1280). The real wins are therefore the CDN, a tiny
 * poster per clip (instant first paint), lazy-loading the off-screen clips, and
 * only blocking the loading screen on the hero.
 */
const IK = 'https://ik.imagekit.io/5yeqlwlgr/Orbits%20NFTs'

/** A lightweight first-frame JPEG poster — paints instantly while the clip streams in. */
const poster = (file: string, w = 1200) =>
  `${IK}/${file}/ik-thumbnail.jpg?tr=w-${w},q-60`

const HERO_FILE = 'Static_camera__soft_and_gentle_movements__loop.mp4'
const ABOUT_FILE =
  'Static_camera__characters_moving_happily_and_celebrating_they_are_in_a_loop.mp4'
const NFT_SECTION_FILE = 'Static_camera__some_elements_float__make_it_like_a_loop.mp4'

export const HERO_VIDEO = `${IK}/${HERO_FILE}`
export const HERO_POSTER = poster(HERO_FILE)

export const ABOUT_VIDEO = `${IK}/${ABOUT_FILE}`
export const ABOUT_POSTER = poster(ABOUT_FILE)

/** Atmospheric clip used in a section on every NFT profile page (`/nft/:slug`). */
export const NFT_SECTION_VIDEO = `${IK}/${NFT_SECTION_FILE}`
export const NFT_SECTION_POSTER = poster(NFT_SECTION_FILE)

export const CTA_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4'

/**
 * Videos the loading screen blocks on. Only the above-the-fold hero — every
 * other clip lazy-loads on scroll with its poster showing instantly, so the
 * app reveals the moment the hero is ready instead of waiting on every video.
 */
export const PRELOAD_VIDEOS: string[] = [HERO_VIDEO]

/* -------------------------------------------------------------------------- */
/*  Adaptive streaming (ImageKit HLS) vs progressive MP4 — chosen by size      */
/* -------------------------------------------------------------------------- */

/**
 * Renditions ImageKit generates for the HLS master playlist. Our source clips
 * top out around 834px tall, so 720 is the highest useful step — anything above
 * just upscales. Bump this list (e.g. add `_1080`) when you upload taller video.
 */
const HLS_RENDITIONS = 'sr-360_480_720'

/**
 * Above this many bytes an ImageKit clip is served via adaptive HLS; below it,
 * a plain progressive MP4 (which starts instantly and loops seamlessly — better
 * for the small decorative loops). ~3 MB cleanly separates a short background
 * loop from a heavier/longer clip.
 */
export const ADAPTIVE_THRESHOLD = 3 * 1024 * 1024

export type VideoSource = { type: 'mp4' | 'hls'; src: string }

/** Build the ImageKit HLS master-playlist URL from a `.mp4` delivery URL. */
function ikHlsUrl(mp4Url: string): string {
  const [path] = mp4Url.split('?')
  return `${path}/ik-master.m3u8?tr=${HLS_RENDITIONS}`
}

// Each URL is probed at most once; the decision is reused across re-renders and
// route changes (e.g. navigating between NFT pages).
const decisionCache = new Map<string, VideoSource>()

/**
 * Decide how to play a clip WITHOUT downloading it: a `HEAD` request reads the
 * `Content-Length` header only. ImageKit `.mp4` URLs over `ADAPTIVE_THRESHOLD`
 * resolve to adaptive HLS; everything else (small clips, or non-ImageKit hosts
 * like the legacy Firebase URLs that can't be transcoded) stays progressive.
 *
 * Any failure (CORS, offline, missing header) falls back to progressive MP4, so
 * a clip always plays.
 */
export async function resolveVideoSource(
  mp4Url: string,
  { adaptive = true, threshold = ADAPTIVE_THRESHOLD }: { adaptive?: boolean; threshold?: number } = {},
): Promise<VideoSource> {
  const isImageKitMp4 = mp4Url.startsWith(IK) && mp4Url.includes('.mp4')
  if (!adaptive || !isImageKitMp4 || typeof fetch === 'undefined') {
    return { type: 'mp4', src: mp4Url }
  }

  const cached = decisionCache.get(mp4Url)
  if (cached) return cached

  let decision: VideoSource = { type: 'mp4', src: mp4Url }
  try {
    const res = await fetch(mp4Url, { method: 'HEAD' })
    const size = Number(res.headers.get('content-length'))
    if (Number.isFinite(size) && size >= threshold) {
      decision = { type: 'hls', src: ikHlsUrl(mp4Url) }
    }
  } catch {
    // Network / CORS error — keep the progressive fallback.
  }
  decisionCache.set(mp4Url, decision)
  return decision
}
