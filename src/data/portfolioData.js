// ============================================================
// Portfolio Data – Swapnil Patil
// ============================================================

export const personalInfo = {
  name: 'Swapnil Patil',
  title: 'Backend Engineer & AI / DevOps Specialist',
  tagline: 'Building AI Agents · Cloud-Native Pipelines · Scalable Backend Systems',
  location: 'Pune, India',
  email: 'sbpatil2801@gmail.com',
  github: 'https://github.com/swapnil2801',
  linkedin: 'https://www.linkedin.com/in/swapnil-patil-s28012001/',
  resume: '/Swapnil_Patil_Resume.pdf',
  bio: `Backend Engineer & AI enthusiast with 2+ years building production-grade APIs, intelligent agent systems, and cloud-native infrastructure — turning complex challenges into clean, scalable solutions.`,
  bio2: `From multi-agent AI workflows with LiteLLM & Claude Code, to hardening Linux infrastructure and shipping CI/CD pipelines on Azure DevOps. I operate at the intersection of AI, backend, and DevOps.`,
}

export const skills = [
  {
    category: 'AI & Python',
    icon: '🤖',
    color: 'pink',
    items: [
      { name: 'Python for AI', level: 88 },
      { name: 'LLM / AI Agents', level: 84 },
      { name: 'LiteLLM / LangChain', level: 80 },
      { name: 'FastAPI', level: 82 },
    ],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    color: 'blue',
    items: [
      { name: '.NET Core / C#', level: 88 },
      { name: 'REST APIs', level: 90 },
      { name: 'Microservices', level: 80 },
      { name: 'Linux Infrastructure', level: 83 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁️',
    color: 'purple',
    items: [
      { name: 'AWS', level: 82 },
      { name: 'Azure DevOps', level: 86 },
      { name: 'Docker / Kubernetes', level: 80 },
      { name: 'CI/CD Pipelines', level: 85 },
    ],
  },
  {
    category: 'Frontend & DB',
    icon: '🎨',
    color: 'cyan',
    items: [
      { name: 'React', level: 90 },
      { name: 'Angular', level: 82 },
      { name: 'SQL Server', level: 85 },
      { name: 'PostgreSQL', level: 80 },
    ],
  },
]

export const tools = [
  { name: 'Hermes Agent', icon: 'hermes', category: 'AI Agent' },
  { name: 'Azure DevOps', icon: 'azure', category: 'DevOps' },
  { name: 'AWS', icon: 'aws', category: 'Cloud' },
  { name: 'GCP', icon: 'gcp', category: 'Cloud' },
  { name: 'Docker', icon: 'docker', category: 'DevOps' },
  { name: 'Git', icon: 'git', category: 'Version Control' },
  { name: 'GitHub', icon: 'github', category: 'Version Control' },
  { name: 'VS Code', icon: 'vscode', category: 'IDE' },
  { name: 'Postman', icon: 'postman', category: 'Testing' },
  { name: 'Jira', icon: 'jira', category: 'Project Mgmt' },
  { name: 'Kubernetes', icon: 'k8s', category: 'DevOps' },
  { name: 'Jenkins', icon: 'jenkins', category: 'CI/CD' },
  { name: 'Linux', icon: 'linux', category: 'OS' },
]

export const experience = [
  {
    id: 1,
    role: 'Associate Engineer',
    company: 'Arieotech Solutions',
    period: 'Jan 2023 – Present',
    duration: '2+ Years',
    location: 'Pune, India',
    type: 'Full-time',
    color: '#00d4ff',
    responsibilities: [
      'Built and maintained full-stack web applications using React and .NET Core, serving 10,000+ active users',
      'Designed RESTful APIs and microservices, improving system modularity by 40%',
      'Managed CI/CD pipelines on Azure DevOps, cutting deployment time from hours to under 15 minutes',
      'Architected cloud infrastructure on AWS & GCP maintaining 99.9% uptime SLA',
      'Optimized SQL queries achieving 35% reduction in average response time',
      'Built AI-powered Python agents integrated with LLM providers via LiteLLM',
    ],
    tech: ['React', '.NET Core', 'Azure DevOps', 'AWS', 'SQL Server', 'Docker', 'REST APIs'],
  },
]

export const projects = [
  {
    id: 1,
    title: 'AI System Design Simulator',
    description:
      'An intelligent multi-agent simulator that models real-world system design scenarios using LLMs. Accepts architecture prompts and autonomously generates design documents, trade-off analyses, capacity estimations, and infrastructure diagrams — powered by Python AI agents and LiteLLM.',
    tech: ['Python', 'LiteLLM', 'AI Agents', 'FastAPI', 'React', 'LangChain'],
    category: 'AI / Agents',
    github: 'https://github.com/swapnilpatil/AI-System-Design-Simulator',
    live: '#',
    gradient: 'from-purple-500 to-pink-500',
    features: ['Multi-agent orchestration', 'LLM-powered design', 'Trade-off analysis', 'Auto diagrams'],
    status: 'Open Source',
    featured: true,
  },
  {
    id: 2,
    title: 'OCR Project – React',
    description:
      'A full-stack OCR (Optical Character Recognition) web application built with React and Python. Supports image/PDF uploads, extracts text using computer vision models, and provides structured output with confidence scores. Includes a clean React UI with real-time processing feedback.',
    tech: ['React', 'Python', 'FastAPI', 'OpenCV', 'Tesseract', 'AWS S3'],
    category: 'Full Stack + AI / Vision',
    github: 'https://github.com/swapnilpatil/OCRProjectReact',
    live: '#',
    gradient: 'from-cyan-500 to-blue-500',
    features: ['Image / PDF OCR', 'Confidence scores', 'Real-time UI', 'S3 storage'],
    status: 'Open Source',
    featured: true,
  },
]

export const achievements = [
  {
    id: 1,
    title: '35% Query Performance Boost',
    description: 'Optimized critical SQL queries and indexed views, reducing average response time from 800ms to 520ms.',
    icon: '⚡',
    color: '#00d4ff',
    metric: '35%',
    metricLabel: 'Faster Queries',
  },
  {
    id: 2,
    title: 'CI/CD Pipeline Overhaul',
    description: 'Re-architected Azure DevOps pipeline, cutting deployment time from 2 hours to 14 minutes with zero-downtime releases.',
    icon: '🚀',
    color: '#b829ff',
    metric: '86%',
    metricLabel: 'Faster Deploys',
  },
  {
    id: 3,
    title: '99.9% Uptime SLA',
    description: 'Designed AWS multi-AZ infrastructure with automated health checks and CloudWatch alarms.',
    icon: '☁️',
    color: '#00fff7',
    metric: '99.9%',
    metricLabel: 'Availability',
  },
  {
    id: 4,
    title: '28% Cloud Cost Savings',
    description: 'Rightsized AWS resources and implemented S3 lifecycle policies, reducing monthly cloud spend by 28%.',
    icon: '💰',
    color: '#00ff88',
    metric: '28%',
    metricLabel: 'Cost Reduction',
  },
  {
    id: 5,
    title: 'Microsoft Azure AZ-900',
    description: 'Certified in Azure Fundamentals — cloud concepts, core Azure services, security, compliance, and pricing.',
    icon: '🏆',
    color: '#0078d4',
    metric: 'AZ-900',
    metricLabel: 'Azure Certified',
  },
  {
    id: 6,
    title: 'Microsoft Azure AZ-400',
    description: 'Certified Azure DevOps Engineer Expert — CI/CD pipelines, infrastructure as code, monitoring and security practices.',
    icon: '🎖️',
    color: '#00d4ff',
    metric: 'AZ-400',
    metricLabel: 'DevOps Expert',
  },
  {
    id: 7,
    title: 'OpenClaw Agentic Workflow',
    description: 'Designed and deployed a fully working multi-agent agentic workflow using OpenClaw — handling autonomous task routing, tool use, and LLM orchestration in production.',
    icon: '🤖',
    color: '#ff2d9f',
    metric: 'LIVE',
    metricLabel: 'In Production',
  },
]

