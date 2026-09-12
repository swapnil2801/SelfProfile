import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * CursorLight — a soft radial light that follows the pointer,
 * implemented as CSS custom properties on a fixed overlay
 * (see .cursor-light in index.css).
 *
 * - Fine pointers only (coarse pointers hide it via CSS media query,
 *   and we also skip the JS listener entirely).
 * - rAF-throttled writes; no re-renders (direct style mutation).
 * - Hidden under prefers-reduced-motion.
 */
export default function CursorLight() {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    if (typeof window.matchMedia !== 'function') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const el = ref.current
    if (!el) return

    let raf = 0
    let pending = null

    const apply = () => {
      raf = 0
      if (!pending || !el) return
      el.style.setProperty('--cursor-x', `${pending.x}px`)
      el.style.setProperty('--cursor-y', `${pending.y}px`)
      el.classList.add('is-active')
    }

    const onMove = (e) => {
      pending = { x: e.clientX, y: e.clientY }
      if (!raf) raf = window.requestAnimationFrame(apply)
    }
    const onLeave = () => {
      el.classList.remove('is-active')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return <div ref={ref} className="cursor-light" aria-hidden="true" data-testid="cursor-light" />
}
