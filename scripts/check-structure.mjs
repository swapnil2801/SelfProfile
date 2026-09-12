#!/usr/bin/env node
/**
 * Structural check — browser-independent verification of the
 * cinematic portfolio experience. Run with: npm run check
 *
 * Validates (against source + built dist):
 *  1. Section order in App.jsx matches the cinematic scroll choreography.
 *  2. Cinematic fx components exist and are wired (SignalField, CursorLight,
 *     SignalDivider, CountUp, motion vocabulary).
 *  3. Reduced-motion + coarse-pointer fallbacks are present.
 *  4. Factual portfolio content is preserved (names, links, metrics).
 *  5. Navigation targets / resume + contact links intact.
 *  6. No leftover blue-neon palette tokens in the CSS custom properties.
 *  7. dist/ build artifacts exist and embed the key content.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(root, p), 'utf8')

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

console.log('\n[1] Cinematic scroll choreography (App.jsx section order)')
const app = read('src/App.jsx')
const order = ['<Hero', '<About', '<Experience', '<AiCreator', '<Projects', '<TechStack', '<Tools', '<Achievements', '<Contact']
let lastIdx = -1
let ordered = true
for (const tag of order) {
  const idx = app.indexOf(tag)
  if (idx === -1 || idx < lastIdx) {
    ordered = false
    break
  }
  lastIdx = idx
}
check('sections render in Hero→About→Experience→AI Creator→Projects→Tech/Tools→Achievements→Contact order', ordered)
check('SignalField mounted', app.includes('<SignalField'))
check('CursorLight mounted', app.includes('<CursorLight'))
check('SignalDivider transitions present', (app.match(/<SignalDivider/g) || []).length >= 6)

console.log('\n[2] FX components')
for (const f of ['SignalField.jsx', 'CursorLight.jsx', 'SignalDivider.jsx', 'CountUp.jsx', 'motion.js']) {
  check(`src/components/fx/${f} exists`, existsSync(join(root, 'src/components/fx', f)))
}
const signalField = read('src/components/fx/SignalField.jsx')
check('SignalField is Canvas 2D (no WebGL)', signalField.includes("getContext('2d')") && !/getContext\(['"]webgl/i.test(signalField))
check('SignalField has static fallback', signalField.includes('signal-static-fallback'))
check('SignalField respects reduced motion', signalField.includes('useReducedMotion'))
check('SignalField pauses when tab hidden', signalField.includes('visibilitychange'))
const cursorLight = read('src/components/fx/CursorLight.jsx')
check('CursorLight fine-pointer gated', cursorLight.includes('pointer: fine'))
const countUp = read('src/components/fx/CountUp.jsx')
check('CountUp static under reduced motion', countUp.includes('prefersReducedMotion'))

console.log('\n[3] Accessibility & motion fallbacks (CSS)')
const css = read('src/index.css')
check('prefers-reduced-motion block present', css.includes('prefers-reduced-motion: reduce'))
check('coarse pointer hides cursor light', css.includes('pointer: coarse') && css.includes('.cursor-light'))
check('focus-visible ring preserved', css.includes('.focus-ring:focus-visible'))
check('line-mask reveal utility present', css.includes('.line-mask'))
check('signal divider styles present', css.includes('.signal-divider'))

console.log('\n[4] Factual content preserved (portfolioData untouched)')
const data = read('src/data/portfolioData.js')
for (const fact of [
  "name: 'Swapnil Patil'",
  "email: 'sbpatil2801@gmail.com'",
  'github.com/swapnil2801',
  'linkedin.com/in/swapnil-patil-s28012001',
  "resume: '/Swapnil_Patil_Resume.pdf'",
  "metric: '35%'",
  "metric: '99.9%'",
  "metric: 'AZ-900'",
  "metric: 'AZ-400'",
  'Arieotech Solutions',
]) {
  check(`data contains ${fact.slice(0, 44)}`, data.includes(fact))
}
// Count-up only wraps factual metrics — no invented numbers in Achievements
const ach = read('src/components/Achievements/Achievements.jsx')
check('Achievements metrics come from data (CountUp value={data.metric})', ach.includes('CountUp value={data.metric}'))
const about = read('src/components/About/About.jsx')
check('About stats use CountUp on existing values', about.includes('<CountUp value={stat.value}'))

console.log('\n[5] Navigation, resume & contact links')
const navbar = read('src/components/Navbar/Navbar.jsx')
for (const target of ['hero', 'about', 'experience', 'ai-creator', 'projects', 'skills', 'contact']) {
  check(`navbar links to '${target}'`, navbar.includes(`'${target}'`))
}
check('navbar resume download intact', navbar.includes('Swapnil_Patil_Resume.pdf'))
const contact = read('src/components/Contact/Contact.jsx')
check('contact form posts to /api/contact', contact.includes("fetch('/api/contact'"))
check('contact CTA has resume download', contact.includes('Download Resume'))
check('contact CTA has mailto', contact.includes('mailto:${personalInfo.email}'))
const hero = read('src/components/Hero/Hero.jsx')
check('hero keeps GitHub/LinkedIn/Email socials', hero.includes('personalInfo.github') && hero.includes('personalInfo.linkedin'))

console.log('\n[6] Theme integrity (no legacy blue-neon vars)')
check('CSS --signal token defined', css.includes('--signal: #ccff00'))
check('no legacy #22d3ee cyan left in CSS', !css.includes('#22d3ee'))
check('no legacy #a78bfa violet left in CSS', !css.includes('#a78bfa'))
const tw = read('tailwind.config.js')
check('tailwind signal palette defined', tw.includes("DEFAULT: '#ccff00'"))

console.log('\n[7] Build artifacts (run `npm run build` first)')
const distOk = existsSync(join(root, 'dist', 'index.html'))
check('dist/index.html exists', distOk)
if (distOk) {
  const assets = readdirSync(join(root, 'dist', 'assets'))
  const jsFile = assets.find((f) => f.endsWith('.js'))
  const cssFile = assets.find((f) => f.endsWith('.css'))
  check('dist JS bundle exists', Boolean(jsFile))
  check('dist CSS bundle exists', Boolean(cssFile))
  if (jsFile) {
    const js = read(join('dist', 'assets', jsFile))
    check('bundle embeds portfolio name', js.includes('Swapnil Patil'))
    check('bundle embeds signal-static fallback class', js.includes('signal-static-fallback'))
    check('bundle embeds canvas field logic', js.includes('signal-field') || js.includes('data-testid'))
  }
  if (cssFile) {
    const distCss = read(join('dist', 'assets', cssFile))
    check('built CSS contains lime signal colour', distCss.includes('#ccff00') || distCss.includes('204,255,0') || distCss.includes('204 255 0'))
    check('built CSS contains reduced-motion query', distCss.includes('prefers-reduced-motion'))
    check('built CSS contains coarse-pointer query', distCss.includes('pointer:coarse') || distCss.includes('pointer: coarse'))
  }
}

console.log(`\n${passes} passed, ${failures} failed`)
process.exit(failures ? 1 : 0)
