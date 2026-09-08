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

export default function AiCreator() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  const card = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section id="ai-creator" className="py-28 bg-white border-b border-neutral-200">
      <div className="section-container" ref={ref}>
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
                <div className="w-10 h-10 border border-neutral-900 bg-neutral-900 text-white flex items-center justify-center flex-shrink-0">
                  <FaFeatherAlt size={16} aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-neutral-900">
                  An AI engineering team, running locally
                </h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">{aiCreator.intro}</p>
              <p className="text-sm text-neutral-600 leading-relaxed">{aiCreator.intro2}</p>

              {/* Stack chips */}
              <div className="flex flex-wrap gap-2 mt-6" aria-label="AI workflow stack">
                {aiCreator.stack.map((s) => (
                  <span key={s} className="chip font-mono cursor-default">{s}</span>
                ))}
              </div>
            </motion.div>

            {/* Terminal-style illustration of the workflow */}
            <motion.div variants={card} className="card bg-white overflow-hidden self-center w-full">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-200 bg-neutral-50">
                <div className="w-2.5 h-2.5 rounded-full border border-neutral-300" />
                <div className="w-2.5 h-2.5 rounded-full border border-neutral-300" />
                <div className="w-2.5 h-2.5 rounded-full border border-neutral-300" />
                <span className="ml-2 text-xs font-mono text-neutral-500">hermes — agent session</span>
              </div>
              <pre className="p-5 text-xs font-mono leading-6 overflow-x-auto text-neutral-700" aria-label="Example Hermes Agent session">
                <code>
                  <span className="text-neutral-400">$</span> <span className="text-neutral-900">hermes</span> <span className="text-neutral-500">"enhance the portfolio site"</span>{'\n'}
                  <span className="text-neutral-400">→</span> manager: routing task to <span className="text-neutral-900">frontend</span> agent{'\n'}
                  <span className="text-neutral-400">→</span> frontend: git fetch origin && checkout -b feat/…{'\n'}
                  <span className="text-neutral-400">→</span> frontend: editing components, wiring data…{'\n'}
                  <span className="text-neutral-400">→</span> frontend: npm run build <span className="text-neutral-900">✓ built in 4s</span>{'\n'}
                  <span className="text-neutral-400">→</span> frontend: pushed branch, reporting diff{'\n'}
                  <span className="text-neutral-400">✓</span> <span className="text-neutral-900">done</span> — human review before merge{'\n'}
                  <span className="text-neutral-400">$</span> <span className="animate-pulse">▌</span>
                </code>
              </pre>
            </motion.div>
          </div>

          {/* Capabilities grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {aiCreator.capabilities.map(({ title, description, icon }) => {
              const Icon = icons[icon] || FaFeatherAlt
              return (
                <motion.div key={title} variants={card} className="card p-6 bg-white">
                  <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center text-neutral-700 mb-4">
                    <Icon size={16} aria-hidden="true" />
                  </div>
                  <h4 className="font-semibold text-neutral-900 text-sm mb-2 tracking-wide">
                    {title}
                  </h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">{description}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Workflow timeline */}
          <motion.div variants={card}>
            <h3 className="eyebrow mb-6 block text-center">How a task flows</h3>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-neutral-200 border border-neutral-200">
              {aiCreator.workflow.map(({ step, label, detail }) => (
                <li key={step} className="bg-white p-5 hover:bg-neutral-50 transition-colors duration-200">
                  <span className="font-mono text-[0.65rem] text-neutral-300 block mb-2">{step}</span>
                  <p className="font-serif text-lg text-neutral-900 mb-1">{label}</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">{detail}</p>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
