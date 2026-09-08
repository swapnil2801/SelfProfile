import { motion } from 'framer-motion'

/**
 * Reusable section heading — futuristic HUD style.
 * Mono eyebrow with brackets, display-font title, muted subtitle, gradient rule.
 */
export default function SectionTitle({ eyebrow, title, subtitle, align = 'center' }) {
  const isCenter = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-4 ${isCenter ? 'text-center' : 'text-left'}`}
    >
      {eyebrow && (
        <span className="eyebrow mb-4">
          <span className="text-slate-600 mr-1.5">[</span>
          {eyebrow}
          <span className="text-slate-600 ml-1.5">]</span>
        </span>
      )}
      <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl text-slate-100 leading-tight mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-slate-400 text-sm md:text-base max-w-2xl ${isCenter ? 'mx-auto' : ''} leading-relaxed`}>
          {subtitle}
        </p>
      )}
      {/* Gradient rule */}
      <div className={`mt-6 flex items-center ${isCenter ? 'justify-center' : ''}`}>
        <div className="h-px w-24 bg-gradient-to-r from-neon-cyan via-neon-violet to-transparent" />
      </div>
    </motion.div>
  )
}
