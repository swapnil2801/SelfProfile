# SelfProfile
Personal portfolio website built with React, Vite, Tailwind CSS &amp; Framer Motion. Features AI/DevOps focus, animated hero, parallax background, and dark cyberpunk UI.

## Contact form email delivery

The contact form sends messages to `sbpatil2801@gmail.com` via a Vercel
serverless function (`api/contact.js`) backed by Resend. Setup, environment
variables (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`),
domain verification, and deployment verification are documented in
[docs/contact-email.md](docs/contact-email.md). Live delivery requires the
Vercel env vars and a deployed endpoint — nothing is sent locally.

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run check` — structural checks + static contact-API checks (mocked
  Resend; no network or API key required)

## Resume PDF

Drop the final resume at `public/Swapnil_Patil_Resume.pdf`. Until it exists,
`npm run check` reports it as pending (expected missing), not a failure.

