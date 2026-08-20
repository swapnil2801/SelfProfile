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
<<<<<<< HEAD
      whileHover={{ y: -3, scale: 1.01 }}
      className="p-6 rounded-lg border border-gray-600 transition-all duration-300 group cursor-default"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      {/* Metric badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-center"
          style={{ background: 'rgba(255,255,255,0.05)' }}
=======
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card p-6 group h-full cursor-default transition-all duration-300 relative overflow-hidden"
      style={{ borderColor: `${data.color}15` }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${data.color}45`
        e.currentTarget.style.boxShadow = `0 16px 50px ${data.color}12`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${data.color}15`
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* BG glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top left, ${data.color}06, transparent 60%)`,
        }}
      />

      {/* Metric badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: `${data.color}12`, border: `1px solid ${data.color}25` }}
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
        >
          {data.icon}
        </div>
        <div className="text-right">
          <div
            className="text-2xl font-black font-orbitron leading-none"
<<<<<<< HEAD
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
=======
            style={{ color: data.color, textShadow: `0 0 20px ${data.color}60` }}
          >
            {data.metric}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">{data.metricLabel}</div>
        </div>
      </div>

      <h3 className="text-sm font-bold text-white mb-2 group-hover:text-slate-100 transition-colors">
        {data.title}
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed">
        {data.description}
      </p>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 rounded-b-2xl"
        style={{ background: `linear-gradient(90deg, ${data.color}, transparent)` }}
        initial={{ width: 0 }}
        animate={inView ? { width: '60%' } : { width: 0 }}
        transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
      />
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
    </motion.div>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-28 relative overflow-hidden">
<<<<<<< HEAD
      {/* Removed colored background decorations */}
=======
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.04), transparent 70%)' }}
      />
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0

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
<<<<<<< HEAD
}
=======
}
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
