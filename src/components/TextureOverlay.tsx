/**
 * Full-screen fixed texture overlay that sits on top of everything.
 * Uses /texture.png with `mix-blend-mode: lighten` at 0.6 opacity,
 * covering the entire viewport. Never intercepts pointer events.
 */
export default function TextureOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        backgroundImage: 'url(/texture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mixBlendMode: 'lighten',
        opacity: 0.6,
      }}
    />
  )
}
