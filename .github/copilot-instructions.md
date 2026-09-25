# Repository instructions

## Purpose and architecture

This repository contains a React/Vite meeting-intelligence UI and the existing Copilot CLI conversation capture utility. `src/data/meetings.js` is the single source of seeded meeting data, including summary templates, transcript segments, highlights, action items, and attendees; `getMeetingExperience` normalizes older seeded calls to the detail-page shape. `src/routes/router.jsx` connects the persistent `AppLayout` shell and sidebar to the calls library, meeting-specific detail route, and secondary navigation placeholders. The dashboard filters and searches the shared meeting data; meeting cards link to `/calls/:meetingId`. `MeetingDetailPage` coordinates playback time, active transcript segment, tabs, and locally saved meeting actions/highlights across the reusable detail components.

The separate `capture-agent-logs.ps1` utility scans `%USERPROFILE%\.copilot\session-state\<session-id>\events.jsonl`, tracks read offsets and pending prompts in a temporary state file under `$env:TEMP`, and appends prompt/response entries to `.agent-logs/`. A normal invocation scans once; `-Watch` repeats the scan. `CAPTURE-TEST.md` describes the capture setup and its verification.

## Commands

Install dependencies with `npm install`.

- Start the local app: `npm run dev`
- Build for production: `npm run build`
- Serve the production build locally: `npm run preview`
- There is no configured automated test suite or linter. To manually verify a meeting, open `/calls/<meetingId>`; the seeded engineering meeting ID is `engineering-leadership-sync`.

For the separate capture utility, scan available sessions once with `.\capture-agent-logs.ps1`, or keep scanning with `.\capture-agent-logs.ps1 -Watch`.

## Repository-specific conventions

- Keep reusable meeting metadata in `src/data/meetings.js`, not duplicated in page components; extend this shared shape when adding summaries, transcript excerpts, highlights, or action items.
- Keep detail interactions coordinated through the meeting page and its shared meeting data; persist user-created highlights and completed action IDs with meeting-specific localStorage keys in `src/pages/MeetingDetailPage.jsx`.
- Keep the existing `.agent-logs/` as intentional repository output, not disposable build artifacts. Do not add it to `.gitignore`, rewrite historical entries, or delete entries to tidy them.
- Preserve the per-session Markdown format and UTC timestamps; logs are append-oriented and are intended to be committed.
- Logs may contain complete user prompts and assistant responses and are committed publicly. Check their contents for sensitive information before adding or changing capture behavior.
- The capture process uses a shared temporary JSON state file to remember per-session offsets and pending prompts. Keep one-shot and watch behavior consistent when changing event processing.
