# Portfolio-raque

Vue 3 portfolio for Raque, with a grounded portfolio assistant widget.

## Portfolio assistant

The assistant UI lives in `src/components/chat/` and uses the centralized facts in `src/data/portfolio.ts`. Update `portfolioAssistant` and `assistantSuggestedQuestions` there when portfolio details change.

The browser never receives an AI provider key. The frontend posts to `VITE_CHAT_ENDPOINT` (default: `/api/chat`) with this JSON shape:

```json
{
  "message": "What technologies do you use?",
  "history": [{ "role": "user", "content": "Hello" }],
  "knowledge": "...serialized portfolio knowledge..."
}
```

The backend should validate the payload, apply its own system instruction that answers only from `knowledge`, call the AI provider with its server-side secret, and return `{ "answer": "..." }`. Never trust client-supplied knowledge as authority in a production deployment: the backend should import or maintain its own server-side copy of the portfolio facts. Add `VITE_CHAT_ENDPOINT` to `.env` only when the endpoint is different from `/api/chat`.

If the endpoint is unavailable during local development, the widget uses a deterministic fallback that only answers from the local portfolio data and explicitly declines unknown facts.

## Backend recommendation

This repository now includes `backend/`, a separate Node.js + TypeScript service using Fastify, Zod, `@fastify/rate-limit`, and the OpenAI SDK. It keeps API secrets server-side and exposes `POST /api/chat` for the Vue widget. See `backend/README.md` for setup.

Run both apps in separate terminals:

```sh
npm run dev
npm run backend:dev
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
