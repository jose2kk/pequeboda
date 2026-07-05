# Codebase Concerns

**Analysis Date:** 2026-04-02

## Security Issues

**Hardcoded Default Credentials:**
- Issue: SMTP and ALTCHA configuration in `src/app/api/rsvp/route.ts` and `src/app/api/altcha-challenge/route.ts` use hardcoded fallback values including `"change-me-to-a-random-secret"` and `"password"` placeholders
- Files: `src/app/api/rsvp/route.ts` (lines 8-14), `src/app/api/altcha-challenge/route.ts` (line 4)
- Impact: If environment variables are not properly set, the application will fail silently or use insecure defaults. In production, missing environment variables could expose sensitive operations
- Fix approach: Add validation at startup to ensure all required environment variables are set before the application starts. Use a configuration module that throws errors on missing required values

**Missing Input Validation:**
- Issue: RSVP API endpoint (`src/app/api/rsvp/route.ts`) performs basic field presence checks but lacks comprehensive validation (email format, phone format validation server-side is weak, string length limits, SQL injection prevention for email services)
- Files: `src/app/api/rsvp/route.ts` (lines 31-36)
- Impact: Malformed or malicious data could be sent to email systems, potentially causing delivery failures or exploits
- Fix approach: Use a schema validation library (Zod is installed but unused) to validate all request payloads. Add length limits, sanitize strings, validate email/phone format with regex or dedicated libraries

**No CSRF Protection:**
- Issue: RSVP POST endpoint has no CSRF token validation. Form submission is vulnerable to cross-site request forgery
- Files: `src/app/api/rsvp/route.ts`
- Impact: Malicious sites could trigger RSVP submissions on behalf of users
- Fix approach: Implement CSRF tokens using Next.js middleware or a CSRF package (e.g., `csrf-csrf`, `next-csrf`)

**Guest List Exposed in Frontend:**
- Issue: Complete guest list with names and IDs is hardcoded in `src/data/guests.ts` and directly imported in client components
- Files: `src/data/guests.ts` (entire file), `src/components/RSVPForm.tsx` (line 5)
- Impact: Guest names and structure are visible in client-side JavaScript bundles. Sensitive guest information is publicly accessible
- Fix approach: Move guest list to a server-side database. Only retrieve guest data via API after search query validation. Consider hashing names or using IDs without exposing full guest lists

## Performance Bottlenecks

**Large RSVPForm Component:**
- Problem: `RSVPForm.tsx` is 651 lines (largest component), containing complex state management with multiple dropdowns, validation, and inline subcomponents
- Files: `src/components/RSVPForm.tsx`
- Cause: All form logic (search, validation, submission) is colocated in one component with multiple useRef, useState, and useEffect hooks. Subcomponents like GuestMultiSelect and PlusOneInput are defined inline
- Improvement path: Extract subcomponents to separate files. Consider using a form library (React Hook Form) to reduce boilerplate and improve performance with better re-render control

**Unnecessary Re-renders in Hero Component:**
- Problem: Hero component updates image index every 1.2 seconds via setInterval, causing full re-render
- Files: `src/components/Hero.tsx` (lines 35-38)
- Cause: Simple counter update but could be optimized with useMemo or a separate lower-level state hook
- Improvement path: Consider using useTransition or moving carousel state to a custom hook to avoid cascading re-renders

**No Memoization on Expensive Operations:**
- Problem: `RSVPForm.tsx` has `useMemo` only for search results, but guest selection logic and plus-one management don't use memoization
- Files: `src/components/RSVPForm.tsx` (lines 216-233 has memoization, but lines 251-278 don't)
- Cause: Guest toggle and plus-one updates trigger full form re-renders
- Improvement path: Wrap guest list filtering and plus-one state updates with useMemo, memoize subcomponent props

**Counting Loops in Template String:**
- Problem: When rendering plus-one names, the code builds arrays and filters without memoization (line 283)
- Files: `src/components/RSVPForm.tsx` (line 283)
- Improvement path: Memoize filtered guest arrays

## Fragile Areas

**Date/Time Logic in Countdown:**
- Files: `src/components/Countdown.tsx` (lines 17-31)
- Why fragile: Hardcoded timezone offset `-05:00` for Colombia. If wedding moves time zones or event time changes, calculation breaks. No error handling for invalid date strings
- Safe modification: Create a constant for timezone, add validation for date string format, consider using a date library (Day.js, date-fns)
- Test coverage: No tests exist. calculateTimeLeft needs unit tests for edge cases (past dates, midnight, timezone boundaries)

**String Normalization in Search:**
- Files: `src/components/RSVPForm.tsx` (line 212-213)
- Why fragile: Uses `normalize("NFD")` which works for accented characters but may fail for other Unicode characters or languages
- Safe modification: Add comments explaining the regex pattern, test with various character sets
- Test coverage: No tests. Search function should be tested against common name variations

**External Script Loading in PinterestBoard:**
- Files: `src/components/PinterestBoard.tsx` (lines 14-29)
- Why fragile: Dynamically loads external Pinterest script without error handling. Script can be blocked by ad blockers or fail silently
- Safe modification: Add error handling, timeout mechanism, fallback UI
- Test coverage: No tests for script loading failure scenarios

**Altcha Widget Configuration:**
- Files: `src/components/AltchaWidget.tsx` (lines 48-62)
- Why fragile: Scale transform (0.72) and fixed dimensions are hardcoded. Widget styling with inline CSS custom properties may not update reactively
- Safe modification: Extract scale and dimensions to props, add responsive behavior
- Test coverage: No tests for widget verification flow or error scenarios

## Test Coverage Gaps

**No Tests at All:**
- What's not tested: The entire application has zero test coverage. No unit tests, integration tests, or E2E tests
- Files: All source files in `src/`
- Risk: API endpoint changes, form validation changes, date calculations, and user flows could break unnoticed. RSVP functionality is critical and untested
- Priority: **High** - The RSVP endpoint that handles user data must have API tests. Form validation must be tested. Date calculation edge cases must be verified

**API Endpoint Not Tested:**
- What's not tested: RSVP POST endpoint error handling, ALTCHA verification failure paths, email sending failures
- Files: `src/app/api/rsvp/route.ts` (lines 86-92 catches all errors with generic response)
- Risk: Email sending failures are silently caught and return generic error. No logs indicate what failed
- Priority: **High** - Integration tests should verify email sending, ALTCHA verification, and various validation failures

**Form Validation Not Tested:**
- What's not tested: Email regex, phone number validation, field-level validation logic
- Files: `src/components/RSVPForm.tsx` (lines 286-305)
- Risk: Invalid data accepted by client-side validation, server-side only has presence checks
- Priority: **High** - Validation functions should be extracted and unit tested

**State Management Not Tested:**
- What's not tested: Complex state transitions in RSVPForm (guest selection, plus-one addition/removal, form submission flow)
- Files: `src/components/RSVPForm.tsx` (lines 164-382)
- Risk: Edge cases in state updates could cause incorrect data submission or UI inconsistencies
- Priority: **Medium** - Integration tests should verify form flow and state changes

## Tech Debt

**Form Library Missing:**
- Issue: Complex form validation and state management implemented manually
- Files: `src/components/RSVPForm.tsx` (entire file)
- Impact: 651 lines of custom state logic that could be 300 lines with React Hook Form or Formik
- Fix approach: Migrate to React Hook Form (minimal, performant) or Formik (more comprehensive)

**Configuration Not Centralized:**
- Issue: Wedding details hardcoded in `src/app/page.tsx`, SMTP/ALTCHA config scattered across route handlers
- Files: `src/app/page.tsx` (lines 11-31), `src/app/api/rsvp/route.ts` (lines 8-14), `src/app/api/altcha-challenge/route.ts` (line 4)
- Impact: Hard to maintain, changes require touching multiple files
- Fix approach: Create `src/config/wedding.ts` and `src/config/email.ts` for centralized configuration

**No Error Boundary:**
- Issue: No error boundary components to handle component crashes gracefully
- Files: All React components
- Impact: Single component error could crash the entire page
- Fix approach: Add error boundary at page level (`src/app/error.tsx` exists in Next.js but not implemented)

**Unused Dependencies:**
- Issue: Zod validation library installed but completely unused (package.json shows only 10 dependencies, but Zod appears in node_modules)
- Files: `package.json`, implied usage
- Impact: Adds bundle size without benefit
- Fix approach: Either remove from package.json or implement it for validation

**No Logging:**
- Issue: Error handling uses only `console.error` with no structured logging
- Files: `src/app/api/rsvp/route.ts` (line 87), `src/app/api/altcha-challenge/route.ts` (line 16)
- Impact: Production errors are invisible to monitoring systems, makes debugging production issues impossible
- Fix approach: Integrate a logging service (Pino, Winston) or use a monitoring service (Sentry, LogRocket)

## Missing Critical Features

**No Email Delivery Verification:**
- Problem: RSVP endpoint sends email but never confirms delivery. User receives "success" response even if email fails
- Files: `src/app/api/rsvp/route.ts` (lines 78-83)
- Impact: RSVPs could be lost silently. Users think they confirmed but planner never receives notification
- Fix approach: Add email delivery tracking, implement retry logic with exponential backoff, add email queue system

**No Data Persistence:**
- Problem: RSVP responses are only sent via email. No database stores confirmations for planner to access/analyze
- Files: `src/app/api/rsvp/route.ts`
- Impact: Planner must manually parse emails or use email-to-database integration. No way to see RSVP statistics or search by guest
- Fix approach: Add database (Supabase, MongoDB Atlas) to store RSVP responses. Create admin dashboard to view confirmations

**No Rate Limiting:**
- Problem: RSVP endpoint has no rate limiting. Same IP/user can spam submissions
- Files: `src/app/api/rsvp/route.ts`
- Impact: Email spam possible, ALTCHA may not prevent repeated attempts
- Fix approach: Implement rate limiting middleware (next-rate-limit or manual IP tracking)

**No Duplicate Prevention:**
- Problem: User can submit RSVP multiple times with same data. No deduplication logic
- Files: `src/app/api/rsvp/route.ts`
- Impact: Planner receives duplicate RSVPs, inflates guest count
- Fix approach: Track submitted email/phone combinations, prevent resubmission within time window

## Dependencies at Risk

**Next.js 16.2.1 - Recent Major Version:**
- Risk: Very recent release (Next.js 16.x introduced significant changes). Potential stability issues not yet encountered in production
- Impact: Breaking changes in minor updates could affect deployment
- Migration plan: Monitor Next.js release notes closely. Pin specific minor version in package-lock.json

**React 19 - Early Adoption:**
- Risk: React 19 is new. Limited ecosystem compatibility. React Hook Form, testing libraries may have edge case issues
- Impact: Library incompatibilities, upgrade cycles will force frequent updates
- Migration plan: Consider reverting to React 18 LTS if stability issues arise. Check library compatibility before each update

**ALTCHA Library - Small Ecosystem:**
- Risk: altcha-lib and altcha are niche packages with limited community support
- Impact: Security vulnerabilities may be slower to patch
- Migration plan: Monitor ALTCHA GitHub for security advisories. Have alternative anti-bot solution ready (hCaptcha, reCAPTCHA)

## Known Issues

**Missing Environment Variables Lead to Silent Failure:**
- Symptoms: Application deploys successfully but RSVP endpoint returns 500 errors with generic message
- Files: `src/app/api/rsvp/route.ts` (lines 8-14), `src/app/api/altcha-challenge/route.ts` (line 4)
- Trigger: Environment variables not set in production deployment
- Workaround: Ensure `.env.local` is populated from `.env.example` before deployment. Add startup validation script

**Countdown Timer Doesn't Reset on Page Refresh:**
- Symptoms: Countdown may show incorrect remaining time after browser refresh if local clock differs from server
- Files: `src/components/Countdown.tsx` (line 19)
- Cause: Time calculation uses client-side Date object which can be inaccurate
- Workaround: Manual page refresh updates timer. Long-term fix: fetch current server time via API on mount

**Pinterest Board May Not Load on Ad-Blocked Browsers:**
- Symptoms: Dress Code page displays empty space instead of Pinterest board
- Files: `src/components/PinterestBoard.tsx` (lines 14-23)
- Cause: External Pinterest script is blocked
- Workaround: None. User must disable ad blocker. Long-term fix: add fallback UI or link to Pinterest board

## Scaling Limits

**Guest List Management Not Scalable:**
- Current capacity: Hardcoded array of 45 groups in `src/data/guests.ts`
- Limit: Adding/removing guests requires code changes and redeploy. No admin interface
- Scaling path: Move to database, create admin panel for guest management, implement authentication for planner access

**Email Sending Not Queued:**
- Current capacity: Synchronous email sending (line 78 in rsvp/route.ts) could timeout with email provider delays
- Limit: If email service slow, request hangs and user gets error
- Scaling path: Implement job queue (Bull, Inngest) for async email delivery with retries

---

*Concerns audit: 2026-04-02*
