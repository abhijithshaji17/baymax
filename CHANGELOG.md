# Change log

Record each meaningful project change during the event, newest first. Update this file in the same commit as the change. Use a real timestamp with timezone, for example `YYYY-MM-DDTHH:MM:SS+05:30`.

## Event build log

## 2026-10-13T00:12:09+05:30 — Remove the Section 01 kicker and scroll cue

- Changed: Cleared the “BAYMAX / SECTION 01 — FIRST CONTACT” kicker and “SCROLL TO PLAY” cue from `index.html`.
- Why: Simplify the opening section as requested.
- Validation: `git diff --check` passed.
- Limitations: Browser visual review remains pending.

## 2026-10-12T22:51:33+05:30 — Rename the opening pill to Chat

- Changed: Renamed the Baymax opening pill from “Section 01” to “Chat” in `index.html`; retained its existing Section 01 link.
- Why: Use the requested label in the opening pill.
- Validation: `git diff --check` passed.
- Limitations: The pill is still a link to Section 01.

## 2026-10-12T22:18:48+05:30 — Put Section 01 first and restore the title font

- Changed: Moved the cinematic chapter before Baymax's greeting and restored the source Figma Hand typeface for “OUCH” using a locally bundled TrueType font file. Added local TTF MIME support and updated the README.
- Why: Follow the requested page order and preserve the original title styling without introducing an external font request.
- Validation: `node --check section-one.js`, `node --check server.mjs`, and `git diff --check` passed. The local server returned Section 01 before the greeting and served the Figma Hand font with HTTP 200 and the correct TrueType MIME/signature. Browser visual review remains pending.
- Limitations: Browser visual review remains pending.

## 2026-10-12T22:09:55+05:30 — Integrate the cinematic scene as Section 01

- Changed: Added a scroll-controlled “First Contact” chapter after Baymax's greeting, with a per-letter “OUCH” entrance, reduced-motion fallback, six locally optimized frames, and a section link. Added JPEG MIME support to the local server and updated the README and AI usage record.
- Why: Bring the cinematic project into Baymax as its first story section while keeping the target app's existing HTML/CSS/JavaScript stack.
- Validation: `node --check section-one.js`, `node --check server.mjs`, and `git diff --check` passed. `npm ci` completed. The local server started in demo mode; the page, section CSS/JS, and first and last frame URLs returned HTTP 200 with the expected content types.
- Limitations: The sequence uses the supplied scene frames; it does not show Baymax in the scene itself. Browser visual review remains pending.

## 2026-10-12T18:47:30+05:30 — Keep only Baymax's opening section

- Changed: Removed the dashboard, chat, privacy, footer, dialogs, and app chrome so the opening screen is the only page section. Expanded it to fill the viewport in `index.html` and `dashboard.css`.
- Why: Keep the page focused on Section 1 as requested.
- Validation: `git diff --check` passed. Browser visual review remains pending.
- Limitations: The Chat pill remains as a visual menu link; its companion section has been removed.

## 2026-10-12T18:37:24+05:30 — Add a compact glass Chat link to Baymax's opening

- Changed: Added a compact, translucent rounded pill at the bottom of the Baymax opening screen with a single Chat link to the companion section in `index.html` and `dashboard.css`.
- Why: Make the opening screen's next steps easy to reach while matching the supplied soft grey-white glass reference.
- Validation: `git diff --check` passed. Browser visual review remains pending.
- Limitations: None known.

## 2026-10-12T16:09:30+05:30 — Use the Baymax eyes as the browser icon

- Changed: Added a black and white SVG favicon based on the supplied Baymax eyes mark and linked it from `index.html`.
- Why: Carry the site's recognizable face mark into the browser tab and bookmarks.
- Validation: `git diff --check` passed. Browser-tab icon refresh has not been visually reviewed.
- Limitations: Browsers may cache favicons until the page is reloaded or the cache expires.

## 2026-10-12T16:00:21+05:30 — Add a calm Baymax blink

- Changed: Added a synchronized, restrained blink loop to both eyes after the awakening, with blinking disabled under reduced-motion settings. Updated `index.html` and `dashboard.css`.
- Why: Make Baymax feel gently present after powering on.
- Validation: `git diff --check` passed. Visual browser review remains pending.
- Limitations: The blink animation has not been visually reviewed across browsers.

## 2026-10-12T15:55:07+05:30 — Add Baymax awakening intro

- Changed: Replaced the static opening eyes and immediate greeting with a timed power-on sequence, sequential eye illumination, a connecting line draw, restrained settle, and delayed heading/subtitle reveals. Removed the opening scroll prompt. Updated `index.html` and `dashboard.css`.
- Why: Give the first section a quiet cinematic awakening while retaining the recognizable face and existing page content.
- Validation: `git diff --check` passed. Visual browser review and motion timing review remain pending.
- Limitations: No audio was added; the sequence works silently and reduced-motion preferences show the complete composition without animation.

## 2026-10-11T08:03:11+05:30 — Prepare Baymax for Vercel

- Changed: Added Vercel Node.js Functions for `/api/chat` and `/api/status`, extracted the shared chat logic for both Vercel and local serving, added Vercel project configuration and upload ignores, pinned Node 22, and documented deployment and environment setup. Updated `api/`, `lib/`, `server.mjs`, `vercel.json`, `.vercelignore`, `.gitignore`, `package.json`, `package-lock.json`, and `README.md`.
- Why: Deploy the static frontend and working chat API together on Vercel.
- Validation: `node --check` passed for the local server, both Vercel functions, and shared chat service. `package.json`, `package-lock.json`, and `vercel.json` parsed successfully. `npx --yes vercel --version` did not complete because CLI package access stalled, so deployment could not be started.
- Limitations: Deployment still requires Vercel CLI/account access. AI replies require adding `OPENAI_API_KEY` to Vercel project environment variables; local `.env` is excluded from uploads.

## 2026-10-11T07:52:38+05:30 — Start on the next free port when the preferred port is busy

- Changed: When the configured port is already occupied, the server now tries subsequent ports and logs the actual URL it bound to. Updated `server.mjs` and the local run instructions in `README.md`.
- Why: Avoid an `EADDRINUSE` crash when another local service is already using port 3000.
- Validation: `node --check server.mjs` and `git diff --check` passed. Started the app successfully on port 3002 after 3000 and 3001 were occupied.
- Limitations: None known.

## 2026-10-11T07:47:30+05:30 — Handle non-JSON chat responses clearly

- Changed: Check API response content types before parsing, show an actionable message when a web page is returned instead of JSON, and mark the service offline rather than silently claiming demo mode when status checks fail. Updated `app.js` and `dashboard.css`.
- Why: Prevent the raw `Unexpected token '<'` parse error and identify when the page is being served without Baymax’s `/api` backend.
- Validation: `node --check app.js` and `git diff --check` passed.
- Limitations: Chat requires the Node server; static hosting without an API deployment cannot provide replies.

## 2026-10-11T07:44:46+05:30 — Raise the opening eyes and greeting

- Changed: Moved the eyes and greeting upward slightly, keeping the greeting below the eyes.
- Why: Match the requested opening composition.
- Validation: `git diff --check` passed.
- Limitations: Visual browser review remains unavailable because local loopback access is denied.

## 2026-10-11T07:41:51+05:30 — Center the eyes in the opening screen

- Changed: Shifted the animated eye mark to the visual center of the opening screen.
- Why: Match the requested composition.
- Validation: `git diff --check` passed.
- Limitations: Visual browser review remains unavailable because local loopback access is denied.

## 2026-10-11T07:40:25+05:30 — Fit the greeting into the opening and animate Baymax’s eyes

- Changed: Added the greeting to the opening screen in responsive serif type and animated the eyes with a gentle blink. Reworked the next scroll section to continue the introduction without repeating the greeting.
- Why: Make the opening feel complete at first glance while giving Baymax a small, expressive detail.
- Validation: `node --check app.js` and `git diff --check` passed.
- Limitations: Browser rendering still cannot be visually checked in this workspace because local loopback access is denied.

## 2026-10-11T07:31:59+05:30 — Redesign the Baymax experience around an opening greeting

- Changed: Replaced the dashboard visual system with a warm editorial palette, serif display typography, a full-screen Baymax eyes opening built from the supplied image, and a scroll-led introduction before the care dashboard. Restyled navigation, chat, dialogs, privacy details, and mobile layouts while preserving the existing interactions. Updated `index.html`, `dashboard.css`, `app.js`, and `assets/baymax-eyes-opening.png`.
- Why: Give the app a more distinctive, premium introduction and a calmer visual language across the full experience.
- Validation: `node --check app.js` and `git diff --check` passed. Tried to inspect the local preview in the in-app browser, but the workspace denied loopback socket access before the page could load.
- Limitations: Visual browser review, including a phone-sized view, remains unverified. The serif typeface uses local system fallbacks.

## 2026-10-11T06:58:00+05:30 — Use the supplied Baymax art in the opening background

- Changed: Added the supplied portrait artwork at assets/baymax_initial_background.png and placed it on the opening hero background, with a dark blue blend behind the dashboard controls.
- Why: Carry the requested Baymax greeting artwork into the initial screen.
- Validation: Reloaded and inspected the 1265 px browser preview; confirmed the image asset is served and the existing dashboard controls remain visible.
- Limitations: A phone-sized crop was not directly inspected.

## 2026-10-11T05:29:16+05:30 — Remove repeated wellness copy from the landing

- Changed: Removed the duplicate marketing sections, rewrote the dashboard around check-ins, notes, visit preparation, privacy, and urgent help, clarified the AI data flow, and replaced decorative chat sparkles with the Baymax face mark. Reworked the dashboard stylesheet for a simpler, more consistent layout.
- Why: Respond to feedback that the experience felt generic and AI-generated; make each section describe a real feature or a clear safety boundary.
- Validation: Inspected the revised landing in the browser at 1265 px; JavaScript syntax checks and diff whitespace checks passed. Confirmed the local environment file remains git-ignored.
- Limitations: A phone-sized layout was not directly inspected.

## 2026-10-11T04:27:45+05:30 — Refine the dashboard after visual review

- Changed: Removed the duplicate Baymax card, stripped decorative all-caps labels, replaced character glyphs with consistent line icons, simplified card copy, and adjusted spacing and text sizes in `index.html` and `dashboard.css`.
- Why: Make the first screen feel focused and legible while keeping the supplied Baymax render as the single hero visual.
- Validation: Reloaded and inspected the landing page at the available 732 px browser viewport. `node --check app.js`, `node --check server.mjs`, and `git diff --check` passed.
- Limitations: A wide desktop and 390 px phone-sized render were not available for direct visual inspection.

## 2026-10-11T03:56:04+05:30 — Redesign the landing as a Baymax care dashboard

- Changed: Replaced the former story-first hero with a dark San Fransokyo dashboard inspired by the supplied layout: compact icon rail, centered greeting, direct ask box, glass action cards, and a prominent Baymax companion card. Added dashboard shortcuts for check-ins, notes, care preparation, and privacy; added a bottom icon rail at narrow widths; made the demo-mode label visible; and moved Baymax below the header text. Updated responsive styling in `dashboard.css` while preserving the lower story and chat experience.
- Why: Match the reference image’s immersive dashboard composition while keeping Baymax and the healthcare companion flows central.
- Validation: Reloaded and inspected the page at the available 732 px viewport; exercised the front-page ask box through the demo chat. The cards use actions and copy rather than fabricated health readings. A 390 px phone-sized render remains unchecked.
- Limitations: The Baymax art remains a supplied static render, and the optional live AI path still needs a configured key for testing.

## 2026-10-11T02:05:56+05:30 — Fix the narrow-window hero layout

- Changed: Stacked the hero copy and Baymax artwork below 850 px so the companion and greeting card no longer collide in a narrow browser window.
- Why: The first browser inspection showed overlap at a 730 px viewport.
- Validation: Reloaded and visually inspected the page at the available 730 px browser width; the hero now stacks cleanly. A phone-sized viewport remains unavailable in the in-app browser controls.
- Limitations: The 620 px phone-specific layout is implemented in CSS but was not directly rendered in a phone emulator.

## 2026-10-11T02:02:39+05:30 — Build the Baymax companion MVP

- Changed: Added a responsive San Fransokyo-inspired landing and care flow; check-in, session-only chat, editable clinician summary, consent-gated local notes, privacy/safety details, and the supplied Baymax preview. Added a Node server with an optional OpenAI Responses API route and fixed sample demo mode. Added `package.json`, lockfile, and `.env.example`; documented local setup.
- Why: Turn the project brief into a working, reviewable healthcare companion demo while keeping note storage opt-in and AI credentials on the server.
- Validation: `npm install` completed; `node --check server.mjs` and `node --check app.js` passed; `git diff --check` passed. Started the server in demo mode, confirmed the page and Baymax asset render in the desktop browser, exercised chat and check-in replies, created an editable summary, and verified note consent, save, and delete states. Mobile breakpoints and reduced-motion rules are implemented; the available in-app browser did not provide a phone viewport override, so a phone-sized browser render remains to be checked.
- Limitations: No API key was configured, so live OpenAI replies were not exercised. Demo replies are fixed examples. This is not clinically or security reviewed, has no account or cloud sync, and does not detect emergencies. The supplied 3D model preview is used as an image rather than a live interactive mesh.

## 2026-10-11T01:33:32+05:30 — Refine the reference silhouette

- Changed: Smoothed the shoulder-to-arm transition and narrowed the upper arm profile while preserving broad mitten palms and rounded fingertips; regenerated the scene, OBJ/MTL, and preview.
- Why: Bring the model closer to the supplied Baymax reference.
- Validation: Blender 5.2.2 scene generation, OBJ export, and render completed; inspected the preview.
- Limitations: Procedural stylized model; awaiting user review.

## 2026-10-11T01:26:54+05:30 — Make the hands chunky mittens

- Changed: Thickened the wrists and widened the mitten palms; added soft fingertip forms; regenerated the Blender scene, OBJ/MTL, and preview.
- Why: The hand shapes looked too thin in the previous pass.
- Validation: Ran the Blender 5.2.2 scene builder successfully and inspected the rendered preview.
- Limitations: Procedural stylized model; awaiting user review.

## 2026-10-11T01:23:19+05:30 — Make Baymax fuller and chubbier

- Changed: Widened and deepened the torso, thickened the arms and mittens, shortened and widened the legs, and slightly reduced the head; regenerated the Blender scene, OBJ/MTL, and preview.
- Why: Match the user's request for a chubbier Baymax silhouette.
- Validation: Ran the Blender 5.2.2 scene builder successfully and inspected the resulting preview.
- Limitations: Procedural stylized model; awaiting user review.

## 2026-10-11T01:14:27+05:30 — Rebuild Baymax to match reference

- Changed: Reworked `assets/build_baymax_scene.py` around an upright pear-shaped torso, tapered arms, split legs, pill head, and connected eyes; regenerated the `.blend`, OBJ/MTL, and transparent preview; updated usage notes.
- Why: The earlier rounded-part blockout did not match the requested Baymax silhouette.
- Validation: Ran the builder with Blender 5.2.2; it saved the native scene, exported the OBJ and materials, and rendered the PNG. Inspected the preview against the supplied reference.
- Limitations: Stylized model remains a procedural, smooth mesh and still benefits from human visual review. Blender MCP is not connected; generation ran in local Blender.

## 2026-10-11T01:00:13+05:30 — Generate and render Blender scene

- Changed: Generated `assets/baymax.blend` and `assets/baymax_preview.png`; adjusted face placement and camera framing, and joined the white pieces into a softened body mesh.
- Why: Deliver a native Blender project and a preview alongside the portable OBJ model.
- Validation: Ran the OBJ generator and Blender 5.2.2 headless scene builder successfully; Blender reported saving both outputs. Inspected the rendered preview.
- Limitations: Stylized model is assembled from ellipsoids. Blender emitted a thumbnail-cache write warning, but the requested scene and preview were saved. Blender MCP was not connected.

## 2026-10-11T00:43:44+05:30 — Add Baymax-inspired 3D model assets

- Changed: Added `assets/baymax.obj`, `assets/baymax.mtl`, and scripts to generate the OBJ and create a Blender studio scene; documented their use in `README.md`.
- Why: Provide the project with a recognizable, editable 3D companion model.
- Validation: Ran `python assets/build_baymax_obj.py`; it generated the OBJ and MTL successfully. The Blender scene and preview were generated in the follow-up entry above.
- Limitations: The character is assembled from smooth ellipsoids.

```text
## <actual timestamp> — <short change title>

- Changed: <feature or files changed>
- Why: <reason for the change>
- Validation: <commands or manual checks actually run, with results>
- Limitations: <known issues or "None identified in these checks">
```

## Template setup — 10 October 2026

- Changed: Added the event README, rules, agent guide, change log, AI usage record, submission checklist, Git ignore rules, and pull request checklist.
- Why: Give participants a consistent starting point for event rules, basic coding patterns, documented changes, and regular commits.
- Validation: Checked local Markdown links, event detail consistency, required documents, and diff whitespace before publishing.
- Limitations: Documentation scaffolding only; no participant project, application, or working demo is included. GitHub publication and template status are verified separately after creation.
