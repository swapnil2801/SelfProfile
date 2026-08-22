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
    icon: <FaEnvelope size={16} />,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/swapnilpatil',
    href: personalInfo.linkedin,
    icon: <FaLinkedin size={16} />,
  },
  {
    label: 'GitHub',
    value: 'github.com/swapnilpatil',
    href: personalInfo.github,
    icon: <FaGithub size={16} />,
  },
  {
    label: 'Location',
    value: personalInfo.location,
    href: null,
    icon: <FaMapMarkerAlt size={16} />,
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

  const inputClass = `w-full px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400
    bg-white border border-neutral-200 outline-none transition-colors duration-200
    focus:border-neutral-900`

  return (
    <section id="contact" className="py-28 bg-neutral-50 border-t border-neutral-200">
      <div className="section-container" ref={ref}>
        <SectionTitle
          eyebrow="Get In Touch"
          title="Contact Me"
          subtitle="Have a project in mind or want to collaborate? I'd love to hear from you."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid lg:grid-cols-2 gap-10 mt-16"
        >
          {/* Left – contact info */}
          <div className="space-y-6">
            <div className="card p-6 bg-white">
              <h3 className="font-serif text-xl text-neutral-900 mb-2">Let&apos;s Work Together</h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                I&apos;m currently open to full-time roles and freelance projects in full-stack development,
                cloud architecture, or DevOps engineering. Reach out and let&apos;s create something remarkable.
              </p>

              {/* Contact chips */}
              <div className="space-y-3">
                {contactLinks.map((link, i) => {
                  const inner = (
                    <>
                      <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center flex-shrink-0 text-neutral-600">
                        {link.icon}
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400">{link.label}</p>
                        <p className="text-sm font-semibold text-neutral-800">{link.value}</p>
                      </div>
                    </>
                  )
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.08 + 0.2, duration: 0.4 }}
                    >
                      {link.href ? (
                        <a
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer"
                          className="flex items-center gap-4 p-3 border border-neutral-100 hover:border-neutral-900 transition-colors duration-200"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-3 border border-neutral-100">
                          {inner}
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Resume download
                ── To activate: drop your PDF as /public/Swapnil_Patil_Resume.pdf ── */}
            <motion.a
              href="/Swapnil_Patil_Resume.pdf"
              download="Swapnil_Patil_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="btn-solid w-full focus-ring"
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
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
            className="card p-6 md:p-8 bg-white"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center gap-4 py-12"
              >
                <div className="text-5xl emoji-mono">🚀</div>
                <h3 className="font-serif text-xl text-neutral-900">Message Sent!</h3>
                <p className="text-neutral-500 text-sm max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-outline mt-2 focus-ring"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-lg text-neutral-900 mb-6">Send a Message</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1.5 font-mono">
                      Name <span className="text-neutral-900">*</span>
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
                    <label className="block text-xs text-neutral-500 mb-1.5 font-mono">
                      Email <span className="text-neutral-900">*</span>
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
                  <label className="block text-xs text-neutral-500 mb-1.5 font-mono">Subject</label>
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
                  <label className="block text-xs text-neutral-500 mb-1.5 font-mono">
                    Message <span className="text-neutral-900">*</span>
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
                  <p className="text-neutral-900 text-xs font-mono border border-neutral-300 bg-neutral-50 px-3 py-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-solid w-full disabled:opacity-60 focus-ring"
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
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
