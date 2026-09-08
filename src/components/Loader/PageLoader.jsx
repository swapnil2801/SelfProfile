import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * PageLoader – futuristic boot sequence.
 * Dark screen, mono "system boot" lines, gradient wordmark, progress bar.
 */
const bootLines = [
  '> init hermes.runtime ............ ok',
  '> mount portfolio.sys ............ ok',
  '> link neural.interface .......... ok',
]

export default function PageLoader({ onComplete }) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), prefersReducedMotion ? 400 : 1600)
    return () => clearTimeout(t)
  }, [onComplete, prefersReducedMotion])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void-900 px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-display text-3xl md:text-4xl text-gradient tracking-tight font-semibold"
      >
        Swapnil Patil
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.9, ease: 'easeInOut' }}
        className="mt-5 h-px w-48 origin-left bg-gradient-to-r from-neon-cyan via-neon-violet to-transparent"
      />

      <div className="mt-6 font-mono text-[0.65rem] leading-6 text-slate-500" aria-hidden="true">
        {bootLines.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.25, duration: 0.3 }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.4 }}
        className="mt-4 text-[0.6rem] font-mono tracking-[0.4em] uppercase text-neon-cyan/70"
      >
        System Online
      </motion.p>
    </motion.div>
  )
}
