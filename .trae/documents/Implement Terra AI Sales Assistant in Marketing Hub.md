## Overview
- Extend the existing `AI Assistant` tab on the Marketing screen to a full Terra AI Sales Assistant module with 24x7 autonomous engagement, qualification, and scheduling.
- Use current design system (Radix UI + Tailwind), existing `Tabs` component and global `Toaster`.
- Keep Google Gemini via Genkit for AI flows; add an abstraction to support GPT-4 later.
- Implement real-time conversation updates with WebSocket; scheduling with `react-calendar`; toast notifications for events.

## Where It Fits
- Entry: `src/app/marketing/page.tsx` → tab `assistant` shows `AiAssistantHub`.
- Expand `src/components/marketing/ai-assistant/ai-assistant-hub.tsx` and add subcomponents for Conversations, Insights, Scheduling, Training, Settings.

## UI Implementation
### Top Hero Card
- Left (40%): animated Terra avatar (`lucide Bot`) with breathing scale animation, pulsing green status dot, text: Online 24/7, Handling N conversations, Uptime.
- Center (30%): live metrics with counter animations: Conversations today, Leads qualified, Meetings scheduled, Response time.
- Right (30%): quick actions: Chat with Terra (opens Terra Chat modal), View Conversations, Configure Terra; Enable/Disable switch with confirmation modal.

### Metrics Cards Row (4 cards)
- Cards for Total Conversations, Qualification Rate, Site Visits Scheduled, Conversion Rate with icons, growth labels.
- Source numbers from real-time feed; fall back to placeholders when disconnected.

### Tabs
- Conversations | Insights | Scheduling | Training | Settings with Radix `Tabs`.

#### Conversations
- Left feed: real-time list of conversations (avatar, name, status badges, last message preview, sentiment emoji, lead score ring, time active, actions).
- Filters: Status, Sentiment, Channel chips, Date range picker.
- Detail panel: chat history (WhatsApp-style bubbles), system events, timestamps; lead snapshot and Terra AI insights; actions (Take Over, View Lead Profile, Schedule Follow-up).
- Hook up WebSocket to stream updates; persist locally for now.

#### Insights
- Charts using `recharts`: Gauge for Conversation Quality, Donut for Intent Distribution, Word-cloud style chips for Common Questions, Bar for Qualification Accuracy, Line for Sentiment Trend.
- Populate from AI analytics endpoint; fall back to mock data.

#### Scheduling
- Full calendar view with `react-calendar` (Month/Week/Day toggle via tabs/toggle-group).
- Show Terra-scheduled (purple "AI Scheduled"), Agent-scheduled (teal "Manual"), available slots.
- Click slot → booking details card with actions (Reschedule, Cancel, Add Notes).
- Settings section in this tab for agent availability, booking rules, calendar sync toggles (Google/Outlook) with connection status.

#### Training
- Knowledge Base management with accordion categories: Company Info, Property Details (auto-synced), FAQs, Policies & Processes, Objection Handling.
- Rich text editor (use existing UI controls; if none, start with basic inputs and lists); support images/files via upload stubs.
- Version history stub and Publish/Unpublish toggle per item.
- AI Training Logs list and Terra confidence score.
- Test Terra simulation chat (reuse Terra Chat) with grading buttons.

#### Settings
- Personality & Tone: name input, style radios, language checkboxes (English, Hindi, Hinglish, Kannada, Tamil, Telugu).
- Response Behavior: speed slider, typing indicator toggle, message length radios.
- Escalation Rules: handoff triggers (legal, pricing discounts, human request, negative sentiment, low score), notifications.
- Working Hours: 24/7, Business hours, Custom schedule; outside-hours autoresponder settings.
- Channel Configuration: checkboxes for WhatsApp, Webchat, SMS, Messenger, Instagram; channel-specific settings sections.
- Privacy & Compliance: retention days, GDPR consent, opt-out handling, conversation recording toggle.
- API & Integrations: Terra API key (display, regenerate), Webhook URL, event checkboxes.

## Real-Time Architecture
- Add WebSocket using `socket.io`.
- Server: initialize on first call via API route (Node runtime) and attach to Next server; maintain a room per channel and broadcast conversation updates and metrics.
- Client: hook `useTerraRealtime` that connects, subscribes to streams (conversations, metrics), exposes reconnection state.
- Fallback: if socket unavailable, simulate counters client-side and poll REST endpoints.

## AI Services
- Keep Genkit `googleai/gemini-2.5-flash` (`src/ai/genkit.ts`) as default.
- Create `src/ai/flows/terra-conversation.ts` to:
  - Classify intent, sentiment, objections.
  - Update lead score, recommended action, predicted conversion.
  - Optionally call `bookSiteVisit` tool and `createTask`.
- Extend `/api/ai/lead-qualification` for chat replies and scheduling hooks or add `/api/terra/chat` returning model responses + extracted fields.
- Optional: add GPT-4 support behind a model selector; plan to add `@genkit-ai/openai` or native `openai` client later.

## Scheduling Integration
- UI uses `react-calendar` for calendar view; map bookings to slots.
- Booking rules enforced in client for demo; later move to server.
- Google/Outlook sync: stub toggles; reuse Genkit `bookSiteVisit` tool outputs now; plan calendar API integration next.

## Notifications
- Use global `useToast` (`src/hooks/use-toast.ts`) for real-time alerts (qualified, scheduled, handoff).
- Toasts on: Terra qualified a hot lead; Meeting scheduled; Handoff initiated.

## Data Model & APIs
- Temporary in-memory store with mock data; define types: `Conversation`, `Message`, `LeadSnapshot`, `Booking`.
- REST endpoints:
  - `GET /api/terra/conversations` with filters.
  - `POST /api/terra/chat` to send a message and receive AI reply + insights.
  - `POST /api/terra/book` to schedule visits (stubbed now via Genkit tool).
- WebSocket events:
  - `metrics:update`, `conversation:update`, `conversation:new`, `booking:update`.

## Security & Config
- Use env vars: `GOOGLE_AI_API_KEY` (existing), optional `OPENAI_API_KEY`.
- Do not log keys; never expose secrets in client.
- Confirmation modal on enable/disable Terra with explicit impact text.

## Testing & Verification
- Start dev server; verify `assistant` tab renders fully.
- Simulate real-time updates over WebSocket; verify counters, feed updates, detail panel.
- Send test messages in Terra Chat; verify AI responses and toasts.
- Create bookings via Scheduling; verify calendar updates and rules enforcement.
- Check responsiveness across breakpoints and HMR behavior.

## Milestones
- Phase 1: UI scaffolding and hero + metrics + tabs; plug mock data.
- Phase 2: WebSocket client + server stubs; live updates in Conversations and Hero.
- Phase 3: AI chat integration with Genkit flow; insights tab wired to results.
- Phase 4: Scheduling tab with `react-calendar` and booking rules.
- Phase 5: Training and Settings UIs; minimal persistence hooks.
- Phase 6: Polishing: confirmations, exports (CSV), notifications, accessibility.

## Code References
- Marketing tab entry: `src/app/marketing/page.tsx:55-57`
- Hub container: `src/components/marketing/ai-assistant/ai-assistant-hub.tsx:20-107`
- Conversations UI: `src/components/marketing/ai-assistant/conversations-tab.tsx:113-238`
- Insights UI: `src/components/marketing/ai-assistant/insights-tab.tsx:65-162`
- Chat assistant: `src/components/chat/chat-assistant.tsx:30-150`
- AI lead qualification API: `src/app/api/ai/lead-qualification/route.ts:4-41`
- Genkit setup: `src/ai/genkit.ts:4-7`