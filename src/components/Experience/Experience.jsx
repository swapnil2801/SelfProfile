import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa'
import { experience } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'

function ExperienceCard({ data, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* Timeline dot + line */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="relative w-12 h-12 rounded-full flex items-center justify-center z-10 flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(184,41,255,0.2))',
            border: '2px solid rgba(0,212,255,0.5)',
            boxShadow: '0 0 20px rgba(0,212,255,0.3)',
          }}
        >
          <FaBriefcase size={16} style={{ color: '#00d4ff' }} />
        </motion.div>
        <div
          className="w-px flex-1 mt-2"
          style={{ background: 'linear-gradient(180deg, rgba(0,212,255,0.4), transparent)' }}
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
        className="flex-1 glass-card p-6 md:p-8 mb-8 group hover:border-cyan-500/30 transition-all duration-300"
        style={{
          boxShadow: 'none',
        }}
        whileHover={{
          boxShadow: '0 16px 48px rgba(0,212,255,0.1)',
          y: -4,
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            {/* Role */}
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl md:text-2xl font-bold text-white">{data.role}</h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-mono"
                style={{
                  background: 'rgba(0,255,136,0.1)',
                  border: '1px solid rgba(0,255,136,0.25)',
                  color: '#00ff88',
                }}
              >
                {data.type}
              </span>
            </div>
            {/* Company */}
            <p
              className="text-lg font-semibold gradient-text-blue-purple"
            >
              {data.company}
            </p>
          </div>

          {/* Period badge */}
          <div
            className="px-4 py-2 rounded-xl text-right flex-shrink-0"
            style={{
              background: 'rgba(0,212,255,0.06)',
              border: '1px solid rgba(0,212,255,0.15)',
            }}
          >
            <p className="text-sm font-semibold text-cyan-400 font-mono">{data.period}</p>
            <p className="text-xs text-slate-500">{data.duration}</p>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mb-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <FaMapMarkerAlt size={10} />
            {data.location}
          </span>
          <span className="flex items-center gap-1.5">
            <FaClock size={10} />
            {data.duration}
          </span>
        </div>

        {/* Responsibilities */}
        <div className="mb-6">
          <h4 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-4">
            Key Responsibilities
          </h4>
          <ul className="space-y-3">
            {data.responsibilities.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed"
              >
                <FaCheckCircle
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: '#00d4ff' }}
                />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tech stack chips */}
        <div>
          <h4 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.tech.map((t) => (
              <motion.span
                key={t}
                whileHover={{ scale: 1.06, y: -1 }}
                className="px-3 py-1 rounded-full text-xs font-mono cursor-default transition-all duration-200"
                style={{
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  color: '#00d4ff',
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      {/* BG decoration */}
      <div
        className="absolute top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(184,41,255,0.05), transparent 70%)' }}
      />

      <div className="section-container">
        <SectionTitle
          eyebrow="Work History"
          title="Experience"
          subtitle="My professional journey — building products that matter and infrastructure that scales"
        />

        {/* Timeline wrapper */}
        <div className="mt-16 relative">
          {experience.map((exp, i) => (
            <ExperienceCard key={exp.id} data={exp} index={i} />
          ))}

          {/* "Next chapter" placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex gap-6 md:gap-10"
          >
            <div className="hidden md:flex flex-col items-center flex-shrink-0">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 rounded-full flex items-center justify-center z-10"
                style={{
                  background: 'rgba(0,255,136,0.1)',
                  border: '2px dashed rgba(0,255,136,0.4)',
                }}
              >
                <span className="text-green-400 text-lg">+</span>
              </motion.div>
            </div>
            <div
              className="flex-1 glass-card p-6 mb-8 flex items-center gap-4"
              style={{ border: '1px dashed rgba(0,255,136,0.2)' }}
            >
              <div>
                <p className="text-sm font-semibold text-green-400">Open to New Opportunities</p>
                <p className="text-xs text-slate-500 mt-1">
                  Looking for exciting full-stack or cloud engineering roles. Let&apos;s build something great together!
                </p>
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0 w-2 h-2 rounded-full bg-green-400"
                style={{ boxShadow: '0 0 8px #00ff88' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
