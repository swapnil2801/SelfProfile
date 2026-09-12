import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaMapMarkerAlt, FaBriefcase, FaRocket, FaCheckCircle } from 'react-icons/fa'
import { personalInfo } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'
import CountUp from '../fx/CountUp'
import { EASE } from '../fx/motion'

const stats = [
  { value: '2+', label: 'Years Exp.', icon: <FaBriefcase size={14} /> },
  { value: '10+', label: 'Projects', icon: <FaRocket size={14} /> },
  { value: '5+', label: 'AI / LLM Apps', icon: <span className="emoji-mono">🤖</span> },
  { value: '99.9%', label: 'Uptime SLA', icon: <span className="emoji-mono">☁️</span> },
]

const whoIAm = [
  'Backend engineer focused on Python, .NET Core & FastAPI',
  'AI agent builder — Hermes Agent, OpenClaw, LiteLLM, Paperclip',
  'AI content & engineering creator — TECHNOLOGIA on Telegram & Instagram',
  '2+ years shipping production APIs and microservices',
]

const whatIDo = [
  'Orchestrate autonomous AI workflows with Hermes Agent',
  'Design & automate CI/CD pipelines on Azure DevOps',
  'Architect cloud infra on AWS, Azure, GCP & IONOS with Linux at the core',
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const card = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  return (
    <section id="about" className="relative py-24 border-y border-slate-500/10 bg-void-850/60">
      <div className="section-container" ref={ref}>
        <SectionTitle
          eyebrow="Get to Know Me"
          title="About Me"
          subtitle="Backend · AI Agents · DevOps · Linux Infrastructure"
        />

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid lg:grid-cols-2 gap-8 mt-14"
        >
          {/* LEFT */}
          <div className="flex flex-col gap-5">
            {/* Who I Am */}
            <motion.div variants={card} className="glass glass-lumen p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-md border border-neon-cyan/30 bg-neon-cyan/5 flex items-center justify-center text-lg flex-shrink-0 emoji-mono">
                  👨‍💻
                </div>
                <h3 className="font-semibold text-slate-100 text-sm tracking-[0.15em] uppercase font-mono">Who I Am</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{personalInfo.bio}</p>
              <ul className="space-y-2">
                {whoIAm.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-500">
                    <FaCheckCircle size={11} className="text-neon-cyan/70 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What I Do */}
            <motion.div variants={card} className="glass glass-lumen p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-md border border-neon-violet/30 bg-neon-violet/5 flex items-center justify-center text-lg flex-shrink-0 emoji-mono">
                  🎯
                </div>
                <h3 className="font-semibold text-slate-100 text-sm tracking-[0.15em] uppercase font-mono">What I Do</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{personalInfo.bio2}</p>
              <ul className="space-y-2">
                {whatIDo.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-500">
                    <FaCheckCircle size={11} className="text-neon-violet/70 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Chips */}
            <motion.div variants={card} className="flex flex-wrap gap-3">
              <div className="chip flex items-center gap-2 font-mono">
                <FaMapMarkerAlt size={11} aria-hidden="true" /> {personalInfo.location}
              </div>
              <div className="chip flex items-center gap-2 font-mono">
                <span className="emoji-mono">💼</span> Arieotech Solutions
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5">
            {/* Stats grid */}
            <motion.div variants={card} className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="glass p-5 text-center cursor-default"
                >
                  <div className="w-8 h-8 rounded-sm border border-slate-50/15 flex items-center justify-center mx-auto mb-3 text-signal">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-display font-semibold text-slate-50">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Compact terminal */}
            <motion.div variants={card} className="terminal-frame hud-corners">
              <div className="terminal-header">
                <span className="terminal-dot bg-slate-500/60" />
                <span className="terminal-dot bg-slate-400/50" />
                <span className="terminal-dot bg-signal/70" />
                <span className="ml-2 text-xs font-mono text-slate-400">swapnil.config.py</span>
              </div>
              <pre className="p-4 text-xs font-mono leading-6 overflow-x-auto text-slate-300">
                <code>
                  <span className="text-neon-violet">swapnil</span><span className="text-slate-400"> = {'{'}</span>{'\n'}
                  <span className="text-neon-cyan">  role</span><span className="text-slate-400">: </span><span className="text-emerald-300">'Backend · AI · DevOps'</span><span className="text-slate-400">,</span>{'\n'}
                  <span className="text-neon-cyan">  focus</span><span className="text-slate-400">: [</span><span className="text-emerald-300">'AI Agents'</span><span className="text-slate-400">, </span><span className="text-emerald-300">'Python'</span><span className="text-slate-400">, </span><span className="text-emerald-300">'LLMs'</span><span className="text-slate-400">],</span>{'\n'}
                  <span className="text-neon-cyan">  infra</span><span className="text-slate-400">: [</span><span className="text-emerald-300">'Linux'</span><span className="text-slate-400">, </span><span className="text-emerald-300">'AWS'</span><span className="text-slate-400">, </span><span className="text-emerald-300">'Azure'</span><span className="text-slate-400">, </span><span className="text-emerald-300">'GCP'</span><span className="text-slate-400">, </span><span className="text-emerald-300">'IONOS'</span><span className="text-slate-400">],</span>{'\n'}
                  <span className="text-neon-cyan">  aiTools</span><span className="text-slate-400">: [</span><span className="text-emerald-300">'Hermes Agent'</span><span className="text-slate-400">, </span><span className="text-emerald-300">'OpenClaw'</span><span className="text-slate-400">, </span><span className="text-emerald-300">'LiteLLM'</span><span className="text-slate-400">, </span><span className="text-emerald-300">'Paperclip'</span><span className="text-slate-400">],</span>{'\n'}
                  <span className="text-neon-cyan">  channels</span><span className="text-slate-400">: [</span><span className="text-emerald-300">'@TECHNOLOGIA2801'</span><span className="text-slate-400">, </span><span className="text-emerald-300">'@technologgia.ai'</span><span className="text-slate-400">],</span>{'\n'}
                  <span className="text-neon-cyan">  available</span><span className="text-slate-400">: </span><span className="text-neon-magenta">True</span>{'\n'}
                  <span className="text-slate-400">{'}'}</span>
                </code>
              </pre>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
