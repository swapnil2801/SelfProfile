import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import { personalInfo } from '../../data/portfolioData'
import SectionTitle from '../common/SectionTitle'

const contactLinks = [
  {
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    icon: <FaEnvelope size={18} />,
    color: '#00d4ff',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/swapnilpatil',
    href: personalInfo.linkedin,
    icon: <FaLinkedin size={18} />,
    color: '#0a66c2',
  },
  {
    label: 'GitHub',
    value: 'github.com/swapnilpatil',
    href: personalInfo.github,
    icon: <FaGithub size={18} />,
    color: '#e2e8f0',
  },
  {
    label: 'Location',
    value: personalInfo.location,
    href: null,
    icon: <FaMapMarkerAlt size={18} />,
    color: '#b829ff',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.')
      return
    }
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSent(true)
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setError(data.error || 'Something went wrong. Please email me directly.')
      }
    } catch {
      setError('Network error. Please email me directly.')
    } finally {
      setSending(false)
    }
  }

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600
    bg-white/[0.04] border border-white/[0.08] outline-none transition-all duration-300
    focus:border-cyan-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_15px_rgba(0,212,255,0.1)]`

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* BG decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,212,255,0.06), transparent)',
        }}
      />

      <div className="section-container" ref={ref}>
        <SectionTitle
          eyebrow="Get In Touch"
          title="Contact Me"
          subtitle="Have a project in mind or want to collaborate? I'd love to hear from you."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-10 mt-16"
        >
          {/* Left – contact info */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-bold text-white mb-2">Let&apos;s Work Together</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                I&apos;m currently open to full-time roles and freelance projects in full-stack development,
                cloud architecture, or DevOps engineering. Reach out and let&apos;s create something remarkable.
              </p>

              {/* Contact chips */}
              <div className="space-y-3">
                {contactLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 + 0.3 }}
                  >
                    {link.href ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="flex items-center gap-4 p-3 rounded-xl group transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          background: `${link.color}08`,
                          border: `1px solid ${link.color}20`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${link.color}14`
                          e.currentTarget.style.borderColor = `${link.color}40`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `${link.color}08`
                          e.currentTarget.style.borderColor = `${link.color}20`
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${link.color}15`, color: link.color }}
                        >
                          {link.icon}
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">{link.label}</p>
                          <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                            {link.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div
                        className="flex items-center gap-4 p-3 rounded-xl"
                        style={{
                          background: `${link.color}08`,
                          border: `1px solid ${link.color}20`,
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${link.color}15`, color: link.color }}
                        >
                          {link.icon}
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">{link.label}</p>
                          <p className="text-sm font-semibold text-slate-200">{link.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resume download
                ── To activate: drop your PDF as /public/Swapnil_Patil_Resume.pdf ── */}
            <motion.a
              href="/Swapnil_Patil_Resume.pdf"
              download="Swapnil_Patil_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-semibold text-sm text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(184,41,255,0.15))',
                border: '1px solid rgba(0,212,255,0.3)',
                boxShadow: '0 0 20px rgba(0,212,255,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.25)'
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.25), rgba(184,41,255,0.25))'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.1)'
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(184,41,255,0.15))'
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </motion.a>
          </div>

          {/* Right – contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="glass-card p-6 md:p-8"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center gap-4 py-12"
              >
                <div className="text-5xl">🚀</div>
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-slate-400 text-sm max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 px-5 py-2 rounded-xl text-sm font-semibold text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-6">Send a Message</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5 font-mono">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5 font-mono">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-500 mb-1.5 font-mono">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project discussion, collaboration..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-500 mb-1.5 font-mono">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    className={inputClass + ' resize-none'}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-mono">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60"
                  style={{
                    background: 'linear-gradient(135deg, #00d4ff, #b829ff)',
                    boxShadow: '0 4px 20px rgba(0,212,255,0.25)',
                  }}
                >
                  {sending ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={13} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
