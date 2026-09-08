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

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-white overflow-hidden"
    >
      {/* Subtle vertical rules — editorial grid feel */}
      <div className="absolute inset-y-0 left-6 md:left-12 w-px bg-neutral-100 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-y-0 right-6 md:right-12 w-px bg-neutral-100 pointer-events-none" aria-hidden="true" />
      {/* Faint horizontal rule anchoring the composition */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-neutral-50 pointer-events-none hidden lg:block" aria-hidden="true" />

      <div className="section-container relative z-10 py-32 md:py-24 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div className="max-w-3xl">
            {/* Role line */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="font-mono text-neutral-500 text-xs md:text-sm mb-6 tracking-[0.3em] uppercase"
            >
              Backend Engineer&ensp;·&ensp;AI Creator
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-neutral-900 mb-6 leading-[0.95] tracking-tight"
            >
              Swapnil
              <br />
              Patil
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.35}
              className="text-neutral-700 text-lg md:text-2xl mb-5 h-10 flex items-center"
            >
              <span className="text-neutral-400 mr-2 font-light">I build</span>
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
                className="font-semibold text-neutral-900"
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
                  className="group inline-flex items-center gap-3 border border-neutral-900 bg-neutral-900 text-white pl-3 pr-4 py-2 text-xs md:text-sm font-medium hover:bg-white hover:text-neutral-900 transition-colors duration-200 focus-ring"
                  aria-label="Learn about my Hermes Agent AI workflows"
                >
                  <FaFeatherAlt size={12} aria-hidden="true" />
                  <span className="font-mono tracking-wide">
                    Building autonomous AI workflows with Hermes Agent
                  </span>
                  <FaArrowRight
                    size={10}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
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
              className="text-neutral-500 text-sm md:text-base max-w-lg mb-10 leading-relaxed"
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
                  className="focus-ring w-10 h-10 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-900 transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
              <div className="h-px w-20 bg-neutral-200 ml-2" aria-hidden="true" />
              <span className="text-[0.65rem] font-mono text-neutral-400 tracking-widest uppercase hidden sm:block">
                {personalInfo.location}
              </span>
            </motion.div>
          </div>

          {/* Right column — editorial index card (desktop only) */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.8}
            className="hidden lg:block w-64 border-l border-neutral-200 pl-8 self-center"
            aria-label="Profile summary"
          >
            <ul className="space-y-7">
              {[
                { n: '01', t: 'Backend', d: 'APIs, microservices, Python & .NET Core' },
                { n: '02', t: 'AI Systems', d: 'Agent orchestration, LLM tooling, automation' },
                { n: '03', t: 'Infrastructure', d: 'Linux, AWS, Azure DevOps, CI/CD' },
              ].map(({ n, t, d }) => (
                <li key={n}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.65rem] text-neutral-300">{n}</span>
                    <div>
                      <p className="font-serif text-lg text-neutral-900 leading-snug">{t}</p>
                      <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{d}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
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
          <span className="text-[0.6rem] text-neutral-400 font-mono tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-neutral-400"
          >
            <FaArrowDown size={12} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
