# External Integrations

**Analysis Date:** 2026-04-02

## APIs & External Services

**Anti-Bot Protection:**
- Altcha - Proof-of-work CAPTCHA service
  - SDK/Client: `altcha` (v2.3.0) - Widget imported dynamically in `src/components/AltchaWidget.tsx`
  - Server: `altcha-lib` (v1.4.1) - Challenge creation and solution verification
  - Endpoints:
    - `GET /api/altcha-challenge` - Returns SHA-256 HMAC challenge payload
    - Client verifies proof-of-work locally, sends payload to RSVP endpoint
  - Auth: `ALTCHA_HMAC_KEY` environment variable (random secret string)
  - Implementation: `src/app/api/altcha-challenge/route.ts` (challenge generation)

**Embedded Third-Party Content:**
- Pinterest - Embedded board display
  - SDK: Pinterest SDK (`pinit.js`) loaded dynamically from `https://assets.pinterest.com/js/pinit.js`
  - Component: `src/components/PinterestBoard.tsx`
  - Method: Embeds Pinterest board via `<a data-pin-do="embedBoard">` with custom dimensions
  - No authentication required (public board display)

## Data Storage

**Databases:**
- Not used - Wedding website has no persistent data storage

**File Storage:**
- Local filesystem only - Static assets in `public/` directory
- No cloud storage integration (S3, Cloudinary, etc.)

**Caching:**
- Next.js built-in HTTP caching via cache headers
- No Redis or external cache service

## Authentication & Identity

**Auth Provider:**
- Custom/None - No user authentication system
- Guest list access: Guest search is client-side only (name matching against hardcoded guest data in `src/data/guests.ts`)
- No auth tokens, login, or session management

## Email Delivery

**Email Service:**
- SMTP via Nodemailer (self-hosted or third-party SMTP)
- Configuration: `src/app/api/rsvp/route.ts` (lines 8-14)
  - Host: `SMTP_HOST` environment variable
  - Port: `SMTP_PORT` environment variable (587 or 465)
  - Auth: `SMTP_USER` and `SMTP_PASS` environment variables
  - From: `FROM_EMAIL` environment variable
  - To: `PLANNER_EMAIL` environment variable (wedding planner receives all RSVPs)
- Use case: Send RSVP confirmation emails when guest submits form
- Email format: Plain text with guest list, contact info, total attendance count

## Monitoring & Observability

**Error Tracking:**
- None detected - No Sentry, LogRocket, or similar service

**Logs:**
- Console logging only
  - ALTCHA errors: `console.error()` in `src/app/api/altcha-challenge/route.ts` (line 16)
  - RSVP errors: `console.error()` in `src/app/api/rsvp/route.ts` (line 87)
- No centralized logging service or aggregation

## CI/CD & Deployment

**Hosting:**
- Deployment target not specified in code
- Designed for Vercel (Next.js native platform) or Node.js server environments
- No deployment-specific code (works with standard Next.js deployment)

**CI Pipeline:**
- Not detected - No `.github/workflows/`, `gitlab-ci.yml`, or similar

## Environment Configuration

**Required Environment Variables:**
- `SMTP_HOST` - SMTP server hostname (e.g., smtp.gmail.com)
- `SMTP_PORT` - SMTP port (587 for TLS, 465 for SSL)
- `SMTP_USER` - SMTP authentication username
- `SMTP_PASS` - SMTP authentication password
- `PLANNER_EMAIL` - Recipient email for RSVP notifications
- `FROM_EMAIL` - Sender email address for RSVP emails
- `ALTCHA_HMAC_KEY` - Random secret key for anti-bot HMAC (at least 32 characters recommended)

**Optional Environment Variables:**
- None detected

**Secrets Location:**
- `.env.local` or `.env` file (not in version control, listed in `.gitignore`)
- Reference: `.env.example` provides template with placeholders

## Webhooks & Callbacks

**Incoming Webhooks:**
- None detected - No incoming webhook endpoints

**Outgoing Webhooks:**
- None detected - No external webhooks triggered by application events

## Client-Side Integrations

**Google Fonts:**
- Playfair Display, Libre Baskerville, Great Vibes, Cinzel, Tangerine
- Loaded via Next.js font optimization in `src/app/layout.tsx` (lines 2-47)
- No external CDN calls (fonts are self-hosted via Next.js)

## API Endpoints Summary

**Public API Routes:**
- `GET /api/altcha-challenge` - Returns CAPTCHA challenge (public endpoint)
- `POST /api/rsvp` - Accepts RSVP submission with Altcha verification (public endpoint)
  - Input: JSON with guest selections, contact info, Altcha payload
  - Output: `{ success: true }` or error response
  - Validation: Contact info validation, Altcha proof-of-work verification

---

*Integration audit: 2026-04-02*
