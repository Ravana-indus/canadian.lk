# Canadian.lk tracking

Production integration prepared November 12, 2026. Publishing is authorized under kabikabikabi, with Kabi as the sole commit author.

## Configuration
- PostHog: US project 727432, https://us.i.posthog.com. Public project token is in .env.production.
- Meta: preserve the latest main branch Pixel/Dataset 2008747400528081, matching the existing meta-capi function. This supersedes the earlier locally prepared pixel 1732519418883429.
- .env.production contains only public browser identifiers. Hosting environment variables override these values. Never add personal API keys or server access tokens to VITE variables.
- Existing GTM container GTM-NP98ZXSM and TikTok pixel remain present, now loaded after advertising consent. GTM consent updates are sent on withdrawal; custom tags must respect consent in the container configuration. Container contents were not audited.

## Behaviour
- Separate analytics/advertising opt-in, with a persistent cookie-settings control.
- PostHog receives manual SPA pageviews, application_started and application_submitted. Autocapture, recording, surveys and person profiles are disabled. Query strings and fragments are stripped. In-memory persistence does not retain visitor identity across reloads.
- Meta initialization and PageView have one owner. Existing browser/server ViewContent, Contact, SubmitApplication and Lead events share event IDs for deduplication and require advertising consent.
- No application answers or documents are passed to PostHog or Meta. Existing TikTok conversion payload behaviour is preserved behind advertising consent.
- A successful backend response triggers conversion events. The demo contact form does not report a conversion.
- Existing CRM, upload, email and SMS backend behaviour is preserved. No Supabase function deployment is part of this change.

## Validation
Run after dependency installation:
```
node node_modules/typescript/bin/tsc -b
node node_modules/vite/bin/vite.js build
node --test tests/tracking.test.cjs
node node_modules/eslint/bin/eslint.js src/lib src/components/TrackingConsent.tsx src/layouts/RootLayout.tsx
```

After deployment, verify consent rejection/acceptance/withdrawal, route navigation, provider event receipt, and application success/failure. A complete application test triggers real CRM/email/SMS actions and needs a designated test record. Meta server delivery depends on the existing meta-capi deployment and server token; repository code alone does not establish delivery.

The existing footer Privacy Policy link points to /about; it still needs the business's approved privacy notice.

References: https://posthog.com/docs/libraries/js/config and https://vite.dev/guide/env-and-mode.
