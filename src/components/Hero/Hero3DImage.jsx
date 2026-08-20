import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function Hero3DImage() {
  const { scrollY } = useScroll()

  // Slow drift — image moves up slightly as user scrolls
  const rawY = useTransform(scrollY, [0, 800], [0, -50])
  const y = useSpring(rawY, { stiffness: 50, damping: 18 })
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Image wrapper — taller than the section so drift never reveals a gap */}
      <motion.div
        style={{ top: '5%', bottom: '-15%', left: 0, right: 0, y }}
        className="absolute w-full"
      >
        <img
          src="/hero-3d.png"
          alt=""
          draggable={false}
          className="h-full select-none"
          style={{
            width: 'auto',
            minWidth: '100%',
            position: 'absolute',
            right: '-20%',
            top: 0,
            bottom: 0,
            objectFit: 'cover',
          }}
        />
      </motion.div>

      {/* Dark overlay — reduced so image is clearly visible */}
      <div className="absolute inset-0" style={{
        background: 'rgba(2, 4, 8, 0.38)',
      }} />

      {/* Vignette — only darkens far edges, center stays bright */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(2,4,8,0.35) 70%, rgba(2,4,8,0.75) 100%)',
      }} />

      {/* Bottom fade into next section */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, transparent 60%, rgba(2,4,8,0.85) 85%, #020408 100%)',
      }} />
    </motion.div>
  )
}
