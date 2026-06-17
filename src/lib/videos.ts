import { NFTS } from './nfts'

/**
 * Centralised video sources for the Home route.
 *
 * The loading screen preloads ALL of these (see `useAssetPreloader`) so every
 * section's video is buffered and ready before the loader hands off — not just
 * the hero. Each section imports its clip from here, so there's a single source
 * of truth and the preload list can never drift from what's actually rendered.
 */
export const HERO_VIDEO =
  'https://dnznrvs05pmza.cloudfront.net/seedance_2/cgt-20260616111754-f6g8m/make_them_move_in_a_loop__static_frame_.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiODk5MWE2YmUwMmU4MTZkYiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MTc2MTU5OH0.VfBi3J7xdKBNDD_JnsRD7aUAfM83ks_F7sRMve35NSU'

export const ABOUT_VIDEO =
  'https://dnznrvs05pmza.cloudfront.net/seedance_2/cgt-20260616133424-mzsm8/Static_camera__characters_moving_happily_and_celebrating_they_are_in_a_loop.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZGI3ZTc5YmZjMzY5YzYxZSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MTY5OTAwN30.U0mU0esjdVwIgThUxYaMgVCB6ghN2BuJCscYZ3SWBbI'

export const CTA_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4'

/**
 * Every video on the Home route, in visual order. The loading screen waits for
 * all of these (hero, about, the three collection cards, and the CTA).
 */
export const HOME_VIDEOS: string[] = [
  HERO_VIDEO,
  ABOUT_VIDEO,
  ...NFTS.map((nft) => nft.video),
  CTA_VIDEO,
]
