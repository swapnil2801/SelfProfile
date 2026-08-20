import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaMapMarkerAlt, FaBriefcase, FaRocket, FaCheckCircle } from 'react-icons/fa'
import { personalInfo } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'

const stats = [
<<<<<<< HEAD
  { value: '2+', label: 'Years Exp.', icon: <FaBriefcase size={14} />, color: '#212529' },
  { value: '10+', label: 'Projects', icon: <FaRocket size={14} />, color: #6c757d },
  { value: '5+', label: 'AI / LLM Apps', icon: '🤖', color: #495057 },
  { value: '99.9%', label: 'Uptime SLA', icon: '☁️', color: #212529 },
=======
  { value: '2+',   label: 'Years Exp.',       icon: <FaBriefcase size={14}/>, color: '#00d4ff' },
  { value: '10+',  label: 'Projects',          icon: <FaRocket size={14}/>,    color: '#b829ff' },
  { value: '5+',   label: 'AI / LLM Apps',    icon: '🤖',                     color: '#ff2d9f' },
  { value: '99.9%',label: 'Uptime SLA',        icon: '☁️',                     color: '#00ff88' },
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
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
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  }

  return (
    <section id="about" className="py-24 relative overflow-hidden">
<<<<<<< HEAD
      {/* Removed photo avatar divs - b&w professional theme */}
=======
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #b829ff, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }} />
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0

      <div className="section-container" ref={ref}>
        <SectionTitle
          eyebrow="Get to Know Me"
          title="About Me"
          subtitle="Backend · AI Agents · DevOps · Linux Infrastructure"
        />

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid lg:grid-cols-2 gap-8 mt-14"
        >
<<<<<<< HEAD
          {/* LEFT */}
          <div className="flex flex-col gap-5">
            {/* Who I Am */}
            <motion.div variants={card} className="p-5 border border-gray-700 rounded-lg transition-all duration-300 hover:border-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: 'rgba(33,37,41,0.5)' }}>
                  👨‍💻
                </div>
                <h3 className="font-semibold text-gray-200 text-sm">Who I Am</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{personalInfo.bio}</p>
              <ul className="space-y-2">
                {whoIAm.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-400">
                    <FaCheckCircle size={11} className="text-gray-500 flex-shrink-0 mt-0.5" />
=======
          {/* ── LEFT ── */}
          <div className="flex flex-col gap-5">
            {/* Who I Am */}
            <motion.div variants={card} className="glass-card p-5 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)' }}>
                  👨‍💻
                </div>
                <h3 className="font-semibold text-white text-sm">Who I Am</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{personalInfo.bio}</p>
              <ul className="space-y-2">
                {whoIAm.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
                    <FaCheckCircle size={11} className="text-cyan-400 flex-shrink-0 mt-0.5" />
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What I Do */}
<<<<<<< HEAD
            <motion.div variants={card} className="p-5 border border-gray-700 rounded-lg transition-all duration-300 hover:border-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: 'rgba(33,37,41,0.5)' }}>
                  🎯
                </div>
                <h3 className="font-semibold text-gray-200 text-sm">What I Do</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{personalInfo.bio2}</p>
              <ul className="space-y-2">
                {whatIDo.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-400">
                    <FaCheckCircle size={11} className="text-gray-500 flex-shrink-0 mt-0.5" />
=======
            <motion.div variants={card} className="glass-card p-5 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: 'rgba(184,41,255,0.1)', border: '1px solid rgba(184,41,255,0.2)' }}>
                  🎯
                </div>
                <h3 className="font-semibold text-white text-sm">What I Do</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{personalInfo.bio2}</p>
              <ul className="space-y-2">
                {whatIDo.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
                    <FaCheckCircle size={11} className="text-purple-400 flex-shrink-0 mt-0.5" />
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Chips */}
            <motion.div variants={card} className="flex flex-wrap gap-3">
<<<<<<< HEAD
              <div className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-mono" style={{ background: 'rgba(33,37,41,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#ccc' }}>
                <FaMapMarkerAlt size={11} /> {personalInfo.location}
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-mono" style={{ background: 'rgba(33,37,41,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#888' }}>
=======
              <div className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-mono"
                style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}>
                <FaMapMarkerAlt size={11} />{personalInfo.location}
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-mono"
                style={{ background: 'rgba(184,41,255,0.08)', border: '1px solid rgba(184,41,255,0.2)', color: '#b829ff' }}>
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
                💼 Arieotech Solutions
              </div>
            </motion.div>
          </div>

<<<<<<< HEAD
          {/* RIGHT */}
=======
          {/* ── RIGHT ── */}
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
          <div className="flex flex-col gap-5">
            {/* Stats grid */}
            <motion.div variants={card} className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.04, y: -3 }}
<<<<<<< HEAD
                  className="p-4 text-center border border-gray-700 rounded-lg transition-all duration-300 cursor-default"
                  style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}>
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold font-orbitron" style={{ color: '#fff' }}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
=======
                  className="glass-card p-4 text-center cursor-default transition-all duration-300"
                  style={{ borderColor: `${stat.color}20` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${stat.color}50`
                    e.currentTarget.style.boxShadow = `0 8px 30px ${stat.color}15`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${stat.color}20`
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                    style={{ background: `${stat.color}15`, color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold font-orbitron" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
                </motion.div>
              ))}
            </motion.div>

            {/* Compact terminal */}
<<<<<<< HEAD
            <motion.div variants={card} className="p-4 border border-gray-700 rounded-lg transition-all duration-300" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-600/5">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-600/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-600/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-600/50" />
                <span className="ml-2 text-xs font-mono text-gray-400">swapnil.config.py</span>
              </div>
              <pre className="p-4 text-xs font-mono leading-6 overflow-x-auto">
                <code>
                  <span className="text-gray-400">swapnil</span><span className="text-white"> = {'{'}</span>{'\n'}
                  <span className="text-gray-400">  role</span><span className="text-white">: </span><span className="text-gray-300">'Backend · AI · DevOps'</span><span className="text-white">,</span>{'\n'}
                  <span className="text-gray-400">  focus</span><span className="text-white">: [</span><span className="text-gray-300">'AI Agents'</span><span className="text-white">, </span><span className="text-gray-300">'Python'</span><span className="text-white">, </span><span className="text-gray-300">'LLMs'</span><span className="text-white">],</span>{'\n'}
                  <span className="text-gray-400">  infra</span><span className="text-white">: [</span><span className="text-gray-300">'Linux'</span><span className="text-white">, </span><span className="text-gray-300">'AWS'</span><span className="text-white">, </span><span className="text-gray-300">'Azure DevOps'</span><span className="text-white">],</span>{'\n'}
                  <span className="text-gray-400">  aiTools</span><span className="text-white">: [</span><span className="text-gray-300">'LiteLLM'</span><span className="text-white">, </span><span className="text-gray-300">'Claude Code'</span><span className="text-white">],</span>{'\n'}
                  <span className="text-gray-400">  available</span><span className="text-white">: </span><span className="text-gray-300">True</span>{'\n'}
=======
            <motion.div variants={card} className="glass-card overflow-hidden flex-1"
              style={{ border: '1px solid rgba(0,212,255,0.15)' }}>
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs font-mono text-slate-500">swapnil.config.py</span>
              </div>
              <pre className="p-4 text-xs font-mono leading-6 overflow-x-auto">
                <code>
                  <span className="text-purple-400">swapnil</span><span className="text-white"> = {'{'}</span>{'\n'}
                  <span className="text-blue-400">  role</span><span className="text-white">: </span><span className="text-green-400">&apos;Backend · AI · DevOps&apos;</span><span className="text-white">,</span>{'\n'}
                  <span className="text-blue-400">  focus</span><span className="text-white">: [</span><span className="text-green-400">&apos;AI Agents&apos;</span><span className="text-white">, </span><span className="text-green-400">&apos;Python&apos;</span><span className="text-white">, </span><span className="text-green-400">&apos;LLMs&apos;</span><span className="text-white">],</span>{'\n'}
                  <span className="text-blue-400">  infra</span><span className="text-white">: [</span><span className="text-green-400">&apos;Linux&apos;</span><span className="text-white">, </span><span className="text-green-400">&apos;AWS&apos;</span><span className="text-white">, </span><span className="text-green-400">&apos;Azure DevOps&apos;</span><span className="text-white">],</span>{'\n'}
                  <span className="text-blue-400">  aiTools</span><span className="text-white">: [</span><span className="text-green-400">&apos;LiteLLM&apos;</span><span className="text-white">, </span><span className="text-green-400">&apos;Claude Code&apos;</span><span className="text-white">],</span>{'\n'}
                  <span className="text-blue-400">  available</span><span className="text-white">: </span><span className="text-cyan-400">True</span>{'\n'}
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
                  <span className="text-white">{'}'}</span>
                </code>
              </pre>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
