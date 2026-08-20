import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

// Layout
import CustomCursor from './components/Cursor/CustomCursor'
import PageLoader from './components/Loader/PageLoader'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

// Sections
import Hero from './components/Hero/Hero'
import About from './components/About/About'
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
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Page loader */}
      <AnimatePresence mode="wait">
        {loading && (
          <PageLoader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main site – only shown after loader */}
      {!loading && (
        <div className="relative min-h-screen bg-dark-950 overflow-x-hidden">
          {/* Noise texture overlay */}
          <div className="noise-overlay" />

          {/* Fixed background gradient */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 60%),' +
                'radial-gradient(ellipse 60% 40% at 80% 80%, rgba(184,41,255,0.04) 0%, transparent 60%)',
            }}
          />

          <Navbar />

          <main>
            <Hero />
            <About />
            <TechStack />
            <Tools />
            <Experience />
            <Projects />
            <Achievements />
            <Contact />
          </main>

          <Footer />
        </div>
      )}
    </>
  )
}
