import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa'
import { experience } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'
import { EASE } from '../fx/motion'

function ExperienceCard({ data }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="relative pl-6 md:pl-10">
      {/* Timeline rail — hairline that draws itself down */}
      <motion.span
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute left-0 top-2 bottom-10 w-px origin-top bg-gradient-to-b from-signal/80 via-slate-50/20 to-transparent"
        aria-hidden="true"
      />
      <span
        className="absolute left-0 top-2 -translate-x-1/2 w-2 h-2 rounded-full bg-signal shadow-glow-cyan"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="glass glass-lumen hud-corners p-6 md:p-8 mb-8"
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            {/* Role */}
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h3 className="font-display font-semibold text-xl md:text-2xl text-slate-100">{data.role}</h3>
              <span className="chip font-mono">{data.type}</span>
            </div>
            {/* Company */}
            <p className="text-lg font-semibold text-signal/90">{data.company}</p>
          </div>

          {/* Period badge */}
          <div className="px-4 py-2 rounded-sm border border-slate-50/15 text-right flex-shrink-0 bg-void-800/60">
            <p className="text-sm font-medium text-slate-300 font-mono">{data.period}</p>
            <p className="text-xs text-slate-500">{data.duration}</p>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mb-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <FaMapMarkerAlt size={10} aria-hidden="true" /> {data.location}
          </span>
          <span className="flex items-center gap-1.5">
            <FaClock size={10} aria-hidden="true" /> {data.duration}
          </span>
        </div>

        {/* Responsibilities */}
        <div className="mb-6">
          <h4 className="text-xs font-mono tracking-[0.2em] text-signal/60 uppercase mb-4">Key Responsibilities</h4>
          <ul className="space-y-3">
            {data.responsibilities.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.5, ease: EASE }}
                className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed"
              >
                <FaCheckCircle size={14} className="flex-shrink-0 mt-0.5 text-signal/60" aria-hidden="true" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tech stack chips */}
        <div>
          <h4 className="text-xs font-mono tracking-[0.2em] text-slate-400/70 uppercase mb-3">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {data.tech.map((t) => (
              <span key={t} className="chip font-mono cursor-default">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="experience" className="py-28">
      <div className="section-container">
        <SectionTitle
          eyebrow="Work History"
          title="Experience"
          subtitle="My professional journey — building products that matter and infrastructure that scales"
        />

        <div className="mt-16 relative max-w-3xl mx-auto">
          {experience.map((exp) => (
            <ExperienceCard key={exp.id} data={exp} />
          ))}

          {/* "Next chapter" placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
            className="p-6 rounded-sm border border-dashed border-signal/25 bg-void-800/30 flex items-center justify-between gap-4 ml-6 md:ml-10"
          >
            <div>
              <p className="text-sm font-semibold text-slate-200">Open to New Opportunities</p>
              <p className="text-xs text-slate-500 mt-1">Looking for exciting full-stack or cloud engineering roles. Let's build something great together!</p>
            </div>
            <motion.div
              animate={prefersReducedMotion ? {} : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex-shrink-0 w-2 h-2 rounded-full bg-signal shadow-glow-cyan"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
