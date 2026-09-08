import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  FaFeatherAlt, FaProjectDiagram, FaTerminal, FaServer, FaSyncAlt,
} from 'react-icons/fa'
import { aiCreator } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'

const icons = {
  route: FaProjectDiagram,
  terminal: FaTerminal,
  server: FaServer,
  loop: FaSyncAlt,
}

const capAccents = [
  'border-neon-cyan/30 text-neon-cyan',
  'border-neon-violet/30 text-neon-violet',
  'border-neon-magenta/30 text-neon-magenta',
  'border-emerald-400/30 text-emerald-300',
]

export default function AiCreator() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  const card = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section id="ai-creator" className="relative py-28 border-b border-slate-500/10 overflow-hidden">
      {/* Section accent glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-64 bg-neon-violet/5 blur-3xl rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative" ref={ref}>
        <SectionTitle
          eyebrow={aiCreator.eyebrow}
          title={aiCreator.title}
          subtitle={aiCreator.subtitle}
        />

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-14"
        >
          {/* Intro: narrative + terminal mock */}
          <div className="grid lg:grid-cols-2 gap-8 mb-14">
            <motion.div variants={card} className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-md border border-neon-violet/50 bg-gradient-to-br from-neon-cyan/15 to-neon-violet/15 text-neon-violet flex items-center justify-center flex-shrink-0 shadow-glow-violet">
                  <FaFeatherAlt size={16} aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-xl md:text-2xl text-slate-100">
                  An AI engineering team, running locally
                </h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{aiCreator.intro}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{aiCreator.intro2}</p>

              {/* Stack chips */}
              <div className="flex flex-wrap gap-2 mt-6" aria-label="AI workflow stack">
                {aiCreator.stack.map((s) => (
                  <span key={s} className="chip font-mono cursor-default">{s}</span>
                ))}
              </div>
            </motion.div>

            {/* Terminal-style illustration of the workflow */}
            <motion.div variants={card} className="terminal-frame hud-corners self-center w-full">
              <div className="terminal-header">
                <span className="terminal-dot bg-rose-500/70" />
                <span className="terminal-dot bg-amber-400/70" />
                <span className="terminal-dot bg-emerald-400/70" />
                <span className="ml-2 text-xs font-mono text-slate-400">hermes — agent session</span>
                <span className="ml-auto flex items-center gap-1.5 text-[0.6rem] font-mono text-neon-green/80 uppercase tracking-wider">
                  <span className="led" aria-hidden="true" /> live
                </span>
              </div>
              <pre className="p-5 text-xs font-mono leading-6 overflow-x-auto text-slate-300" aria-label="Example Hermes Agent session">
                <code>
                  <span className="text-neon-cyan">$</span> <span className="text-slate-100">hermes</span> <span className="text-emerald-300">"enhance the portfolio site"</span>{'\n'}
                  <span className="text-neon-violet">→</span> manager: routing task to <span className="text-neon-cyan">frontend</span> agent{'\n'}
                  <span className="text-neon-violet">→</span> frontend: git fetch origin && checkout -b feat/…{'\n'}
                  <span className="text-neon-violet">→</span> frontend: editing components, wiring data…{'\n'}
                  <span className="text-neon-violet">→</span> frontend: npm run build <span className="text-neon-green">✓ built in 4s</span>{'\n'}
                  <span className="text-neon-violet">→</span> frontend: pushed branch, reporting diff{'\n'}
                  <span className="text-neon-green">✓</span> <span className="text-slate-100">done</span> — human review before merge{'\n'}
                  <span className="text-neon-cyan">$</span> {prefersReducedMotion ? <span>▌</span> : <span className="animate-ticker inline-block">▌</span>}
                </code>
              </pre>
            </motion.div>
          </div>

          {/* Capabilities grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {aiCreator.capabilities.map(({ title, description, icon }, i) => {
              const Icon = icons[icon] || FaFeatherAlt
              return (
                <motion.div key={title} variants={card} className="glass glass-lumen p-6">
                  <div className={`w-10 h-10 rounded-md border bg-void-800/60 flex items-center justify-center mb-4 ${capAccents[i % capAccents.length]}`}>
                    <Icon size={16} aria-hidden="true" />
                  </div>
                  <h4 className="font-semibold text-slate-100 text-sm mb-2 tracking-wide">
                    {title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Workflow timeline */}
          <motion.div variants={card}>
            <h3 className="eyebrow mb-6 block text-center">How a task flows</h3>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-slate-500/15 border border-slate-500/15 rounded-lg overflow-hidden">
              {aiCreator.workflow.map(({ step, label, detail }) => (
                <li key={step} className="bg-void-850/90 p-5 hover:bg-void-700/70 transition-colors duration-200 group">
                  <span className="font-mono text-[0.65rem] text-neon-cyan/60 block mb-2 group-hover:text-neon-cyan transition-colors">{step}</span>
                  <p className="font-display font-semibold text-lg text-slate-100 mb-1">{label}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{detail}</p>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
