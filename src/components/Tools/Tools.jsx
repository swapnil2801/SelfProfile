import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FaAws, FaDocker, FaGit, FaGithub, FaLinux, FaJenkins,
  FaMicrosoft, FaCode, FaRobot, FaPaperclip, FaBolt, FaFeatherAlt,
} from 'react-icons/fa'
import {
  SiGooglecloud, SiKubernetes, SiPostman, SiJira, SiGrafana, SiOpenai, SiPython,
} from 'react-icons/si'
import SectionTitle from '../common/SectionTitle'

const toolData = [
  // AI Tools (shown first — recent focus)
  { name: 'Claude Code', icon: FaRobot, category: 'AI Dev' },
  { name: 'Hermes Agent', icon: FaFeatherAlt, category: 'AI Agent' },
  { name: 'OpenClaw', icon: SiOpenai, category: 'AI' },
  { name: 'LiteLLM', icon: FaBolt, category: 'LLM Proxy' },
  { name: 'PaperClip', icon: FaPaperclip, category: 'AI Agent' },
  { name: 'Grafana', icon: SiGrafana, category: 'Monitoring' },
  { name: 'Python', icon: SiPython, category: 'Language' },
  // DevOps / Cloud
  { name: 'Azure DevOps', icon: FaMicrosoft, category: 'DevOps' },
  { name: 'AWS', icon: FaAws, category: 'Cloud' },
  { name: 'GCP', icon: SiGooglecloud, category: 'Cloud' },
  { name: 'Docker', icon: FaDocker, category: 'Containers' },
  { name: 'Kubernetes', icon: SiKubernetes, category: 'Orchestration' },
  { name: 'Jenkins', icon: FaJenkins, category: 'CI/CD' },
  { name: 'Linux', icon: FaLinux, category: 'OS' },
  // Dev tools
  { name: 'GitHub', icon: FaGithub, category: 'Version Control' },
  { name: 'Git', icon: FaGit, category: 'Version Control' },
  { name: 'VS Code', icon: FaCode, category: 'IDE' },
  { name: 'Postman', icon: SiPostman, category: 'Testing' },
  { name: 'Jira', icon: SiJira, category: 'Project Mgmt' },
]

function ToolCard({ name, icon: Icon, category, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.45, ease: 'easeOut' }}
      className="card p-5 flex flex-col items-center group cursor-default"
    >
      {/* Icon container */}
      <div className="w-12 h-12 border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:text-neutral-900 group-hover:border-neutral-900 transition-colors duration-200">
        <Icon size={22} />
      </div>
      <div className="text-center pt-3">
        <p className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
          {name}
        </p>
        <p className="text-xs text-neutral-400 mt-0.5">{category}</p>
      </div>
    </motion.div>
  )
}

export default function Tools() {
  const ref = useRef(null)

  return (
    <section id="tools" className="py-28 bg-neutral-50 border-y border-neutral-200">
      <div className="section-container" ref={ref}>
        <SectionTitle
          eyebrow="My Toolkit"
          title="Tools & Platforms"
          subtitle="The ecosystem of platforms and tools I leverage to build, deploy, and monitor production systems"
        />

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 mt-16">
          {toolData.map((tool, i) => (
            <ToolCard key={tool.name} {...tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
