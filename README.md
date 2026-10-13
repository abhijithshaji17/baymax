# Baymax - personal healthcare companion

A repository template for participants at the 10–11 October 2026 hackathon. It contains event rules and documentation scaffolding; build your project from scratch at the event.

**[Event and registration on Luma](https://luma.com/z10nz8gp)** · **[Event rules](RULES.md)** · **[Agent instructions](AGENTS.md)**

## Event details

| Detail | Information |
| --- | --- |
| Venue | JAIN University, Kochi |
| Location | [Open the venue map](https://maps.app.goo.gl/Eme7gR7NDXSNRANu5) |
| Rooms | 2008 and 2009 |
| Check-in | 10 October 2026, 6:00 PM IST |
| Kick-off | 10 October 2026, 6:30 PM IST |
| Wrap-up | 11 October 2026, by 10:00 AM IST |
| Participation | Solo or a team of up to 4 participants |
| Theme | Open — build anything you like |

Keep your approved Luma QR code ready for entry, and bring your laptop and charger. Eligible checked-in participants will receive Codex credits and OpenAI API credits.

## Use this template

1. Select **Use this template → Create a new repository** on GitHub. Create your own project repository and clone it.
2. Read [RULES.md](RULES.md) and [AGENTS.md](AGENTS.md) before building. Begin project implementation at the event.
3. Fill in the project overview below as you build. Use any suitable language or framework, keeping the implementation simple.
4. Record meaningful changes in [CHANGELOG.md](CHANGELOG.md) and your Codex usage in [AI_USAGE.md](AI_USAGE.md). Commit after completed milestones; aim for a meaningful checkpoint about every 30 minutes.
5. Complete [SUBMISSION.md](SUBMISSION.md) with your code repository, short project description, and working demo. Follow submission instructions announced by the organizers.

This repository started as documentation scaffolding and now contains the Baymax MVP described below. The documentation and commit cadence are repository workflow guidance; the event participation rules are in [RULES.md](RULES.md).

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

The project is a static page. `vercel.json` selects Vercel's “Other” framework preset.

1. Import this repository into Vercel, or run `npx vercel` from the project root and follow its prompts.
2. Deploy a preview first. When it works, deploy to production from the Vercel dashboard or run `npx vercel --prod`.

The deployed project is a static page and needs no environment variables.

The 3D model files are optional project assets and are not loaded by the page. Rebuild them with `blender --background --python assets/build_baymax_scene.py` from the repository root.

### Current status

- **Working features:** a scroll-controlled cinematic Section 01, an inverted-color Baymax greeting, and an interactive ten-point pain rating with a rating-specific response. Six optimized still frames and the source Figma Hand font are served locally. Ratings remain only in page memory.
- **Privacy behavior:** the page is static local media and does not send scene or scroll data to a third party.
- **Known limitations:** the project is a visual demo. It has not undergone a security or clinical review and is not a medical device, clinician, diagnosis, or emergency service.
- **Libraries and APIs:** no runtime dependencies or external APIs. No public datasets are used.

See [AI_USAGE.md](AI_USAGE.md) for AI assistance and [CHANGELOG.md](CHANGELOG.md) for the development record.

## Baymax 3D model

`assets/baymax.obj` is a smooth, stylized character mesh with `assets/baymax.mtl` materials. Import the OBJ into Blender or another OBJ-compatible 3D editor.

To recreate the Blender project, OBJ export, and preview, run `blender --background --python assets/build_baymax_scene.py` from the repository root. The script builds the upright character and writes `assets/baymax.blend`, `assets/baymax.obj`, `assets/baymax.mtl`, and `assets/baymax_preview.png`. The scene was generated and rendered with Blender 5.2.2; no Blender MCP connection was available, so Blender was run locally.
