/**
 * Centralised video sources.
 *
 * The hero clip is the only above-the-fold video, so it's preloaded by the
 * loading screen (see `useAssetPreloader`) — by the time the page reveals it's
 * already cached and plays instantly. Every other video lazy-loads on scroll
 * (see `AutoVideo`).
 */
export const HERO_VIDEO =
  'https://dnznrvs05pmza.cloudfront.net/seedance_2/cgt-20260616111754-f6g8m/make_them_move_in_a_loop__static_frame_.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiODk5MWE2YmUwMmU4MTZkYiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MTc2MTU5OH0.VfBi3J7xdKBNDD_JnsRD7aUAfM83ks_F7sRMve35NSU'
