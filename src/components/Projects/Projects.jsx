import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa'
import { projects } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
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
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      {/* Removed colored background elements */}

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
          </a>
        </motion.div>
      </div>
    </section>
  )
}