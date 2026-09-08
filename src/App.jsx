import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

// Layout
import PageLoader from './components/Loader/PageLoader'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

// Sections
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import AiCreator from './components/AiCreator/AiCreator'
import TechStack from './components/TechStack/TechStack'
import Tools from './components/Tools/Tools'
import Experience from './components/Experience/Experience'
import Projects from './components/Projects/Projects'
import Achievements from './components/Achievements/Achievements'
import Contact from './components/Contact/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {/* Boot loader */}
      <AnimatePresence mode="wait">
        {loading && (
          <PageLoader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main site – only shown after loader */}
      {!loading && (
        <div className="relative min-h-screen bg-void-900 overflow-x-hidden">
          {/* Fixed decorative layers: grid, noise, ambient glows, scanline */}
          <div className="bg-glow-overlay" aria-hidden="true" />
          <div className="bg-grid-overlay" aria-hidden="true" />
          <div className="bg-noise-overlay" aria-hidden="true" />
          <div className="scanline-sweep" aria-hidden="true" />

          <div className="relative z-10">
            <Navbar />

            <main>
              <Hero />
              <About />
              <AiCreator />
              <TechStack />
              <Tools />
              <Experience />
              <Projects />
              <Achievements />
              <Contact />
            </main>

            <Footer />
          </div>
        </div>
      )}
    </>
  )
}
