import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * PageLoader – futuristic boot-up animation shown on first load.
 * Automatically hides after ~2.8 s.
 */
export default function PageLoader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0) // 0 = counting, 1 = done

  useEffect(() => {
    // Simulate loading progress
    const steps = [
      { target: 30, delay: 0, duration: 400 },
      { target: 60, delay: 450, duration: 350 },
      { target: 85, delay: 850, duration: 300 },
      { target: 100, delay: 1200, duration: 300 },
    ]

    steps.forEach(({ target, delay, duration }) => {
      setTimeout(() => {
        const start = Date.now()
        const startVal = target - (target > 30 ? 30 : 30)
        const animate = () => {
          const elapsed = Date.now() - start
          const t = Math.min(elapsed / duration, 1)
          setProgress(Math.round(startVal + (target - startVal) * t))
          if (t < 1) requestAnimationFrame(animate)
        }
        animate()
      }, delay)
    })

    setTimeout(() => setPhase(1), 1700)
    setTimeout(() => onComplete?.(), 2600)
  }, [onComplete])

  const bootLines = [
    '> Initializing runtime environment...',
    '> Loading React modules...',
    '> Mounting cloud services...',
    '> Establishing DevOps pipelines...',
    '> All systems operational ✓',
  ]

  return (
    <AnimatePresence>
      {phase === 0 ? (
        <motion.div
          key="loader"
          className="loader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Glowing orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
            className="relative mb-8"
          >
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(184,41,255,0.2))',
                border: '2px solid rgba(0,212,255,0.5)',
                boxShadow: '0 0 30px rgba(0,212,255,0.3), 0 0 60px rgba(184,41,255,0.2)',
              }}
            >
              <span className="font-orbitron text-3xl font-bold gradient-text">SP</span>
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 rounded-tl" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 rounded-tr" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-500 rounded-bl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500 rounded-br" />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="font-orbitron text-2xl font-bold gradient-text mb-1"
          >
            SWAPNIL PATIL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-xs text-cyan-400/70 font-mono tracking-widest mb-10"
          >
            FULL STACK DEVELOPER · DEVOPS ENGINEER
          </motion.p>

          {/* Boot log */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-mono text-xs text-left w-80 mb-8 space-y-1"
          >
            {bootLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.18, duration: 0.3 }}
                className={i === 4 ? 'text-green-400' : 'text-cyan-400/60'}
              >
                {line}
              </motion.div>
            ))}
          </motion.div>

          {/* Progress bar */}
          <div className="w-80">
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-cyan-400/60">LOADING PORTFOLIO</span>
              <span className="text-cyan-400">{progress}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #00d4ff, #b829ff)',
                  boxShadow: '0 0 10px #00d4ff',
                }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      ) : (
        // Phase 1 – "ENTER" flash
        <motion.div
          key="enter"
          className="loader-container"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.1, 1], opacity: [0, 1, 1] }}
            transition={{ duration: 0.5, times: [0, 0.6, 1] }}
            className="font-orbitron text-5xl font-black gradient-text text-center"
            style={{ textShadow: '0 0 40px #00d4ff, 0 0 80px #b829ff' }}
          >
            WELCOME
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
