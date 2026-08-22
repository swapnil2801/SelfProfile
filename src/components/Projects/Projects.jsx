import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { projects } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.55, ease: 'easeOut' }}
      className="card flex flex-col group"
    >
      {/* Card header */}
      <div className="p-6 pb-0">
        {/* Category + featured badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">{project.category}</span>
          {project.featured && (
            <span className="chip font-mono font-semibold">Featured</span>
          )}
        </div>

        <h3 className="font-serif text-xl md:text-2xl text-neutral-900 mb-3">
          {project.title}
        </h3>
      </div>

      {/* Description */}
      <p className="px-6 text-sm text-neutral-600 leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Features */}
      {project.features && (
        <ul className="px-6 mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5">
          {project.features.map((f) => (
            <li key={f} className="text-xs text-neutral-500 flex items-center gap-2">
              <span className="w-1 h-1 bg-neutral-900 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      )}

      {/* Tech + links */}
      <div className="p-6 mt-4 border-t border-neutral-100 flex items-end justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="chip font-mono cursor-default">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <FaGithub size={18} />
            </a>
          )}
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} live site`}
              className="text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <FaExternalLinkAlt size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 bg-neutral-50 border-y border-neutral-200">
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
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/swapnil2801?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="btn-outline focus-ring"
          >
            <FaGithub /> View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
