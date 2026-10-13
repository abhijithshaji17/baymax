# Baymax — Personal Healthcare Companion

A lightweight, cinematic Baymax-inspired web demo. Scroll through the opening scene, meet Baymax, then select a pain rating to see a supportive response.

## Run locally

- Install Node.js 22 or newer.
- From this directory, run `npm start` (or `npm run dev`).
- Open the local URL printed by the server, normally `http://127.0.0.1:3000`.
- To create the static deployment bundle, run `npm run build`. The generated site is written to `dist/`.

There are no runtime dependencies, environment variables, accounts, or external API calls.

## Deploy on Vercel

The repository config runs `npm run build` and publishes `dist/`. Import this repository into Vercel or use the Vercel CLI from this directory. No environment variables are required.

## Project structure

```text
assets/                 Local font, favicon, and six scene frames
index.html              Page markup
dashboard.css           Shared and greeting styles
section-one.css/.js     Cinematic opening scene
section-three.css/.js   Interactive pain rating
server.mjs              Local static server
build.mjs               Static production build
vercel.json             Vercel build and output settings
```

The pain selection stays in page memory and is not saved or transmitted. This is a visual demo, not a medical or clinical product; it does not diagnose, treat, or provide emergency response. See [AI_USAGE.md](AI_USAGE.md), [CHANGELOG.md](CHANGELOG.md), and [SUBMISSION.md](SUBMISSION.md) for project records.
