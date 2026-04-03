import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa'
import { githubStats } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'

const LANG_COLORS = {
  TypeScript: '#3178c6',
  Python: '#3572A5',
  'C#': '#178600',
  JavaScript: '#f1e05a',
}

function StatCard({ stat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 150 }}
      whileHover={{ y: -4, scale: 1.04 }}
      className="glass-card p-5 text-center group cursor-default transition-all duration-300"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,212,255,0.12)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div className="text-2xl mb-2">{stat.icon}</div>
      <div className="text-2xl font-bold font-orbitron gradient-text mb-1">{stat.value}</div>
      <div className="text-xs text-slate-500">{stat.label}</div>
    </motion.div>
  )
}

function RepoCard({ repo, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="glass-card p-5 group transition-all duration-300 h-full"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,212,255,0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <FaGithub size={16} className="text-slate-400" />
          <span className="text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
            {repo.name}
          </span>
        </div>
        <a
          href={`${githubStats.profileUrl}/${repo.name}`}
          target="_blank"
          rel="noreferrer"
          className="text-slate-600 hover:text-cyan-400 transition-colors"
        >
          <FaExternalLinkAlt size={11} />
        </a>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed mb-4">{repo.description}</p>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: repo.langColor }}
          />
          <span>{repo.lang}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <FaStar size={11} className="text-yellow-500/70" />
            {repo.stars}
          </span>
          <span className="flex items-center gap-1">
            <FaCodeBranch size={11} />
            {repo.forks}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function GitHub() {
  return (
    <section id="github" className="py-28 relative overflow-hidden">
      <div
        className="absolute top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.05), transparent 70%)' }}
      />

      <div className="section-container">
        <SectionTitle
          eyebrow="Open Source"
          title="GitHub Activity"
          subtitle="Consistent contributor, open-source advocate, and active builder"
        />

        {/* Profile link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <a
            href={githubStats.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(0,212,255,0.06)',
              border: '1px solid rgba(0,212,255,0.2)',
            }}
          >
            <FaGithub size={24} className="text-white" />
            <div>
              <p className="text-sm font-semibold text-white">@{githubStats.username}</p>
              <p className="text-xs text-slate-500">View GitHub Profile</p>
            </div>
            <FaExternalLinkAlt size={12} className="text-slate-500" />
          </a>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {githubStats.stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* GitHub contribution graph placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 glass-card p-6 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-mono text-slate-400 tracking-widest uppercase">
              Contribution Activity
            </h3>
            <span className="text-xs text-cyan-400 font-mono">2024</span>
          </div>

          {/* Fake contribution graph */}
          <div className="flex gap-1 flex-wrap">
            {Array.from({ length: 52 * 7 }, (_, i) => {
              const rand = Math.random()
              const level = rand > 0.85 ? 4 : rand > 0.7 ? 3 : rand > 0.55 ? 2 : rand > 0.4 ? 1 : 0
              const colors = [
                'rgba(255,255,255,0.04)',
                'rgba(0,212,255,0.2)',
                'rgba(0,212,255,0.4)',
                'rgba(0,212,255,0.65)',
                'rgba(0,212,255,0.9)',
              ]
              return (
                <div
                  key={i}
                  className="rounded-sm transition-all duration-200 hover:scale-125"
                  style={{
                    width: '10px',
                    height: '10px',
                    background: colors[level],
                    boxShadow: level > 2 ? `0 0 4px rgba(0,212,255,${level * 0.15})` : 'none',
                  }}
                  title={`${level * 2} contributions`}
                />
              )
            })}
          </div>

          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-slate-600">
            <span>Less</span>
            {['rgba(255,255,255,0.04)', 'rgba(0,212,255,0.2)', 'rgba(0,212,255,0.45)', 'rgba(0,212,255,0.7)', 'rgba(0,212,255,0.95)'].map((c, i) => (
              <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
            ))}
            <span>More</span>
          </div>
        </motion.div>

        {/* Pinned repos */}
        <div className="mt-10">
          <h3 className="text-sm font-mono text-slate-500 tracking-widest uppercase mb-6 text-center">
            Pinned Repositories
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {githubStats.pinnedRepos.map((repo, i) => (
              <RepoCard key={repo.name} repo={repo} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
