import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa'
import { experience } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'

function ExperienceCard({ data }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="card p-6 md:p-8 mb-8"
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            {/* Role */}
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-serif text-xl md:text-2xl text-neutral-900">{data.role}</h3>
              <span className="chip font-mono">{data.type}</span>
            </div>
            {/* Company */}
            <p className="text-lg font-semibold text-neutral-700">{data.company}</p>
          </div>

          {/* Period badge */}
          <div className="px-4 py-2 border border-neutral-200 text-right flex-shrink-0 bg-neutral-50">
            <p className="text-sm font-medium text-neutral-700 font-mono">{data.period}</p>
            <p className="text-xs text-neutral-400">{data.duration}</p>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mb-6 text-xs text-neutral-500">
          <span className="flex items-center gap-1.5">
            <FaMapMarkerAlt size={10} /> {data.location}
          </span>
          <span className="flex items-center gap-1.5">
            <FaClock size={10} /> {data.duration}
          </span>
        </div>

        {/* Responsibilities */}
        <div className="mb-6">
          <h4 className="text-xs font-mono tracking-[0.2em] text-neutral-400 uppercase mb-4">Key Responsibilities</h4>
          <ul className="space-y-3">
            {data.responsibilities.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                className="flex items-start gap-3 text-sm text-neutral-600 leading-relaxed"
              >
                <FaCheckCircle size={14} className="flex-shrink-0 mt-0.5 text-neutral-400" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tech stack chips */}
        <div>
          <h4 className="text-xs font-mono tracking-[0.2em] text-neutral-400 uppercase mb-3">Tech Stack</h4>
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
  return (
    <section id="experience" className="py-28 bg-white">
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
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-6 border border-dashed border-neutral-300 flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-sm font-semibold text-neutral-800">Open to New Opportunities</p>
              <p className="text-xs text-neutral-500 mt-1">Looking for exciting full-stack or cloud engineering roles. Let's build something great together!</p>
            </div>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex-shrink-0 w-2 h-2 rounded-full bg-neutral-900"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
