import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-scroll'
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa'
import { personalInfo } from '../../data/portfolioData'
import Hero3DImage from './Hero3DImage'

// Animated floating shape
const FloatingShape = ({ delay, x, y, size, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color}20, transparent 70%)`,
      filter: 'blur(1px)',
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.7, 0.3],
    }}
    transition={{
      duration: 8 + delay,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  />
)

export default function Hero() {
  const canvasRef = useRef(null)

  // Particle canvas background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    const PARTICLE_COUNT = 80
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '#00d4ff' : '#b829ff',
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((q) => {
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        })
      })

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()

        // Move
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const floatingShapes = [
    { delay: 0, x: 15, y: 20, size: '300px', color: '#00d4ff' },
    { delay: 2, x: 75, y: 10, size: '200px', color: '#b829ff' },
    { delay: 1, x: 85, y: 70, size: '250px', color: '#00fff7' },
    { delay: 3, x: 5, y: 65, size: '180px', color: '#b829ff' },
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(0,212,255,0.1), transparent)' }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Floating glow orbs */}
      {floatingShapes.map((s, i) => <FloatingShape key={i} {...s} />)}

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg" />

      {/* 3D parallax image — renders only when /public/hero-3d.png exists */}
      <Hero3DImage />

      {/* Scan line */}
      <div className="scan-line" />

      <div className="section-container relative z-10 py-32 md:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">


            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono text-cyan-400 text-sm md:text-base mb-3 tracking-widest"
            >
              &lt; Hello World / &gt;
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-orbitron text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-none"
            >
              <span
                className="block gradient-text"
                style={{
                  textShadow: '0 0 40px rgba(0,212,255,0.3), 0 0 80px rgba(184,41,255,0.2)',
                }}
              >
                SWAPNIL
              </span>
              <span
                className="block text-white"
                style={{ textShadow: '0 0 20px rgba(255,255,255,0.1)' }}
              >
                PATIL
              </span>
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-lg md:text-2xl font-semibold mb-3 h-10 flex items-center justify-center lg:justify-start"
            >
              <span className="text-slate-400 mr-2">I build</span>
              <TypeAnimation
                sequence={[
                  'AI Agents & LLM Systems', 2000,
                  'Python Backend Services', 2000,
                  'Cloud Infrastructure', 2000,
                  'CI/CD Pipelines', 2000,
                  'Linux Infrastructure', 2000,
                  'Scalable REST APIs', 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="gradient-text font-bold"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-slate-400 text-sm md:text-base max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            >
              <Link to="projects" smooth duration={700}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #00d4ff, #b829ff)' }}
                >
                  <FaCode />
                  View Projects
                </motion.button>
              </Link>
              <Link to="contact" smooth duration={700}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(0,212,255,0.4)',
                    color: '#00d4ff',
                    boxShadow: '0 0 15px rgba(0,212,255,0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,212,255,0.1)'
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(0,212,255,0.25)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(0,212,255,0.1)'
                  }}
                >
                  <FaEnvelope />
                  Contact Me
                </motion.button>
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              {[
                { href: personalInfo.github, icon: <FaGithub size={20} />, label: 'GitHub' },
                { href: personalInfo.linkedin, icon: <FaLinkedin size={20} />, label: 'LinkedIn' },
                { href: `mailto:${personalInfo.email}`, icon: <FaEnvelope size={18} />, label: 'Email' },
              ].map(({ href, icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(0,212,255,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {icon}
                </motion.a>
              ))}
              <div className="h-px flex-1 max-w-[80px]"
                style={{ background: 'linear-gradient(90deg, rgba(0,212,255,0.3), transparent)' }} />
            </motion.div>
          </div>

          {/* Right – spacer so left content doesn't stretch too wide on desktop */}
          <div className="hidden lg:block flex-shrink-0 w-80 xl:w-96" aria-hidden="true" />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-xs text-slate-500 font-mono tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-slate-600 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-cyan-400 opacity-70" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
