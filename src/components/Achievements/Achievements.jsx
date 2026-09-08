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
      className="glass glass-lumen p-6 group cursor-default"
    >
      {/* Metric badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-md border border-slate-500/25 bg-void-800/60 flex items-center justify-center text-center emoji-mono text-xl">
          {data.icon}
        </div>
        <div className="text-right">
          <div
            className="text-2xl font-display font-bold leading-none"
            style={{ color: data.color, textShadow: `0 0 18px ${data.color}55` }}
          >
            {data.metric}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">{data.metricLabel}</div>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-slate-200 mb-2 group-hover:text-slate-50 transition-colors">
        {data.title}
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed">
        {data.description}
      </p>
    </motion.div>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-28 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-1/4 w-[32rem] h-56 bg-neon-violet/5 blur-3xl rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative">
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
