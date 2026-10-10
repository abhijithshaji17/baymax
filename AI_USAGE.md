# AI usage record

Use Codex during the hackathon and briefly document its actual contribution here. Add a row after each meaningful task or milestone. Keep summaries concise and omit secrets, private data, and full chat transcripts.

## Event build log

Codex assistance is recorded below. Human review is pending for the implementation unless a row says otherwise.

| Date and time with timezone | Tool / model, if known | Task | Assistance and affected files | Human review / corrections | Validation and result |
| --- | --- | --- | --- | --- | --- |
| 2026-10-11T02:05:56+05:30 | Codex | Fix narrow-window hero overlap | Changed the tablet breakpoint in `styles.css` to stack the hero copy and Baymax artwork. | Pending human review. | Reloaded and visually inspected at 730 px; the hero stacks without the prior artwork overlap. Phone-emulator rendering remains unavailable. |
| 2026-10-11T02:02:39+05:30 | Codex | Build the healthcare companion MVP from the supplied brief | Added the responsive landing and app flows in `index.html`, `styles.css`, and `app.js`; built the OpenAI SDK server endpoint and demo mode in `server.mjs`; added package setup, `.env.example`, and project run instructions. | Pending human review. | Installed the official OpenAI SDK; JavaScript syntax checks and `git diff --check` passed. Inspected desktop in the in-app browser; exercised demo chat, check-in, summary drafting, and consented note save/delete. A phone viewport could not be set with the available browser controls. |
| 2026-10-11T01:33:32+05:30 | Codex | Refine Baymax to match the supplied image | Smoothed the shoulder-to-arm contour and retained wide mitten hands in `assets/build_baymax_scene.py`; regenerated Blender, OBJ/MTL, and preview. | Pending human review. | Blender 5.2.2 generated and exported the model; preview inspected. |
| 2026-10-11T01:26:54+05:30 | Codex | Thicken Baymax's hands | Enlarged the mitten palms, thickened wrist transitions, added rounded fingertips in `assets/build_baymax_scene.py`, and regenerated the Blender, OBJ, and preview assets. | Pending human review. | Blender 5.2.2 saved and exported the updated model; preview inspected. |
| 2026-10-11T01:23:19+05:30 | Codex | Make Baymax fuller and chubbier | Expanded the torso, arms, mittens, and legs while reducing head size; regenerated the `.blend`, OBJ/MTL, and preview. | Pending human review. | Blender 5.2.2 saved the scene, OBJ/MTL, and rendered preview; Codex inspected the output. |

## Template preparation

On 10 October 2026, Codex prepared this documentation template from the organizer's supplied rules and checked the linked Luma page for the event name and dates. This covered `README.md`, `RULES.md`, `AGENTS.md`, `CHANGELOG.md`, `AI_USAGE.md`, `SUBMISSION.md`, `.gitignore`, and the pull request checklist. Agent validation covered local links, event consistency, required documents, and diff whitespace; organizer review is pending.

This preparation is separate from participant project implementation and participant AI usage during the event.
