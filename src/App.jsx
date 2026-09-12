import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

// Layout
import PageLoader from './components/Loader/PageLoader'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

// Cinematic fx layers
import SignalField from './components/fx/SignalField'
import CursorLight from './components/fx/CursorLight'
import SignalDivider from './components/fx/SignalDivider'

// Sections — cinematic scroll order:
// Hero → About → Experience → AI Creator → Creator Signal → Tech Stack/Tools → Achievements → Contact
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Experience from './components/Experience/Experience'
import AiCreator from './components/AiCreator/AiCreator'
import CreatorSignal from './components/CreatorSignal/CreatorSignal'
import TechStack from './components/TechStack/TechStack'
import Tools from './components/Tools/Tools'
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
          {/* Fixed cinematic layers: procedural signal field, grain,
              vignette, hairline grid, scanline, cursor light */}
          <SignalField />
          <div className="bg-glow-overlay" aria-hidden="true" />
          <div className="bg-grid-overlay" aria-hidden="true" />
          <div className="bg-noise-overlay" aria-hidden="true" />
          <div className="scanline-sweep" aria-hidden="true" />
          <CursorLight />

          <div className="relative z-10">
            <Navbar />

            <main>
              <Hero />
              <SignalDivider index="01" label="About" />
              <About />
              <SignalDivider index="02" label="Experience" />
              <Experience />
              <SignalDivider index="03" label="AI Creator" />
              <AiCreator />
              <SignalDivider index="04" label="Creator Signal" />
              <CreatorSignal />
              <SignalDivider index="05" label="Tech Stack" />
              <TechStack />
              <Tools />
              <SignalDivider index="06" label="Achievements" />
              <Achievements />
              <SignalDivider index="07" label="Contact" />
              <Contact />
            </main>

            <Footer />
          </div>
        </div>
      )}
    </>
  )
}
