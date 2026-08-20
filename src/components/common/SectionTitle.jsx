import { motion } from 'framer-motion'

/**
 * Reusable section heading component with eyebrow text, title, and subtitle.
 */
export default function SectionTitle({ eyebrow, title, subtitle, align = 'center' }) {
  const isCenter = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`mb-4 ${isCenter ? 'text-center' : 'text-left'}`}
    >
      {eyebrow && (
        <span
          className="inline-block text-xs font-mono tracking-[0.25em] uppercase mb-3 px-3 py-1 rounded-full"
          style={{
            color: '#00d4ff',
            background: 'rgba(0,212,255,0.08)',
            border: '1px solid rgba(0,212,255,0.2)',
          }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-black font-orbitron leading-tight mb-4"
        style={{ color: '#ffffff' }}
      >
        {title.split(' ').map((word, i, arr) =>
          i === arr.length - 1 ? (
            <span key={i} className="gradient-text"> {word}</span>
          ) : (
            <span key={i}>{word} </span>
          )
        )}
      </h2>
      {subtitle && (
        <p className={`text-slate-400 text-sm md:text-base max-w-2xl ${isCenter ? 'mx-auto' : ''} leading-relaxed`}>
          {subtitle}
        </p>
      )}
      {/* Decorative line */}
      <div className={`mt-6 flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}>
        <div className="h-px w-12"
          style={{ background: 'linear-gradient(90deg, transparent, #00d4ff)' }} />
        <div className="w-2 h-2 rounded-full bg-cyan-400"
          style={{ boxShadow: '0 0 8px #00d4ff' }} />
        <div className="h-px w-12"
          style={{ background: 'linear-gradient(90deg, #00d4ff, transparent)' }} />
      </div>
    </motion.div>
  )
}
