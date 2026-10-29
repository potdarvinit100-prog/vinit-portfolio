# Vinit Potdar — Freelance Web Developer Portfolio

A premium, dark-first portfolio and client-acquisition website for **Vinit Potdar**,
freelance web developer. Built to help local businesses understand the offer,
see what's possible, get an estimate, and start a project.

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite 5 + TypeScript, Tailwind CSS 3, Framer Motion, GSAP, Three.js, lucide-react |
| Routing | react-router-dom (demo sites are lazy-loaded route chunks) |
| Backend | Node.js + Express + Mongoose (`server/`, plain JS) |
| Chatbot | Rule-based engine in `src/chat/` (no API keys; LLM seam ready) |

## Project structure

```
vinit-portfolio/
├── index.html              # SEO + Open Graph meta, fonts, favicon
├── src/
│   ├── main.tsx / App.tsx  # router, ScrollToTop, global ChatWidget + cursor
│   ├── lib/site.ts         # ★ integration contract: SITE, PACKAGES, DEMOS, openInquiry()
│   ├── components/         # ui.tsx (Container, SectionHeading, Reveal, Counter…),
│   │                       # Navbar, Footer, CustomCursor, InquiryForm
│   ├── sections/           # Hero, TrustStats, Services, Showcase, MyWork,
│   │                       # Process, Pricing, FAQ, InquirySection, Contact
│   ├── pages/HomePage.tsx  # composes the sections in order
│   ├── demos/              # 5 concept demo sites + DemoShell + route registry
│   └── chat/               # ChatWidget, engine.ts (rule-based), pricing.ts
├── server/                 # Express API: POST /api/inquiries, GET /api/health
├── .env.example            # VITE_API_URL=  (frontend; empty = same origin)
└── dist/                   # production build output
```

## Getting started

```bash
# frontend
npm install
npm run dev        # http://localhost:5173

# backend (optional — the site works without it via WhatsApp fallback)
cd server
npm install
cp .env.example .env   # set MONGODB_URI
npm run dev
```

Set `VITE_API_URL=http://localhost:5000` in a root `.env` file to point the
inquiry form at the backend during local dev.

## Production build

```bash
npm run build   # tsc + vite build → dist/
npm run preview
```

## Deploy

- **Frontend:** Vercel or Netlify — build command `npm run build`, output dir `dist`.
  For client-side demo routes on some hosts, add an SPA fallback rewrite (`/* → /index.html`).
- **Backend:** Render or Railway — root `server/`, build `npm install`, start `npm start`,
  set `PORT`, `MONGODB_URI`, `CORS_ORIGIN` (your frontend URL).

## Content & honesty rules (read before editing)

This site follows strict honesty rules — keep them when updating content:

- **Never invent** clients, testimonials, reviews, ratings, or business affiliations.
  There is intentionally **no testimonials section**; `MyWork.tsx` carries the honest
  CTA *"Work with me and become my first featured review."* When genuine
  testimonials arrive, add a section and remove that line.
- **"30+ websites built"** and **"YC-backed startup founder"** are Vinit's own stated
  claims — display them generically. Never invent a startup name, batch, or YC details.
- The 5 industry demos (`src/demos/`) are **concept demos with fictional branding**
  (Brew & Bean, Ember & Oak, Velvet & Blade, Forge Athletics, Brightline Dental).
  Every demo shows a "Concept demo" badge + disclaimer. Never present them as client work.
- **Voxa — AI Receptionist Platform** (`src/sections/MyWork.tsx`) is the one real
  flagship build (2026): Next.js, Supabase, Vapi voice AI, Twilio.
- All prices and timelines are **estimates, not guarantees** — the Pricing section,
  chatbot, and inquiry form all carry this disclaimer. Keep it when editing copy.
- Contact details live in `src/lib/site.ts` (`SITE`). Email/GitHub/LinkedIn are not
  provided — the footer shows "coming soon". Swap those lines when the real links exist.

## Key integration points

- `openInquiry(prefill)` in `src/lib/site.ts` dispatches a `vinit:open-inquiry`
  CustomEvent; `InquiryForm` listens, prefills fields, and scrolls to `#inquiry`.
  Demos, pricing cards, service cards, and the chatbot all use it.
- Chatbot negotiation limits live in `PACKAGES` (`base`/`min`/`max` per package).
- To plug an LLM into the chatbot later: implement `queryLLM` in `src/chat/engine.ts`
  and/or `POST /api/chat` in `server/src/routes/chat.js` (currently a 501 stub).
