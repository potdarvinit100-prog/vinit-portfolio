# Vinit Portfolio — Backend API

Express + Mongoose API for the portfolio site: stores project inquiries, exposes a health
check, and reserves a placeholder for future LLM chat. Plain JavaScript, no build step.

## Run

```bash
cd server
npm install
cp .env.example .env   # edit values as needed
npm run dev            # watch mode; or: npm start
```

Environment variables (see `.env.example`):

| Var | Default | Meaning |
| --- | ------- | ------- |
| `PORT` | 5000 | Port to listen on |
| `MONGODB_URI` | *(unset)* | Mongo connection string; if unset the server runs without a DB and inquiries are kept in memory (logged with a warning) |
| `CORS_ORIGIN` | `*` | Allowed CORS origin (frontend URL) |

## Deploy (Render / Railway)

1. Push this repo and point the service at the `server/` directory.
2. Set env vars: `PORT` (usually provided by the platform), `MONGODB_URI` (e.g. MongoDB Atlas), `CORS_ORIGIN` (your frontend URL, e.g. `https://vinit.dev`).
3. Start command: `npm start`.

## API

| Method | Path | Body | Response |
| ------ | ---- | ---- | -------- |
| `POST` | `/api/inquiries` | `{ name, email?, phone?, businessName?, businessType?, websiteUrl?, requirements?, features?, budget?, timeline?, details?, source?, packageName?, industry?, website? (honeypot) }` | `201 { ok:true, id, persisted:true\|false }`; `400 { ok:false, errors }` on validation failure |
| `GET` | `/api/inquiries` | — | Not exposed (404) |
| `GET` | `/api/health` | — | `200 { ok:true, db:'connected'\|'not-configured', time }` |
| `POST` | `/api/chat` | — | `501 { ok:false, message:'LLM chat not configured — frontend uses its built-in rule-based assistant.' }` |

### Inquiry validation

- `name` required, 2+ characters.
- `requirements` **or** `details` required (say something about the project).
- `email` must look like an email if provided.
- At least one contact method required: `email` or `phone`.
- Honeypot: if `website` is non-empty, the request is silently accepted with `200 { ok:true }` and nothing is saved.

## Frontend works without the backend

The frontend's contact form falls back to WhatsApp when this API is unreachable — the
backend is optional infrastructure, not a hard dependency. Inquiries land here when the
API is up (persisted to MongoDB when `MONGODB_URI` is set, otherwise kept in memory for
the session), and the form falls back to opening a WhatsApp chat otherwise.

## Future: LLM chat

`POST /api/chat` currently returns 501. When an LLM provider is wired in, implement it
here (e.g. a system prompt + provider call keyed by an env var) and have the frontend
switch from its built-in rule-based assistant to this endpoint.
