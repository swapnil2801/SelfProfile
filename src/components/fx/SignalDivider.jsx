import { motion } from 'framer-motion'
import { EASE } from './motion'

/**
 * SignalDivider — cinematic section transition.
 * A full-width hairline with a travelling lime pulse and an
 * optional mono index/label, e.g.  02 / EXPERIENCE ────────
 */
export default function SignalDivider({ index, label }) {
  return (
    <div className="section-container" aria-hidden="true">
      <div className="flex items-center gap-4 py-2">
        {(index || label) && (
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-mono text-[0.6rem] tracking-[0.35em] uppercase text-slate-500 whitespace-nowrap flex-shrink-0"
          >
            {index && <span className="text-signal/70 mr-2">{index}</span>}
            {label}
          </motion.span>
        )}
        <div className="signal-divider flex-1" />
      </div>
    </div>
  )
}
