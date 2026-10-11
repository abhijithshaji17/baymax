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
- **Short description:** A supportive companion for everyday health conversations, optional check-ins, and preparing editable notes for a clinician.
- **Team:** Team Hamada.
- **Working demo:** Run locally using the steps below.
- **Technology stack:** Node.js 22+, browser HTML/CSS/JavaScript, and the official OpenAI JavaScript SDK for optional server-side AI replies.

### Run the project

1. Install Node.js 22 or newer.
2. Install the server dependency: `npm install`.
3. Optional AI setup: copy `.env.example` to `.env` and add an `OPENAI_API_KEY`. Keep the key in `.env`; never add it to browser code or commit it. `OPENAI_MODEL` can be changed to a model available to your API project. With no key, the app runs in clearly labeled demo mode and returns a fixed sample reply.
4. Start the local server: `npm start`.
5. Open [http://127.0.0.1:3000](http://127.0.0.1:3000). Set `PORT` in `.env` to use another local port.

The app uses the supplied `assets/baymax_preview.png` in the experience and preserves the editable OBJ/MTL and Blender scene. Rebuild those model assets with `blender --background --python assets/build_baymax_scene.py` from the repository root.

### Current status

- **Working features:** scroll-led Baymax introduction using the supplied eyes artwork and an editorial serif greeting, followed by a responsive care dashboard; a health-question input, check-in, visit preparation, local notes, privacy, and urgent-help guidance; session-only chat with loading, error, and clear states; server-side OpenAI Responses API endpoint; fixed-reply demo mode without credentials; editable care-summary draft; opt-in local notes with consent, copy, and delete controls; reduced-motion support. The dashboard does not fabricate body readings or wearable data.
- **Privacy behavior:** chat is kept in the current tab. When AI mode is active, messages are sent through the local server to OpenAI for the reply. Notes remain in browser local storage only after the user checks consent and saves. The server does not log message content. The demo has not undergone a security or clinical review and is not a medical device, clinician, diagnosis, or emergency service.
- **Known limitations:** no user accounts, encrypted cloud sync, clinician integration, emergency detection, or medical-record storage. Demo mode is illustrative and does not generate a personalized AI response. The experience uses local system fonts and requests no third-party font files.
- **Libraries and APIs:** [OpenAI JavaScript SDK and API quickstart](https://developers.openai.com/api/docs/quickstart); Responses API. No public datasets are used.

See [AI_USAGE.md](AI_USAGE.md) for AI assistance and [CHANGELOG.md](CHANGELOG.md) for the development record.

## Baymax 3D model

`assets/baymax.obj` is a smooth, stylized character mesh with `assets/baymax.mtl` materials. Import the OBJ into Blender or another OBJ-compatible 3D editor.

To recreate the Blender project, OBJ export, and preview, run `blender --background --python assets/build_baymax_scene.py` from the repository root. The script builds the upright character and writes `assets/baymax.blend`, `assets/baymax.obj`, `assets/baymax.mtl`, and `assets/baymax_preview.png`. The scene was generated and rendered with Blender 5.2.2; no Blender MCP connection was available, so Blender was run locally.
