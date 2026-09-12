import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../fx/motion'

/**
 * PageLoader – cinematic signal acquisition sequence.
 * Black screen, mono "signal" lines, masked wordmark reveal,
 * hairline that draws in like a waveform arming.
 */
const bootLines = [
  '> acquiring signal ............... ok',
  '> calibrating frame .............. ok',
  '> portfolio feed live ............ ok',
]

export default function PageLoader({ onComplete }) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), prefersReducedMotion ? 400 : 1700)
    return () => clearTimeout(t)
  }, [onComplete, prefersReducedMotion])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void-900 px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <span className="line-mask">
        <motion.h1
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-display text-3xl md:text-4xl text-slate-50 tracking-tight font-semibold"
        >
          Swapnil<span className="text-signal">.</span>Patil
        </motion.h1>
      </span>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
        className="mt-5 h-px w-48 origin-left bg-gradient-to-r from-slate-50/60 via-signal to-transparent"
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
        transition={{ delay: 1.15, duration: 0.4 }}
        className="mt-4 text-[0.6rem] font-mono tracking-[0.4em] uppercase text-signal/80"
      >
        Signal Locked
      </motion.p>
    </motion.div>
  )
}
