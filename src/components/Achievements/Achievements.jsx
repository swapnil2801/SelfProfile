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
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -3, scale: 1.01 }}
      className="p-6 rounded-lg border border-gray-600 transition-all duration-300 group cursor-default"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      {/* Metric badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-center"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          {data.icon}
        </div>
        <div className="text-right">
          <div
            className="text-2xl font-black font-orbitron leading-none"
            style={{ color: '#6c757d' }}
          >
            {data.metric}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">{data.metricLabel}</div>
        </div>
      </div>

      <h3 className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors">
        {data.title}
      </h3>
      <p className="text-xs text-gray-400 leading-relaxed">
        {data.description}
      </p>
    </motion.div>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-28 relative overflow-hidden">
      {/* Removed colored background decorations */}

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