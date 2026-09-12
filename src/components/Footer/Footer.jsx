import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { Link } from 'react-scroll'
import { personalInfo } from '../../data/portfolioData'

const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Experience', to: 'experience' },
  { label: 'AI Creator', to: 'ai-creator' },
  { label: 'Projects', to: 'projects' },
  { label: 'Skills', to: 'skills' },
  { label: 'Contact', to: 'contact' },
]

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-8 border-t border-slate-500/15 bg-void-900/80">
      {/* Luminous top edge */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent"
        aria-hidden="true"
      />

      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-md border border-neon-cyan/50 bg-void-800 text-neon-cyan flex items-center justify-center font-display text-sm font-bold shadow-glow-cyan">
                SP
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-slate-100">Swapnil Patil</p>
                <p className="text-xs text-slate-500">Backend Engineer · AI Creator</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Building scalable backend systems and autonomous AI workflows from Pune, India.
              Always open to new opportunities and collaborations.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-mono text-neon-cyan/60 tracking-[0.2em] uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={600}
                    className="text-sm text-slate-500 hover:text-neon-cyan transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-mono text-neon-violet/60 tracking-[0.2em] uppercase mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {[
                { href: personalInfo.github, icon: <FaGithub size={18} />, label: 'GitHub' },
                { href: personalInfo.linkedin, icon: <FaLinkedin size={18} />, label: 'LinkedIn' },
                { href: `mailto:${personalInfo.email}`, icon: <FaEnvelope size={16} />, label: 'Email' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="focus-ring w-10 h-10 rounded-md border border-slate-500/25 bg-void-800/50 flex items-center justify-center text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/60 hover:shadow-glow-cyan transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-6 bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" aria-hidden="true" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Swapnil Patil. All rights reserved.</p>
          <p className="font-mono text-[0.65rem]">
            <span className="text-neon-cyan/60">&lt;/&gt;</span> Built with React & Framer Motion — enhanced with Hermes Agent
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="focus-ring text-slate-500 hover:text-neon-cyan transition-colors"
            aria-label="Back to top"
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  )
}
