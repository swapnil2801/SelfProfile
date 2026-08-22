import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

// Layout
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
      {/* Minimal page loader */}
      <AnimatePresence mode="wait">
        {loading && (
          <PageLoader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main site – only shown after loader */}
      {!loading && (
        <div className="relative min-h-screen bg-white overflow-x-hidden">
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
