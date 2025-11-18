## Scope
Implement live conversation streaming via WebSocket, an AI chat endpoint returning insights for detail panels, Training and Settings UIs with persistence stubs, and CSV/PDF transcript exports with toast notifications.

## 1) WebSocket-Driven Conversations
- Server: extend `src/pages/api/socketio.ts` to emit `conversation:new`, `conversation:update`, `conversation:status` events with realistic payloads (id, lead, last message, status, sentiment, score, channel, timestamps).
- Client: create `src/hooks/use-terra-conversations.ts` to connect and maintain conversation state, apply filters, and expose selection API.
- UI: wire `src/components/marketing/ai-assistant/conversations-tab.tsx` to the hook, remove mock data, add filters and actions using live state.
- Notifications: use `useToast` to surface qualified/scheduled/handoff events from socket.

## 2) AI Conversation Endpoint
- Flow: add `src/ai/flows/terra-conversation.ts` (Genkit/Gemini) to classify intent, sentiment, objections, recommended actions, predicted conversion; optionally trigger booking/task tools.
- API: add `src/app/api/terra/chat/route.ts` POST returning `{ reply, insights, leadScore, events }`.
- UI: add a “Get AI Insights” action in the conversation detail to call `/api/terra/chat` and update UI + toasts.

## 3) Training UI + Persistence Stub
- UI: create `TrainingTab` with accordion categories (Company Info, Property Details, FAQs, Policies, Objection Handling) and simple editors.
- Persistence: add `src/app/api/terra/knowledge/route.ts` with in-memory store module; support GET/POST; display “Training Logs” and confidence score.

## 4) Settings UI + Persistence Stub
- UI: create `SettingsTab` with Personality & Tone, Response Behavior, Escalation Rules, Working Hours, Channel Configuration, Privacy & Compliance, API & Integrations.
- Persistence: add `src/app/api/terra/settings/route.ts` with in-memory store; load on mount, save on change.

## 5) Transcript Exports
- CSV: client-side generation from messages in the detail panel; download via Blob.
- PDF: printable view for chat transcript; leverage browser print for now.

## Verification
- Reload `/marketing` to ensure routes are active if needed.
- Validate live feed updates and toasts trigger.
- Test AI endpoint responses render insights and status.
- Confirm Training and Settings values persist via stub APIs.
- Test CSV/PDF exports from the detail panel.

## Notes
- Uses existing stack: Next.js App Router, Radix UI, Tailwind, socket.io, Genkit (Gemini). No secrets exposed; env stays server-side.
- GPT-4 can be added later via a plugin or OpenAI client and a model selector.