# Testing Patterns

**Analysis Date:** 2026-04-02

## Test Framework

**Status:** No automated testing configured

**Runner:** None detected
- `package.json` has no test script defined
- No Jest, Vitest, or other test runner installed
- No test configuration files (jest.config.js, vitest.config.ts) present

**Why:** Single-page marketing/event website with minimal complex logic; testing likely not prioritized for this project type

## Test File Organization

**Current State:** No test files exist in codebase

**If tests were added, expected pattern:**
- Co-located tests alongside source (Next.js convention): `Navigation.tsx` → `Navigation.test.tsx`
- Test directory structure would mirror `src/`: `tests/components/`, `tests/api/`, etc.
- Or separate `__tests__/` directory at project root

**File naming:**
- `.test.ts` or `.test.tsx` suffix for component tests
- `.spec.ts` or `.spec.tsx` as alternative (not used here)

## Test Structure

**Not Applicable** — No test framework configured

If tests were to be implemented, based on Next.js conventions and project context:

```typescript
// Example pattern (not actual code)
import { render, screen } from "@testing-library/react";
import Navigation from "@/components/Navigation";

describe("Navigation", () => {
  it("should render navigation links", () => {
    render(<Navigation name1="Ana" name2="Jose" />);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
  });
});
```

**Patterns would include:**
- `describe()` blocks per component
- `it()` or `test()` for individual test cases
- AAA pattern: Arrange, Act, Assert

## Mocking

**Framework:** Not applicable (no testing framework installed)

**What would need mocking (if tests were added):**
- Next.js Image component: `next/image` mock
- Framer Motion: animation library mock
- Window/DOM APIs: `window.scrollY`, `document.body.style`, etc.
- Fetch calls: API route responses in `handleSubmit` (RSVPForm)
- External libraries: `nodemailer` in API routes, `altcha-lib` for verification

**Current testing approach:**
- Manual testing via browser dev tools
- Console logging for debugging (observed in API routes)
- Form validation tested through user interaction only

## Fixtures and Factories

**Not Applicable** — No test infrastructure

**If implemented, would need:**
- Guest data fixtures from `src/data/guests.ts` (already serves as test data in development)
- Sample invite groups for testing form flows
- Mock ALTCHA challenge payloads for API tests

## Coverage

**Requirements:** None enforced

**Current state:**
- No coverage reports possible (no tests)
- Critical untested areas: RSVPForm component logic, API validation, email sending

## Test Types

No tests currently exist. If added:

**Unit Tests (would test):**
- `calculateTimeLeft()` helper in Countdown component
- `normalize()` string normalization in RSVPForm
- `validateField()` form validation logic
- Component prop defaults and rendering

**Integration Tests (would test):**
- RSVP form flow: search → select group → confirm attendees → submit
- API route `/api/rsvp` with valid/invalid payloads
- ALTCHA verification flow end-to-end

**E2E Tests:**
- Not configured; Playwright/Cypress not installed
- Could test: form submission, navigation between pages, countdown timer updates

## Key Areas Without Tests

**High Priority (if tests were added):**
- `src/app/api/rsvp/route.ts`: Email sending, ALTCHA verification, payload validation
- `src/components/RSVPForm.tsx`: Complex form state, validation, field blur/change logic, multi-step flow
- `src/app/api/altcha-challenge/route.ts`: Not reviewed, but API route likely needs tests

**Medium Priority:**
- `src/components/Countdown.tsx`: Time calculation, timer intervals, component lifecycle
- `src/components/Navigation.tsx`: Scroll event listeners, menu state, dropdown click handling
- Form input validation patterns

**Low Priority:**
- Presentation components: Hero, SaveTheDate, Footer (primarily render-only)
- Page components: layout, page routes (composition of subcomponents)

## Manual Testing Approach (Current)

**Browser Testing:**
- Form submission: manually fill RSVP form and verify email received
- Navigation: click links, verify scroll behavior
- Responsive design: test on mobile/tablet/desktop
- Animations: verify Framer Motion animations trigger on scroll/mount

**Email Testing:**
- SMTP credentials required to test `/api/rsvp` locally
- Can verify email format by inspecting request payloads in browser DevTools

**No Automated Validation:**
- Field validation tested by submitting invalid data
- ALTCHA verification tested by checking API response status
- Countdown timer accuracy tested by visual inspection in browser

---

*Testing analysis: 2026-04-02*
