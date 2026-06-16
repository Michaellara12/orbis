import Hero from '../components/Hero'
import Collection from '../components/Collection'
import About from '../components/About'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import CTA from '../components/CTA'

/**
 * Home route ("/"). Order: hero → gallery → about → FAQ → contact → CTA.
 * (Per-NFT detail now lives on its own route, `/nft/:slug`.)
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Collection />
      <About />
      <FAQ />
      <Contact />
      <CTA />
    </>
  )
}
