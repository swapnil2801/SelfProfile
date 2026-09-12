import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { FaTelegramPlane, FaInstagram, FaExternalLinkAlt, FaBroadcastTower } from 'react-icons/fa'
import { creatorSignal } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'

const channelIcons = {
  telegram: FaTelegramPlane,
  instagram: FaInstagram,
}

const channelAccents = {
  telegram: 'border-neon-cyan/30 text-neon-cyan group-hover:border-neon-cyan/70',
  instagram: 'border-neon-magenta/30 text-neon-magenta group-hover:border-neon-magenta/70',
}

export default function CreatorSignal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  const card = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section id="creator" className="relative py-28 border-b border-slate-500/10 bg-void-850/60 overflow-hidden">
      {/* Section accent glow */}
      <div
        className="absolute top-0 right-1/4 w-[46rem] h-56 bg-neon-cyan/5 blur-3xl rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative" ref={ref}>
        <SectionTitle
          eyebrow={creatorSignal.eyebrow}
          title={creatorSignal.title}
          subtitle={creatorSignal.subtitle}
        />

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-14"
        >
          {/* Identity strip: narrative + broadcast panel */}
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 mb-12">
            <motion.div variants={card} className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-md border border-neon-cyan/50 bg-gradient-to-br from-neon-cyan/15 to-neon-violet/15 text-neon-cyan flex items-center justify-center flex-shrink-0 shadow-glow-cyan">
                  <FaBroadcastTower size={16} aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-xl md:text-2xl text-slate-100">
                  Engineering, documented in public
                </h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{creatorSignal.intro}</p>

              {/* Content pillars */}
              <ul className="space-y-3" aria-label="Creator content pillars">
                {creatorSignal.pillars.map(({ title, detail }) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-signal/80 flex-shrink-0" aria-hidden="true" />
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <span className="text-slate-200 font-semibold mr-1.5">{title}.</span>
                      {detail}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Channel cards — verified outbound links only */}
            <motion.div variants={card} className="flex flex-col gap-4 self-center w-full">
              {creatorSignal.channels.map(({ platform, handle, url, label, description, icon }) => {
                const Icon = channelIcons[icon] || FaBroadcastTower
                const accent = channelAccents[icon] || ''
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${label} — opens in a new tab`}
                    className="group glass glass-lumen p-5 flex items-center gap-4 hover:shadow-glow-soft transition-all duration-200 focus-ring"
                  >
                    <div className={`w-12 h-12 rounded-md border bg-void-800/60 flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${accent}`}>
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-slate-100">{platform}</p>
                        <p className="font-mono text-xs text-signal/90 truncate">{handle}</p>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">{description}</p>
                    </div>
                    <FaExternalLinkAlt
                      size={11}
                      aria-hidden="true"
                      className="text-slate-600 group-hover:text-signal transition-colors duration-200 flex-shrink-0"
                    />
                  </a>
                )
              })}

              {/* Handle strip — scannable identity line */}
              <div
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-md border border-slate-50/10 bg-void-900/60 font-mono text-[0.65rem] text-slate-500 tracking-wider"
                aria-label="Creator handles"
              >
                <span className="flex items-center gap-2 uppercase">
                  <span className="led" aria-hidden="true" />
                  Broadcasting
                </span>
                <span className="text-slate-300 truncate">@TECHNOLOGIA2801 · @technologgia.ai</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
