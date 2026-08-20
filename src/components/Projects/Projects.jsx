import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa'
import { projects } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'

<<<<<<< HEAD
=======
const STATUS_COLORS = {
  Production: { color: '#00ff88', bg: 'rgba(0,255,136,0.1)', border: 'rgba(0,255,136,0.25)' },
  'Open Source': { color: '#00d4ff', bg: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.25)' },
  'In Development': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
}

>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
<<<<<<< HEAD
=======
  const status = STATUS_COLORS[project.status] || STATUS_COLORS.Production
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
<<<<<<< HEAD
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-lg border border-gray-700 transition-all duration-300 group"
      style={{ background: 'rgba(33,37,41,0.5)' }}
    >
      {/* Card header */}
      <div className="relative p-5">
        {/* Category + featured badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono text-gray-400">{project.category}</span>
          {project.featured && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-mono font-semibold"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#ccc' }}
            >
              ★ Featured
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-200 group-hover:text-gray-100 transition-colors duration-300">
          {project.title}
        </h3>
      </div>

      {/* Description */}
      <div className="p-5 text-sm text-gray-400 leading-relaxed mb-6">
        {project.description}
      </p>
=======
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass-card overflow-hidden group flex flex-col h-full transition-all duration-300"
      style={{
        boxShadow: hovered ? '0 20px 60px rgba(0,212,255,0.12)' : 'none',
        borderColor: hovered ? 'rgba(0,212,255,0.3)' : 'rgba(0,212,255,0.1)',
      }}
    >
      {/* Card header – gradient banner */}
      <div
        className="relative h-2 overflow-hidden"
        style={{
          background: `linear-gradient(90deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
        }}
      >
        <div
          className={`h-full bg-gradient-to-r ${project.gradient}`}
          style={{
            boxShadow: `0 0 20px rgba(0,212,255,0.4)`,
          }}
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            {/* Category + featured badge */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-slate-500">{project.category}</span>
              {project.featured && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-mono font-semibold"
                  style={{
                    background: 'rgba(255,45,159,0.12)',
                    border: '1px solid rgba(255,45,159,0.35)',
                    color: '#ff2d9f',
                  }}
                >
                  ★ Featured
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <span
            className="flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-mono"
            style={{ background: status.bg, border: `1px solid ${status.border}`, color: status.color }}
          >
            {project.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.features.map((feat) => (
            <span
              key={feat}
              className="text-xs px-2.5 py-1 rounded-full font-mono"
              style={{
                background: 'rgba(184,41,255,0.08)',
                border: '1px solid rgba(184,41,255,0.2)',
                color: '#b829ff',
              }}
            >
              {feat}
            </span>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded font-mono text-slate-400"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.2)',
              color: '#00d4ff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.15)'
              e.currentTarget.style.boxShadow = '0 0 12px rgba(0,212,255,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.08)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <FaGithub size={13} />
            GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(184,41,255,0.08)',
              border: '1px solid rgba(184,41,255,0.2)',
              color: '#b829ff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(184,41,255,0.15)'
              e.currentTarget.style.boxShadow = '0 0 12px rgba(184,41,255,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(184,41,255,0.08)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <FaExternalLinkAlt size={11} />
            Live Demo
          </a>
        </div>
      </div>
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 relative overflow-hidden">
<<<<<<< HEAD
      {/* Removed colored background elements */}
=======
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-60 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(184,41,255,0.06), transparent 70%)',
        }}
      />
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0

      <div className="section-container">
        <SectionTitle
          eyebrow="What I've Built"
          title="Featured Projects"
          subtitle="A selection of projects that showcase my full-stack and cloud engineering expertise"
        />

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/swapnil2801?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{
<<<<<<< HEAD
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              color: '#aaa',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            }}
          >
            <FaGithub /> View All Projects on GitHub
=======
              background: 'rgba(0,212,255,0.06)',
              border: '1px solid rgba(0,212,255,0.2)',
              color: '#00d4ff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.12)'
              e.currentTarget.style.boxShadow = '0 0 24px rgba(0,212,255,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.06)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <FaGithub />
            View All Projects on GitHub
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
          </a>
        </motion.div>
      </div>
    </section>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
