# Codebase Structure

**Analysis Date:** 2026-04-02

## Directory Layout

```
wedding-website/
├── src/
│   ├── app/                    # Next.js App Router pages and API routes
│   │   ├── api/                # Server-side API endpoints
│   │   │   ├── altcha-challenge/
│   │   │   │   └── route.ts    # ALTCHA challenge generation
│   │   │   └── rsvp/
│   │   │       └── route.ts    # RSVP form submission handler
│   │   ├── dress-code/
│   │   │   └── page.tsx        # Dress code page with Pinterest board
│   │   ├── rsvp/
│   │   │   └── page.tsx        # RSVP form page
│   │   ├── favicon.ico         # Site favicon
│   │   ├── globals.css         # Global styles and Tailwind config
│   │   ├── layout.tsx          # Root layout with fonts and metadata
│   │   └── page.tsx            # Home page
│   ├── components/             # Reusable React components
│   │   ├── AltchaWidget.tsx    # ALTCHA verification widget
│   │   ├── Countdown.tsx       # Wedding countdown timer
│   │   ├── Footer.tsx          # Site footer with monogram
│   │   ├── Hero.tsx            # Hero section with image carousel
│   │   ├── Navigation.tsx      # Sticky navigation with mobile menu
│   │   ├── OurStory.tsx        # Couple's story section (unused)
│   │   ├── PinterestBoard.tsx  # Embedded Pinterest board iframe
│   │   ├── RSVPForm.tsx        # Multi-step RSVP form with guest selection
│   │   ├── SaveTheDate.tsx     # Save the date announcement section
│   │   └── Venues.tsx          # Wedding venue information section
│   └── data/
│       └── guests.ts           # Guest list and invite groups
├── public/
│   └── images/                 # Static images (hero photos, etc.)
├── .next/                      # Build output (generated)
├── node_modules/               # Dependencies (generated)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── next.config.ts              # Next.js configuration
├── package.json                # Project metadata and dependencies
├── package-lock.json           # Dependency lock file
├── postcss.config.mjs          # PostCSS/Tailwind config
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## Directory Purposes

**src/app:**
- Purpose: Next.js App Router directory; defines all routes and pages
- Contains: Page components (*.tsx), API route handlers (*/route.ts), global styles
- Key files: `page.tsx` (home), `layout.tsx` (root layout), `globals.css` (theme)

**src/app/api:**
- Purpose: Server-side request handlers for external integrations (email, ALTCHA)
- Contains: Subdirectories for each API endpoint
- Accessed: Via fetch() from client components

**src/components:**
- Purpose: Reusable React components used across pages
- Contains: Stateless display components, client-side interactive components
- Naming: PascalCase files with matching component names
- Key pattern: `"use client"` at top of interactive components

**src/data:**
- Purpose: Centralized application data (guest list, configuration)
- Contains: TypeScript data models and constants
- Exported: Interfaces (Guest, InviteGroup) and constants (INVITE_GROUPS)

**public/images:**
- Purpose: Static assets served directly by Next.js
- Contains: Hero carousel images, favicon, other static media
- Access: Via `/images/filename` in components

## Key File Locations

**Entry Points:**
- `src/app/page.tsx`: Home page - orchestrates Hero, SaveTheDate, Venues, Countdown
- `src/app/rsvp/page.tsx`: RSVP form page
- `src/app/dress-code/page.tsx`: Dress code page with Pinterest board
- `src/app/layout.tsx`: Root layout - fonts, metadata, global structure

**Configuration:**
- `tsconfig.json`: TypeScript config with path alias `@/*` → `src/*`
- `next.config.ts`: Next.js configuration (currently empty)
- `postcss.config.mjs`: PostCSS/Tailwind build config
- `.env.example`: Template for required environment variables
- `package.json`: Dependencies and build scripts

**Core Logic:**
- `src/app/api/rsvp/route.ts`: RSVP form processing - validation, email send
- `src/app/api/altcha-challenge/route.ts`: ALTCHA challenge generation
- `src/components/RSVPForm.tsx`: Multi-step form with guest selection and validation
- `src/data/guests.ts`: Guest list and group definitions

**Styling:**
- `src/app/globals.css`: Global styles, Tailwind @theme config, scrollbar styling
- Tailwind CSS v4 with inline theme configuration (colors, fonts)

**Testing:**
- Not present - no test files detected

## Naming Conventions

**Files:**
- Page components: `page.tsx` (Next.js convention)
- API routes: `route.ts` (Next.js convention)
- Components: `PascalCase.tsx` (e.g., `Hero.tsx`, `Navigation.tsx`)
- Utilities/data: `camelCase.ts` (e.g., `guests.ts`)
- Styles: `globals.css` for global, inline Tailwind in components

**Directories:**
- Feature directories under `src/app`: kebab-case (e.g., `dress-code`, `altcha-challenge`, `rsvp`)
- Functional directories: lowercase (e.g., `api`, `components`, `data`)

**Components:**
- PascalCase function names matching file names (e.g., `export default function Hero()`)
- Props interface pattern: `[ComponentName]Props` (e.g., `HeroProps`, `NavigationProps`)
- Subcomponent pattern: define helper components before main export

**Variables/Functions:**
- camelCase for variables and functions
- UPPERCASE for constants (e.g., `WEDDING`, `HERO_IMAGES`, `TRANSITION_INTERVAL`, `INVITE_GROUPS`)
- Descriptive names with context (e.g., `calculateTimeLeft`, `validateField`, `handleSubmit`)

## Where to Add New Code

**New Feature:**
- Primary code: `src/app/[feature-name]/page.tsx` for new pages OR new component in `src/components`
- Tests: Create `src/app/[feature-name]/page.test.tsx` or `src/components/[Component].test.tsx` (if testing is added)
- Styles: Use Tailwind classes inline; add to `globals.css` only if global style needed

**New Component/Module:**
- Implementation: `src/components/[ComponentName].tsx`
- If data-dependent: add data to `src/data/guests.ts` or create new `src/data/[feature].ts`
- If API-dependent: create `src/app/api/[endpoint]/route.ts`

**Utilities:**
- Shared helpers: `src/lib/[utility].ts` (create `lib` directory if needed)
- Page-specific helpers: inline in page component or in same directory

**API Endpoints:**
- Create subdirectory under `src/app/api/[endpoint-name]/`
- Create `route.ts` with HTTP handlers (GET, POST, etc.)
- Configuration: use process.env variables, document in `.env.example`

## Special Directories

**src/app/api:**
- Purpose: Server-side API route handlers (Node.js environment)
- Generated: No
- Committed: Yes

**.next:**
- Purpose: Next.js build output (compiled pages, optimized assets)
- Generated: Yes (by `npm run build`)
- Committed: No (in .gitignore)

**node_modules:**
- Purpose: Installed npm dependencies
- Generated: Yes (by `npm install`)
- Committed: No (in .gitignore)

**public:**
- Purpose: Static assets served directly by Next.js without processing
- Generated: No (user-managed)
- Committed: Yes

## Type System

**TypeScript Configuration:**
- Strict mode: enabled
- Target: ES2017
- Module: esnext
- Path aliases: `@/*` resolves to `src/*`

**Type Definitions:**
- Component props: `interface [ComponentName]Props`
- API payloads: `interface [EntityName]Payload` (e.g., `RSVPPayload`)
- Data models: `interface [Model]` (e.g., `Guest`, `InviteGroup`)

---

*Structure analysis: 2026-04-02*
