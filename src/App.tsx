import TextureOverlay from './components/TextureOverlay'
import Hero from './components/Hero'
import About from './components/About'
import Collection from './components/Collection'
import CTA from './components/CTA'

export default function App() {
  return (
    <div className="relative min-h-screen bg-space">
      <main>
        <Hero />
        <About />
        <Collection />
        <CTA />
      </main>

      {/* Full-screen grain texture, sits above everything */}
      <TextureOverlay />
    </div>
  )
}
