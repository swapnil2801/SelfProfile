import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaMapMarkerAlt, FaBriefcase, FaRocket, FaCheckCircle } from 'react-icons/fa'
import { personalInfo } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'

const stats = [
  { value: '2+', label: 'Years Exp.', icon: <FaBriefcase size={14} /> },
  { value: '10+', label: 'Projects', icon: <FaRocket size={14} /> },
  { value: '5+', label: 'AI / LLM Apps', icon: <span className="emoji-mono">🤖</span> },
  { value: '99.9%', label: 'Uptime SLA', icon: <span className="emoji-mono">☁️</span> },
]

const whoIAm = [
  'Backend engineer focused on Python, .NET Core & FastAPI',
  'AI agent builder — LiteLLM, LangChain, multi-agent systems',
  '2+ years shipping production APIs and microservices',
]

const whatIDo = [
  'Design & automate CI/CD pipelines on Azure DevOps',
  'Architect cloud infra on AWS & GCP with Linux at the core',
  'Integrate LLMs into real-world products via agent frameworks',
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const card = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section id="about" className="py-24 bg-neutral-50 border-y border-neutral-200">
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
            <motion.div variants={card} className="card p-6 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 border border-neutral-200 flex items-center justify-center text-lg flex-shrink-0 emoji-mono">
                  👨‍💻
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm tracking-wide uppercase">Who I Am</h3>
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">{personalInfo.bio}</p>
              <ul className="space-y-2">
                {whoIAm.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-neutral-500">
                    <FaCheckCircle size={11} className="text-neutral-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What I Do */}
            <motion.div variants={card} className="card p-6 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 border border-neutral-200 flex items-center justify-center text-lg flex-shrink-0 emoji-mono">
                  🎯
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm tracking-wide uppercase">What I Do</h3>
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">{personalInfo.bio2}</p>
              <ul className="space-y-2">
                {whatIDo.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-neutral-500">
                    <FaCheckCircle size={11} className="text-neutral-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Chips */}
            <motion.div variants={card} className="flex flex-wrap gap-3">
              <div className="chip flex items-center gap-2 font-mono">
                <FaMapMarkerAlt size={11} /> {personalInfo.location}
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
                  className="card p-5 text-center bg-white cursor-default"
                >
                  <div className="w-8 h-8 border border-neutral-200 flex items-center justify-center mx-auto mb-3 text-neutral-700">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-serif text-neutral-900">{stat.value}</div>
                  <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Compact terminal */}
            <motion.div variants={card} className="card bg-white overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-200 bg-neutral-50">
                <div className="w-2.5 h-2.5 rounded-full border border-neutral-300" />
                <div className="w-2.5 h-2.5 rounded-full border border-neutral-300" />
                <div className="w-2.5 h-2.5 rounded-full border border-neutral-300" />
                <span className="ml-2 text-xs font-mono text-neutral-500">swapnil.config.py</span>
              </div>
              <pre className="p-4 text-xs font-mono leading-6 overflow-x-auto text-neutral-700">
                <code>
                  <span className="text-neutral-500">swapnil</span><span className="text-neutral-900"> = {'{'}</span>{'\n'}
                  <span className="text-neutral-500">  role</span><span className="text-neutral-900">: </span><span className="text-neutral-700">'Backend · AI · DevOps'</span><span className="text-neutral-900">,</span>{'\n'}
                  <span className="text-neutral-500">  focus</span><span className="text-neutral-900">: [</span><span className="text-neutral-700">'AI Agents'</span><span className="text-neutral-900">, </span><span className="text-neutral-700">'Python'</span><span className="text-neutral-900">, </span><span className="text-neutral-700">'LLMs'</span><span className="text-neutral-900">],</span>{'\n'}
                  <span className="text-neutral-500">  infra</span><span className="text-neutral-900">: [</span><span className="text-neutral-700">'Linux'</span><span className="text-neutral-900">, </span><span className="text-neutral-700">'AWS'</span><span className="text-neutral-900">, </span><span className="text-neutral-700">'Azure DevOps'</span><span className="text-neutral-900">],</span>{'\n'}
                  <span className="text-neutral-500">  aiTools</span><span className="text-neutral-900">: [</span><span className="text-neutral-700">'LiteLLM'</span><span className="text-neutral-900">, </span><span className="text-neutral-700">'Claude Code'</span><span className="text-neutral-900">],</span>{'\n'}
                  <span className="text-neutral-500">  available</span><span className="text-neutral-900">: </span><span className="text-neutral-700">True</span>{'\n'}
                  <span className="text-neutral-900">{'}'}</span>
                </code>
              </pre>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
