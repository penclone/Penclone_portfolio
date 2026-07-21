# Penclone Portfolio Site

AI voice agent & automation portfolio. Standard Vite + React + Tailwind CSS project — deploys on Vercel with zero extra configuration.

## Deploying to Vercel

1. Push this folder to a GitHub repo (or run `vercel` directly from this folder with the Vercel CLI).
2. In Vercel, click **Add New → Project** and import the repo.
3. Vercel auto-detects the Vite framework — build command `vite build`, output directory `dist`, install command `npm install`. No extra config needed.
4. Deploy. That's it.

## Local development

```bash
npm install
npm run dev
```

Opens a local dev server with hot reload.

## Building for production locally

```bash
npm run build
npm run preview
```

`npm run build` outputs the static site into `dist/`, which is what Vercel (or any static host) serves.

## Editing content

All copy, links, pricing, testimonials, and case studies live as data objects near the top of `src/App.jsx`:
- `CALENDAR_URL`, `WHATSAPP_URL` — booking and chat links
- `SERVICES`, `INDUSTRIES`, `CASES`, `TESTIMONIALS`, `PRICING` — section content

Styling (colors, fonts, animations) lives in `src/index.css`.
