import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * CountUp — tasteful count-up for factual metrics that already
 * exist in portfolioData (e.g. "35%", "2+", "99.9%", "10+").
 *
 * Parses the numeric core of the given string and animates it in
 * on first viewport entry, preserving prefix/suffix ("+", "%", ...).
 * Non-numeric values (e.g. "AZ-900", "LIVE") render as-is, static.
 * Reduced motion → static final value immediately.
 */
export default function CountUp({ value, duration = 1.4, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()

  const str = String(value)
  const match = str.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)

  const target = match ? parseFloat(match[2]) : null
  const decimals = match && match[2].includes('.') ? match[2].split('.')[1].length : 0

  const [display, setDisplay] = useState(
    target === null || prefersReducedMotion ? str : `${match[1]}${(0).toFixed(decimals)}${match[3]}`
  )

  useEffect(() => {
    if (target === null || prefersReducedMotion) {
      setDisplay(str)
      return
    }
    if (!inView) return

    let raf = 0
    const start = performance.now()
    const ms = duration * 1000
    const [, prefix, , suffix] = match

    const tick = (now) => {
      const t = Math.min((now - start) / ms, 1)
      // easeOutQuart — settles like a gauge
      const eased = 1 - Math.pow(1 - t, 4)
      const current = target * eased
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`)
      if (t < 1) raf = window.requestAnimationFrame(tick)
    }
    raf = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, prefersReducedMotion])

  return (
    <span ref={ref} className={className} aria-label={str}>
      {display}
    </span>
  )
}
