import { motion } from 'framer-motion'

/**
 * Reusable section heading — editorial monochrome style.
 * Eyebrow label, serif title, muted subtitle, thin rule.
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
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-neutral-500 text-sm md:text-base max-w-2xl ${isCenter ? 'mx-auto' : ''} leading-relaxed`}>
          {subtitle}
        </p>
      )}
      {/* Thin rule */}
      <div className={`mt-6 flex items-center ${isCenter ? 'justify-center' : ''}`}>
        <div className="h-px w-16 bg-neutral-900" />
      </div>
    </motion.div>
  )
}
