// ============================================================
// Portfolio Data – Swapnil Patil
// ============================================================

export const personalInfo = {
  name: 'Swapnil Patil',
  title: 'Backend Engineer & AI / Automation Creator',
  roles: ['Backend Engineer', 'AI & Automation Creator', 'Hermes Agent Power User'],
  tagline: 'Scalable backend systems · Autonomous AI workflows · Local-first agent orchestration',
  location: 'Pune, India',
  email: 'sbpatil2801@gmail.com',
  github: 'https://github.com/swapnil2801',
  linkedin: 'https://www.linkedin.com/in/swapnil-patil-s28012001/',
  resume: '/Swapnil_Patil_Resume.pdf',
  bio: `Backend Engineer & AI enthusiast with 2+ years building production-grade APIs, intelligent agent systems, and cloud-native infrastructure — turning complex challenges into clean, scalable solutions.`,
  bio2: `From multi-agent AI workflows with Hermes Agent, LiteLLM & Claude Code, to hardening Linux infrastructure and shipping CI/CD pipelines on Azure DevOps. I operate at the intersection of AI, backend, and DevOps.`,
}

// ============================================================
// AI Creator — Hermes Agent workflow
// ============================================================

export const aiCreator = {
  eyebrow: 'AI Creator',
  title: 'Building with Hermes Agent',
  subtitle:
    'Practical, autonomous AI systems — not demos. How an open-source, local-first agent framework became the backbone of my daily engineering workflow.',
  intro: `Hermes Agent is an open-source, local-first AI agent framework. I run it on my own Linux infrastructure as a small autonomous engineering team: a manager agent that breaks work down and routes tasks, and specialist agents (frontend, backend) that execute them end-to-end — cloning repos over SSH, writing code on feature branches, running builds, and reporting back with verifiable results.`,
  intro2: `What makes it work isn't hype — it's plumbing. Each agent has real tool access (terminal, git, files, web), persistent memory, reusable skills, and scheduled jobs. I design the workflows, guardrails, and review gates; the agents handle the repetitive engineering loops. The result is a very practical kind of AI: fewer context switches, faster iteration, and an audit trail for everything the agents do.`,
  capabilities: [
    {
      title: 'Multi-Agent Task Routing',
      description:
        'A manager agent decomposes work and delegates to specialist agents with isolated contexts, then consolidates their reports.',
      icon: 'route',
    },
    {
      title: 'Real Tool Use',
      description:
        'Agents operate a real shell: git over SSH, package managers, builds, test runs, file edits — with output verified, not assumed.',
      icon: 'terminal',
    },
    {
      title: 'Local-First & Open Source',
      description:
        'Runs on my own Linux machines. Code, credentials, and history stay on infrastructure I control — no black-box SaaS loop.',
      icon: 'server',
    },
    {
      title: 'Autonomous Workflows',
      description:
        'Cron-scheduled jobs, persistent memory, and skill libraries let recurring engineering chores run without me in the loop.',
      icon: 'loop',
    },
  ],
  workflow: [
    { step: '01', label: 'Brief', detail: 'I write the task: goal, constraints, acceptance criteria' },
    { step: '02', label: 'Route', detail: 'Manager agent splits work and assigns specialists' },
    { step: '03', label: 'Execute', detail: 'Agents branch, code, build, and test in real terminals' },
    { step: '04', label: 'Verify', detail: 'Builds must pass; results reported with real output' },
    { step: '05', label: 'Review', detail: 'I review the diff and merge — humans keep the keys' },
  ],
  stack: ['Hermes Agent', 'Claude / LLM APIs', 'LiteLLM', 'Python', 'Linux', 'Git + SSH', 'Cron Automation', 'FastAPI'],
  disclaimer: null,
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
    github: 'https://github.com/swapnil2801/AI-System-Design-Simulator',
    live: null,
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
    github: 'https://github.com/swapnil2801/OCRProjectReact',
    live: null,
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

