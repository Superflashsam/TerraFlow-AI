## Critical Issue Resolution
- Audit Scope: Review server/client boundaries, Tailwind config, duplicate configs, Next build settings, Windows build script, missing backend integrations, and documentation claims versus code.
- Findings to Address:
  - Client importing server-only AI flows (`src/components/chat/chat-assistant.tsx:41-44`, `src/components/marketing/content-generator.tsx:76-77`) versus server modules (`src/ai/flows/*.ts:1`).
  - Invalid Tailwind plugins (`tailwind.config.ts:111`, `src/tailwind.config.ts:106`) requiring removal of non-Tailwind entries.
  - Duplicate configs (`tailwind.config.ts` at root and `src/`; `package.json` at root and `src/`) causing ambiguity.
  - Build/lint suppression in `next.config.ts:5-10` hiding errors.
  - Windows-incompatible `build` script (`package.json:9`).
  - Missing Firebase/Resend integrations despite README claims; `send-email.ts:17-22` is stub; no Firestore/Auth/Storage usage.
- Prioritization (Severity/Impact):
  1. Server/client boundary violation (breaks builds/production correctness).
  2. Tailwind plugin misuse (build/runtime breakage).
  3. Duplicate configs (tooling instability).
  4. Build/lint suppression (quality/security risk).
  5. Windows build script compatibility (DX reliability).
  6. Backend integration gaps (feature integrity).
- Remediation Actions:
  - Introduce API routes for AI flows under `src/app/api/v1/*` and refactor client components to call `fetch`/`useTransition`.
  - Fix Tailwind config: maintain one root config; remove non-tailwind plugins; ensure correct `content` globs.
  - Consolidate `package.json` and `tailwind.config.ts` to single sources; remove duplicates.
  - Tighten `next.config.ts`: disable `ignoreBuildErrors` and `ignoreDuringBuilds` in CI; fix errors.
  - Update `build` script to `cross-env` or rely on `next build` defaults.
  - Add Firebase and Resend integrations incrementally (see Backend Integration Strategy).
- Regression Testing & Monitoring:
  - Add CI pipeline (lint, type-check, unit tests, build) per PR.
  - Playwright E2E for critical paths: dashboard load, AI chat interaction via new API, content generator submit.
  - Bundle size monitoring (Next analyze/Lighthouse), Core Web Vitals tracking.
  - Error monitoring via Sentry; API latency via logs/metrics.

## Documentation Alignment
- Gap Analysis:
  - Tech stack mismatches (README Next 14 vs `next@15.3.3`).
  - Backend claims (Firestore/Auth/Storage/Resend) not implemented.
  - State management claims (Context API) not present globally.
- Updates:
  - Align versions, actual AI stack (Genkit + Gemini), dev commands (`genkit:dev`, `genkit:watch`).
  - Document new `app/api/v1/*` endpoints and request/response schemas.
  - Add architecture diagrams: UI ↔ API ↔ AI flows ↔ external services (Firestore/Resend).
  - Installation: correct env variables to those used; add future ones as “planned”.
- Review Cycle:
  - Establish monthly documentation reviews; PR checklist includes doc updates.
  - Assign ownership per subsystem (UI, AI, API, integrations) for documentation maintenance.

## Backend Integration Strategy
- Phased Plan with Milestones:
  - Phase 1 (v1 API): Implement `lead-qualification` and `generate-property-description` routes; stubbed email sending via Resend sandbox; no Firestore writes.
  - Phase 2: Firebase initialization module; Firestore schemas for `leads`, `properties`, `tasks`; migrate mock search to Firestore queries; add pagination and indexes.
  - Phase 3: Auth guarding for routes using Firebase Auth; Storage for images; Resend production integration; calendar integration (Google Calendar) for `bookSiteVisit` tool.
- API Versioning:
  - Namespace routes under `/api/v1`; introduce `/api/v2` when breaking changes or performance improvements; support dual versions during migration.
- Staging Environments:
  - Mirror production with separate Firebase project (staging), Resend API key for test, feature flags to enable new features.
- Rollback Procedures:
  - Maintain blue/green deploys for hosting; versioned functions; rollback by switching traffic and disabling feature flags; database migrations are forward-only with backfill scripts to revert.

## Quality Assurance
- Automated Testing:
  - Unit tests for AI prompt/flow wrappers (mock model responses), utilities (`lib/utils.ts`).
  - Integration tests for API routes (request/response shapes, error handling).
  - E2E tests for key flows: AI chat, content generation, analytics navigation.
- Performance Benchmarks:
  - Targets: LCP ≤ 2.5s, TTI ≤ 4s, CLS ≤ 0.1 on desktop; API p95 latency ≤ 500ms.
  - Bundle analysis thresholds and regression alerts.
- Validation Checklists:
  - For each remediation stage: code-quality checklist (lint/type/unused deps), security checklist (secrets, logging), perf checklist (images, hydration), docs checklist (README/API/diagrams updated).

## Implementation Timeline
- 30 Days (Phase 1):
  - Fix server/client boundary with v1 API routes; tailwind plugin cleanup; consolidate configs; tighten Next config in CI; cross-platform build script; update README to current state.
  - CI pipeline with lint/type/build/tests; basic E2E for chat and content generator.
- 60 Days (Phase 2):
  - Firebase init; Firestore schemas; migrate search to Firestore; Resend sandbox integration for `sendEmail`; initial Auth guarding; staging environment setup; performance baselines and dashboards.
- 90 Days (Phase 3):
  - Resend production; Calendar integration in `bookSiteVisit`; Storage for property media; `/api/v2` enhancements if needed; complete documentation including architecture diagrams; finalize test coverage and perf tuning.
- Governance:
  - Bi-weekly stakeholder reviews; monthly progress reports; parallel documentation updates throughout.

## Success Metrics
- System Stability:
  - Build success rate ≥ 99%; error rate in Sentry trending downward; p95 API latency ≤ 500ms.
- Performance:
  - Core Web Vitals meeting targets; bundle size within set thresholds; no hydration errors.
- Documentation Accuracy:
  - 100% coverage of implemented APIs and features; document review passing on each release.
- Dashboards:
  - CI status, Lighthouse reports, Sentry errors, Firestore query performance; publish to stakeholders.
- Post-Implementation Reviews:
  - 30/60/90-day retrospectives validating metrics, identifying further optimizations.

## Risks & Dependencies
- Dependency updates (Next.js 15, Genkit) may introduce breaking changes; mitigate via staging and version pinning.
- Firebase quotas and index build times; plan indexes ahead and monitor usage.
- Team adoption of new API patterns and documentation process; provide templates and checklists.

If approved, I will execute Phase 1 changes: refactor AI client calls to API routes, fix Tailwind config, consolidate configs, tighten build settings, and update documentation accordingly.