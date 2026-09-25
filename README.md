# Fathom — AI Meeting Intelligence Clone

## Overview

A 24-hour product rebuild inspired by Fathom, focused on the post-meeting experience: a meeting library, playback-style review, transcript navigation, structured summaries, follow-ups, highlights, and cross-meeting discovery.

Meeting information is seeded locally. The player uses a simulated clock, and Ask Fathom uses deterministic demo responses; this project does not provide real AI transcription or recording.

## Live Demo

[Live Demo](PASTE_DEPLOYED_URL_HERE)

## Core Features

- **Dashboard / My Calls** — browse seeded and locally saved demo meetings.
- **Meeting playback** — simulated player controls, seek position, and highlight markers; no audio is played.
- **Transcript** — searchable segments with timestamp navigation.
- **Summary templates** — General, Project Update, Sales, and 1:1 structures.
- **Action items** — meeting follow-ups with completion state saved in the browser.
- **Highlights** — save moments from a transcript, jump to them, and share a demo clip link.
- **Cross-meeting transcript search** — find matching speakers and transcript snippets across calls.
- **Ask Fathom** — deterministic answers with meeting references for supported demo questions.
- **Calendar** — simulated Google and Microsoft calendar connection and sync states.
- **Settings** — local recording, AI summary, and sharing preferences.
- **Simulated meeting capture** — start a demo session, watch its timer, end it, see processing progress, then open the meeting intelligence view.

## Architecture

The React application is served and built by Vite. React Router maps routes into a shared app layout and page-level experiences. Meeting detail, search, and Ask Fathom reuse a common meeting data shape; seeded records live in `src/data/`, while user-created demo meetings and preferences are stored in browser `localStorage`.

```text
Browser
└── React + React Router
    ├── App layout and pages
    │   ├── My Calls / Search / Ask Fathom
    │   ├── Meeting detail
    │   ├── New Meeting (simulated capture flow)
    │   └── Calendar / Settings
    ├── Shared meeting data
    │   ├── Seeded meetings and transcript content
    │   └── Demo meetings saved in localStorage
    └── Client-side workflows
        ├── Playback clock, transcript, summaries, actions, highlights
        ├── Transcript search and deterministic Ask responses
        └── Local preferences and simulated calendar state
```

## Important Product Decision

The assignment explicitly permits the recording bot/capture layer to be simulated. Real Zoom, Google Meet, or Microsoft Teams recording, OAuth, audio capture, speech-to-text, and backend infrastructure were intentionally not implemented. Time was prioritized toward the user-facing meeting intelligence workflows and UX. Simulated meetings are labeled as demo content and do not contain real recordings, transcripts of speech, or AI-generated summaries.

## Tech Stack

- React 18 and JavaScript (ES modules)
- Vite
- React Router
- CSS
- lucide-react
- Browser `localStorage` for user-created demo state

## Demo Flow

```text
Dashboard
→ New Meeting
→ Select platform
→ Start simulated recording
→ End meeting
→ Processing
→ Meeting Detail
→ Transcript / Summary / Actions / Highlights
```

## Local Setup

Requires Node.js and npm. Install from the committed lockfile, then start the Vite development server:

```bash
npm ci
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Verification

The production build completed successfully. Browser smoke checks covered the main product flow and responsive layouts, including 1440px and 390px views for the primary screens and 1440px, 1024px, 768px, and 390px checks for Calendar, Settings, and simulated capture. No runtime exceptions or browser console errors were observed during those checks. `npm audit --omit=dev --audit-level=moderate` reported zero vulnerabilities, and `git diff --check` passed. These are manual/browser checks; the project does not define an automated test script.

## Known Limitations

- Meeting records and transcript content are seeded demo data; newly created meetings are saved locally in the current browser.
- Capture, playback, calendar connections, and processing are simulations. No external meeting platform is contacted, no audio/video is captured, and no speech is transcribed.
- Ask Fathom returns deterministic responses for supported demo questions; it is not connected to an LLM.
- Calendar and workspace preferences are browser-local and are not synchronized across devices.
- Share-clip URLs are demo links, not authenticated or hosted recordings.

## Agent Capture

The required `.agent-logs/` directory preserves agent-session capture records. Agent sessions have been captured there and committed separately alongside application development milestones.
