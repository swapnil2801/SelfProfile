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
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/90 backdrop-blur-md border-b border-neutral-200'
          : 'py-5 bg-transparent'
      }`}
    >
      <nav className="section-container flex items-center justify-between">
        {/* Logo */}
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-neutral-900 bg-neutral-900 text-white flex items-center justify-center font-serif text-sm font-semibold">
              SP
            </div>
            <span className="font-serif text-sm text-neutral-900 tracking-wide hidden sm:block">
              Swapnil Patil
            </span>
          </div>
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
                className={`relative px-4 py-2 text-sm cursor-pointer transition-colors duration-200 block
                  ${activeSection === link.to
                    ? 'text-neutral-900 font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900'
                  }`}
              >
                <span className="relative">
                  {link.label}
                  {activeSection === link.to && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-neutral-900"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </span>
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
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-neutral-900 text-white border border-neutral-900 hover:bg-neutral-700 hover:border-neutral-700 transition-colors duration-200"
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
              className="block w-6 h-0.5 bg-neutral-900 origin-center"
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              className="block w-6 h-0.5 bg-neutral-900"
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
              className="block w-6 h-0.5 bg-neutral-900 origin-center"
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
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden overflow-hidden bg-white border-b border-neutral-200"
          >
            <ul className="section-container py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={link.to}
                    smooth
                    duration={600}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors duration-200 cursor-pointer text-sm font-medium"
                  >
                    <span className="text-neutral-300 font-mono mr-2">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-2 pt-2 border-t border-neutral-100"
              >
                <a
                  href={personalInfo.resume}
                  download
                  className="block px-4 py-3 text-neutral-900 font-semibold text-sm"
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
