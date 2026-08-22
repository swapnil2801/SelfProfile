import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { achievements } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'

function AchievementCard({ data, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      className="card p-6 group cursor-default"
    >
      {/* Metric badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 border border-neutral-200 flex items-center justify-center text-center emoji-mono">
          {data.icon}
        </div>
        <div className="text-right">
          <div className="text-2xl font-serif text-neutral-900 leading-none">
            {data.metric}
          </div>
          <div className="text-xs text-neutral-400 mt-1">{data.metricLabel}</div>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-neutral-800 mb-2">
        {data.title}
      </h3>
      <p className="text-xs text-neutral-500 leading-relaxed">
        {data.description}
      </p>
    </motion.div>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-28 bg-white">
      <div className="section-container">
        <SectionTitle
          eyebrow="Impact & Results"
          title="Achievements"
          subtitle="Measurable outcomes and technical milestones delivered in production"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {achievements.map((a, i) => (
            <AchievementCard key={a.id} data={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
