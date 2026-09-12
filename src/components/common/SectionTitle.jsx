import { motion } from 'framer-motion'
import { EASE, viewportOnce } from '../fx/motion'

/**
 * Reusable section heading — cinematic editorial style.
 * Mono eyebrow, masked line-reveal display title, muted subtitle,
 * hairline rule that draws itself in.
 */
export default function SectionTitle({ eyebrow, title, subtitle, align = 'center' }) {
  const isCenter = align === 'center'

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      className={`mb-4 ${isCenter ? 'text-center' : 'text-left'}`}
    >
      {eyebrow && (
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
          }}
          className="eyebrow mb-4"
        >
          <span className="text-slate-600 mr-1.5">[</span>
          {eyebrow}
          <span className="text-slate-600 ml-1.5">]</span>
        </motion.span>
      )}

      <span className="line-mask">
        <motion.h2
          variants={{
            hidden: { y: '110%' },
            visible: { y: '0%', transition: { duration: 0.9, ease: EASE } },
          }}
          className="font-display font-semibold text-3xl md:text-4xl lg:text-5xl text-slate-100 leading-tight mb-4 tracking-tight"
        >
          {title}
        </motion.h2>
      </span>

      {subtitle && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
          }}
          className={`text-slate-400 text-sm md:text-base max-w-2xl ${isCenter ? 'mx-auto' : ''} leading-relaxed`}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Hairline rule draws in */}
      <div className={`mt-6 flex items-center ${isCenter ? 'justify-center' : ''}`}>
        <motion.div
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 1, ease: EASE } },
          }}
          className="h-px w-24 origin-left bg-gradient-to-r from-slate-50/70 via-signal to-transparent"
        />
      </div>
    </motion.div>
  )
}
