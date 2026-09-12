#!/usr/bin/env node
/**
 * Static check for api/contact.js — exercises the serverless handler with
 * mock req/res objects and a mocked global fetch. No network, no API key,
 * no Vercel runtime needed. Run via: npm run check
 *
 * Verifies:
 *  1. OPTIONS preflight handled, GET rejected with 405.
 *  2. Malformed JSON / non-object bodies rejected safely (400, no crash).
 *  3. Field validation: missing/overlong name, invalid email, overlong
 *     message all → 400 with a human-readable error.
 *  4. Honeypot (`company`) filled → 400, and Resend is never called.
 *  5. Missing RESEND_API_KEY → 500 generic error, no fetch attempted.
 *  6. Happy path: Resend called with correct payload (to/from/reply_to),
 *     Authorization header carries the key, {success:true} returned.
 *  7. Resend failure → 502, generic client error, no provider detail or
 *     secret leaked in the response body, and no wildcard CORS header.
 *  8. Resume path wiring: source + dist reference /Swapnil_Patil_Resume.pdf;
 *     the local PDF is reported as "pending" (expected missing) — NOT a
 *     failure — until the final resume is committed to public/.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

let failures = 0
let passes = 0
const check = (name, ok, detail = '') => {
  if (ok) {
    passes++
    console.log(`  ✓ ${name}`)
  } else {
    failures++
    console.error(`  ✗ ${name}${detail ? ` — ${detail}` : ''}`)
  }
}

// ---------- mock helpers ----------------------------------------------------
function mockReq({ method = 'POST', body, origin } = {}) {
  return { method, body, headers: origin ? { origin } : {} }
}

function mockRes() {
  const res = {
    statusCode: null,
    headers: {},
    body: undefined,
    ended: false,
    setHeader(k, v) { this.headers[k.toLowerCase()] = v },
    status(code) { this.statusCode = code; return this },
    json(obj) { this.body = obj; this.ended = true; return this },
    end() { this.ended = true; return this },
  }
  return res
}

const fetchCalls = []
let nextFetchResponse = null
globalThis.fetch = async (url, opts) => {
  fetchCalls.push({ url, opts })
  const r = nextFetchResponse || { ok: true, status: 200 }
  return {
    ok: r.ok,
    status: r.status,
    text: async () => r.text || '',
    json: async () => ({}),
  }
}

const run = async (handler, reqOpts) => {
  const req = mockReq(reqOpts)
  const res = mockRes()
  await handler(req, res)
  return res
}

// ---------- load handler -----------------------------------------------------
const { default: handler } = await import(join(root, 'api/contact.js'))

const validBody = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'Hello',
  message: 'I would like to talk about a project.',
}

console.log('\n[A] Contact API — method handling')
{
  const res = await run(handler, { method: 'OPTIONS' })
  check('OPTIONS returns 204 and ends', res.statusCode === 204 && res.ended)
  check('OPTIONS sets Allow-Methods without wildcard origin',
    res.headers['access-control-allow-methods'] === 'POST, OPTIONS' &&
    res.headers['access-control-allow-origin'] === undefined)
}
{
  const res = await run(handler, { method: 'GET' })
  check('GET rejected with 405 + Allow header', res.statusCode === 405 && res.headers['allow'] === 'POST, OPTIONS')
}

console.log('\n[B] Contact API — body & validation')
{
  const res = await run(handler, { body: '{not json' })
  check('malformed JSON string → 400, no crash', res.statusCode === 400 && typeof res.body?.error === 'string')
}
{
  const res = await run(handler, { body: null })
  check('null body → 400', res.statusCode === 400)
}
{
  const res = await run(handler, { body: ['array'] })
  check('array body → 400', res.statusCode === 400)
}
{
  const res = await run(handler, { body: { ...validBody, name: '' } })
  check('empty name → 400', res.statusCode === 400 && /name/i.test(res.body?.error || ''))
}
{
  const res = await run(handler, { body: { ...validBody, name: 'x'.repeat(101) } })
  check('name > 100 chars → 400', res.statusCode === 400)
}
{
  const res = await run(handler, { body: { ...validBody, email: 'not-an-email' } })
  check('invalid email format → 400', res.statusCode === 400 && /email/i.test(res.body?.error || ''))
}
{
  const res = await run(handler, { body: { ...validBody, message: 'x'.repeat(5001) } })
  check('message > 5000 chars → 400', res.statusCode === 400)
}

console.log('\n[C] Contact API — honeypot & configuration guard')
{
  fetchCalls.length = 0
  const res = await run(handler, { body: { ...validBody, company: 'Bot Inc' } })
  check('filled honeypot → 400, generic error', res.statusCode === 400 && !/honeypot|spam|bot/i.test(res.body?.error || ''))
  check('honeypot rejection never calls Resend', fetchCalls.length === 0)
}
{
  delete process.env.RESEND_API_KEY
  fetchCalls.length = 0
  const res = await run(handler, { body: validBody })
  check('missing RESEND_API_KEY → 500 generic error', res.statusCode === 500 && typeof res.body?.error === 'string')
  check('no key → no outbound request', fetchCalls.length === 0)
  check('missing-key error does not mention env var name', !/RESEND_API_KEY/.test(res.body?.error || ''))
}

console.log('\n[D] Contact API — happy path (mocked Resend accept)')
{
  process.env.RESEND_API_KEY = 're_test_dummy_key_not_real'
  delete process.env.CONTACT_TO_EMAIL
  delete process.env.CONTACT_FROM_EMAIL
  fetchCalls.length = 0
  nextFetchResponse = { ok: true, status: 200 }
  const res = await run(handler, { body: validBody })
  check('valid submission → 200 {success:true}', res.statusCode === 200 && res.body?.success === true)
  check('exactly one Resend call made', fetchCalls.length === 1)
  const call = fetchCalls[0]
  check('Resend endpoint targeted', call?.url === 'https://api.resend.com/emails')
  check('Authorization bearer uses env key', call?.opts?.headers?.Authorization === 'Bearer re_test_dummy_key_not_real')
  const payload = call ? JSON.parse(call.opts.body) : {}
  check('defaults to sbpatil2801@gmail.com recipient', Array.isArray(payload.to) && payload.to[0] === 'sbpatil2801@gmail.com')
  check('default from is documented safe sender (onboarding@resend.dev)', String(payload.from).includes('onboarding@resend.dev'))
  check('reply_to set to submitter email', payload.reply_to === validBody.email)
  check('subject and message present in payload', String(payload.subject).includes('Hello') && String(payload.text).includes(validBody.message))
}
{
  process.env.CONTACT_TO_EMAIL = 'override@example.com'
  process.env.CONTACT_FROM_EMAIL = 'contact@verified-domain.dev'
  fetchCalls.length = 0
  const res = await run(handler, { body: validBody })
  const payload = fetchCalls[0] ? JSON.parse(fetchCalls[0].opts.body) : {}
  check('CONTACT_TO_EMAIL override respected', res.statusCode === 200 && payload.to?.[0] === 'override@example.com')
  check('CONTACT_FROM_EMAIL override respected', String(payload.from).includes('contact@verified-domain.dev'))
  delete process.env.CONTACT_TO_EMAIL
  delete process.env.CONTACT_FROM_EMAIL
}

console.log('\n[E] Contact API — provider failure masking & CORS')
{
  nextFetchResponse = { ok: false, status: 422, text: 'API key re_secret is invalid — internal provider detail' }
  const res = await run(handler, { body: validBody })
  const clientText = JSON.stringify(res.body)
  check('Resend rejection → 502, success not claimed', res.statusCode === 502 && res.body?.success !== true)
  check('provider error text NOT leaked to client', !clientText.includes('re_secret') && !clientText.includes('provider detail'))
  check('API key never appears in client response', !clientText.includes(process.env.RESEND_API_KEY))
  nextFetchResponse = null
}
{
  const res = await run(handler, { method: 'OPTIONS', origin: 'https://evil.example.com' })
  check('unlisted origin gets NO Allow-Origin header', res.headers['access-control-allow-origin'] === undefined)
}
{
  process.env.CONTACT_ALLOWED_ORIGINS = 'https://swapnil.example.com'
  const res = await run(handler, { method: 'OPTIONS', origin: 'https://swapnil.example.com' })
  check('allow-listed origin echoed (no wildcard)', res.headers['access-control-allow-origin'] === 'https://swapnil.example.com')
  delete process.env.CONTACT_ALLOWED_ORIGINS
}
{
  const src = readFileSync(join(root, 'api/contact.js'), 'utf8')
  check('api/contact.js has no pg / DATABASE_URL remnants', !src.includes("from 'pg'") && !src.includes('DATABASE_URL'))
  check('api/contact.js contains no hardcoded re_ API key', !/re_[A-Za-z0-9]{8,}/.test(src))
}

console.log('\n[F] Resume asset wiring (PDF is user-supplied, pending)')
{
  const contactSrc = readFileSync(join(root, 'src/components/Contact/Contact.jsx'), 'utf8')
  const navbarSrc = readFileSync(join(root, 'src/components/Navbar/Navbar.jsx'), 'utf8')
  check('source links point at /Swapnil_Patil_Resume.pdf',
    contactSrc.includes('/Swapnil_Patil_Resume.pdf') && navbarSrc.includes('Swapnil_Patil_Resume.pdf'))
  const pdfPath = join(root, 'public', 'Swapnil_Patil_Resume.pdf')
  if (existsSync(pdfPath)) {
    check('public/Swapnil_Patil_Resume.pdf present', true)
  } else {
    // Expected-missing: the final PDF is added manually by the owner.
    // This is informational, NOT a failure — the app itself is intact.
    passes++
    console.log('  ○ public/Swapnil_Patil_Resume.pdf pending (expected — add the final PDF manually; links are wired and will work once committed)')
  }
  if (existsSync(join(root, 'dist'))) {
    const assets = readdirSync(join(root, 'dist', 'assets'))
    const jsFile = assets.find((f) => f.endsWith('.js'))
    const js = jsFile ? readFileSync(join(root, 'dist', 'assets', jsFile), 'utf8') : ''
    check('built bundle references resume path', js.includes('Swapnil_Patil_Resume.pdf'))
    check('built bundle posts to /api/contact with honeypot field', js.includes('/api/contact') && js.includes('company'))
  }
}

console.log(`\n${passes} passed, ${failures} failed`)
process.exit(failures ? 1 : 0)
