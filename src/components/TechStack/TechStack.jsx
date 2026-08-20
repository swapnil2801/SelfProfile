import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'

function SkillBar({ name, level, color, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-200">
          {name}
        </span>
        <span className="text-xs font-mono" style={{ color: '#6c757d' }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay: index * 0.08 + 0.3, duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: 'linear-gradient(90deg, #6c757d80, #6c757d)' }}
        >
          {/* Shimmer */}
          <div
            className="absolute inset-0 shimmer"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

function SkillCard({ category, icon, color, items, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="p-6 rounded-lg border border-gray-700 transition-all duration-300 group-hover:border-gray-600"
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded flex items-center justify-center text-sm"
          style={{ background: 'rgba(33,37,41,0.5)' }}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-200 text-sm">{category}</h3>
          <p className="text-xs text-gray-500">{items.length} technologies</p>
        </div>
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
      {/* Removed colored background glow */}

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
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-3 py-1.5 rounded-full text-xs font-mono cursor-default transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#495057',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.color = '#495057'
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