# Coding Conventions

**Analysis Date:** 2026-04-02

## Naming Patterns

**Files:**
- PascalCase for React components: `Navigation.tsx`, `RSVPForm.tsx`, `Hero.tsx`
- camelCase for utility/data files: `guests.ts`
- Route files follow Next.js App Router convention: `route.ts`, `page.tsx`, `layout.tsx`

**Functions:**
- PascalCase for React component functions: `export default function Navigation()`
- camelCase for helper/utility functions: `calculateTimeLeft()`, `normalize()`, `validateField()`
- Handler functions use camelCase with `on` prefix or `handle` prefix: `onScroll()`, `handleSubmit()`, `onToggle()`, `handleFieldChange()`

**Variables:**
- camelCase for all local variables and state: `scrolled`, `menuOpen`, `selectedIds`, `formErrors`
- UPPERCASE_SNAKE_CASE for constants: `HERO_IMAGES`, `TRANSITION_INTERVAL`, `SMTP_HOST`, `WEDDING`
- Descriptive names for complex state objects: `selectedIds` (Set<string>), `plusOnes` (Record<string, string>), `formErrors` (Record<string, string>)

**Types:**
- PascalCase for interface names: `NavigationProps`, `CountdownProps`, `RSVPPayload`, `InviteGroup`, `Guest`
- Props interfaces use `Props` suffix: `SaveTheDateProps`, `HeroProps`, `AltchaWidgetProps`
- Union types for state machines: `"idle" | "sending" | "success" | "error"`

## Code Style

**Formatting:**
- Indentation: 2 spaces (inferred from source files)
- Line breaks: components use semantic line breaks around logical blocks
- Trailing commas: present in multi-line objects/arrays (seen in `WEDDING` constant, prop definitions)
- String quotes: double quotes throughout (enforced by Next.js/ESLint defaults)

**Linting:**
- ESLint v9 is configured in `package.json`
- Uses `eslint-config-next` for Next.js-specific rules
- No custom `.eslintrc` file — uses Next.js defaults
- ESLint rule violation example: `// eslint-disable-next-line react-hooks/exhaustive-deps` used selectively (see `RSVPForm.tsx` line 232) when dependency arrays are intentional

**Styling:**
- Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- Custom theme colors defined in `src/app/globals.css` using CSS custom properties: `--color-background`, `--color-foreground`, `--color-accent`, etc.
- Font families injected via CSS variables: `--font-title`, `--font-body`, `--font-script`, `--font-caps`, `--font-tangerine`
- Class-based styling via Tailwind utilities: extensive use of `className` with Tailwind classes
- Complex Tailwind expressions use template literals for conditionals: `` className={`...${condition ? "class1" : "class2"}`} ``

## Import Organization

**Order:**
1. React hooks (if client component): `import { useState, useEffect } from "react"`
2. External libraries: `import { motion, AnimatePresence } from "framer-motion"`, `import Image from "next/image"`
3. Internal components/utilities: `import Hero from "@/components/Hero"`, `import { INVITE_GROUPS } from "@/data/guests"`
4. Type imports: `import type { Metadata } from "next"`, `import type { InviteGroup, Guest }`

**Path Aliases:**
- `@/*` maps to `src/*` (configured in `tsconfig.json`)
- All internal imports use path alias: `@/components/*`, `@/data/*`
- No relative path imports (`../` or `./`) used in codebase

## Error Handling

**Patterns:**
- API routes use try-catch with console.error for logging: `catch (error) { console.error("RSVP email error:", error); ... }`
- Client components use error state management: `status` state (`"idle" | "sending" | "success" | "error"`)
- HTTP error responses use `NextResponse.json()` with `status` parameter: `NextResponse.json({ error: "..." }, { status: 400 })`
- Form validation errors stored in state: `formErrors` (Record<string, string>) with per-field error messages
- Client-side async operations wrap in try-catch and update UI state: `setStatus("error")` on failure (see `RSVPForm.tsx` line 380)
- No global error boundary observed — errors handled locally per component

## Logging

**Framework:** `console.error()` for error logging in API routes only

**Patterns:**
- Error logging in `src/app/api/rsvp/route.ts`: `console.error("RSVP email error:", error)`
- No info/debug/warn logging observed in codebase
- Client-side has no logging — relies on browser console via React error boundaries (if configured)
- Server-side only logs errors to stderr

## Comments

**When to Comment:**
- Algorithm explanations: `// Target is 5:00 PM Colombia time (UTC-5)`
- Complex CSS logic: `// Image width = height * 3/4 (aspect ratio).`
- Configuration sections marked with divider comments: `// ============ CUSTOMIZE YOUR WEDDING DETAILS HERE ============`
- Data structure explanations in comments before arrays/objects: `// Each InviteGroup is a self-contained unit.`

**JSDoc/TSDoc:**
- No JSDoc comments observed on functions
- Type definitions documented inline in interface comments: `// How the date is displayed in the Save the Date section`
- No function-level documentation for public exports

## Function Design

**Size:** Functions range from small (5-10 lines) for handlers to medium (30-40 lines) for complex logic like `validateForm()`, `selectMember()`. RSVPForm.tsx is 650+ lines due to inline subcomponents and form complexity.

**Parameters:**
- Props passed as single object parameter with TypeScript interface
- Destructuring in function signature: `function Navigation({ name1 = "N", name2 = "N" }: NavigationProps)`
- Default values provided in destructuring for optional props
- Callback props use specific naming: `onVerified`, `onChange`, `onToggle`, `onRemove`, `onToggleOpen`

**Return Values:**
- Components return JSX.Element
- Utility functions return typed values: `function calculateTimeLeft(): TimeLeft`
- API routes return `NextResponse` or `NextResponse.json()`
- Event handlers void
- Hooks manage internal state and return JSX

## Module Design

**Exports:**
- Default export for all React components: `export default function ComponentName()`
- Named exports for types/interfaces: `export interface Guest`, `export interface InviteGroup`, `export const INVITE_GROUPS`
- API routes use named export: `export async function POST()`
- Utility functions use default export (if file contains single function) or named (if multiple): `calculateTimeLeft()` is function scoped in component file

**Barrel Files:**
- No barrel files (`index.ts`) observed in codebase
- Imports go directly to component/data files: `@/components/Navigation`, `@/data/guests`

## Component Patterns

**Client vs Server:**
- Explicit `"use client"` directive on all interactive components: `Navigation.tsx`, `RSVPForm.tsx`, `Hero.tsx`
- Server components: `layout.tsx`, `page.tsx` (app router pages), API routes
- No mixing of server/client logic in same file

**State Management:**
- Local component state via `useState()` only
- No global state management (Redux, Zustand, Context) used
- Form state split across multiple atoms: `searchQuery`, `selectedGroup`, `selectedIds`, `plusOnes`, `contactName`, `email`, `phone`, `formErrors`, `touched`

**Props Pattern:**
- All props typed with TypeScript interfaces
- Optional props marked with `?` and given sensible defaults
- Props interface always accepts minimal required data, rest computed in component
- Large components have nested subcomponent interfaces co-located (see `GuestMultiSelect`, `PlusOneInput` in `RSVPForm.tsx`)

## Animation Patterns

**Framework:** Framer Motion (`framer-motion` v12)

**Common patterns:**
- Initial state: `initial={{ opacity: 0, y: 30 }}` or similar
- Animate state: `animate={{ opacity: 1, y: 0 }}`
- Viewport-triggered: `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true, margin: "-100px" }}`
- Transition config: `transition={{ duration: 0.8, ease: "easeOut" }}`
- List animations: map with delay staggering `transition={{ delay: i * 0.1, duration: 0.4 }}`
- Continuous animations: `animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}`

---

*Convention analysis: 2026-04-02*
