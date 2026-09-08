import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'

const barAccents = {
  pink: 'from-neon-magenta to-neon-violet',
  blue: 'from-neon-cyan to-neon-blue',
  purple: 'from-neon-violet to-neon-magenta',
  cyan: 'from-neon-cyan to-neon-violet',
}

function SkillBar({ name, level, index, accent }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-slate-400 group-hover:text-slate-100 transition-colors duration-200">
          {name}
        </span>
        <span className="text-xs font-mono text-neon-cyan/60">{level}%</span>
      </div>
      <div className="h-1 bg-slate-500/15 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay: index * 0.06 + 0.2, duration: 0.9, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${accent} shadow-glow-cyan`}
        />
      </div>
    </motion.div>
  )
}

function SkillCard({ category, icon, items, index, color }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const accent = barAccents[color] || barAccents.cyan

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      className="glass glass-lumen p-6"
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-md border border-slate-500/25 bg-void-800/60 flex items-center justify-center text-sm emoji-mono">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-slate-100 text-sm">{category}</h3>
          <p className="text-xs text-slate-500 font-mono">{items.length} technologies</p>
        </div>
      </div>

      {/* Skill bars */}
      <div className="space-y-4">
        {items.map((item, i) => (
          <SkillBar key={item.name} {...item} index={i} accent={accent} />
        ))}
      </div>
    </motion.div>
  )
}

export default function TechStack() {
  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 right-0 w-[40rem] h-64 bg-neon-cyan/5 blur-3xl rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative">
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
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {[
            'Python for AI', 'LiteLLM', 'AI Agents', 'Hermes Agent', 'LangChain', 'FastAPI',
            'React', 'Angular', '.NET Core', 'C#',
            'AWS', 'Azure DevOps', 'GCP', 'Docker', 'Kubernetes',
            'Linux Infrastructure', 'SQL Server', 'PostgreSQL', 'REST APIs', 'CI/CD',
          ].map((tag) => (
            <span key={tag} className="chip font-mono cursor-default">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
