import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { projects } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'
import { EASE } from '../fx/motion'

/**
 * Project panels — cinematic masked reveals.
 * Each panel wipes in via clip-path (alternating direction per index),
 * with an oversized editorial index numeral and a monochrome signal
 * wash on hover. Reduced motion → simple fade.
 */
function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReducedMotion = useReducedMotion()

  const fromLeft = index % 2 === 0
  const hiddenState = prefersReducedMotion
    ? { opacity: 0 }
    : { clipPath: fromLeft ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)', opacity: 1 }
  const visibleState = prefersReducedMotion
    ? { opacity: 1 }
    : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }

  return (
    <motion.div
      ref={ref}
      initial={hiddenState}
      animate={inView ? visibleState : {}}
      transition={{ delay: index * 0.12, duration: 1, ease: EASE }}
      className="glass glass-lumen flex flex-col group relative overflow-hidden"
    >
      {/* Signal wash on hover — monochrome lime, no rainbow gradients */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-signal/[0.06] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Oversized editorial index */}
      <span
        className="absolute -top-4 -right-2 font-display font-bold text-8xl text-slate-50/[0.045] leading-none pointer-events-none select-none"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Card header */}
      <div className="p-6 pb-0 relative">
        {/* Category + featured badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs font-mono text-signal/80 uppercase tracking-wider">{project.category}</span>
          {project.featured && (
            <span className="chip font-mono font-semibold !border-signal/40 !text-signal">Featured</span>
          )}
        </div>

        <h3 className="font-display font-semibold text-xl md:text-2xl text-slate-100 mb-3 group-hover:text-slate-50 transition-colors duration-300">
          {project.title}
        </h3>
      </div>

      {/* Description */}
      <p className="px-6 text-sm text-slate-400 leading-relaxed flex-1 relative">
        {project.description}
      </p>

      {/* Features */}
      {project.features && (
        <ul className="px-6 mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 relative">
          {project.features.map((f) => (
            <li key={f} className="text-xs text-slate-500 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-signal flex-shrink-0" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
      )}

      {/* Tech + links */}
      <div className="p-6 mt-4 border-t border-slate-50/10 flex items-end justify-between gap-4 relative">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="chip font-mono cursor-default">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="focus-ring inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-signal transition-colors"
            >
              <FaGithub size={15} aria-hidden="true" /> Code
            </a>
          )}
          {project.live && project.live !== '#' ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} live site`}
              className="focus-ring inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-signal transition-colors"
            >
              <FaExternalLinkAlt size={12} aria-hidden="true" /> Live
            </a>
          ) : (
            <span className="text-[0.65rem] font-mono text-slate-600 uppercase tracking-wider cursor-default" title="No public deployment">
              Source only
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 border-y border-slate-50/5 bg-void-850/60 overflow-hidden">
      {/* Ambient monochrome glow */}
      <div
        className="absolute top-1/3 left-0 w-[36rem] h-72 bg-slate-50/[0.03] blur-3xl rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative">
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
          transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/swapnil2801?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="btn-outline focus-ring"
          >
            <FaGithub aria-hidden="true" /> View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
