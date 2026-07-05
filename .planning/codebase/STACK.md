# Technology Stack

**Analysis Date:** 2026-04-02

## Languages

**Primary:**
- TypeScript 5 - Frontend and API routes (100% of codebase)
- CSS/Tailwind - Styling via `@tailwindcss/postcss` v4

**Secondary:**
- JavaScript - Node.js runtime for dev/build tooling

## Runtime

**Environment:**
- Node.js (version not pinned, typically 18+)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present (March 22, 2026)

## Frameworks

**Core:**
- Next.js 16.2.1 - Full-stack React framework with API routes
  - App Router (directory: `src/app/`)
  - Server Components and Client Components
  - API Routes: `src/app/api/`

**UI/Frontend:**
- React 19.2.4 - Component library and rendering
- React DOM 19.2.4 - DOM rendering

**Animation:**
- Framer Motion 12.38.0 - Declarative animations for React components

**Styling:**
- Tailwind CSS 4 - Utility-first CSS framework
- PostCSS 4 - CSS processing pipeline

**Forms & Validation:**
- Built-in HTML5 validation + custom TypeScript validation (no external schema library in dependencies)

## Key Dependencies

**Critical:**
- altcha 2.3.0 - Anti-bot CAPTCHA widget (client-side proof-of-work)
- altcha-lib 1.4.1 - Server-side challenge creation and verification (uses SHA-256 HMAC)
- nodemailer 8.0.3 - SMTP email delivery for RSVP confirmations

**Infrastructure:**
- next (included) - Provides server and build infrastructure
- @types/nodemailer 7.0.11 - TypeScript types for nodemailer

## Configuration

**Environment:**
- Configuration via `.env.example` template
- Required variables:
  - `SMTP_HOST` - SMTP server hostname
  - `SMTP_PORT` - SMTP port (587 or 465 recommended)
  - `SMTP_USER` - SMTP authentication username
  - `SMTP_PASS` - SMTP authentication password
  - `PLANNER_EMAIL` - Email address to receive RSVP confirmations
  - `FROM_EMAIL` - Sender email address for RSVP emails
  - `ALTCHA_HMAC_KEY` - Random secret for anti-bot verification (SHA-256)
- Location: `.env` (not in version control)

**Build:**
- `tsconfig.json` - TypeScript compiler configuration
  - Target: ES2017
  - Module resolution: bundler (Next.js style)
  - Path alias: `@/*` → `./src/*`
  - Strict mode: enabled
  - JSX: react-jsx (automatic JSX runtime)
- `next.config.ts` - Next.js configuration (minimal, uses defaults)

**Development:**
- ESLint 9 - Code linting
- ESLint config from Next.js: `eslint-config-next@16.2.1`

## Platform Requirements

**Development:**
- Node.js 18+ (recommended)
- npm 8+ for package management
- TypeScript 5 (installed via devDependencies)

**Production:**
- Deployment target: Node.js runtime environment (Vercel, Node.js server, containerized)
- Static assets served via Next.js public directory: `public/`

## Build & Deploy

**Build Command:**
```bash
npm run build
```

**Dev Command:**
```bash
npm run dev
```

**Start Command:**
```bash
npm start
```

**Build Output:**
- `.next/` directory (Next.js build artifacts)

---

*Stack analysis: 2026-04-02*
