/**
 * Shared cinematic motion vocabulary.
 * One place for the ease curves and reveal patterns used across
 * every section, so the scroll choreography feels like one film.
 */

// Signature ease — fast start, long cinematic settle
export const EASE = [0.22, 1, 0.36, 1]

/** Fade-up used for body copy and cards. `custom` = delay in seconds. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
}

/** Masked line reveal — pair with a parent using .line-mask. */
export const lineReveal = {
  hidden: { y: '110%' },
  visible: (delay = 0) => ({
    y: '0%',
    transition: { duration: 0.9, delay, ease: EASE },
  }),
}

/** Panel mask reveal — clip-path wipe from bottom. */
export const maskReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 },
  visible: (delay = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.9, delay, ease: EASE },
  }),
}

/** Horizontal wipe used for images/panels alternating by index. */
export const wipeReveal = (fromLeft = true) => ({
  hidden: { clipPath: fromLeft ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)' },
  visible: (delay = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1, delay, ease: EASE },
  }),
})

/** Hairline rule that draws itself in. */
export const ruleReveal = {
  hidden: { scaleX: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    transition: { duration: 1, delay, ease: EASE },
  }),
}

/** Parent stagger container. */
export const stagger = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
})

/** Standard viewport config for whileInView sections. */
export const viewportOnce = { once: true, margin: '-90px' }
