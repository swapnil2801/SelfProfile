import { useEffect, useRef, useState } from 'react'

/**
 * CustomCursor – replaces the OS cursor with a glowing dot + ring combo.
 * Hides itself on mobile/touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  // Smooth ring lag effect
  const animateRing = () => {
    ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
    ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`
    }
    rafId.current = requestAnimationFrame(animateRing)
  }

  useEffect(() => {
    // Don't render on touch devices
    if ('ontouchstart' in window) return

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
      }
    }

    const enterHover = () => setHovered(true)
    const leaveHover = () => setHovered(false)

    // Apply hover class to interactive elements
    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select, label').forEach((el) => {
        el.addEventListener('mouseenter', enterHover)
        el.addEventListener('mouseleave', leaveHover)
      })
    }

    window.addEventListener('mousemove', move)
    addListeners()
    rafId.current = requestAnimationFrame(animateRing)

    // Re-run on DOM mutations
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(rafId.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="custom-cursor"
        style={{ willChange: 'transform' }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${hovered ? 'hovered' : ''}`}
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
