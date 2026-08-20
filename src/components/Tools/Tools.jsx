import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FaAws, FaDocker, FaGit, FaGithub, FaLinux, FaJenkins,
  FaMicrosoft, FaCode, FaWindows, FaRobot, FaPaperclip, FaBrain, FaBolt,
} from 'react-icons/fa'
import {
  SiGooglecloud, SiKubernetes, SiPostman, SiJira, SiGrafana, SiOpenai, SiPython,
} from 'react-icons/si'
import SectionTitle from '../common/SectionTitle'

const toolData = [
  // AI Tools (shown first — recent focus)
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
      </div>
    </motion.div>
  )
}

export default function Tools() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="tools" className="py-28 relative overflow-hidden">
      {/* Removed colored background elements */}

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
      </div>
    </section>
  )
}