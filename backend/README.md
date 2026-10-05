# Portfolio API

Small Fastify + TypeScript API for the Vue portfolio assistant.

## Setup

```sh
npm install
copy .env.example .env
npm run dev
```

Set either `GEMINI_API_KEY` or `OPENAI_API_KEY` in `.env`. Gemini is used when both are configured. Never expose a provider key to Vite or commit `.env`.

The contact form sends mail through Gmail SMTP. Set `GMAIL_USER=raquecanete60@gmail.com` and a Gmail App Password in `GMAIL_APP_PASSWORD`. Enable 2-Step Verification on the Gmail account and create the App Password in Google Account security settings. Do not use your normal Gmail password.

The frontend calls `POST http://localhost:8787/api/chat` with a message and optional conversation history. The API validates input, applies grounded system instructions, rate-limits requests, and returns `{ "answer": "..." }`.

Build for production with `npm run build`, then run `npm start`.
