## Summary
Implement live conversation streaming over WebSocket, add an AI chat endpoint that returns insights, build Training and Settings UIs with persistence stubs, and enable CSV/PDF transcript exports with toast notifications.

## A. WebSocket-Driven Conversations
- Server
  - Extend `src/pages/api/socketio.ts` to emit conversation events: `conversation:new`, `conversation:update`, `conversation:status`.
  - Event payloads include id, lead info, last message, status, sentiment, score, timestamps, channel.
- Client
  - Create `useTerraConversations` hook (mirrors `useTerraRealtime`) to connect and manage a reactive store of conversations.
  - Wire `ConversationsTab` (`src/components/marketing/ai-assistant/conversations-tab.tsx`) to the hook:
    - Replace `mockConversations` with state from the socket stream.
    - Apply filters: Status, Sentiment, Channel, Date range.
    - Update detail panel on selection; reflect live changes.
- Verification
  - Simulate events from server at intervals; confirm feed and statuses update in real time.

## B. AI Conversation Flow Endpoint `/api/terra/chat`
- Flow
  - Add `src/ai/flows/terra-conversation.ts` using Genkit (Gemini) to classify intent, sentiment, objections, recommended action, predicted conversion, and optional booking/task calls.
  - Reuse tools: `bookSiteVisit`, `createTask`; allow future OpenAI model swap.
- API
  - Create `src/app/api/terra/chat/route.ts` POST endpoint:
    - Input: conversation context (messages, lead snapshot).
    - Output: `{ reply, insights: { intent, sentiment, objections, recommendedAction, predictedConversion }, leadScore, events }`.
- UI Integration
  - Conversation Detail: call `/api/terra/chat` on agent “Take Over” or simulation; render AI reply and insights panel.
  - Global `ChatAssistant` can optionally route to `/api/terra/chat` for general queries.
- Verification
  - Test with sample conversations; ensure insights render and toasts fire for qualified/scheduled events.

## C. Training UI (Teach Terra)
- UI
  - Build `TrainingTab` with Accordion sections: Company Info, Property Details, FAQs, Policies & Processes, Objection Handling.
  - Editors: start with Textarea + formatting controls; later swap to a rich editor.
  - Version history list and Publish/Unpublish toggles per item.
- Persistence (Stub)
  - Add API routes: `GET/POST /api/terra/knowledge` storing in a server-side in-memory module for demo.
  - Future: migrate to Firestore; keep types consistent.
- Test Terra simulation
  - Inline chat to query knowledge; mark Correct/Needs improvement; record in training logs.

## D. Settings UI (Configure Terra)
- UI
  - Build `SettingsTab` with sections: Personality & Tone, Response Behavior, Escalation Rules, Working Hours, Channel Configuration, Privacy & Compliance, API & Integrations.
  - Use existing components: `Select`, `Switch`, `RadioGroup`, `Checkbox`, `Input` from `src/components/ui/*`.
- Persistence (Stub)
  - Add `GET/POST /api/terra/settings` storing in server memory; load on mount, save on change.
  - Future: migrate to Firestore.

## E. Transcript Exports + Notifications
- Export
  - CSV: client-side generation from conversation messages; download via Blob URL.
  - PDF: initial printable layout (browser print-to-PDF); later add `jspdf` if needed.
  - Buttons in Conversation Detail: “Export CSV” and “Export PDF”.
- Notifications
  - Use `useToast` to show:
    - Lead qualified
    - Site visit scheduled
    - Handoff initiated
  - Fire on socket events and AI endpoint responses.

## F. Testing & Caveats
- Restart dev server if the new API route is not picked up (WebSocket/init changes).
- Validate `/marketing` renders; verify socket connection indicator in hero (already present).
- Exercise tabs: Conversations live updates, AI insights response, Scheduling calendar interactions, Training and Settings persistence.

## Code References
- Socket server: `src/pages/api/socketio.ts`
- Realtime hook: `src/hooks/use-terra-realtime.ts`
- Hub: `src/components/marketing/ai-assistant/ai-assistant-hub.tsx`
- Conversations: `src/components/marketing/ai-assistant/conversations-tab.tsx`
- Chat assistant: `src/components/chat/chat-assistant.tsx`
- Toast infra: `src/components/ui/toaster.tsx`, `src/hooks/use-toast.ts`

Confirm to proceed and I’ll implement these in sequence with verification at each step.