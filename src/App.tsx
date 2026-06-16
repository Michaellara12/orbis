import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Starfield from './components/Starfield'
import Home from './pages/Home'
import NftPage from './pages/NftPage'

export default function App() {
  return (
    <div className="relative min-h-screen bg-space">
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nft/:slug" element={<NftPage />} />
        </Routes>
      </main>

      {/* Full-screen twinkling starfield, sits above everything */}
      <Starfield />
    </div>
  )
}
