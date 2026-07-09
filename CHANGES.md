# Arctic Air HVAC — UI Changes Package

## How to apply

Copy every folder from this zip directly **over** your existing `components/` directory.
All file paths match your project structure exactly.

---

## Files changed

### GeneralComponents/Header
- **Header.tsx** — Added `topBarHidden` class logic. Marquee bar now hides smoothly when
  the user scrolls down even 40px, and reappears when back at the top. No marquee
  changes on mobile (still hidden via CSS). Compact mode (nav shrink) preserved.
- **styles.module.scss** — Added `.topBarHidden` rule: `max-height:0; opacity:0` with
  smooth transition. Removed the old `.compact &` collapse that was tied to scroll.

### GeneralComponents/Footer
- **Footer.tsx** — Full redesign. Replaced the heavy insured strip with a compact trust
  pill row. Brand column now has direct phone/email/address links. Nav, services, and
  areas columns retained. Social buttons redesigned. Emergency blinking dot in bottom bar.
- **styles.module.scss** — Full redesign matching above.

### GeneralComponents/ScrollToTop *(NEW FILE)*
- **ScrollToTop.tsx** — Tiny `'use client'` component. Listens to `usePathname()` and
  calls `window.scrollTo({ top:0, behavior:'instant' })` on every route change.

  **You must wire this into `src/app/layout.tsx`:**
  ```tsx
  import ScrollToTop from "#/GeneralComponents/ScrollToTop/ScrollToTop";

  // Inside <body>, right after the Header ConditionalShell:
  <Suspense fallback={null}>
    <ScrollToTop />
  </Suspense>
  ```

  **Also add to `next.config.js`:**
  ```js
  experimental: {
    scrollRestoration: false,
  }
  ```

### Pages/Home/WelcomePage
- **styles.module.scss** — Fixed spacing. `min-height` is now `100svh` with proper
  `padding-top: clamp(5rem, 10vh, 7rem)` so content is never buried under the sticky
  header. Stacked layout breakpoint moved to `900px`. Gap tightened to `3rem`.
  The WelcomePage.tsx itself is **unchanged** — no logic edits needed.

### PageComponents/TrustBar
- **TrustBar.tsx** — Redesigned from simple icon row to a 6-column grid with icon+text
  badges. Each badge has an icon box, bold title, and sub-line. Stacks to 3-col on
  tablet, 2-col on mobile. White background (fits between dark hero and page content).
- **styles.module.scss** — Full redesign.

### PageComponents/SectionIntro
- **SectionIntro.tsx** — Added optional `tag` (eyebrow) prop and `light` prop for use on
  dark-background sections. Animated divider line added below subtitle. Transparent
  background so page section color shows through.
- **styles.module.scss** — Redesigned. Light variant inverts text colors.

### PageComponents/CTABanner
- **CTABanner.tsx** — Redesigned. Now has eyebrow, big headline, sub-copy, primary call
  button, secondary estimate link, and three mini trust badges below. Rotating snowflake
  bg element. All text is configurable via props with sensible defaults.
- **styles.module.scss** — Obsidian background with grid pattern + radial glow.

### PageComponents/GuaranteeSection
- **GuaranteeSection.tsx** — Redesigned as sticky-left header + 2×3 card grid. Header
  has eyebrow, big title, description, CTA button, and star rating row. Cards use icon +
  title + body layout in a bordered grid.
- **styles.module.scss** — White background. Cards share 1px borders for a clean table look.

### PageComponents/ProcessTimeline
- **ProcessTimeline.tsx** — Redesigned as a vertical timeline with numbered icon nodes,
  connector line, and card-style step descriptions. 4 steps. Intro block with tag + title.
- **styles.module.scss** — White background. Connector gradient from orange → faded.

### PageComponents/ServiceCardComponent
- **ServiceCardComponent.tsx** — Redesigned. Intro block with eyebrow + heading. 3-column
  card grid (2-col tablet, 1-col mobile). Each card has icon, title, body, top-border
  hover reveal, and "Learn More" arrow link. "View All Services" CTA below.
- **styles.module.scss** — White background with orange hover accents.

### PageComponents/ContactForms/Variant1
- **styles.module.scss** — Full redesign. Dark obsidian root bg with diagonal pattern.
  Left panel: dark with orange gradient tint, logo mark, trust items, stats, star review.
  Right panel: white form with orange accents, clipped submit button. Two-column fields.

### PageComponents/ContactForms/Variant2
- **styles.module.scss** — Full redesign. White card with dark header band. Icon service
  picker grid (4 columns). Urgent toggle switch. Clean contact fields below.

### PageComponents/ContactForms/Variant4
- **styles.module.scss** — Full redesign. Multi-step card with orange progress bar in dark
  header. Step 1: service grid cards. Step 2: budget slider. Step 3: contact fields +
  recaptcha. Back/Next/Submit nav row.

---

## What is NOT changed
- `Variant3` form — left as-is per your request
- All blog components
- All admin components
- All page-level files (service pages, about, contact page layouts, etc.)
- `WelcomePage.tsx` logic — only the SCSS spacing is updated
