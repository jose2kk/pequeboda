# Architecture

**Analysis Date:** 2026-04-02

## Pattern Overview

**Overall:** Next.js 16 App Router with server-side page rendering and client-side component composition

**Key Characteristics:**
- Next.js 16 with App Router (`src/app`) for page-based routing
- React 19 with client-side components (`"use client"`) for interactive pages
- Stateless functional components with TypeScript
- Client-side state management using React hooks (useState, useRef, useCallback, useEffect)
- API routes for form handling and ALTCHA verification
- Tailwind CSS with custom Tailwind v4 theme configuration
- Framer Motion for entrance animations and scroll-triggered animations

## Layers

**Routing Layer:**
- Purpose: Define application pages and API endpoints
- Location: `src/app`
- Contains: Page components, API route handlers
- Depends on: React components, data models
- Used by: Browser navigation

**Component Layer:**
- Purpose: Reusable UI components with styling and interactivity
- Location: `src/components`
- Contains: Hero, Navigation, RSVPForm, Countdown, PinterestBoard, AltchaWidget, Footer, SaveTheDate, Venues, OurStory
- Depends on: Framer Motion, Tailwind CSS, custom fonts, INVITE_GROUPS data
- Used by: Page components in `src/app`

**Data Layer:**
- Purpose: Centralized guest list and invite group definitions
- Location: `src/data/guests.ts`
- Contains: INVITE_GROUPS array with type definitions (InviteGroup, Guest interfaces)
- Depends on: Nothing
- Used by: RSVPForm component, RSVP API route

**API Layer:**
- Purpose: Server-side request handling for form submissions and ALTCHA challenges
- Location: `src/app/api`
- Contains: RSVP submission endpoint, ALTCHA challenge generation endpoint
- Depends on: nodemailer (email), altcha-lib (verification), environment variables
- Used by: Client-side forms via fetch requests

## Data Flow

**RSVP Submission Flow:**

1. User navigates to `/rsvp` page (renders `src/app/rsvp/page.tsx`)
2. RSVPForm component mounts (`"use client"` boundary):
   - Step 1: User searches for their name using searchable guest list from INVITE_GROUPS
   - Step 2: User selects attendees from their group, optionally adds plus-ones
   - Step 3: User enters contact info (name, email, phone)
3. AltchaWidget component fetches challenge from `GET /api/altcha-challenge`
   - Returns challenge payload to user
4. User solves ALTCHA proof-of-work
5. On submit, RSVPForm sends POST request to `/api/rsvp` with:
   - groupLabel, guests array, plusOnes array, contactName, email, phone, altcha payload
6. API route verifies ALTCHA solution using altcha-lib
7. If verified, nodemailer sends email to PLANNER_EMAIL with guest confirmation
8. Returns success/error response to client

**Page Navigation Flow:**

1. User enters wedding website
2. Hero page loads (`src/app/page.tsx`) with:
   - Navigation component (sticky, scroll-responsive)
   - Hero section with image carousel
   - Save the Date section
   - Venues section
   - Countdown to wedding
   - Footer
3. Navigation links allow smooth scrolling or navigation to `/dress-code` or `/rsvp`
4. All pages use same Layout (`src/app/layout.tsx`) for:
   - Font loading and CSS custom properties
   - Metadata
   - Tailwind theme configuration

**State Management:**
- Form state (contact info, selected guests, plus-ones) managed in RSVPForm using React hooks
- UI state (dropdown open/closed, menu open/closed) managed locally in components using useState
- Animation state handled by Framer Motion
- No global state management (Redux, Zustand, etc.) - scope doesn't require it

## Key Abstractions

**InviteGroup + Guest Model:**
- Purpose: Represents a unit of invitation (solo or group) with guest metadata
- Examples: `src/data/guests.ts` (INVITE_GROUPS array)
- Pattern: Interface-defined data model, exported as constant array for use in RSVPForm

**Stateless Component Pattern:**
- Purpose: Reusable UI elements that don't manage state
- Examples: `src/components/Hero.tsx`, `src/components/Footer.tsx`, `src/components/Countdown.tsx`
- Pattern: Props-driven, compose into pages

**Client Component (Form/Interactive):**
- Purpose: Components that manage state or handle user interactions
- Examples: `src/components/RSVPForm.tsx`, `src/components/Navigation.tsx`, `src/components/AltchaWidget.tsx`
- Pattern: `"use client"` directive at top, hooks-based state management

**Subcomponent Pattern:**
- Purpose: Encapsulate complex component internals
- Examples: GuestMultiSelect, PlusOneInput inside RSVPForm; TimeUnit inside Countdown
- Pattern: Define helper components before main export, collocate with parent

## Entry Points

**Home Page:**
- Location: `src/app/page.tsx`
- Triggers: User navigates to `/` or site root
- Responsibilities: Orchestrates all home page sections (Hero, SaveTheDate, Venues, Countdown, Footer)

**RSVP Page:**
- Location: `src/app/rsvp/page.tsx`
- Triggers: User navigates to `/rsvp`
- Responsibilities: Renders RSVPForm inside full page layout with Navigation and Footer

**Dress Code Page:**
- Location: `src/app/dress-code/page.tsx`
- Triggers: User navigates to `/dress-code`
- Responsibilities: Displays dress code guidance and embedded Pinterest board

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: Every page load
- Responsibilities: Font initialization, theme CSS variables, metadata, body wrapper

**RSVP API Endpoint:**
- Location: `src/app/api/rsvp/route.ts`
- Triggers: POST request from RSVPForm
- Responsibilities: Validate form, verify ALTCHA, send email via nodemailer

**ALTCHA Challenge API Endpoint:**
- Location: `src/app/api/altcha-challenge/route.ts`
- Triggers: GET request from AltchaWidget
- Responsibilities: Generate challenge using altcha-lib

## Error Handling

**Strategy:** Try-catch in API routes with status code responses; client-side error messages for form validation

**Patterns:**
- **Form Validation:** Client-side field validation on input/blur with error state; visual feedback (red border, error message)
- **API Errors:** API routes return NextResponse with status codes (400, 403, 500); client shows generic error message
- **Network Errors:** RSVPForm catches fetch errors and sets error status
- **ALTCHA Failure:** Returns 403 with "security verification failed" message

## Cross-Cutting Concerns

**Logging:** Browser console.error in catch blocks for debugging (e.g., "RSVP email error:", "ALTCHA challenge error:")

**Validation:**
- Form field validation: email pattern, phone length, required fields
- ALTCHA solution verification: altcha-lib.verifySolution()
- Payload structure validation: Basic field existence checks before processing

**Authentication:** ALTCHA proof-of-work used as spam prevention (no user authentication needed for guest RSVP)

**Styling:**
- Tailwind CSS with custom theme in globals.css (@theme inline block)
- Custom font variables (--font-title, --font-body, --font-script, --font-caps) from Google Fonts
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)
- Color palette: background, foreground, accent, muted, cream, dark

**Animations:**
- Framer Motion entrance animations (opacity + y transitions)
- Scroll-triggered animations (whileInView)
- Component state transitions (AnimatePresence for conditional renders)
- Image carousel auto-transition in Hero (1200ms interval)

---

*Architecture analysis: 2026-04-02*
