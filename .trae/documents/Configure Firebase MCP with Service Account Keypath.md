**Overview**

* Use a Google service account JSON and a filesystem path to authorize Firebase Admin for local dev and MCP. In Firebase App Hosting, default credentials work without a key file.

**Create Service Account Key**

* In Firebase Console → `Project settings` → `Service accounts` → `Generate new private key` (Admin SDK).

* Store the downloaded JSON securely; do not commit it.

**Choose Secure Keypath (Windows)**

* Recommended path outside the repo: `C:\secrets\firebase-service-account.json`.

* Alternative (repo-local but git-ignored): `c:\TerraFlow-AI\TerraFlow-AI\.secrets\firebase-service-account.json`.

**Set Environment Variable for Local Dev**

* PowerShell (current session): `$env:GOOGLE_APPLICATION_CREDENTIALS='C:\secrets\firebase-service-account.json'`

* Persist in `.env.local` (Next.js): `GOOGLE_APPLICATION_CREDENTIALS=C:\secrets\firebase-service-account.json`

* MCP config: if the Firebase MCP integration supports an explicit key path, set `FIREBASE_MCP_KEY_PATH=C:\secrets\firebase-service-account.json`; otherwise it will read `GOOGLE_APPLICATION_CREDENTIALS`.

**Production (Firebase App Hosting)**

* Prefer default credentials (no key file needed) per Firebase Admin guidance.

* If you must use a key file: reference a Secret Manager secret from `apphosting.yaml` env entries and grant secret access \[1].

**Validation Steps**

* Verify env var is picked up: log `process.env.GOOGLE_APPLICATION_CREDENTIALS` in a local server-only context.

* Test an Admin call (e.g., Firestore list) to confirm credentials work.

**Security Notes**

* Never commit the JSON; use `C:\secrets\...` or a git-ignored `.secrets` folder.

* Restrict service account roles to required products (Firestore, Auth, Storage) and rotate keys regularly.

**References**

* \[1] Firebase App Hosting configuration: <https://firebase.google.com/docs/app-hosting/configure>

* Admin SDK setup: <https://firebase.google.com/docs/admin/setup>

