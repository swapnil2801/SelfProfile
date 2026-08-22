import { useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * PageLoader – minimal monochrome intro.
 * A white screen with the wordmark fading in, then a clean exit.
 */
export default function PageLoader({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), 1400)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-serif text-3xl md:text-4xl text-neutral-900 tracking-tight"
      >
        Swapnil Patil
      </motion.h1>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.7, ease: 'easeInOut' }}
        className="mt-4 h-px w-40 bg-neutral-900 origin-left"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 text-[0.65rem] tracking-[0.3em] uppercase text-neutral-500"
      >
        Portfolio
      </motion.p>
    </motion.div>
  )
}
