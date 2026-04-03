---
name: Portfolio Website Project
description: Swapnil Patil's personal portfolio – React/Vite app in d:/POC's/ProfileWebsite
type: project
---

Built a complete futuristic portfolio website for Swapnil Patil.

**Why:** User requested a cutting-edge, animated personal portfolio showcasing Full Stack Dev + DevOps skills.

**How to apply:** If asked to update the portfolio, the main data is in `src/data/portfolioData.js`. Components live in `src/components/`. Run `npm run dev` to start, `npm run build` to build.

Key facts:
- Stack: React 18, Vite 5, Tailwind CSS 3, Framer Motion 11
- react-icons v5 — `SiAzuredevops`, `SiVisualstudiocode`, `SiMicrosoftazure` do NOT exist; use `FaMicrosoft`, `FaCode`, `FaWindows` from react-icons/fa
- On low-memory systems, build with `NODE_OPTIONS="--max-old-space-size=512" npm run build`
- Entry: `src/App.jsx` → PageLoader → Navbar + 9 sections + Footer
- All portfolio content (skills, projects, experience, achievements) in `src/data/portfolioData.js`
- User's focus: AI Agents, Python, Backend (.NET / FastAPI), DevOps, Linux Infrastructure
- Real repos at top of projects: AI-System-Design-Simulator, OCRProjectReact
- AI tools in Tools section: Claude Code, OpenClaw, LiteLLM, PaperClip, Grafana
- Skills: AI & Python category added (first card, pink color)
