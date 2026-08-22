import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
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
    <footer className="relative pt-16 pb-8 bg-white border-t border-neutral-200">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-neutral-900 text-white flex items-center justify-center font-serif text-sm font-semibold">
                SP
              </div>
              <div>
                <p className="font-serif text-sm text-neutral-900">Swapnil Patil</p>
                <p className="text-xs text-neutral-400">Full Stack Dev & DevOps</p>
              </div>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
              Building scalable web apps and cloud pipelines from Pune, India.
              Always open to new opportunities and collaborations.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-mono text-neutral-400 tracking-[0.2em] uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={600}
                    className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-mono text-neutral-400 tracking-[0.2em] uppercase mb-4">
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
                  className="w-10 h-10 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-900 transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-6 bg-neutral-100" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Swapnil Patil. All rights reserved.</p>
          <p>Built with React & Framer Motion</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  )
}
