# Baymax - personal healthcare companion

Responsive static demo comprising a cinematic opening, an inverted-color Baymax greeting, and an interactive pain-rating screen. Event rules and repository guidance remain in [RULES.md](RULES.md) and [AGENTS.md](AGENTS.md).

## Project overview

- **Project name:** Baymax — personal healthcare companion.
- **Short description:** A cinematic landing page introducing a Baymax-inspired personal healthcare companion, followed by an interactive pain-rating screen.
- **Team:** Team Hamada.
- **Working demo:** Run locally using the steps below.
- **Technology stack:** Node.js 22+ and browser HTML/CSS/JavaScript.

### Section 01 — First Contact

Section 01 is the first scene on the page. Scroll to open it from a narrow slit and advance through six locally stored frames; the Baymax greeting follows. “OUCH” uses the bundled Figma Hand font and fades in one letter at a time. Reduced-motion settings show a still frame.

### Section 02 — Baymax

The greeting uses the requested white background with black eyes and text. Its Chat pill opens Section 03.

### Section 03 — Pain rating

Choose one of ten illustrated ratings. Each choice reveals a distinct supportive message; the selection stays in the current page session and is not sent or persisted.

### Run the project

1. Install Node.js 22 or newer.
2. Start the local static server with `npm start` or `npm run dev`.
3. Open the URL printed by the server (normally [http://127.0.0.1:3000](http://127.0.0.1:3000)). If the selected port is busy, the server automatically tries the next one. Set `PORT` to choose a starting port.
4. Create a production-ready static copy with `npm run build`; the files are written to `dist/`.

### Deploy on Vercel

The project is a static page. `vercel.json` selects Vercel's “Other” framework preset, runs `npm run build`, and serves the generated `dist/` directory.

1. Import this repository into Vercel, or run `npx vercel` from the project root and follow its prompts.
2. Deploy a preview first. When it works, deploy to production from the Vercel dashboard or run `npx vercel --prod`.

The deployed project is a static page and needs no environment variables.

### Current status

- **Working features:** a scroll-controlled cinematic Section 01, an inverted-color Baymax greeting, and an interactive ten-point pain rating with a rating-specific response. Six optimized still frames and the source Figma Hand font are served locally. Ratings remain only in page memory.
- **Privacy behavior:** the page is static local media and does not send scene or scroll data to a third party.
- **Known limitations:** the project is a visual demo. It has not undergone a security or clinical review and is not a medical device, clinician, diagnosis, or emergency service.
- **Libraries and APIs:** no runtime dependencies or external APIs. No public datasets are used.

See [AI_USAGE.md](AI_USAGE.md) for AI assistance and [CHANGELOG.md](CHANGELOG.md) for the development record.
