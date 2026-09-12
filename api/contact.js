// Vercel Serverless Function — POST /api/contact
// Delivers contact-form submissions via the Resend REST API (no SDK, no deps).
//
// Required Vercel env vars:
//   RESEND_API_KEY      — secret API key from https://resend.com/api-keys
// Optional:
//   CONTACT_TO_EMAIL    — recipient inbox (default: sbpatil2801@gmail.com)
//   CONTACT_FROM_EMAIL  — verified sender (default: onboarding@resend.dev,
//                         Resend's shared test sender; replace with an address
//                         on your own verified domain for production)
//   CONTACT_ALLOWED_ORIGINS — comma-separated list of extra origins allowed
//                         to call this endpoint cross-origin. The portfolio
//                         itself is same-origin on Vercel, so this is usually
//                         unnecessary; no wildcard is ever emitted.
//
// See docs/contact-email.md for the full setup guide.

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

const LIMITS = {
  name: { min: 1, max: 100 },
  email: { min: 3, max: 254 },
  subject: { min: 0, max: 150 },
  message: { min: 1, max: 5000 },
}

// Pragmatic email shape check (full RFC 5322 validation is not worth it here).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function applyCors(req, res) {
  // No wildcard. Same-origin requests (the deployed portfolio) need no CORS
  // headers at all; we only echo an Origin that is explicitly allow-listed.
  const allowed = (process.env.CONTACT_ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const origin = req.headers?.origin
  if (origin && allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function parseBody(req) {
  // Vercel usually pre-parses JSON bodies, but be defensive: accessing
  // req.body can throw on malformed input, and some runtimes hand us a raw
  // string. Never let malformed JSON crash the function.
  let body
  try {
    body = req.body
  } catch {
    return null
  }
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return null
    }
  }
  if (body === null || typeof body !== 'object' || Array.isArray(body)) return null
  return body
}

function validate(body) {
  const errors = []
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (name.length < LIMITS.name.min || name.length > LIMITS.name.max) {
    errors.push(`Name is required (max ${LIMITS.name.max} characters).`)
  }
  if (email.length < LIMITS.email.min || email.length > LIMITS.email.max || !EMAIL_RE.test(email)) {
    errors.push('A valid email address is required.')
  }
  if (subject.length > LIMITS.subject.max) {
    errors.push(`Subject must be at most ${LIMITS.subject.max} characters.`)
  }
  if (message.length < LIMITS.message.min || message.length > LIMITS.message.max) {
    errors.push(`Message is required (max ${LIMITS.message.max} characters).`)
  }
  return { errors, name, email, subject, message }
}

export default async function handler(req, res) {
  applyCors(req, res)

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const body = parseBody(req)
  if (!body) return res.status(400).json({ error: 'Invalid JSON body.' })

  // Honeypot: real users never see or fill this field. Bots that do get a
  // generic rejection with no hint about why.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return res.status(400).json({ error: 'Submission rejected.' })
  }

  const { errors, name, email, subject, message } = validate(body)
  if (errors.length > 0) return res.status(400).json({ error: errors.join(' ') })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('contact: RESEND_API_KEY is not configured')
    return res.status(500).json({ error: 'Email service is not configured. Please email me directly.' })
  }

  const to = process.env.CONTACT_TO_EMAIL || 'sbpatil2801@gmail.com'
  const from = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'
  const mailSubject = subject
    ? `Portfolio contact: ${subject}`
    : `Portfolio contact from ${name}`

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    subject ? `Subject: ${subject}` : null,
    '',
    message,
  ].filter((l) => l !== null).join('\n')

  const html = `
    <div style="font-family:sans-serif;line-height:1.5">
      <h2 style="margin:0 0 12px">New portfolio contact</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ''}
      <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>`.trim()

  try {
    const resendRes = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Portfolio Contact <${from}>`,
        to: [to],
        reply_to: email,
        subject: mailSubject,
        text,
        html,
      }),
    })

    if (!resendRes.ok) {
      // Log provider details server-side only; never expose them to clients.
      const detail = await resendRes.text().catch(() => '')
      console.error(`contact: Resend rejected (${resendRes.status})`, detail.slice(0, 500))
      return res.status(502).json({ error: 'Could not send your message right now. Please email me directly.' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('contact: Resend request failed:', err?.message || err)
    return res.status(502).json({ error: 'Could not send your message right now. Please email me directly.' })
  }
}
