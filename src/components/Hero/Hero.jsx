import { motion, useReducedMotion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-scroll'
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaArrowDown, FaFeatherAlt, FaArrowRight } from 'react-icons/fa'
import { personalInfo } from '../../data/portfolioData'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

/* Holographic system-status card — HUD motif, real facts only */
function SystemStatusCard({ prefersReducedMotion }) {
  return (
    <div className="relative" aria-label="System status summary">
      {/* Orbit rings behind the card */}
      {!prefersReducedMotion && (
        <div className="absolute -inset-10 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-[26rem] h-[26rem] max-w-none rounded-full border border-neon-cyan/10 animate-orbit-slow">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neon-cyan/80 shadow-glow-cyan" />
          </div>
          <div className="absolute w-[20rem] h-[20rem] rounded-full border border-neon-violet/10 animate-orbit-slower">
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-neon-violet/80 shadow-glow-violet" />
          </div>
        </div>
      )}

      <div className="glass glass-lumen hud-corners relative p-0 overflow-hidden w-full max-w-sm">
        {/* Header */}
        <div className="terminal-header">
          <span className="terminal-dot bg-rose-500/70" />
          <span className="terminal-dot bg-amber-400/70" />
          <span className="terminal-dot bg-emerald-400/70" />
          <span className="ml-2 text-[0.65rem] font-mono text-slate-400 tracking-wider">swapnil@pune:~ sys.status</span>
        </div>

        {/* Body */}
        <div className="p-5 font-mono text-xs leading-6">
          <p className="text-slate-500 mb-3">
            <span className="text-neon-cyan">$</span> whoami --verbose
          </p>

          <dl className="space-y-2.5">
            {[
              { k: 'OPERATOR', v: 'Swapnil Patil', accent: 'text-slate-100' },
              { k: 'ROLE', v: 'Backend · AI · DevOps', accent: 'text-neon-cyan' },
              { k: 'AGENT_STACK', v: 'Hermes Agent · LiteLLM', accent: 'text-neon-violet' },
              { k: 'INFRA', v: 'Linux · AWS · Azure DevOps', accent: 'text-slate-300' },
              { k: 'LOCATION', v: 'Pune, India', accent: 'text-slate-300' },
            ].map(({ k, v, accent }) => (
              <div key={k} className="flex items-center justify-between gap-4">
                <dt className="text-[0.6rem] tracking-[0.2em] text-slate-500">{k}</dt>
                <dd className={`${accent} text-right`}>{v}</dd>
              </div>
            ))}
          </dl>

          {/* Status row */}
          <div className="mt-4 pt-4 border-t border-slate-500/15 flex items-center justify-between">
            <span className="flex items-center gap-2 text-[0.6rem] tracking-[0.2em] text-slate-500 uppercase">
              <span className="led" aria-hidden="true" />
              Agents Online
            </span>
            <span className="text-neon-green text-[0.65rem]">
              AVAILABLE FOR WORK
              {!prefersReducedMotion && <span className="animate-ticker inline-block ml-1 text-neon-cyan">▊</span>}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Floating accent particles (CSS only, decorative) */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <span className="absolute top-[22%] left-[12%] w-1 h-1 rounded-full bg-neon-cyan/70 animate-float-dot" />
          <span className="absolute top-[65%] left-[8%] w-1.5 h-1.5 rounded-full bg-neon-violet/60 animate-float-dot [animation-delay:2s]" />
          <span className="absolute top-[30%] right-[15%] w-1 h-1 rounded-full bg-neon-magenta/60 animate-float-dot [animation-delay:4s]" />
          <span className="absolute top-[75%] right-[22%] w-1 h-1 rounded-full bg-neon-cyan/50 animate-float-dot [animation-delay:6s]" />
        </div>
      )}

      {/* Horizon glow line at hero base */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent"
        aria-hidden="true"
      />

      <div className="section-container relative z-10 py-32 md:py-24 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-14 items-center">
          <div className="max-w-3xl">
            {/* Role line */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="font-mono text-neon-cyan/80 text-xs md:text-sm mb-6 tracking-[0.3em] uppercase"
            >
              <span className="text-slate-600 mr-2">{'//'}</span>
              Backend Engineer&ensp;·&ensp;AI Creator
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="font-display font-bold text-5xl md:text-7xl lg:text-8xl mb-6 leading-[0.95] tracking-tight"
            >
              <span className="text-slate-100">Swapnil</span>
              <br />
              <span className="text-gradient">Patil</span>
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.35}
              className="text-slate-300 text-lg md:text-2xl mb-5 h-10 flex items-center"
            >
              <span className="text-slate-500 mr-2 font-light">I build</span>
              <TypeAnimation
                sequence={[
                  'Autonomous AI Workflows', 2200,
                  'Multi-Agent Systems', 2200,
                  'Python Backend Services', 2200,
                  'Scalable REST APIs', 2200,
                  'Cloud Infrastructure', 2200,
                  'CI/CD Pipelines', 2200,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="font-semibold text-neon-cyan"
              />
            </motion.div>

            {/* Hermes Agent highlight badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.45}
              className="mb-6"
            >
              <Link to="ai-creator" smooth duration={700} offset={-70}>
                <button
                  className="group inline-flex items-center gap-3 rounded-lg border border-neon-violet/40 bg-gradient-to-r from-neon-cyan/10 to-neon-violet/10 text-slate-100 pl-3 pr-4 py-2 text-xs md:text-sm font-medium hover:border-neon-violet/80 hover:shadow-glow-violet transition-all duration-200 focus-ring"
                  aria-label="Learn about my Hermes Agent AI workflows"
                >
                  <FaFeatherAlt size={12} aria-hidden="true" className="text-neon-violet" />
                  <span className="font-mono tracking-wide">
                    Building autonomous AI workflows with Hermes Agent
                  </span>
                  <FaArrowRight
                    size={10}
                    aria-hidden="true"
                    className="text-neon-cyan transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
              </Link>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="text-slate-400 text-sm md:text-base max-w-lg mb-10 leading-relaxed"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.6}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link to="projects" smooth duration={700}>
                <button className="btn-solid focus-ring">
                  <FaCode size={13} aria-hidden="true" /> View Projects
                </button>
              </Link>
              <Link to="contact" smooth duration={700}>
                <button className="btn-outline focus-ring">
                  <FaEnvelope size={13} aria-hidden="true" /> Contact Me
                </button>
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.7}
              className="flex items-center gap-3"
            >
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
              <div className="h-px w-20 bg-gradient-to-r from-slate-500/40 to-transparent ml-2" aria-hidden="true" />
              <span className="text-[0.65rem] font-mono text-slate-500 tracking-widest uppercase hidden sm:block">
                {personalInfo.location}
              </span>
            </motion.div>
          </div>

          {/* Right column — holographic system status card (desktop only) */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.8}
            className="hidden lg:block self-center"
            aria-label="Profile summary"
          >
            <SystemStatusCard prefersReducedMotion={prefersReducedMotion} />
          </motion.aside>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-[0.6rem] text-slate-500 font-mono tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-neon-cyan/70"
          >
            <FaArrowDown size={12} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
