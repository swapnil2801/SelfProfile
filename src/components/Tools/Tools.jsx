import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
<<<<<<< HEAD
  FaAws, FaDocker, FaGit, FaGithub, FaLinux, FaJenkins,
  FaMicrosoft, FaCode, FaWindows, FaRobot, FaPaperclip, FaBrain, FaBolt,
=======
  FaAws, FaDocker, FaGit, FaGithub, FaLinux, FaJenkins, FaMicrosoft,
  FaCode, FaWindows, FaRobot, FaPaperclip, FaBrain, FaBolt,
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
} from 'react-icons/fa'
import {
  SiGooglecloud, SiKubernetes, SiPostman, SiJira, SiGrafana, SiOpenai, SiPython,
} from 'react-icons/si'
import SectionTitle from '../common/SectionTitle'

const toolData = [
  // AI Tools (shown first — recent focus)
<<<<<<< HEAD
  { name: 'Claude Code', icon: FaRobot, color: '#fff', category: 'AI Dev' },
  { name: 'OpenClaw', icon: SiOpenai, color: '#fff', category: 'AI' },
  { name: 'LiteLLM', icon: FaBolt, color: '#fff', category: 'LLM Proxy' },
  { name: 'PaperClip', icon: FaPaperclip, color: '#fff', category: 'AI Agent' },
  { name: 'Grafana', icon: SiGrafana, color: '#fff', category: 'Monitoring' },
  { name: 'Python', icon: SiPython, color: '#fff', category: 'Language' },
  // DevOps / Cloud
  { name: 'Azure DevOps', icon: FaMicrosoft, color: '#fff', category: 'DevOps' },
  { name: 'AWS', icon: FaAws, color: '#fff', category: 'Cloud' },
  { name: 'GCP', icon: SiGooglecloud, color: '#fff', category: 'Cloud' },
  { name: 'Docker', icon: FaDocker, color: '#fff', category: 'Containers' },
  { name: 'Kubernetes', icon: SiKubernetes, color: '#fff', category: 'Orchestration' },
  { name: 'Jenkins', icon: FaJenkins, color: '#fff', category: 'CI/CD' },
  { name: 'Linux', icon: FaLinux, color: '#fff', category: 'OS' },
  // Dev tools
  { name: 'GitHub', icon: FaGithub, color: '#e2e8f0', category: 'Version Control' },
  { name: 'Git', icon: FaGit, color: '#f05032', category: 'Version Control' },
  { name: 'VS Code', icon: FaCode, color: '#fff', category: 'IDE' },
  { name: 'Postman', icon: SiPostman, color: '#fff', category: 'Testing' },
  { name: 'Jira', icon: SiJira, color: '#fff', category: 'Project Mgmt' },
=======
  { name: 'Claude Code', icon: FaRobot, color: '#b829ff', category: 'AI Dev' },
  { name: 'OpenClaw', icon: SiOpenai, color: '#10a37f', category: 'AI' },
  { name: 'LiteLLM', icon: FaBolt, color: '#f59e0b', category: 'LLM Proxy' },
  { name: 'PaperClip', icon: FaPaperclip, color: '#00d4ff', category: 'AI Agent' },
  { name: 'Grafana', icon: SiGrafana, color: '#F46800', category: 'Monitoring' },
  { name: 'Python', icon: SiPython, color: '#3572A5', category: 'Language' },
  // DevOps / Cloud
  { name: 'Azure DevOps', icon: FaMicrosoft, color: '#0078d4', category: 'DevOps' },
  { name: 'AWS', icon: FaAws, color: '#FF9900', category: 'Cloud' },
  { name: 'GCP', icon: SiGooglecloud, color: '#4285F4', category: 'Cloud' },
  { name: 'Docker', icon: FaDocker, color: '#2496ED', category: 'Containers' },
  { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5', category: 'Orchestration' },
  { name: 'Jenkins', icon: FaJenkins, color: '#D33833', category: 'CI/CD' },
  { name: 'Linux', icon: FaLinux, color: '#FCC624', category: 'OS' },
  // Dev tools
  { name: 'GitHub', icon: FaGithub, color: '#e2e8f0', category: 'Version Control' },
  { name: 'Git', icon: FaGit, color: '#F05032', category: 'Version Control' },
  { name: 'VS Code', icon: FaCode, color: '#007ACC', category: 'IDE' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37', category: 'Testing' },
  { name: 'Jira', icon: SiJira, color: '#0052CC', category: 'Project Mgmt' },
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
]

function ToolCard({ name, icon: Icon, color, category, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5, type: 'spring', stiffness: 120 }}
<<<<<<< HEAD
      whileHover={{ y: -4, scale: 1.03 }}
      className="p-5 rounded-lg border border-gray-700 transition-all duration-300 group cursor-default"
      style={{ background: 'rgba(33,37,41,0.3)' }}
    >
      {/* Icon container */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <Icon size={24} color={color !== '#fff' ? color : '#fff' />}
      </div>
      <div className="text-center pt-2">
        <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
          {name}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{category}</p>
=======
      whileHover={{ y: -8, scale: 1.05 }}
      className="glass-card p-5 flex flex-col items-center gap-3 group cursor-default transition-all duration-300"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${color}50`
        e.currentTarget.style.boxShadow = `0 12px 40px ${color}20, 0 0 20px ${color}10`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.15)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Icon container */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{
          background: `${color}12`,
          border: `1px solid ${color}25`,
        }}
      >
        <Icon size={28} color={color} />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
          {name}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">{category}</p>
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
      </div>
    </motion.div>
  )
}

export default function Tools() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="tools" className="py-28 relative overflow-hidden">
<<<<<<< HEAD
      {/* Removed colored background elements */}
=======
      {/* Background radials */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06), transparent 70%)' }}
      />
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0

      <div className="section-container" ref={ref}>
        <SectionTitle
          eyebrow="My Toolkit"
          title="Tools & Platforms"
          subtitle="The ecosystem of platforms and tools I leverage to build, deploy, and monitor production systems"
        />

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4 mt-16">
          {toolData.map((tool, i) => (
            <ToolCard key={tool.name} {...tool} index={i} />
          ))}
        </div>
<<<<<<< HEAD
      </div>
    </section>
  )
}
=======

      </div>
    </section>
  )
}
>>>>>>> f6aa14687c19e8a4686e9db9f2057df4c2f073d0
