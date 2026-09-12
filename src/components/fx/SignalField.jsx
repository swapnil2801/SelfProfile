import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * SignalField — full-screen procedural canvas backdrop.
 *
 * Renders a slow, cinematic "signal" field: layered oscilloscope
 * traces drifting across a near-black frame, with occasional lime
 * pulses travelling along the brightest trace and a sparse dust of
 * drifting points. Pure Canvas 2D — no WebGL, no dependencies.
 *
 * Behaviour:
 *  - prefers-reduced-motion / coarse-only environments → renders the
 *    static CSS fallback (.signal-static-fallback) instead of animating.
 *  - Pauses rAF loop when the tab is hidden.
 *  - DPR-aware (capped at 2) and resize-safe.
 *  - Pointer position gently attracts the traces (fine pointers only).
 */

// Deterministic pseudo-noise (sum of sines) — cheap and smooth
function wave(x, t, seed) {
  return (
    Math.sin(x * 0.0022 + t * 0.00021 + seed * 7.3) * 0.55 +
    Math.sin(x * 0.0051 - t * 0.00013 + seed * 3.1) * 0.3 +
    Math.sin(x * 0.0107 + t * 0.00034 + seed * 11.7) * 0.15
  )
}

export default function SignalField() {
  const canvasRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const [canAnimate, setCanAnimate] = useState(true)

  useEffect(() => {
    if (prefersReducedMotion) {
      setCanAnimate(false)
      return
    }
    const canvas = canvasRef.current
    if (!canvas || typeof window.requestAnimationFrame !== 'function') {
      setCanAnimate(false)
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      setCanAnimate(false)
      return
    }

    let raf = 0
    let running = true
    let width = 0
    let height = 0
    let dpr = 1

    // Pointer influence (fine pointers only)
    const pointer = { x: -1, y: -1, strength: 0 }
    const finePointer = window.matchMedia('(pointer: fine)').matches

    // Sparse drifting dust
    const DUST_COUNT = 42
    const dust = Array.from({ length: DUST_COUNT }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.1,
      vy: 0.00004 + Math.random() * 0.00009,
      tw: Math.random() * Math.PI * 2,
      lime: i % 9 === 0, // every ninth mote carries the signal colour
    }))

    // Travelling pulses along the hero trace
    const pulses = [
      { p: 0.1, speed: 0.00008 },
      { p: 0.62, speed: 0.00005 },
    ]

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onPointerMove = (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.strength = 1
    }
    const onPointerLeave = () => {
      pointer.strength = 0
    }
    if (finePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerleave', onPointerLeave)
    }

    const onVisibility = () => {
      running = document.visibilityState === 'visible'
      if (running) {
        raf = window.requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Trace definitions: [vertical anchor 0..1, amplitude px, alpha, lime?]
    const traces = [
      { y: 0.24, amp: 26, alpha: 0.05, lime: false, seed: 1 },
      { y: 0.42, amp: 42, alpha: 0.08, lime: false, seed: 2 },
      { y: 0.58, amp: 34, alpha: 0.14, lime: true, seed: 3 }, // hero trace
      { y: 0.74, amp: 48, alpha: 0.06, lime: false, seed: 4 },
      { y: 0.88, amp: 30, alpha: 0.04, lime: false, seed: 5 },
    ]

    const traceY = (trace, x, t) => {
      let y = trace.y * height + wave(x, t, trace.seed) * trace.amp
      // Gentle pointer attraction on the traces
      if (pointer.strength > 0) {
        const dx = x - pointer.x
        const influence = Math.exp(-(dx * dx) / (2 * 140 * 140))
        const dy = pointer.y - y
        y += dy * influence * 0.14 * pointer.strength
      }
      return y
    }

    const draw = (t) => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)

      const step = Math.max(6, Math.floor(width / 220))

      for (const trace of traces) {
        ctx.beginPath()
        for (let x = 0; x <= width + step; x += step) {
          const y = traceY(trace, x, t)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = trace.lime
          ? `rgba(204, 255, 0, ${trace.alpha})`
          : `rgba(246, 246, 243, ${trace.alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Travelling pulses on the hero (lime) trace
      const hero = traces[2]
      for (const pulse of pulses) {
        pulse.p += pulse.speed * step
        if (pulse.p > 1.15) pulse.p = -0.15
        const px = pulse.p * width
        const py = traceY(hero, px, t)
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 46)
        grad.addColorStop(0, 'rgba(204, 255, 0, 0.5)')
        grad.addColorStop(0.35, 'rgba(204, 255, 0, 0.12)')
        grad.addColorStop(1, 'rgba(204, 255, 0, 0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(px, py, 46, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = 'rgba(230, 255, 120, 0.9)'
        ctx.beginPath()
        ctx.arc(px, py, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      // Dust motes
      for (const d of dust) {
        d.y -= d.vy * height * 0.016 * 60
        if (d.y < -0.02) {
          d.y = 1.02
          d.x = Math.random()
        }
        const twinkle = 0.35 + 0.3 * Math.sin(t * 0.001 + d.tw)
        ctx.fillStyle = d.lime
          ? `rgba(204, 255, 0, ${0.28 * twinkle})`
          : `rgba(246, 246, 243, ${0.22 * twinkle})`
        ctx.beginPath()
        ctx.arc(d.x * width, d.y * height, d.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = window.requestAnimationFrame(draw)
    }
    raf = window.requestAnimationFrame(draw)

    return () => {
      running = false
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      if (finePointer) {
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('pointerleave', onPointerLeave)
      }
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion || !canAnimate) {
    // Static fallback — same tonal presence, zero motion
    return <div className="signal-static-fallback" aria-hidden="true" data-testid="signal-static" />
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      data-testid="signal-field"
    />
  )
}
