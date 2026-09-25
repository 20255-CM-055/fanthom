# Capture Test

## Setup

- **Tool:** GitHub Copilot CLI v1.0.88
- **Model:** Auto mode; the session event store recorded `gpt-5.6-luna` for this interactive session and `mai-code-1.1-flash` for the two canary sessions. Auto mode selects dynamically; there is no separate planning model.
- **Automatic mechanism:** Copilot CLI does not document a repository lifecycle hook for prompts/responses. I checked the CLI help and official CLI documentation, found the local JSONL session store at `%USERPROFILE%\.copilot\session-state\<session-id>\events.jsonl`, and installed `capture-agent-logs.ps1` as a continuously running watcher. It discovers every session directory, reads new `user.message` and completed `assistant.message` events, and appends them to `.agent-logs/`.
- **Configuration changed:** `capture-agent-logs.ps1`; the watcher process was started automatically for this checkout. No `.gitignore` entry was added.
- **Log files:** `.agent-logs/2026-09-25_16-52-29_ddb50a21-9ce5-4267-9a75-ddbbeefed81d.md` and `.agent-logs/2026-09-25_16-54-32_b6fd5263-850c-4dd3-86e8-75dc3d7932e5.md`

## Canary entry 1 (raw)

```text
[LOG_ENTRY type=PROMPT num=2 session=ddb50a21]
timestamp: 2026-09-25T16:52:29.8220000Z
model: mai-code-1.1-flash

CAPTURE TEST — 8x assignment, vamsi

---

[LOG_ENTRY type=RESPONSE num=2 session=ddb50a21]
timestamp: 2026-09-25T16:54:56.8070000Z
model: mai-code-1.1-flash

Capture verified. I used GitHub Copilot CLI in Auto mode with the repo-level PowerShell capture hook (`capture-agent-logs.ps1`) and recorded the canary prompt/response in `.agent-logs/`. The summary is in `CAPTURE-TEST.md`.
```

## Canary entry 2 (raw)

```text
[LOG_ENTRY type=PROMPT num=2 session=b6fd5263]
timestamp: 2026-09-25T16:54:32.6680000Z
model: mai-code-1.1-flash

CAPTURE TEST — 8x assignment, vamsi-second-session

---

[LOG_ENTRY type=RESPONSE num=2 session=b6fd5263]
timestamp: 2026-09-25T16:55:44.0070000Z
model: mai-code-1.1-flash

Capture verified. I recorded the current session in `.agent-logs/2026-09-25_16-54-32_b6fd5263-850c-4dd3-86e8-75dc3d7932e5.md` and updated `CAPTURE-TEST.md` with the assignment text.
```

## Initial failed approach

The first attempt relied on a manual capture/report. That did not satisfy the requirement that capture fire automatically, so it was replaced with the session-store watcher before building.
