import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Starfield from './components/Starfield'
import Loader from './components/Loader'
import { useAssetPreloader } from './hooks/useAssetPreloader'
import { HERO_VIDEO } from './lib/videos'
import Home from './pages/Home'
import NftPage from './pages/NftPage'

// Stable reference so the preloader effect runs exactly once.
const PRELOAD_VIDEOS = [HERO_VIDEO]

export default function App() {
  const { ready, progress } = useAssetPreloader(PRELOAD_VIDEOS)
  const [showLoader, setShowLoader] = useState(true)

  // Keep the loader mounted briefly after `ready` so it can fade out.
  useEffect(() => {
    if (!ready) return
    const timer = window.setTimeout(() => setShowLoader(false), 800)
    return () => window.clearTimeout(timer)
  }, [ready])

  return (
    <div className="relative min-h-screen bg-space">
      <ScrollToTop />
      <main>
        {/* Heavy, video-rich routes mount only once the hero asset is ready. */}
        {ready && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nft/:slug" element={<NftPage />} />
          </Routes>
        )}
      </main>

      {/* Full-screen twinkling starfield, sits above everything */}
      <Starfield />

      {/* Loading screen — preloads the hero video + fonts, then reveals the app */}
      {showLoader && <Loader progress={progress} done={ready} />}
    </div>
  )
}
