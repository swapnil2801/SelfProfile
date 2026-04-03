import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'

const COLOR_MAP = {
  cyan: { text: '#00fff7', border: 'rgba(0,255,247,0.3)', bg: 'rgba(0,255,247,0.08)', glow: 'rgba(0,255,247,0.15)' },
  blue: { text: '#00d4ff', border: 'rgba(0,212,255,0.3)', bg: 'rgba(0,212,255,0.08)', glow: 'rgba(0,212,255,0.15)' },
  purple: { text: '#b829ff', border: 'rgba(184,41,255,0.3)', bg: 'rgba(184,41,255,0.08)', glow: 'rgba(184,41,255,0.15)' },
  green: { text: '#00ff88', border: 'rgba(0,255,136,0.3)', bg: 'rgba(0,255,136,0.08)', glow: 'rgba(0,255,136,0.15)' },
  pink: { text: '#ff2d9f', border: 'rgba(255,45,159,0.3)', bg: 'rgba(255,45,159,0.08)', glow: 'rgba(255,45,159,0.15)' },
}

function SkillBar({ name, level, color, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const c = COLOR_MAP[color]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-slate-300 group-hover:text-white transition-colors duration-200">
          {name}
        </span>
        <span className="text-xs font-mono" style={{ color: c.text }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay: index * 0.08 + 0.3, duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: `linear-gradient(90deg, ${c.text}80, ${c.text})`,
            boxShadow: `0 0 8px ${c.text}60`,
          }}
        >
          {/* Shimmer */}
          <div
            className="absolute inset-0 shimmer"
            style={{ background: `linear-gradient(90deg, transparent, ${c.text}40, transparent)` }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

function SkillCard({ category, icon, color, items, index }) {
  const c = COLOR_MAP[color]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="glass-card p-6 group transition-all duration-300"
      style={{ borderColor: c.border + '40' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = c.border
        e.currentTarget.style.boxShadow = `0 16px 48px ${c.glow}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = c.border + '40'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: c.bg, border: `1px solid ${c.border}` }}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">{category}</h3>
          <p className="text-xs text-slate-500">{items.length} technologies</p>
        </div>
        {/* Glow dot top-right */}
        <div
          className="ml-auto w-2 h-2 rounded-full group-hover:scale-150 transition-transform duration-300"
          style={{ background: c.text, boxShadow: `0 0 8px ${c.text}` }}
        />
      </div>

      {/* Skill bars */}
      <div className="space-y-4">
        {items.map((item, i) => (
          <SkillBar key={item.name} {...item} color={color} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

export default function TechStack() {
  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="section-container">
        <SectionTitle
          eyebrow="My Arsenal"
          title="Tech Stack"
          subtitle="Technologies and tools I use to build performant, scalable, and maintainable software"
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-16">
          {skills.map((skill, i) => (
            <SkillCard key={skill.category} {...skill} index={i} />
          ))}
        </div>

        {/* Bottom highlight tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {[
            'Python for AI', 'LiteLLM', 'AI Agents', 'LangChain', 'FastAPI',
            'React', 'Angular', '.NET Core', 'C#',
            'AWS', 'Azure DevOps', 'GCP', 'Docker', 'Kubernetes',
            'Linux Infrastructure', 'SQL Server', 'PostgreSQL', 'REST APIs', 'CI/CD',
          ].map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.08, y: -2 }}
              className="px-3 py-1.5 rounded-full text-xs font-mono cursor-default transition-all duration-200"
              style={{
                background: 'rgba(0,212,255,0.05)',
                border: '1px solid rgba(0,212,255,0.15)',
                color: '#94a3b8',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,212,255,0.12)'
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)'
                e.currentTarget.style.color = '#00d4ff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,212,255,0.05)'
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)'
                e.currentTarget.style.color = '#94a3b8'
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
