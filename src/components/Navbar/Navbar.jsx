import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { personalInfo } from '../../data/portfolioData'

const navLinks = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact', to: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-dark-950/80 backdrop-blur-xl border-b border-cyan-500/10 shadow-lg shadow-cyan-500/5'
          : 'py-5 bg-transparent'
      }`}
    >
      <nav className="section-container flex items-center justify-between">
        {/* Logo */}
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-orbitron font-bold text-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(184,41,255,0.2))',
                border: '1px solid rgba(0,212,255,0.4)',
                boxShadow: '0 0 15px rgba(0,212,255,0.2)',
                color: '#00d4ff',
              }}
            >
              SP
            </div>
            <span className="font-orbitron text-sm font-semibold gradient-text hidden sm:block">
              SWAPNIL PATIL
            </span>
          </motion.div>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth
                duration={600}
                spy
                onSetActive={() => setActiveSection(link.to)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-all duration-300 block
                  ${activeSection === link.to
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-cyan-300'
                  }`}
              >
                {activeSection === link.to && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.2)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="/Swapnil_Patil_Resume.pdf"
            download="Swapnil_Patil_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(184,41,255,0.15))',
              border: '1px solid rgba(0,212,255,0.3)',
              color: '#00d4ff',
              boxShadow: '0 0 12px rgba(0,212,255,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.25), rgba(184,41,255,0.25))'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(184,41,255,0.15))'
              e.currentTarget.style.boxShadow = '0 0 12px rgba(0,212,255,0.1)'
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
              className="block w-6 h-0.5 bg-cyan-400 rounded origin-center"
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1, x: mobileOpen ? 10 : 0 }}
              className="block w-6 h-0.5 bg-cyan-400 rounded"
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
              className="block w-6 h-0.5 bg-cyan-400 rounded origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(2,4,8,0.95)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(0,212,255,0.1)',
            }}
          >
            <ul className="section-container py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    smooth
                    duration={600}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
                  >
                    <span className="text-cyan-500/50 font-mono mr-2">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-2 pt-2 border-t border-white/5"
              >
                <a
                  href={personalInfo.resume}
                  download
                  className="block px-4 py-3 text-cyan-400 font-semibold text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  ↓ Download Resume
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
