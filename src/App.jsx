import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Landing from './pages/Landing.jsx'
import Data from './pages/Data.jsx'
import DataProject from './pages/DataProject.jsx'
import Marketing from './pages/Marketing.jsx'
import MarketingProject from './pages/MarketingProject.jsx'
import Resume from './pages/Resume.jsx'
import FunFacts from './pages/FunFacts.jsx'

// Reset scroll position on every route change.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Nav overlay={isLanding} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/data" element={<Data />} />
          <Route path="/data/:slug" element={<DataProject />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/marketing/:slug" element={<MarketingProject />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/funfacts" element={<FunFacts />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
