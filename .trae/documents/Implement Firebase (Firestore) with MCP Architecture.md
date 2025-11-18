## Choice & Scope
- Primary database: Cloud Firestore (not Realtime Database) for document-centric CRM data, flexible indexing, atomic transactions, and scalable queries.
- Architecture: MCP (Model–Controller–Presenter) across server-only data layer, API controllers, and React presenters.

## Environment & Credentials
- Local: use `GOOGLE_APPLICATION_CREDENTIALS` pointing to the service account JSON; client SDK vars via `.env.local` (`NEXT_PUBLIC_FIREBASE_*`).
- Hosting: prefer default credentials on Firebase App Hosting; optional secrets via `apphosting.yaml`.

## Data Model (Models)
- Collections:
  - `admins`: `{ uid, email, displayName, role: 'admin', createdAt }`
  - `leads`: `{ ownerUid, firstName, lastName, email, phone, budget, location, status, score, source, tags[], createdAt, updatedAt }`
  - `contacts`: `{ ownerUid, name, email, phone, leadIds[], createdAt }`
  - `properties`: `{ agentUid, title, propertyType, location, bedrooms, bathrooms, squareFootage, amenities[], uniqueFeatures[], price, status, createdAt, updatedAt }`
  - `deals`: `{ leadId, propertyId, agentUid, stage, amount, closeDate, createdAt, updatedAt }`
  - `tasks`: `{ title, description, dueDate, status, assignedUid, leadId?, dealId?, createdAt, updatedAt }`
  - `conversations`: `{ ownerUid, context, createdAt }` with subcollection `messages/{id}: { role, content, ts }`
- Indexes:
  - `leads`: `ownerUid+status`, `status+score desc`
  - `deals`: `agentUid+stage`, `closeDate desc`
  - `tasks`: `assignedUid+status`, `dueDate asc`

## Security Rules (Draft)
- Auth required for all reads/writes.
- Admin role via custom claims `role == 'admin'`:
  - `admins`: read own; writes only by admin.
  - `leads/properties/deals/tasks/conversations`: read/write by admin; owners may read/write documents where `ownerUid == request.auth.uid`.
- Storage rules (if used): restrict to authenticated; namespace paths by `uid`.

## Authentication (Controllers)
- Method: Firebase Auth email/password for admins.
- Admin designation: after sign-up, server assigns custom claim `role: 'admin'` for approved users and writes `admins/{uid}`.
- Interfaces: Next pages/components for Register, Login, and Admin Dashboard link.

## API Controllers (Next.js App Router)
- Server-only modules using `firebase-admin`:
  - `POST /api/admin/claim`: set admin claim for a user.
  - `GET/POST/PATCH/DELETE /api/leads`
  - `GET/POST/PATCH/DELETE /api/properties`
  - `GET/POST/PATCH/DELETE /api/deals`
  - `GET/POST/PATCH/DELETE /api/tasks`
  - `GET/POST /api/conversations/:id/messages`
- Validation: `zod` schemas for payloads; structured JSON errors.

## Frontend Integration (Presenters)
- Client SDK init for Auth; session handling via ID tokens.
- Components call API endpoints; optimistic UI updates where safe.
- Error toasts and retry for transient failures.

## Error Handling & Logging
- Uniform error shape: `{ error: { code, message, details? } }`.
- Server logs with context (endpoint, uid, docId); rate-limit sensitive operations.

## Testing
- Connectivity: ping Firestore; create/read/update/delete smoke tests on `leads`.
- Auth: register/login, invalid creds, disabled user, missing claim.
- Rules: simulate owner vs non-owner with emulator or controlled tokens.
- Data integrity: `zod` validation, required fields, type coercion.

## Documentation Deliverables
- Schema reference: entities, fields, types, constraints.
- Setup: required Firebase Console steps, `.env.local` variables, service account.
- Auth flow: registration → claim assignment → authorized access.
- API docs: endpoints, request/response contracts, error codes.

## Implementation Phases
1. Bootstrap Firebase admin/client init modules; add env wiring.
2. Add `admins` claim endpoint; build Register/Login UI.
3. Implement `leads` CRUD path end-to-end with zod validation and rules alignment.
4. Expand to `properties`, `deals`, `tasks`, `conversations/messages`.
5. Add composite indexes; tighten security rules; finalize error handling.
6. Tests and documentation; run verification on dev server.

## Success Criteria
- Secure Firestore-backed CRUD via API controllers.
- Authenticated admin flow with claims and restricted access.
- Verified tests for connectivity, CRUD, auth edge cases.
- Clear schema and setup docs aligned with implementation.
