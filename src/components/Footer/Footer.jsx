import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'
import { Link } from 'react-scroll'
import { personalInfo } from '../../data/portfolioData'

const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact', to: 'contact' },
]

export default function Footer() {
  return (
    <footer
      className="relative pt-16 pb-8 overflow-hidden border-t border-white/5"
      style={{
        background: 'linear-gradient(180deg, transparent, rgba(0,212,255,0.03))',
      }}
    >
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-orbitron font-bold text-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(184,41,255,0.2))',
                  border: '1px solid rgba(0,212,255,0.3)',
                  color: '#00d4ff',
                }}
              >
                SP
              </div>
              <div>
                <p className="font-orbitron text-sm font-bold gradient-text">SWAPNIL PATIL</p>
                <p className="text-xs text-slate-500">Full Stack Dev & DevOps</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Building scalable web apps and cloud pipelines from Pune, India.
              Always open to new opportunities and collaborations.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-mono text-slate-500 tracking-widest uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={600}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-cyan-400 transition-all duration-300 overflow-hidden" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-mono text-slate-500 tracking-widest uppercase mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {[
                { href: personalInfo.github, icon: <FaGithub size={18} />, label: 'GitHub', color: '#e2e8f0' },
                { href: personalInfo.linkedin, icon: <FaLinkedin size={18} />, label: 'LinkedIn', color: '#0a66c2' },
                { href: `mailto:${personalInfo.email}`, icon: <FaEnvelope size={16} />, label: 'Email', color: '#00d4ff' },
              ].map(({ href, icon, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    background: `${color}08`,
                    border: `1px solid ${color}20`,
                    color: color,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${color}18`
                    e.currentTarget.style.borderColor = `${color}45`
                    e.currentTarget.style.boxShadow = `0 0 15px ${color}30`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${color}08`
                    e.currentTarget.style.borderColor = `${color}20`
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)' }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Swapnil Patil. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <FaHeart size={10} className="text-red-400/70 animate-pulse" /> using React & Framer Motion
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-slate-500 hover:text-cyan-400 transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
