import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-scroll'
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaArrowDown, FaFeatherAlt, FaArrowRight } from 'react-icons/fa'
import { personalInfo } from '../../data/portfolioData'
import { EASE, fadeUp, lineReveal } from '../fx/motion'

/* Signal-status card — editorial mono panel, real facts only */
function SystemStatusCard({ prefersReducedMotion }) {
  return (
    <div className="relative" aria-label="System status summary">
      {/* Concentric signal rings behind the card */}
      {!prefersReducedMotion && (
        <div className="absolute -inset-10 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-[26rem] h-[26rem] max-w-none rounded-full border border-slate-50/5 animate-orbit-slow">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-signal/90 shadow-glow-cyan" />
          </div>
          <div className="absolute w-[20rem] h-[20rem] rounded-full border border-slate-50/5 animate-orbit-slower">
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-slate-50/70" />
          </div>
        </div>
      )}

      <div className="glass glass-lumen hud-corners relative p-0 overflow-hidden w-full max-w-sm">
        {/* Header */}
        <div className="terminal-header">
          <span className="terminal-dot bg-slate-500/60" />
          <span className="terminal-dot bg-slate-400/50" />
          <span className="terminal-dot bg-signal/70" />
          <span className="ml-2 text-[0.65rem] font-mono text-slate-400 tracking-wider">swapnil@pune:~ sys.status</span>
        </div>

        {/* Body */}
        <div className="p-5 font-mono text-xs leading-6">
          <p className="text-slate-500 mb-3">
            <span className="text-signal">$</span> whoami --verbose
          </p>

          <dl className="space-y-2.5">
            {[
              { k: 'OPERATOR', v: 'Swapnil Patil', accent: 'text-slate-100' },
              { k: 'ROLE', v: 'Backend · AI · DevOps', accent: 'text-signal' },
              { k: 'AGENT_STACK', v: 'Hermes Agent · LiteLLM', accent: 'text-slate-200' },
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
          <div className="mt-4 pt-4 border-t border-slate-50/10 flex items-center justify-between">
            <span className="flex items-center gap-2 text-[0.6rem] tracking-[0.2em] text-slate-500 uppercase">
              <span className="led" aria-hidden="true" />
              Agents Online
            </span>
            <span className="text-signal text-[0.65rem]">
              AVAILABLE FOR WORK
              {!prefersReducedMotion && <span className="animate-ticker inline-block ml-1">▊</span>}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)

  // Cinematic depth: hero content drifts up & fades as you scroll past
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '-12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, prefersReducedMotion ? 1 : 0.1])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Horizon hairline at hero base */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-signal/30 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="section-container relative z-10 py-32 md:py-24 w-full"
      >
        <div className="grid lg:grid-cols-[1fr_auto] gap-14 items-center">
          <div className="max-w-3xl">
            {/* Role line */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="font-mono text-signal/90 text-xs md:text-sm mb-6 tracking-[0.3em] uppercase"
            >
              <span className="text-slate-600 mr-2">{'//'}</span>
              Backend Engineer&ensp;·&ensp;AI Creator
            </motion.p>

            {/* Name — masked editorial reveal, filled + outline pairing */}
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl mb-6 leading-[0.95] tracking-tight">
              <span className="line-mask">
                <motion.span
                  variants={lineReveal}
                  initial="hidden"
                  animate="visible"
                  custom={0.2}
                  className="text-slate-50"
                >
                  Swapnil
                </motion.span>
              </span>
              <span className="line-mask">
                <motion.span
                  variants={lineReveal}
                  initial="hidden"
                  animate="visible"
                  custom={0.32}
                  className="text-outline"
                >
                  Patil
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.5, ease: EASE }}
                    className="text-signal inline-block ml-1"
                    style={{ WebkitTextStroke: 0 }}
                    aria-hidden="true"
                  >
                    .
                  </motion.span>
                </motion.span>
              </span>
            </h1>

            {/* Typing animation */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.45}
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
                className="font-semibold text-signal"
              />
            </motion.div>

            {/* Hermes Agent highlight badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.55}
              className="mb-6"
            >
              <Link to="ai-creator" smooth duration={700} offset={-70}>
                <button
                  className="group inline-flex items-center gap-3 rounded-sm border border-slate-50/20 bg-slate-50/[0.04] text-slate-100 pl-3 pr-4 py-2 text-xs md:text-sm font-medium hover:border-signal/60 hover:shadow-glow-cyan transition-all duration-200 focus-ring"
                  aria-label="Learn about my Hermes Agent AI workflows"
                >
                  <FaFeatherAlt size={12} aria-hidden="true" className="text-signal" />
                  <span className="font-mono tracking-wide">
                    Building autonomous AI workflows with Hermes Agent
                  </span>
                  <FaArrowRight
                    size={10}
                    aria-hidden="true"
                    className="text-signal transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
              </Link>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.62}
              className="text-slate-400 text-sm md:text-base max-w-lg mb-10 leading-relaxed"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.7}
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
              custom={0.8}
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
                  className="focus-ring w-10 h-10 rounded-sm border border-slate-50/15 bg-void-800/50 flex items-center justify-center text-slate-400 hover:text-signal hover:border-signal/60 hover:shadow-glow-cyan transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
              <div className="h-px w-20 bg-gradient-to-r from-slate-50/30 to-transparent ml-2" aria-hidden="true" />
              <span className="text-[0.65rem] font-mono text-slate-500 tracking-widest uppercase hidden sm:block">
                {personalInfo.location}
              </span>
            </motion.div>
          </div>

          {/* Right column — signal status card (desktop only) */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.9}
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
          transition={{ delay: 1.3, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-[0.6rem] text-slate-500 font-mono tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-signal/80"
          >
            <FaArrowDown size={12} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
