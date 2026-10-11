# Change log

Record each meaningful project change during the event, newest first. Update this file in the same commit as the change. Use a real timestamp with timezone, for example `YYYY-MM-DDTHH:MM:SS+05:30`.

## Event build log

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
